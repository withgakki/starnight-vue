<template>
  <el-select v-model="value" placeholder="学科">
    <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import { listSubjectByLevel } from "@/api/subject";

export default {
  name: "SubjectSelector",
  props: {
    data: {
      default: null,
      type: Number
    },
    level: {
      default: null,
      type: Number
    },
    initAll: {
      default: false,
      type: Boolean
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
    },
    level(val) {
      this.getList();
    }
  },
  created() {
    if (this.initAll) {
      this.getList();
    }
  },
  methods: {
    getList() {
      listSubjectByLevel(this.level).then(res => {
        this.list = res.data;
      })
    }
  }
};
</script>
