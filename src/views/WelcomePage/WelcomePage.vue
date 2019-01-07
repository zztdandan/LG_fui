<template>
  <div class="flex-row">
    <div class="flex-md">
      <img :src="b" style="height:256px" />
      <h1 style="color:2c3e50;margin-top:1rem;font-size:2.5rem">柳钢后端框架Swallow</h1>
      <a @click="handleSwallow" style="margin-top:0.5rem" class=" button button-action button-pill">快速开始</a>
    </div>
    <div class="flex-md">
      <img :src="a" style="height:256px" />
      <h1 style="color:2c3e50;margin-top:1rem;font-size:2.5rem">柳钢前端框架</h1>
      <a @click="handleLgvue" style="margin-top:0.5rem" class=" button button-primary button-pill">快速开始</a>
    </div>
  </div>
</template>

<script>
  import ac from "#static/img/lg-vue.png";
  import bc from "#static/img/swallow.png";
  export default {
    name: "welcome-page",
    data: function() {
      return {
        a: ac,
        b: bc
      };
    },
    methods: {
      handleSwallow() {
         this.$store.dispatch("open_page",{code:"intro1"});
      },
      handleLgvue() {
         this.$store.dispatch("open_page", {code:"intro4"});
      }
    }
  };
</script>

<style scoped>
.flex-md {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5% auto;
}
.flex-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1% auto;
}
</style>