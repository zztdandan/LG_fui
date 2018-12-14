<template>

    <el-form-item :label="this.Info.label" :label-width="labelWidth">
        <el-switch v-model="input_value" active-color="#13ce66" inactive-color="#ff4949" :disabled="this.Info.readonly">
        </el-switch>
    </el-form-item>
</template>

<script>
    export default {
      name: "check-input",
      props: {
        Info: {
          type: Object,
          default: {},
          required: true
        },
        value: {
          type: Boolean,
          default: true
        }
      },

      data: function() {
        // console.log("组件渲染开始 ");

        return {
          input_value: this.value,
          labelWidth: "5rem"
        };
      },
      watch: {
        //手动实现与Props的同步
        input_value: function(newval, oldval) {
          // console.log("检测到内部input_value的改动");
          this.$emit("update:value", newval);
        },
        value: function(newval, oldval) {
          // console.log("检测到输入数据的改动");
          this.input_value = newval;
        }
      },
      created: function() {
        let that_labelWidth = "";
        if (this.Info.labelWidth) {
          this.labelWidth = this.Info.labelWidth;
        } else {
          this.labelWidth = "8rem";
        }
      }
    };
</script>

<style scoped>
</style>