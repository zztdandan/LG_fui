import Vue from "vue";
import App from './doc2.vue';

import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/assets/css/bs_col.css";

// import store from "./store";
// 引入router
import router from "./router";
// 引入修改过的实例作为axios使用
import lg_axios from "@/utils/axios_rebase";
// 引入传统的axios
import axios from "axios";
Vue.prototype.$lg_ajax = lg_axios;
Vue.prototype.$ajax = axios;

// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, { locale });
// 引入lg-vue-ui
import LgUI from "lg-vue-ui"; // 引入组件库
import "lg-vue-ui/lib/theme/index.css"; // 引入样式库

Vue.use(LgUI);
import "github-markdown-css";
import "github-markdown-css";
import "#static/lg-icon/style.css";
Vue.prototype.$ajax = axios;

var Main_App = new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
