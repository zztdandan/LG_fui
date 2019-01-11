<template>
    <div>

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                  <lg-md-render class="markdown-body" :renderString="text1"></lg-md-render>
                    <hr/>
                </div>
                <div class="col-md-12">
                    <div @click="goHome" class="fl">
                        <font color="#41b883">
                            <i class="lgui-arrow-left"></i>&nbsp;回到首页</font>
                    </div>
                    <!-- <div @click="nextPage" class="fr">
                        <font color="#41b883">下一节&nbsp;
                            <i class="lgui-arrow-right"></i>
                        </font>
                    </div> -->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import "@/assets/css/bs_col.css";
    // import MdRender from "@/components/MdRender/MdRender";
    export default {
      name: "intro5",
      components: {
        // MdRender
      },
      data: function() {
        return {
          text1: ""
        };
      },
      created: async function() {
        var res = await this.$ajax.get("/static/doc/intro5/intro5.md");
        // console.log(res);
        this.text1 = res.data;
      },
      methods: {
        goHome() {
          let params = { code: "homepage" };
          window.parent.postMessage(
            { type: "simple", req_name: "openNewPage", req_param: params },
            "*"
          );
        },
        nextPage() {
          let params = { code: "homepage" };
          window.parent.postMessage(
            { type: "simple", req_name: "openNewPage", req_param: params },
            "*"
          );
        }
      },
      mounted: function() {}
    };
</script>

<style scoped>
</style>
