<template>

  <!-- 实现sidebar各项设置 -->
  <div :class="navbar_class" class="side-navbar">
     <div class="title-container">
     柳钢框架
    </div>
    <el-menu :show-timeout="100" :default-active="actived_page" :collapse-transition="true" :collapse="isCollapse" mode="vertical" background-color="#4f7080" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item v-for="menu_item in root_menu" :key="menu_item.code" :one_menu_item="menu_item" :total_list="page_menu" />
    </el-menu>
  </div>
</template>

<script>
 import rotator from "@/components/rotator/rotator";
  import SidebarItem from "./SidebarItem";
  import linqjs from "linqjs";
  export default {
    components: { SidebarItem,rotator },
    data: function() {
      return {};
    },
    computed: {
      actived_page() {
        let page = this.$store.getters.ACTIVED_PAGE;
        return page.id;
      },
      root_menu() {
        // 返回所有parentId为nulld的目录
        let a = this.$store.getters.USER_MENU;

        return a.where(x => x.parentId == null);
      },
      isCollapse() {
        return !this.$store.getters.SIDEBAR_COLLAPSE;
      },
      navbar_class() {
        return this.isCollapse ? "collapse-nav" : "nocollapse-nav";
      },
      page_menu() {
        return this.$store.getters.USER_MENU;
      }
    },
    methods:{
      toggleSideBar() {
        this.$store.commit("TOGGLE_SIDEBAR");
      }
    }
  };
</script>
<style scoped>
.side-navbar {
  height: 100%;
  background-color: #4f7080;
  /* border-right: solid 1px #e6e6e6; */
  padding: -1px;
  overflow: hidden;
}
.collapse-nav {
  /* width: fit-content; */
  overflow: hidden;
}
.nocollapse-nav {
  /* width: fit-content; */
  overflow: hidden;
}
</style>
<style>
.el-menu {
  border-right: solid 0px #e6e6e6;
}
.title-container {
  color: #bfcbd9;
  /* width: 100%; */
  text-align: center;
  display: block;
  padding: 0.5rem;
  font-size: 1.5rem;
}
.el-menu--collapse>.menu-wrapper>.el-submenu>.el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
}
</style>
