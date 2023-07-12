<template>
  <view>
    <Navbar :hideBtn="true" title="考试记录" bgColor="#fff" h5Show :fixed="false"></Navbar>
    <view v-if="total > 0">
      <u-list>
        <u-list-item v-for="(item, index) in answers" :key="index">
          <view class="paper-card">
            <h5>{{ item.paperName }}</h5>
            <view>
              <view>{{ parseSubject(item.subjectId) }}</view>
              <view>{{ parseExamPaperType(item.paperType) }}</view>
              <view>{{ item.createTime }}</view>
              <view>对错：{{ item.questionCorrect }}/{{ item.questionCount }}</view>
              <view v-if="item.status === 2">得分：{{ item.userScore }}/{{ item.paperScore }}</view>
              <view>耗时：{{ item.doTime }}秒</view>
            </view>
            <gap height="3"></gap>
          </view>
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
          pageIndex: 1,
          pageSize: 10,
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
      this.queryParams.pageIndex++
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
      }
    },
  }
</script>

<style lang="scss">

  .paper-card {
    // TODO 样式设计
  }

</style>