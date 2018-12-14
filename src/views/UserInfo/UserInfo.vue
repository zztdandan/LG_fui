<template>
    <div class="user-info-flex">
        <h2>用户信息页面</h2>
        <img :src="avatar" class="user-info-avatar">
        <p>{{name}}</p>
    </div>
   
</template>

<script>

    export default {
      name: "user-info",
      data: function() {
        let info = this.$store.getters.USER_INFO;
        return {
          user_info: info,
          name: info.user_name,
          avatar: info.user_avatar
        };
      }
     
    };
</script>

<style scoped>
.user-info-flex{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.user-info-avatar{
    display: block;
    height: 150px;
}
</style>