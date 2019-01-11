<template>
<router-view></router-view>
</template>

<script>
  export default {
    name: "main-info",
    data: function() {
      return {

      };
    },
    created:async function(){

    },
    mounted: function() {

    },
    methods: {
      CloseHandle() {
        let params = { name: "test" };
        window.parent.postMessage(
          { type: "simple", req_name: "closeIframe", req_param: params },
          "*"
        );
      }
    }
  };
</script>
<style>
.markdown-body img{
   max-width: 80% !important;
   min-width:  50%;
   margin-left: auto;
   margin-right: auto;
}
</style>
