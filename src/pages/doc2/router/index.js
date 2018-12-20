import Vue from "vue";
import Router from "vue-router";
import install from "../docVue/install";
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Router);
const Aroute = new Router({
  routes: [
    { path: "/install", name: "install", component: install }
  ]
});
export default Aroute;
