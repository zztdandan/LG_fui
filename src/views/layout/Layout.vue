<template>
  <!-- 总体布局使用element自带的布局 -->
  <div>
    <el-container>
      <el-aside :width="fit_collapse">
        <!-- 侧边栏 -->
        <sidebar></sidebar>
      </el-aside>
      <el-container>
        <!-- navbar，将toggle取消，放在别的位置 -->
        <div class="el-header">
          <!-- <div class="el-header"> -->

          <!-- tab管理层，用vuex进行管理 -->
          <tab-tool class="tab-tool-fl"></tab-tool>
          <user-tab class="user-tab-fl"></user-tab>
          <!-- </div> -->
        </div>

        <el-main>
          <!-- 主要页面iframe内容 -->
          <app-main class="app-main-calc"></app-main>
        </el-main>
        <el-footer>
          <!-- 页脚 -->

          <lg-footer></lg-footer>

        </el-footer>
      </el-container>
    </el-container>
  </div>
  <!-- <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div> -->
</template>

<script>
  import { Navbar, Sidebar, AppMain, LgFooter, TabTool, UserTab } from "./components";
  import "./css/index.css";
  export default {
    name: "lg-layout",
    components: {
      Navbar,
      Sidebar,
      AppMain,
      LgFooter,
      TabTool,
      UserTab
    },

    methods: {
      // handleClickOutside() {
      //   this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
      // }
    },
    computed: {
      fit_collapse() {
        if (!this.$store.getters.SIDEBAR_COLLAPSE) {
          return "4rem";
        } else {
          return "12rem";
        }
      }
    }
  };
</script>

<style  scoped>
</style>
