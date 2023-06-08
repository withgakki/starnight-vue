<template>
  <el-select v-model="value" placeholder="学科">
    <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>

export default {
  name: "SubjectSelector",
  props: {
    data: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      value: this.data,
      list: []
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
  },
  created() {
    this.$store.dispatch('subject/getSubjectList').then((data) => {
      this.list = data
    })
  }
};
</script>
