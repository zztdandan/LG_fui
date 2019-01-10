<template>
  <div>
    <!-- <button-demo></button-demo> -->
    <router-view></router-view>
  </div>
</template>

<script>
  import global_config from "@/global_config";

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
    },
    components: {}
  };
</script>


