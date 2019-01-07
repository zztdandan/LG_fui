<template>
    <div class="flex-row">
        <div class="flex-md">
            <img src="/static/img/lg-vue.png" style="height:256px" />
            <h1 style="color:2c3e50;margin-top:1rem;font-size:2.5rem">柳钢后端框架Swallow</h1>
        </div>
        <div class="flex-md">
            <img src="/static/img/lg-vue.png" style="height:256px" />
            <h1 style="color:2c3e50;margin-top:1rem;font-size:2.5rem">柳钢前端框架</h1>
        </div>
    </div>
</template>

<script>
    export default {
      name: "welcome-page"
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