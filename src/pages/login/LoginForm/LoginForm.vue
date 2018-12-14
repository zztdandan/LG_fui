<template>
  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
    <h3 class="title">
      <slot name="login_title"></slot>
    </h3>
    <el-form-item prop="username">
      <div class="svg-container">
        <span class="lgui-user"></span>
      </div>
      <el-input v-model="loginForm.username" name="username" type="text" placeholder="username" />
    </el-form-item>
    <el-form-item prop="password">
      <div class="svg-container">
        <span class="lgui-pwd"></span>
      </div>
      <el-input type="password" v-model="loginForm.password" name="password" placeholder="密码" @keyup.enter.native="handleLogin" />
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
        登陆
      </el-button>
    </el-form-item>
    <div class="tips">
      <span style="margin-right:20px;">username: admin</span>
      <span> password: admin</span>
    </div>
  </el-form>
</template>

<script>
  import { isvalidUsername } from "@/utils/validate";
  import "#static/lg-icon/style.css";
  export default {
    name: "Login",
    props: {
      //配置的验证名称
      login_post_api: {
        type: String,
        default: "/api/login_post"
      }
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        callback();
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error("密码不能小于5位"));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: "admin",
          password: "admin"
        },
        loginRules: {
          username: [
            { required: true, trigger: "blur", validator: validateUsername }
          ],
          password: [{ required: true, trigger: "blur", validator: validatePass }]
        },
        loading: false,
        pwdType: "password",
        redirect: undefined
      };
    },
    watch: {},
    methods: {
      showPwd() {
        if (this.pwdType === "password") {
          this.pwdType = "";
        } else {
          this.pwdType = "password";
        }
      },
      handleLogin() {
        async function LoginPost(user, pwd, that) {
          let formdata = new FormData();
          formdata.append("username", user);
          formdata.append("password", pwd);
          let res = await that.$ajax({
            method: "post",
            url: that.login_post_api,
            data: formdata
          });
          console.log(res,"ajax回收");
          return res;
        }
        let that_vue = this;
        // 页面进入load模式，无法操作
        this.loading = true;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            LoginPost(
              that_vue.loginForm.username,
              that_vue.loginForm.password,
              that_vue
            )
              .then(res => {
                console.log("res判断");
                if (res.data.code === 0) {
                  that_vue.loading = false;
                  that_vue.$emit("login_cb", res.data);
                } else {
                  that_vue.loading = false;
                }
              })
              .catch(res => {
                that_vue.loading = false;
                alert("登陆失败");
              });
          } else {
            alert("登陆信息不合法");
            return false;
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" >
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  .login-form {
    display: block;
    /* left: 0; */
    /* right: 0; */
    width: 520px;
    max-width: 100%;
    /* padding: 35px 35px 15px 35px; */
    margin: 10% auto;
    position: relative;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
