<template>


    <el-form-item label="搜索">
      <el-row :gutter="5">
      <el-col :span="16">
        <el-input v-model="searchText" :placeholder="default_holder">
          <i class="lgui-cross" @click="handleClose" />
        </el-input>
      </el-col>
      <el-col :span="8" >
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-col>
      </el-row>
    </el-form-item>



</template>

<script>
  export default {
    name: "simple-search-bar",
    props: {
      default_holder: {
        type: String,
        default: "请输入搜索值"
      },
      default_width: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        searchText: ""
      };
    },
    methods: {
      onSubmit() {
        // console.log("submit!");
        this.$emit("search_cb", this.searchText);
      },
      handleClose() {
        this.searchText = "";
        this.$emit("close_cb");
      }
    }
  };
</script>

<style scoped>
</style>