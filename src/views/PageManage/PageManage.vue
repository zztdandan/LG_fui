<template>
  <div>
    <dash-board>
      <template slot="title">
        <div class="text-md">
          页面管理
        </div>
      </template>
      <div class="flex-md ">
        <dash-board class="flex-item full-height">
          <template slot="title">
            <div class="text-md">
              页面列表
            </div>
          </template>
          <el-tree style="margin:1rem;" @node-click="handleNodeClick" default-expand-all node-key="id" highlight-current :props="defaultProps" :data="menu_tree">
          </el-tree>
        </dash-board>
        <dash-board class="flex-item full-height">
          <template slot="title">
            <div class="text-md">
              页面详情
            </div>
          </template>
          <build-form key="233" :FormArray="form_show_array" :SyncData.sync="tree_blur" FormId="tree_detail"></build-form>
          <div class="button-group">
            <a v-if="form_edit_type=='none'" @click="handelFormAddClick" class="button button-pill button-small button-primary">增加画面(同级)</a>
            <a v-if="form_edit_type=='none'" @click="handelFormEditClick" class="button button-pill button-small button-primary">编辑画面</a>
            <a v-if="form_edit_type=='none'" @click="handleFormDelClick" class="button button-small button-pill">删除画面</a>
            <a v-if="form_edit_type!='none'" @click="handleFormConfirmClick" class="button button-small button-pill button-action">确认</a>
            <a v-if="form_edit_type!='none'" @click="handleFormCancelClick" class="button button-small button-pill button-caution">取消</a>
          </div>
          <hr/>
          <p>子页面维护</p>
          <!-- <lg-simple-table :init_data="dataList" :init_column="formdablecolumn" @select_row="handleSelect"></lg-simple-table> -->

        </dash-board>
      </div>

    </dash-board>
  </div>
</template>

<script>
  import DashBoard from "@/components/dashboard/DashBoard";
  import global_config from "@/global_config";
  import { list_to_tree } from "@/utils/tree_convert";
  import LgSimpleTable from "@/components/LgSimpleTable/LgSimpleTable.vue";
  import BuildForm from "@/components/BuildForm/BuildForm.vue";
  import { SimpleAlert } from "@/utils/ele_alert.js";
  export default {
    name: "page-manage",
    components: {
      DashBoard,
      BuildForm
    },
    data: function() {
      return {
        form_edit_type: "none",
        menu_tree: [],
        tree_blur: {},
        tree_blur_tmp: {},
        defaultProps: {
          children: "children",
          label: "label"
        },
        form_show_array: [
          { type: "text", id: "id", value: "", label: "画面编号", line: 1, readonly: true, labelWidth: "5rem" },
          { type: "text", id: "name", value: "", label: "画面名称", line: 1, readonly: true, labelWidth: "5rem" },
          { type: "text", id: "url", value: "", label: "画面网址", line: 2, readonly: true, labelWidth: "5rem" },
          { type: "text", id: "icon", value: "", label: "画面图标", line: 2, readonly: true, labelWidth: "5rem" },
          { type: "text", id: "parentId", value: "", label: "画面父节点编号", line: 3, readonly: true },
          { type: "text", id: "parent_name", value: "", label: "画面父节点名称", line: 3, readonly: true },
          { type: "check", id: "hidden", value: "", label: "是否隐藏", line: 3, readonly: true, labelWidth: "5rem" }
        ]
      };
    },
    created: async function() {
      let that_vue = this;
      let res = await that_vue.$ajax.get(global_config.PageManage.GetTree);
      console.log(list_to_tree);
      try {
        if (res.data.code == 0) {
          let a = list_to_tree(res.data.data, "code", "name", "parentId");
          this.menu_tree = a;
        } else {
        }
      } catch (e) {
        console.log(e);
      }
    },
    methods: {
      //点击树中节点的操作
      handleNodeClick: function(params) {
        this.tree_blur = JSON.parse(JSON.stringify(params));
      },
      //编辑表单操作
      handelFormEditClick(e) {
        if (typeof this.tree_blur.code == "undefined") {
          //没有选中节点
          SimpleAlert("没有选中节点", this);
          return;
        }
        //暂存更改前的节点信息
        this.tree_blur_tmp = JSON.parse(JSON.stringify(this.tree_blur));
        //更改表单可读性
        this.form_show_array = [
          { type: "text", id: "id", value: "", label: "画面编号", line: 1, readonly: false, labelWidth: "5rem" },
          { type: "text", id: "name", value: "", label: "画面名称", line: 1, readonly: false, labelWidth: "5rem" },
          { type: "text", id: "url", value: "", label: "画面网址", line: 2, readonly: false, labelWidth: "5rem" },
          { type: "text", id: "icon", value: "", label: "画面图标", line: 2, readonly: false, labelWidth: "5rem" },
          { type: "text", id: "parentId", value: "", label: "画面父节点编号", line: 3, readonly: true },
          { type: "text", id: "parent_name", value: "", label: "画面父节点名称", line: 3, readonly: true },
          { type: "check", id: "hidden", value: "", label: "是否隐藏", line: 3, readonly: true, labelWidth: "5rem" }
        ];
        //更改全局表单编辑情况
        this.form_edit_type = "edit";
        console.log("edit", e);
      },
      //添加平级表单操作
      handelFormAddClick(e) {
        if (typeof this.tree_blur.code == "undefined") {
          //没有选中节点
          SimpleAlert("没有选中节点", this);
          return;
        }
        //暂存更改前的节点信息
        this.tree_blur_tmp = JSON.parse(JSON.stringify(this.tree_blur));
        //更改表单可读性
        this.form_show_array = [
          { type: "text", id: "id", value: "", label: "画面编号", line: 1, readonly: false, labelWidth: "5rem" },
          { type: "text", id: "name", value: "", label: "画面名称", line: 1, readonly: false, labelWidth: "5rem" },
          { type: "text", id: "url", value: "", label: "画面网址", line: 2, readonly: false, labelWidth: "5rem" },
          { type: "text", id: "icon", value: "", label: "画面图标", line: 2, readonly: false, labelWidth: "5rem" },
          { type: "text", id: "parentId", value: "", label: "画面父节点编号", line: 3, readonly: true },
          { type: "text", id: "parent_name", value: "", label: "画面父节点名称", line: 3, readonly: true },
          { type: "check", id: "hidden", value: "", label: "是否隐藏", line: 3, readonly: true, labelWidth: "5rem" }
        ];
        //更改全局表单编辑情况(代码与前者差不多)
        this.form_edit_type = "addsame";
      },
      handleFormDelClick(e) {
        let that_vue = this;
        //弹出确认框
        this.$confirm("此操作将删除节点", "确认删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            that_vue.$options.methods.DoDel(that_vue.tree_blur);
          })
          .catch(() => {});
      },
      handleFormConfirmClick(e) {},
      handleFormCancelClick(e) {
        // 取消当前操作，将tree_blur的tmp数据回传回来
        let that_vue = this;
        this.tree_blur = JSON.parse(JSON.stringify(this.tree_blur_tmp));
        this.form_show_array = [
          { type: "text", id: "id", value: "", label: "画面编号", line: 1, readonly: true, labelWidth: "5rem" },
          { type: "text", id: "name", value: "", label: "画面名称", line: 1, readonly: true, labelWidth: "5rem" },
          { type: "text", id: "url", value: "", label: "画面网址", line: 2, readonly: true, labelWidth: "5rem" },
          { type: "text", id: "icon", value: "", label: "画面图标", line: 2, readonly: true, labelWidth: "5rem" },
          { type: "text", id: "parentId", value: "", label: "画面父节点编号", line: 3, readonly: true },
          { type: "text", id: "parent_name", value: "", label: "画面父节点名称", line: 3, readonly: true },
          { type: "check", id: "hidden", value: "", label: "是否隐藏", line: 3, readonly: true, labelWidth: "5rem" }
        ];
        this.form_edit_type = "none";
      },
      DoDel(item) {
        let that_vue = this;
        //删除节点的具体操作
        this.$ajax({
          url: global_config.PageManage.MenuDel,
          method: "DELETE",
          data: item
        }).then(({ data }) => {
          try {
            if (data.code == 0) {
              SimpleAlert("删除成功", that_vue);
              console.log("删除成功");
            } else {
              SimpleAlert("失败", that_vue);
              // console.log("失败", data.msg);
            }
          } catch (e) {
            console.log("ajax错误", e);
          }
        });
      }
    }
  };
</script>

<style scoped>
.text-md {
  width: 100%;
  text-align: center;
}
.flex-md {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  /* justify-content: center;
  align-items: center; */
}
.flex-item {
  margin: 0 0.25rem;
  flex-grow: 1;
}
.full-height {
  height: 100%;
  margin-bottom: auto;
  margin-top: auto;
}
</style>