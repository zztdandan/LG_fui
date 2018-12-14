<template>
  <!-- 创造表单的基控件，输入array后返回一个表单 -->
  <el-form :id="this.FormId" label-width="5rem" enctype="multipart/form-data">
    <div v-for="one_line of lineArray" :key="one_line.key" class="flex-row">
      <div v-for="one_item of one_line.item" class="flex-item" :key="one_item.id">
        <!-- <div>{{one_item.label}}</div>         -->
        <div :is="calc_input(one_item.type)" :value.sync="formData[one_item.id]" :Info="one_item"></div>
      </div>
    </div>
    <slot name="add-on"></slot>
  </el-form>
</template>

<script>
  // line 类输入格式
  //  { type: "visi", id: "case_id", value: "",label:"标题",readonly:false,line:1}
  //
  // 支持的type:picture-modal,text,submit,visi,number
  import TextInput from "@/components/BuildForm/comp/TextInput";
  import CheckInput from "@/components/BuildForm/comp/CheckInput";
  export default {
    name: "build-form",
    props: {
      //所有form的表单列表
      FormArray: { type: Array, default: [] },
      //表单的唯一id标识
      FormId: { type: String, default: "SubForm" },
      SyncData: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    data: function() {
      return {
        formData: {}
      };
    },
    created: function() {
      // console.log("初始化created");
      // 初始化一次formData的数据,获得按照FormArray插入的原始数据。
      // 注意，如果SyncData和formData同时有同一项的数字的话，以syncData的数字为初始化的标准
      for (let one_item of this.FormArray) {
        // console.log("one_item=",one_item);
        // console.log(this.SyncData[one_item.id]);
        if (typeof this.SyncData[one_item.id] != "undefined") {
          this.formData[one_item.id] = this.SyncData[one_item.id];
        } else if (typeof one_item.value != "undefined") {
          this.formData[one_item.id] = one_item.value;
        } else {
          this.formData[one_item.id] = "";
        }
      }
    },

    computed: {
      //将传入的数据按列归类
      lineArray: function() {
        let c = new Array();
        //先遍历一次输入的formArray，如果这个array存在line就插入c，如果不存在就默认为line1
        for (var one_item of this.FormArray) {
          // console.log("one_item", one_item);
          const tyof = typeof one_item.line;
          if (tyof == "undefined") {
            one_item.line = 1;
          }
          c.push(one_item);
        }
        //将c按列数归类
        let d = c.groupBy(x => x.line);
        //用特殊的格式格式化d，每列多个key，列中的表单值在item里面
        // console.log("linearray制作d",d);
        let e = d.select(x => {
          // console.log("x=", x[0]);
          return { key: x[0].line, item: x };
        });
        return e;
      }
    },
    mounted: function() {},
    methods: {
      calc_input(type) {
        return type + "-input";
      }
    },
    components: {
      TextInput,
      CheckInput
    },
    watch: {
      SyncData: {
        deep: true,
        handler: function(newval, oldval) {
          // console.log("检测到数据改变SyncData");
          this.formData = newval;
          // this.emit("update:SyncData",newval);
        }
      },
      formData: {
        immediate: true,
        handler: function(n, o) {
          this.$emit("update:SyncData", n);
          console.log("检测到formData的改动");
        },
        deep: true
      }
    }
  };
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  padding: 0 0.25rem;
}
.flex-item {
  margin: 0 0.25rem;
  flex-grow: 1;
}
.no-visi {
  display: none;
}
.is-visi {
  display: block;
}
</style>