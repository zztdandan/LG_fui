
<template>
  <!-- eslint-disable vue/require-component-is-->
  <el-menu-item :class="ifhidden" :index="this.item.code" @click="leaf_click" style="border:0px;">
    <span :class="this.item.icon"></span>
    <span slot="title">{{this.item.name}}</span>
  </el-menu-item>
</template>

<script>
  // import { validateURL } from "@/utils/validate";

  export default {
    name: "menu-link",
    props: {
      // item格式：{code:"aa",name:"用户信息",icon:"lg-icon-user",url:"/home_menu/user_info,parentId:"null"}
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      leaf_click: function() {
        // console.log("按钮", this.item);
        this.$store.dispatch("open_page", this.item);
        // this.$router.push({
        //   name: "home_menu",
        //   params: { page_id: this.item.code }
        // });
      }
    },
    computed: {
      ifhidden() {
        if (this.item.hidden) {
          return "hid";
        } else {
          return "";
        }
      }
    }
  };
</script>
<style scoped>
.hid {
  display: none;
}
</style>

