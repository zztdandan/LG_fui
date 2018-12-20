
<script>
  import marked from "marked";
  import highlight from "highlight.js";
  import "@/assets/css/hljs/atom-one-light.css";
  export default {
    name: "md-render",

    props: {
      renderString: {
        type: String,
        default: ""
      }
    },
    render: function(createElement) {
      let md_text = this.renderString;

      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: true,
        highlight: function(code) {
          return highlight.highlightAuto(code).value;
        }
      });

      let a = marked(md_text);
      //一个特殊处理，让<br>命令能正确地显示出来
      a = a.replace(/&lt;br&gt;/g, "<br>");
      // console.log(a);
      return createElement("div", [
        createElement("div", {
          domProps: {
            innerHTML: a
          }
        })
      ]);
    },
    mounted: function() {
      let that_vue = this;
      window.onresize = function() {
        // // console.log("高度改变");
        // let hgt = window.document.body.scrollHeight + 17;
        // //下面这里不用预先设置好的thatvue而用this则无法获得信息
        // let ifr_name = that_vue.$route.name;
        // let params = { iframe_name: ifr_name, iframe_height: hgt };
        // window.parent.postMessage(
        //   { type: "simple", req_name: "setIframeHeight", req_param: params },
        //   "*"
        // );
      };
    },
    updated: function() {
      // console.log("内容升级");
      // let hgt = window.document.body.scrollHeight + 17;
      // // console.log("获得token信息", window.parent.document.body);
      // let ifr_name = this.$route.name;
      // let params = { iframe_name: ifr_name, iframe_height: hgt };
      // window.parent.postMessage(
      //   { type: "simple", req_name: "setIframeHeight", req_param: params },
      //   "*"
      // );
    }
  };
</script>

<style scoped>
</style>