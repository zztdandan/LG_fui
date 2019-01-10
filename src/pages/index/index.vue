<template>
  <div>
    <!-- <button-demo></button-demo> -->
    <lg-layout></lg-layout>
  </div>
</template>

<script>
  import LgLayout from "@/views/layout/layout.vue";
  import { getToken, setToken, removeToken } from "@/utils/auth";
  import { Router, http, cli } from "director";
  import global_config from "@/global_config";
  import { check_token } from "./utils/check_token";
  import { check_route_sign } from "./utils/check_route";
  import doPostMessage from "./utils/doPostMessage";

  export default {
    name: "main-app",
    data: () => {
      return {
        login_url: "/login.html"
      };
    },
    // 在此处做登陆处理
    created: function() {
      let that_vue = this;
      // console.log("1");
      try {
        //  做两个登陆处理：
        //  1、check一下token信息，看是否符合登陆要求。如果符合，则将登陆信息塞进来，如果不符合，则弹到登陆页面
        //  2、check route信息，如果route中有params，则先检查这个page是否有权限访问，如果有，切换activetab，如果没有，则弹到登陆页面

        //注册一个router初始事件
        check_route_sign(that_vue);

        //check一下token
        check_token(that_vue);

        //注册postMessage事件
        window.addEventListener("message", function(rs) {
          // console.log("父窗口",rs);
          try {
            let rsdata = rs.data;
            if (typeof rsdata.type != "undefined") {
              doPostMessage(rsdata, that_vue).then(res => {
                if (res) {
                  console.log("回执命令", res);

                  rs.source.postMessage(res, rs.origin);
                }
              });
            }
          } catch (e) {}
          // 单独引入一个函数，进行rs.data的处理
        });
      } catch (e) {
        // 如果读取登陆token失败，那么登陆失败，返回登录页面
        console.log("登陆初始化错误", e);
      }
    },
    components: {
      "lg-layout": LgLayout
    }
  };
</script>


