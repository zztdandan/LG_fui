<template>
  <div>
    <!-- 用户列表搜索横向简略表单 -->
    <div class="col-md-12 flex-md">
      <el-form :inline="true" width="200px">
        <simple-search-bar ref="search_bar" @search_cb="handleSearch" @close_cb="resume_search" default_holder="请输入用户名、厂牌号或单位名"></simple-search-bar>

        <el-form-item label="选择搜索类型">
          <el-select v-model="type_value" placeholder="请选择">
            <el-option v-for="item in type_opt" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- <dept-selector :selected_cb="dept_selected_cb"></dept-selector> -->

    </div>

    <div class="col-md-12">
      <!-- 用户列表控件 -->
      <dash-board :class="user_list_class" :key="'info'">
        <template slot="title" class="text-md">
          用户列表
        </template>
        <user-deformable-table :Collapse="this.DashBoardType!='none'" :dataList="user_info_list" @select_data_cb="user_select_cb">
          <template slot="header">
            <div class="flex-aside">
              <div class="">
                <el-tooltip class="item" effect="dark" content="新增用户" placement="top">
                  <a class="button button-rounded  button-action button-small" @click="openAdd">
                    <i class="lgui-plus" />
                  </a>
                </el-tooltip>
              </div>
              <div class="" v-if="curr_user_detail.name">
                <el-tooltip class="item" effect="dark" content="用户详情" placement="top">
                  <a class="button button-primary button-rounded button-small" @click="openDetail" v-if="this.DashBoardType=='none'">
                    <i class="lgui-list" />
                  </a>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="关闭用户详情显示" placement="top">
                  <a class="button button-rounded button-small" @click="closeDetail" v-if="this.DashBoardType!='none'">
                    <i class="lgui-minus" />
                  </a>
                </el-tooltip>
              </div>
            </div>

          </template>
        </user-deformable-table>
      </dash-board>

      <!-- 用户详情控件 -->
      <dash-board :class="user_detail_class" :key="'detail'">
        <template slot="title" class="text-md">
          用户详情
        </template>
        <build-form key="788" :FormArray="user_detail_form_array" :SyncData="curr_user_detail" FormId="user_info"></build-form>
        <div class="flex-aside">
          <div class="">
            <a @click="handlerClickEditUser" class="button button-primary button-rounded button-small">编辑用户</a>
          </div>
          <div class="">
          </div>
        </div>
      </dash-board>

      <!-- 用户修改控件 -->
      <dash-board :class="user_edit_class" :key="'edit'">
        <template slot="title" class="text-md">
          用户修改
        </template>
        <build-form key="566" :FormArray="user_edit_form_array" :SyncData.sync="edit_user_detail" FormId="user_edit"></build-form>
        <div class="flex-aside">
          <div class="">
            <a @click="handleDelUser" class="button button-caution button-rounded button-small">删除用户</a>
            <a @click="handleUpdateUser" class="button button-primary button-rounded button-small">提交修改</a>
          </div>
          <div class="">
            <a @click="handlerClickCancelUser" class="button button-primary button-rounded button-small">取消编辑</a>
          </div>
        </div>
      </dash-board>

      <!-- 用户添加控件 -->
      <dash-board :class="user_add_class" :key="'add'">
        <template slot="title" class="text-md">
          用户添加
        </template>
        <build-form key="233" :FormArray="user_edit_form_array" :SyncData.sync="user_add_info" FormId="user_add"></build-form>
        <div class="flex-aside">
          <div class="">
            <a @click="handleAddUser" class="button button-primary button-rounded button-small">新增用户</a>
          </div>
          <div class="">
            <a @click="handlerClickCancelUser" class="button button-primary button-rounded button-small">取消编辑</a>
          </div>
        </div>
      </dash-board>

    </div>

  </div>
</template>
<script>
  import BuildForm from "@/components/BuildForm/BuildForm.vue";
  import DashBoard from "@/components/dashboard/DashBoard";
  import SimpleSearchBar from "@/components/SimpleSearchBar/SimpleSearchBar";
  import global_config from "@/global_config";
  import UserDeformableTable from "./comp/UserDeformableTable";
  import linqjs from "linqjs";
  import "@/assets/css/buttons.css";

  export default {
    name: "user-manage",
    data: function() {
      console.log("数据初始化usermanager");
      return {
        // showdetail: false,
        // showadd: false,
        // enableEdit: false,
        //由于状态栏太多，总地归为一项，即为DashBoardType
        DashBoardType: "none",
        //搜索到的用户列表
        user_info_list: [],
        //确定用户后显示详细信息
        curr_user_detail: {},
        user_add_info: {},
        edit_user_detail: {},
        type_opt: [
          { value: "user_name", label: "用户名" },
          { value: "user_id", label: "厂牌号" },
          { value: "dept", label: "单位名称" }
        ],
        type_value: "",
        userInfoFormArray: [
          { type: "text", id: "code", value: "", label: "厂牌号", line: 1, readonly: false },
          { type: "text", id: "name", value: "", label: "用户名", line: 1, readonly: false },
          { type: "text", id: "deptName", value: "", label: "单位名", line: 2, readonly: false },
          { type: "text", id: "email", value: "", label: "邮箱", line: 3, readonly: false },
          { type: "text", id: "mobile", value: "", label: "手机号", line: 4, readonly: false }
        ]
      };
    },
    components: {
      DashBoard,
      SimpleSearchBar,
      UserDeformableTable,
      BuildForm
    },
    computed: {
      user_list_class() {
        if (this.DashBoardType != "none") {
          return "user-left-list";
        } else {
          return "user-full-list";
        }
      },
      user_detail_class() {
        // return "user-detail-show";
        if (this.DashBoardType == "userdetail") {
          return "user-detail-show";
        } else {
          return "user-detail-unshow";
        }
      },
      user_edit_class() {
        // return "user-detail-show";
        if (this.DashBoardType == "useredit") {
          return "user-detail-show";
        } else {
          return "user-detail-unshow";
        }
      },
      user_add_class() {
        // return "user-detail-show";
        if (this.DashBoardType == "useradd") {
          return "user-detail-show";
        } else {
          return "user-detail-unshow";
        }
      },
      user_detail_form_array: function() {
        return [
          { type: "text", id: "code", value: "", label: "厂牌号", line: 1, readonly: true },
          { type: "text", id: "name", value: "", label: "用户名", line: 1, readonly: true },
          { type: "text", id: "deptName", value: "", label: "单位名", line: 2, readonly: true },
          { type: "text", id: "email", value: "", label: "邮箱", line: 3, readonly: true },
          { type: "text", id: "mobile", value: "", label: "手机号", line: 4, readonly: true }
        ];
      },
      user_edit_form_array: function() {
        return [
          { type: "text", id: "code", value: "", label: "厂牌号", line: 1, readonly: false },
          { type: "text", id: "name", value: "", label: "用户名", line: 1, readonly: false },
          { type: "text", id: "deptName", value: "", label: "单位名", line: 2, readonly: false },
          { type: "text", id: "email", value: "", label: "邮箱", line: 3, readonly: false },
          { type: "text", id: "mobile", value: "", label: "手机号", line: 4, readonly: false }
        ];
      }
    },
    methods: {
      user_select_cb(info) {
        let tmp1 = JSON.parse(JSON.stringify(info));
        this.curr_user_detail = tmp1;
      },
      //TODO 选择了单位时的操作
      dept_selected_cb(dept) {
        this.$refs.search_bar.searchText = dept;
        this.type_value = "dept";
      },
      // 点击搜索按钮的操作
      handleSearch(text) {
        // console.log("跳转成功");
        let that_vue = this;
        // let tail = "?mat=" + Math.random(10000);
        that_vue.$ajax
          .post(global_config.UserManage.PostList, {
            limit: 500,
            page: 1,
            name: text,
            type: that_vue.type_value
          })
          .then(({ data }) => {
            try {
              if (data.code === 0) {
                this.user_info_list = data.data.list;
              } else {
                // console.log(data);
              }
            } catch (e) {
              // console.log(e);
            }
          });
      },
      // 点击编辑用户信息的方法操作
      handlerClickEditUser() {
        this.edit_user_detail = JSON.parse(JSON.stringify(this.curr_user_detail));
        // let tmp = new Object(this.curr_user_detail);
        // this.edit_user_detail = tmp;
        this.DashBoardType = "useredit";
      },
      // 点击关闭用户编辑的操作
      handlerClickCancelUser() {
        this.edit_user_detail = JSON.parse(JSON.stringify(this.curr_user_detail));
        this.DashBoardType = "userdetail";
      },
      //TODO 取消搜索效果
      resume_search() {
        this.user_info_list = [];
      },
      // 打开详情显示的操作
      openDetail() {
        // console.log("触发详情");
        this.DashBoardType = "userdetail";
      },
      // 关闭详情显示的操作
      closeDetail() {
        console.log("触发关闭详情");
        this.DashBoardType = "none";
      },
      //打开新增用户的dashboard
      openAdd() {
        this.DashBoardType = "useradd";
      },
      //关闭新增用户dashboard
      closeAdd() {
        this.DashBoardType = "none";
      },
      //* 下面3个：用户修改添加删除
      handleDelUser() {
        let that_vue = this;
        //将obj转化为formdata
        var fd = new FormData();
        for (var aa in that_vue.edit_user_detail) {
          fd.append(aa, that_vue.edit_user_detail[aa]);
        }
        console.log("fd=", fd);
        //地址使用全局配中的地址
        this.$ajax({
          url: global_config.UserManage.UserDel,
          method: "del",
          data: fd,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          try {
            if (res.data.code == 0) {
              console.log("成功");
            } else {
              console.log("失败", res.data.msg);
            }
          } catch (e) {
            console.log("ajax错误", e);
          }
        });
      },
      handleUpdateUser() {
        let that_vue = this;
        //将obj转化为formdata
        var fd = new FormData();
        for (var aa in that_vue.edit_user_detail) {
          fd.append(aa, that_vue.edit_user_detail[aa]);
        }
        console.log("fd=", fd);
        //地址使用全局配中的地址
        this.$ajax({
          url: global_config.UserManage.UserUpdate,
          method: "post",
          data: fd,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          try {
            if (res.data.code == 0) {
              console.log("成功");
            } else {
              console.log("失败", res.data.msg);
            }
          } catch (e) {
            console.log("ajax错误", e);
          }
        });
      },
      handleAddUser() {
        let that_vue = this;
        //将obj转化为formdata
        var fd = new FormData();
        for (var aa in that_vue.user_add_info) {
          fd.append(aa, that_vue.user_add_info[aa]);
        }
        console.log("fd=", fd);
        //地址使用全局配中的地址
        this.$ajax({
          url: global_config.UserManage.UserAdd,
          method: "post",
          data: fd,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          try {
            if (res.data.code == 0) {
              console.log("成功");
            } else {
              console.log("失败", res.data.msg);
            }
          } catch (e) {
            console.log("ajax错误", e);
          }
        });
      }
    },
    watch: {},
    mounted: function() {
      let c =
        '{"userId":1,"status":1,"deptId":1,"email":"","mobile":"","password":"","salt":"","name":"","createTime":0}';
      this.curr_user_detail = JSON.parse(c);
      this.edit_user_detail = JSON.parse(c);
      this.user_add_info = JSON.parse(c);
    }
  };
</script>
<style scoped>
.text-md {
  text-align: center;
}
.user-full-list {
  display: block;
  position: relative;
  float: left;
  width: 100%;
}
.user-left-list {
  width: 35%;
  position: relative;
  float: left;
  display: block;
}
.user-detail-show {
  width: 65%;
  position: relative;
  float: left;
  display: block;
}
.user-detail-unshow {
  display: none;
}
.user-add-shown {
  width: 65%;
  position: relative;
  float: left;
  display: block;
}
.user-add-unshown {
  display: none;
}
.flex-md {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.flex-aside {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
}
.dash-board-panel {
  min-height: 50vh;
}
.fr-flex {
  width: fit-content;
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 1rem;
}
.fl-flex {
  width: fit-content;
  float: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 1rem;
}
</style>
