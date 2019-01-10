<template>
  <div>
    <!-- <h3>url:{{page_url}}</h3> -->

    <iframe :id="inner_page_id" :src="url_add_token" frameborder="0" :height="iframe_height" class="frame-temp"></iframe>

    <!-- <div v-html="html_content"></div> -->
  </div>
</template>

<script>
  import global_config from "@/global_config";
  export default {
    name: "frame-temp",
    props: {
      url: {
        type: String,
        default: ""
      },
      page_id: {
        type: String,
        default: ""
      }
    },
    data: function() {
      let page_url_temp = "";
      if (this.url != "") {
        page_url_temp = this.url;
      } else {
        page_url_temp = this.$store.getters.ACTIVED_PAGE.url;
      }

      return {
        page: this.$store.getters.ACTIVED_PAGE,
        page_url: page_url_temp,
        iframe_height: "100%",
        inner_page_id: "iframe_" + this.page_id
        // html_content: ""
      };
    },
    computed: {
      url_add_token() {
        let url = this.page_url;
        let token = this.$store.getters.USER_TOKEN;
        let tmp_url = "";
        if (url.indexOf("?") >= 0) {
          tmp_url = `${url}&${global_config.Auth.UserTokenName}=${token}`;
        } else {
          tmp_url = `${url}?${global_config.Auth.UserTokenName}=${token}`;
        }
        return tmp_url;
      }
    },
    methods: {
      //针对token，将在该控件加载时改写url，使url后面带一个token，值为store中的token值
    },
    watch: {},
    mounted: function() {
      let that_vue = this;

      // let xhr = new XMLHttpRequest();
      // xhr.onreadystatechange = function() {
      //   if (xhr.readystate == 4 && xhr.status == 200) {
      //     that_vue.html_content = xhr.responseText;
      //   }
      // };
      // xhr.open("GET", that_vue.url, true);
      // xhr.send();
    }
  };
</script>

<style scoped>
.frame-temp {
  width: 100%;
  min-height: calc(100vh - 5.4rem);
  /* height:-webkit-fill-available; */
}
</style>