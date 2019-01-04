<template>
  <div :class="ifhidden" class="menu-wrapper">

    <!-- 如果是叶子节点，则不需要继续扩展 -->
    <template v-if="is_leaf">
      <menu-link :item="this.one_menu_item"></menu-link>
    </template>
    <!-- 如果是根节点，则下面v-for -->
    <el-submenu :index="this.one_menu_item.code" v-else>
      <template slot="title">
        <i :class="this.one_menu_item.icon" />
        <span slot="title" >{{this.one_menu_item.name}}</span>
      </template>

      <template v-for="child in child_one_menu_item">
        <sidebar-item :item="child" :key="child.code" :one_menu_item="child" :total_list="tt_list" />
      </template>
    </el-submenu>

  </div>
</template>

<script>
  import path from "path";
  import { validateURL } from "@/utils/validate";
  import MenuLink from "./MenuLink";
  import "linqjs";
  export default {
    name: "SidebarItem",
    components: { MenuLink },
    props: {
      // one_menu_item
      // one_menu_item格式：{code:"aa",name:"用户信息",icon:"lg-icon-user",url:"/user_info,parentId:"null"}
      one_menu_item: {
        type: Object,
        required: true
      },
      total_list: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        tt_list: this.total_list
      };
    },
    computed: {
      is_leaf() {
        //判断叶子，判断条件是该目录项没有url地址。也有情况是单项文件没有目录结构，所以有可能该项的parentId为null但是为叶子
        //故而判断依据为单一的url
        if (this.one_menu_item.url != null && this.one_menu_item.url != "") {
          return true;
        } else {
          return false;
        }
      },
      child_one_menu_item() {
        if (this.is_leaf) {
          // 如果为叶子则不计算
          return [];
        } else {
          // console.log(this.one_menu_item.code,this.total_list);
          let child = this.total_list.where(x => x.parentId == this.one_menu_item.code);
          // console.log(child);
          let c = [];
          child.forEach(element => {
            c.push(element);
          });
          return c;
        }
      },
      calc_title() {
        // if (!this.$store.getters.SIDEBAR_COLLAPSE) {
        //   return "collapse-title";
        // } else {
        //   return "";
        // }
        return "";
      },
      ifhidden() {
        if (this.one_menu_item.hidden) {
          return "hid";
        } else {
          return "";
        }
      }
    },
    methods: {}
  };
</script>
<style scoped>
.collapse-title {
  /* display: none; */
}
.hid{
   display: none;
}
</style>
