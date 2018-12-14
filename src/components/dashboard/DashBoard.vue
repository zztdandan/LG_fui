<template>
  <div class="dash-board-wide">
    <div class="dash-board-panel">
      <div class="dash-board-title">
        <slot name="title" class="dash-title "></slot>
      </div>
      <div class="dash-board-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dash-board"
  };
</script>

<style scoped>
.dash-board-wide {
  padding: 0.5rem;
  
}
.dash-board-panel {
  border: solid 0px #e6a23c;
  box-shadow: 0 0.1rem 0.5rem 0 rgba(10, 9, 7, 0.3);
  border-radius: 0.5rem;
  
}
.dash-board-title {
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid #ebeef5;
}
.dash-board-content {
  padding: 0.3rem 0.5rem;
}
.dash-title {
  padding: 0.3rem 0.5rem;
  font-size: 1.2rem;
}
</style>
<style>
.title-icon {
  font-size: 1.3rem;
}
</style>
