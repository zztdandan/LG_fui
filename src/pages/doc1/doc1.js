import Vue from "vue";

// 主页面vue
import App from "./doc1.vue";
import axios from "@/utils/axios_rebase";
import router from "./router";
import "github-markdown-css";
import "#static/lg-icon/style.css";
Vue.prototype.$ajax = axios;

var Main_App = new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
