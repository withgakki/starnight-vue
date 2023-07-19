<template>
  <view>
    <Navbar title="个人消息" bgColor="#fff" :h5Show="true" :fixed="false"></Navbar>
    <view v-if="total > 0">
      <u--form>
        <u-list style="height: 100%;">
          <u-list-item v-for="(item, index) in messageInfo" :key="index" class="list-item">
            <view class="title">
              <view class="main">{{ item.title }}</view>
              <view class="user">{{ item.sendUserName }}</view>
            </view>
            <view class="content">{{ item.content }}</view>
            <view class="createTime">{{ item.createTime }}</view>
          </u-list-item>
        </u-list>
      </u--form>
      <u-loadmore :status="status" @loadmore="getNextInfo()" dashed line loading-text="努力加载中" loadmore-text="下拉加载更多"
        nomore-text="没有更多记录了" />
    </view>
    <u-empty v-else text="------ 没有更多消息记录 ------" textSize="16" icon="/static/img/data.png"></u-empty>

  </view>
</template>

<script>
  import Navbar from '@/components/navbar/Navbar'
  import {
    listMessage,
    readOneMessage
  } from '@/api/message/index'

  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        queryParams: {
          pageNum: 1,
          pageSize: 10,
        },
        messageInfo: [],
        total: 0,
        analyzeOpen: false,
        analyzeContent: null,
      }
    },
    created() {
      this.getInfo()
    },
    onReachBottom() {
      this.getNextInfo()
    },
    methods: {
      getInfo() {
        listMessage(this.queryParams).then(res => {
          this.total = res.total
          this.messageInfo.push.apply(this.messageInfo, res.rows)
          if (this.messageInfo.length >= this.total) {
            this.status = "nomore"
          } else {
            this.status = "loadmore"
          }
          this.readMessage(res.rows)
          console.log(this.messageInfo)
        })
      },
      getNextInfo() {
        if (this.messageInfo.length >= this.total) {
          return
        }
        this.status = "loading"
        this.queryParams.pageNum++
        this.getInfo()
      },
      readMessage(rows) {
        for (let row of rows) {
          if (!row.readed) {
            readOneMessage(row.id)
          }
        }
      },
    },
  }
</script>

<style lang="scss">
  .list-item {
    padding: 20px 5%;
    border-bottom: 5px #f4f4f5 solid;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 5px;
      border-bottom: 1px #f4f4f5 solid;

      .main {
        font-size: 40rpx;
      }

      .user {
        font-size: 30rpx;
        text-align: center;
      }

    }

    .content {
      color: #606266;
      margin: 10px 0;
    }

    .createTime {
      font-size: 25rpx;
      color: #909399;
    }

  }
</style>