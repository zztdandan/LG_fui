
<template>
  <!-- 这是存储iframe页面的控件 -->
  <section class="app-main">
    <!-- <transition-group name="fade-transform" mode="out-in"> -->
    <!-- or name="fade" -->
    <!-- <router-view :key="key"></router-view> -->
    <div v-for="one_page in tab_list" v-bind:key="one_page.id">

      <!-- 对于没有对应控件的router的地址，使用frame方式，对于有确切控件的router地址，使用router方式 -->
      <div v-if="is_frame(one_page.url)">
        <frame-temp class="mh" :url="one_page.url" :page_id="one_page.id" :class="is_active_class(one_page.id)"></frame-temp>
      </div>

      <!-- <vhtml-panel :url.sync="one_page.url" :class="is_active_class(one_page.id)"></vhtml-panel> -->
    
    </div>
  <keep-alive>
        <router-view></router-view>
      </keep-alive>

    <!-- </transition-group> -->
  </section>
</template>

<script>
  import "linqjs";
  import FrameTemp from "components/FrameTemp";
  // import VhtmlPanel from "components/VHtmlPanel";
  export default {
    name: "AppMain",
    computed: {
      active_tab() {
        return this.$store.getters.ACTIVED_PAGE;
      },
      tab_list() {
        return this.$store.getters.TABS;
      }
    },
    data: function() {
      return {
        // active_tab: this.$store.getters.ACTIVED_PAGE
      };
    },
    watch: {
      active_tab(newval, oldval) {
        //———————————————————————————————————————————————————————————————
        // //这里是使用vue-router实现的tab管理
        // console.log("watch active", newval);
        // let a_id = newval.id;
        // if (typeof a_id !== "string") {
        //   this.$router.push({ path: "/" });
        // } else {
        //   this.$router.push({ name: "home_menu", params: { page_id: a_id } });
        // }
        //——————————————————————————————————————————————————————————————
        // 这里是使用visible实现的tab管理
        // console.log("watch active", newval);
        let a_id = newval.id;
        if (typeof a_id !== "string") {
          this.$router.push({ path: "/" });
        } else {
          if (this.$options.methods.is_frame(newval.url)) {
            this.$router.push({ name: "home_menu", params: { page_id: a_id } });
          } else {
            this.$router.push({ path: newval.url });
          }
        }
        //上面是使用伪切换
      }
    },
    components: {
      FrameTemp
      // VhtmlPanel
    },
    methods: {
      is_active_class(one_page_id) {
        let active_id = this.active_tab.id;
        if (one_page_id === active_id) {
          return "active_page";
        } else {
          return "inactive_page";
        }
      },
      frame_ref(page_id) {
        return "frame_" + page_id;
      },
      is_frame(url) {
        // console.log("ifram_check");
        if (url.indexOf("http") >= 0) {
         
          return true;
        }
        if (url.indexOf("html") >= 0) {
        
          return true;
        }
        
        return false;
      }
    }
  };
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* min-height: 100%; */
  position: relative;
  overflow: hidden;
}
.active_page {
  display: block;
  height: fit-content;
}
.inactive_page {
  display: none;
}
.mh{
  min-height:calc(100vh - 5.4rem);
}
</style>
