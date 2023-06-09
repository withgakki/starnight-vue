<template>
  <el-select v-model="value" placeholder="年级">
      <el-option label="一年级" :value="1"></el-option>
      <el-option label="二年级" :value="2"></el-option>
      <el-option label="三年级" :value="3"></el-option>
      <el-option label="四年级" :value="4"></el-option>
      <el-option label="五年级" :value="5"></el-option>
      <el-option label="六年级" :value="6"></el-option>
      <el-option label="初一" :value="7"></el-option>
      <el-option label="初二" :value="8"></el-option>
      <el-option label="初三" :value="9"></el-option>
      <el-option label="高一" :value="10"></el-option>
      <el-option label="高二" :value="11"></el-option>
      <el-option label="高三" :value="12"></el-option>
    </el-select>
</template>

<script>
export default {
  name: "LevelSelector",
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
      this.$emit("update:data", val);
    }
  }
};
</script>
