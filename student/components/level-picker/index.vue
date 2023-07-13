<template>
  <u-picker :show="show" :columns="columns" @confirm="confirm" @cancel="close" keyName="label"
    :defaultIndex="[value - 1]"></u-picker>
</template>
<script>
  import {
    levelEnum
  } from '@/utils/starnight.js'
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Number,
        default: 1,
      }
    },
    computed: {
      columns() {
        let columns = [
          []
        ]
        for (let item of levelEnum) {
          columns[0].push({
            label: item.value,
            value: item.key
          })
        }
        return columns
      }
    },
    methods: {
      confirm(event) {
        this.$emit("update:value", event.value[0].value)
        this.$emit("update:show", false)
      },
      close() {
        this.$emit("update:show", false)
      }
    }
  };
</script>
<style lang="scss" scoped>

</style>