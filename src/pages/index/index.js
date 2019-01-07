import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

// import "@/styles/index.scss"; // global css

// bs的分栏系统
import "@/assets/css/bs_col.css";
// 主页面vue
import App from "./index.vue";

// index的专用store，就是主要的store
import store from "./store";

// import "@/assets/lg-icon/style.css"
// import "@/assets/moon-icon/style.css"
// import "@/icons"; // icon
// import "@/permission"; // permission control

// 引入router
import router from "./router";
// 引入修改过的实例作为axios使用
import axios from "@/utils/axios_rebase";
Vue.prototype.$ajax = axios;
// import LgVueUi from "lg-vue-ui";
// import "lg-vue-ui/lib/theme/index.css";
// Vue.use(LgVueUi);

// Vue.use(MainStore);
Vue.use(ElementUI, { locale });


Vue.config.productionTip = false;

var Main_App = new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
