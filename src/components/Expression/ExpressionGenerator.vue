<template>
    <div>

    </div>
</template>

<script>
    // 表达式生成控件
    export default {
      data: function() {
        return {
          // 控件生成时初始化的公式
          initData: [{
              type:"multi",
              converge:"and",
              child:[{
                  type:"simple",
                  item:"id",
                  symbol:"＝"
              }]
          }],
          //控件生成的公式
          expression: "",
          // 控件生成的表达式数组
          expressArray:[]
        };
      }
    };
</script>

<style scoped>
</style>