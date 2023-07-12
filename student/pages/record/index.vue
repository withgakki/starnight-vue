<template>
  <view>
    <Navbar :hideBtn="true" title="考试记录" bgColor="#fff" h5Show :fixed="false"></Navbar>
    <view v-if="total > 0">
      <u-list>
        <u-list-item v-for="(item, index) in answers" :key="index">
          <view class="paper-card">
            <p>{{ item.paperName }}</p>
            <view class="detail">
              <view>{{ parseSubject(item.subjectId) }}</view>
              <view>{{ parseExamPaperType(item.paperType) }}</view>
              <view>{{ item.createTime }}</view>
              <view>对错：{{ item.questionCorrect }}/{{ item.questionCount }}</view>
              <view v-if="item.status === 2">得分：{{ item.userScore }}/{{ item.paperScore }}</view>
              <view>耗时：{{ item.doTime }}秒</view>
            </view>
            <view class="button-group">
              <u-button v-if="item.status === 1" type="primary" text="等待批改" color="#0ab99c" size="mini" disabled></u-button>
              <u-button v-if="item.status === 2" @click="goReadExamPaper(item.id)" type="primary" text="查看试卷" color="#0ab99c" size="mini"></u-button>
            </view>
          </view>
          <gap height="4"></gap>
        </u-list-item>
      </u-list>
      <u-loadmore :status="status" @loadmore="getExamRecord()" dashed line loading-text="努力加载中, 先写套试卷"
        loadmore-text="下拉加载更多" nomore-text="没有更多记录了" />
    </view>
    <u-empty v-else text="------ 没有更多考试记录 ------" textSize="16" icon="/static/img/data.png">
      <u-button @click="goPaperExamPage()" type="primary" text="点我去写试卷" style="margin-top: 20px;"></u-button>
    </u-empty>
  </view>
</template>

<script>
  import Navbar from '@/components/navbar/Navbar'
  import Gap from '@/components/gap/Gap'
  import {
    listAnswerInfo
  } from '../../api/exam'

  export default {
    components: {
      Navbar,
      Gap,
    },
    data() {
      return {
        answers: [],
        total: 0,
        queryParams: {
          pageNum: 1,
          pageSize: 5,
        },
        status: 'loadmore',
      }
    },
    created() {
      this.getExamRecord()
      this.$store.dispatch('getSubjectList')
    },
    onReachBottom() {
      if (this.answers.length >= this.total) {
        return
      }
      this.status = "loading"
      this.queryParams.pageNum++
      this.getExamRecord()
    },
    methods: {
      getExamRecord() {
        listAnswerInfo(this.queryParams).then(res => {
          this.total = res.total
          this.answers.push.apply(this.answers, res.rows)
          if (this.answers.length >= this.total) {
            this.status = "nomore"
          } else {
            this.status = "loadmore"
          }
          console.log(this.answers)
        })
      },
      goPaperExamPage() {
        uni.switchTab({
          url: '/pages/exam/index'
        })
      },
      goReadExamPaper(answerId) {
        uni.navigateTo({
          url: `/pages/exam/read?id=${answerId}`
        })
      }
    },
  }
</script>

<style lang="scss">

  .paper-card {
    // TODO 样式设计
    width: 95%;
    margin: 0 auto;
    
    p {
      margin: 15px 0 5px 0;
      font-size: 16px;
      font-weight: bold;
    }
    
    .detail {
      display: flex;
      flex-wrap: wrap;
      color: $u-info;
      font-size: 13px;
      view {
        margin: 5px 8px;
      }
    }
    
    .button-group {
      float: right;
      margin: 5px 0 12px 0;
      width: 120rpx;
    }
    
  }

</style>