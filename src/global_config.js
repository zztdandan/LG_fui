// 网站初始化全局设置

module.exports = {
  // 登陆权限相关配置
  Auth: {
    LoginPostUrl: "/api/sys/login",
    UserTokenName: "accesstoken",
    MainPageUrl: "/#/",
    LoginUrl: "/login.html#/"
  },
  // api，异步相关配置
  Axios: {
    // 默认api取开发config里面的proxytable的api
    Base_API: "http://172.16.4.194:8080/app/mock/17"
  },
  Tab: {
    DefaultTab: { order: 0, id: "main_index", url: "/#/main", title: "main" }
  },
  UserManage: {
    PostList: "/api/post_user_list",
    UserDel: "/api/user/del",
    UserUpdate: "/api/user/update",
    UserAdd: "/api/user/add"
  },
  PageManage: {
    GetTree: "/api/get_menu",
    MenuDel: "/api/user/del"
  }
  // 9528
  // local:9528/api/
};
