import Vue from "vue";

// 主页面vue
import App from "./test.vue";
import axios from "@/utils/axios_rebase";
import "github-markdown-css";
Vue.prototype.$ajax = axios;

var Main_App = new Vue({
  el: "#app",
  render: h => h(App)
});
