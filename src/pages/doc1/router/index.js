import Vue from "vue";
import Router from "vue-router";
import intro1 from "../docVue/intro1";
import intro2 from "../docVue/intro2";
import intro3 from "../docVue/intro3";
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Router);
const Aroute = new Router({
  routes: [
    { path: "/intro1", name: "intro1", component: intro1 },
    { path: "/intro2", name: "intro2", component: intro2 },
    { path: "/intro3", name: "intro3", component: intro3 }
  ]
});
export default Aroute;
