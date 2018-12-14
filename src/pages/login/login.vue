<template>
  <div class="login-container">
    <login-form :login_post_api="login_api" @login_cb="Login_SetToken_return">
      <template slot="login_title">柳钢系统测试</template>
    </login-form>
  </div>
</template>

<script>
  import LoginForm from "./LoginForm/LoginForm.vue";
  import { getToken, setToken, removeToken } from "@/utils/auth";
  import global_config from '@/global_config.js';
  export default {
    name: "LoginPage",
    data: function() {
      return {
        login_api:global_config.Auth.LoginPostUrl,
        return_url: "/#/"
      };
    },
    methods: {
      //这里写一个login-form传过来的后续处理函数，主要用于处理token，转到正式页面等问题
      Login_SetToken_return: function(res) {
        let that_vue = this;
        try {
          console.log(res);
          setToken(res.data.token);
          location.href = that_vue.return_url;
        } catch(e) {
          alert("登陆信息错误");
        }
      }
    },
    components: {
      "login-form": LoginForm
    }
  };
</script>

<style scoped>
.login-container {
  background-color: #2d3a4b;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  position: absolute;
}
</style>
