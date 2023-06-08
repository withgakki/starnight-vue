<template>
  <el-select v-model="value" placeholder="题型">
      <el-option label="单选题" :value="1"></el-option>
      <el-option label="多选题" :value="2"></el-option>
      <el-option label="判断题" :value="3"></el-option>
      <el-option label="填空题" :value="4"></el-option>
      <el-option label="简答题" :value="5"></el-option>
    </el-select>
</template>

<script>
export default {
  name: "QuestionTypeSelector",
  props: {
    data: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      value: this.data
    };
  },
  watch: {
    data(val) {
      this.value = val;
    },
    value(val) {
      console.log(val);
      this.$emit("update:data", val);
    }
  }
};
</script>
