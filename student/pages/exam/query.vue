<template>
  <view>
    <Navbar title="试卷搜索" bgColor="#fff" :h5Show="true" :fixed="false"></Navbar>
    <u-sticky style="top: 0;" bg-color="#FFFFFF">
      <view class="search-box">
        <u-search v-model="queryParams.keyword" @search="searchInfo" @custom="searchInfo" placeholder="请输入试卷名" maxlength="20"
          clearabled focus></u-search>
      </view>
    </u-sticky>
    <u-list height="100%">
      <u-list-item v-for="(item, index) in examInfo" :key="index">
        <view @click="goExamDoPage(item.id)" class="item-card">
          <view class="base-info">
            <h5 v-html="item.name"></h5>
            <u-tag :text="`${item.suggestTime}分钟`" plain size="mini"></u-tag>
          </view>
          <view>学科：{{ parseSubject(item.subjectId) }}</view>
          <view>题目数量：{{ item.questionCount }} 道</view>
          <view>试卷总分：{{ item.score }} 分</view>
          <view v-if="item.paperType === 4"> <!-- 时段试卷 -->
            时间段：{{ item.limitStartTime }} - {{ item.limitEndTime }}
          </view>
        </view>
        <gap height="4"></gap>
      </u-list-item>
    </u-list>
    <u-loadmore :status="status" @loadmore="getNextInfo()" dashed line loading-text="努力加载中" loadmore-text="下拉加载更多"
      nomore-text="没有更多试卷了" />
  </view>
</template>

<script>
  import Navbar from '@/components/navbar/Navbar'
  import Gap from '@/components/gap/Gap'
  import {
    searchExamInfo
  } from '../../api/exam'

  export default {
    components: {
      Navbar,
      Gap,
    },
    data() {
      return {
        status: 'loadmore',
        queryParams: {
          keyword: "",
          pageNum: 1,
          pageSize: 10,
        },
        examInfo: [],
        total: 0,
      }
    },
    created() {
      this.getInfo()
      this.$store.dispatch('getSubjectList')
    },
    onReachBottom() {
      this.getNextInfo()
    },
    methods: {
      getInfo() {
        searchExamInfo(this.queryParams).then(res => {
          const data = res.data
          this.total = data.total
          this.examInfo.push.apply(this.examInfo, data.rows)
          if (this.examInfo.length >= this.total) {
            this.status = "nomore"
          } else {
            this.status = "loadmore"
          }
        })
      },
      searchInfo() {
        this.queryParams.pageNum = 1
        searchExamInfo(this.queryParams).then(res => {
          const data = res.data
          this.total = data.total
          this.examInfo = data.rows
          if (this.examInfo.length >= this.total) {
            this.status = "nomore"
          } else {
            this.status = "loadmore"
          }
        })
      },
      getNextInfo() {
        if (this.examInfo.length >= this.total) {
          return
        }
        this.status = "loading"
        this.queryParams.pageNum++
        this.getInfo()
      },
      goExamDoPage(id) {
        uni.navigateTo({
          url: `/pages/exam/do?id=${id}`
        })
      },
    }
  }
</script>

<style lang="scss">
  .search-box {
    margin: 0 40rpx;
  }

  .item-card {
    margin: 15px 3%;

    .base-info {
      display: flex;
      justify-content: space-between
    }

    h5 {
      font-size: 15px;
      color: $u-main-color;
    }

    >view {
      margin: 5px 0;
      font-size: 14px;
      color: $u-info;
    }
  }
</style>