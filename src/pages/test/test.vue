<template>

  <div style="height:2000px">
    MPA页面。 该页面高度为2000，尝试调用setheight函数
    <button @click="CloseHandle">关闭tab按钮测试</button>

  </div>

</template>

<script>
  export default {
    name: "main-app",
    components: {},
    data: function() {
      return {
        aaa: 1,
        text1: ""
      };
    },
    created: async function() {
      // var res=await this.$ajax("/static/doc/test1.md");
      // this.text1 = res.data;
    },
    mounted: function() {
      // console.log("开始设置高度");
      let hgt = window.document.body.scrollHeight + 17;
      // console.log("获得token信息", window.parent.document.body);
      let params = { token: "aaxxff23c", iframe_height: hgt };
      window.addEventListener("message", function(rs) {
        // console.log(rs);
        try {
          console.log("test回调", rs);
        } catch (e) {}
        // 单独引入一个函数，进行rs.data的处理
      });
      window.parent.postMessage(
        { type: "simple", req_name: "getMenu", req_param: params, salt: "aassfff" },
        "*"
      );
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
