<template>
<router-view></router-view>
</template>

<script>
  // import MdRender from "@/components/MdRender/MdRender";
  export default {
    name: "main-app",
    components: {
      // MdRender
    },
    data: function() {
      return {
        aaa: 1,
        text1:""
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
