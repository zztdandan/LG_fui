<template>
  <!-- tab管理模块 ，打开、关闭tab等功能，完全依赖于tabs store，不能独立使用（可后期改造为传值型）-->
  <div>

    <div v-for="one_tab in tab_list" :key="one_tab.id" class="inline-tab" @click="handleClick(one_tab)">
      <el-tag closable :type="tab_color(one_tab.id)" :disable-transitions="false" @close="handleClose(one_tab)">{{one_tab.title}}</el-tag>
    </div>

  </div>

</template>

<script>
  //  { order: 0, id: "main_index", url: "/#/home_menu/main", title: "main" }
  export default {
    name: "tab-tool",
    data: function() {
      return {};
    },
    computed: {
      tab_list() {
        return this.$store.getters.TABS;
      },
      actived_tab() {
        return this.$store.getters.ACTIVED_PAGE;
      }
      // tab_class_obj() {
      //   let active_class_id = this.$store.getters.ACTIVED_PAGE.id;
      //   let c = {};
      //   for (const ele of this.tab_list) {
      //     if (ele.id == active_class_id) {
      //       c[ele.id] = "active-tab";
      //     } else {
      //       c[ele.id] = "normal-tab";
      //     }
      //   }
      //   return c;
      // }
    },
    methods: {
      handleClose(one_tab) {
        this.$store.dispatch("close_page", one_tab.id).then(({ active_tab, tab_list }) => {
          // 有一种情况是tab_list变成0了，即关闭了所有页面，这个情况下需要pushrouter到/#/
          // 如果没有，可以push一次到active那块，以防万一
        });
      },
      handleClick(one_tab) {
        this.$store.dispatch("toggle_page", one_tab.id);
        // this.$router.push({ name: "home_menu", params: { page_id: one_tab.id } });
      },
      tab_color(tab_id) {
        let active_class_id = this.$store.getters.ACTIVED_PAGE.id;
        if (tab_id === active_class_id) {
          return "";
        } else {
          return "info";
        }
      }
    }
  };
</script>

<style  scoped>
</style>
<style lang="scss" scoped>
.inline-tab {
  display: inline-block;
  cursor: pointer;
  padding: 3px;
}
</style>

