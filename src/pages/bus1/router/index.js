import Vue from "vue";
import Router from "vue-router";
import BusView1 from "@/views/BusView1/BusView1";
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Router);
const Aroute = new Router({
  routes: [
    {
      path: "/busview1",
      name: "busview1",
      component: BusView1,
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
});
export default Aroute;
