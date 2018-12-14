<template>
  <div class="">
    <div class="row">
      <div class="col-md-12">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <lg-simple-table :init_data="dataList" :init_column="formdablecolumn" @select_row="handleSelect"></lg-simple-table>
      </div>
    </div>
  </div>
</template>

<script>
  import LgSimpleTable from "@/components/LgSimpleTable/LgSimpleTable.vue";
  export default {
    name: "user-deformable-table",
    props: {
      Collapse: {
        type: Boolean,
        default: false
      },
      dataList: {
        type: Array,
        default: []
      }

    },
    data: function() {
      return {
        selectUser: {}
      };
    },
    computed: {
      hasselected() {
        try {
          if (this.selectUser.name) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      },

      formdablecolumn() {
        //如果展现细节，用户部分只显示用户名和厂牌号
        //如果不显示细节，多显示单位名，手机号，邮箱
        let column = new Array();
        column.push(...[{ prop: "userId", label: "厂牌号" }, { prop: "name", label: "用户名" }]);
        if (this.Collapse) {
          return column;
        } else {
          column.push(
            ...[
              { prop: "mobile", label: "手机号" },
              { prop: "deptId", label: "单位名称" },
              { prop: "email", label: "邮箱" }
            ]
          );
          return column;
        }
      }
    },
    methods: {
      handleSelect(rowdata) {
        console.log("跳转成功");
        this.selectUser = rowdata;
        this.$emit("select_data_cb", rowdata);
      }
    },

    components: {
      LgSimpleTable
    }
  };
</script>

<style scoped>
.button {
  margin: 0.2rem;
}
</style>