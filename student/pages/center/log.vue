<template>
  <view>
    <Navbar title="操作日志" bgColor="#fff" :h5Show="true" :fixed="false"></Navbar>
    <view class="log-step">
      <u-list v-if="logList.length > 0">
        <u-list-item v-for="(item, index) in logList" :key="index">
          <u-cell :title="item.content" :value="item.createTime"></u-cell>
        </u-list-item>
        <u-list-item class="tail">
          <u-loadmore status="loadmore" loadmoreText="——— 仅显示当前账户最近10条操作记录 ———" />
        </u-list-item>
      </u-list>
      <u-empty v-else></u-empty>
    </view>
  </view>
</template>

<script>
  import Navbar from '@/components/navbar/Navbar'
  import * as LogApi from '@/api/center/log'

  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        logList: []
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        LogApi.listOperLog().then(res => {
          this.logList = res.data
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .log-step {
    margin-top: 20px;
    
    /deep/ .u-cell__body__content {
      span {
        font-size: 18px;
      }
    }
    
    /deep/ .u-cell__value {
      span {
        line-height: 13px;
        font-size: 13px;
        color: $u-info;
      }
    }
    
    .tail {
      margin-top: 20px;
    }
    
  }
</style>