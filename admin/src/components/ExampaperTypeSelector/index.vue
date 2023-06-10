<template>
  <el-select v-model="value" placeholder="试卷类型">
      <el-option label="固定试卷" :value="1"></el-option>
      <el-option label="限时试卷" :value="4"></el-option>
      <el-option label="任务试卷" :value="6"></el-option>
      <!-- <el-option label="视频试卷" :value=""></el-option> -->
    </el-select>
</template>

<script>
export default {
  name: "ExampaperTypeSelector",
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
