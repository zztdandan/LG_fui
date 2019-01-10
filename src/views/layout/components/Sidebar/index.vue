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
  import rotator from "@/components/LgCoreComponent/rotator/rotator";
  import SidebarItem from "./SidebarItem";
  import linqjs from "linqjs";
  export default {
    components: { SidebarItem, rotator },
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
    methods: {
      toggleSideBar() {
        this.$store.commit("TOGGLE_SIDEBAR");
      }
    }
  };
</script>
<style scoped>
</style>
<style>
</style>
