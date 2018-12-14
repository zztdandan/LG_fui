import Vue from "vue";
import Router from "vue-router";
import FrameTemp from "@/components/FrameTemp";
import BlankPage from "@/components/BlankPage";
import UserInfo from "@/views/UserInfo/UserInfo";
import UserManage from "@/views/UserManage/UserManage";
import AuthManage from "@/views/AuthManage/AuthManage";
import RoleManage from "@/views/RoleManage/RoleManage";
import PageManage from "@/views/PageManage/PageManage";
import WelcomePage from "@/views/WelcomePage/WelcomePage";
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Router);
const Aroute = new Router({
  routes: [
    {
      path: "/home_menu/:page_id",
      name: "home_menu",
      component: BlankPage,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: "/",
      name: "blank_page",
      component: WelcomePage
    },
    {
      path: "/user_info",
      name: "user_info",
      component: UserInfo
    },
    {
      path: "/user_manage",
      name: "user_manage",
      component: UserManage
    },
    {
      path: "/auth_manage",
      name: "auth_manage",
      component: AuthManage
    },
    {
      path: "/role_manage",
      name: "role_manage",
      component: RoleManage
    },
    {
      path: "/page_manage",
      name: "page_manage",
      component: PageManage
    },
    {
      path: "/welcome_page",
      name: "welcome_page",
      component: WelcomePage
    }
  ]
});
export default Aroute;
