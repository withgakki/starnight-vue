<template>
  <el-select v-model="value" placeholder="性别">
      <el-option label="男" :value="1"></el-option>
      <el-option label="女" :value="2"></el-option>
    </el-select>
</template>

<script>
export default {
  name: "SexSelector",
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
