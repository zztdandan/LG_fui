<template>
  <!-- 这是显示user信息的右上角模块 -->

  <div class="user-tab">
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="user-tab-cover">
          <span class="user-tab-avatar">
           
            <img class="user-info-img" :src="avatar_url" />
           
          </span>
          <span> {{user_name}}</span>
          <span class="user-tab-avatar user-tab-da">
         
            <span class="moon-icon lgui-down-arrow"></span>
          </span>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户名:{{user_name}}</el-dropdown-item>
        <el-dropdown-item divided>
          <router-link to="/user_info">用户信息</router-link></el-dropdown-item>
        <el-dropdown-item>登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
  export default {
    name: "user-tab",
    data: function() {
      return {};
    },
    computed: {
      avatar_url() {
        return this.$store.getters.USER_INFO.user_avatar;
      },
      user_name() {
        return this.$store.getters.USER_INFO.user_name;
      }
    }
  };
</script>

<style scoped>
.user-tab-cover {
  float: left;
  position: relative;
  height: 100%;
  display: flex;
  /* align-content: center; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.user-tab-avatar {
  display: block;
  height: 2.2rem;
}
.user-info-img {
  display: block;
  height: 2.2rem;
  width: 2.2rem;
}
.user-tab-da {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.1em;
  color: #304156ad;
}
</style>