<template>
  <view>
    <Navbar title="错题本" bgColor="#fff" :h5Show="true" :fixed="false"></Navbar>
    <view v-if="total > 0">
      <u--form>
        <u-list style="height: 100%;">
          <u-list-item v-for="(item, index) in questionInfo" :key="index" class="list-item">
            <question-show :q-type="item.questionType" :question="item.question" :error-count="item.errorCount"
              :subject-name="item.subjectName"></question-show>
          </u-list-item>
        </u-list>
      </u--form>
      <u-loadmore :status="status" @loadmore="getNextInfo()" dashed line loading-text="努力加载中" loadmore-text="下拉加载更多"
        nomore-text="没有更多记录了" />
    </view>
    <u-empty v-else text="------ 没有更多错题记录 ------" textSize="16" icon="/static/img/data.png">
      <u-button @click="goPaperExamPage()" type="primary" text="点我去写试卷" style="margin-top: 20px;"></u-button>
    </u-empty>
  </view>
</template>

<script>
  import Navbar from '@/components/navbar/Navbar'
  import QuestionShow from './components/QuestionShow'
  import {
    listQuestionError
  } from '../../api/question'

  export default {
    components: {
      QuestionShow,
      Navbar,
    },
    data() {
      return {
        status: 'loadmore',
        queryParams: {
          pageNum: 1,
          pageSize: 10,
        },
        questionInfo: [],
        total: 0,
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
        listQuestionError(this.queryParams).then(res => {
          this.total = res.total
          this.questionInfo.push.apply(this.questionInfo, res.rows)
          if (this.questionInfo.length >= this.total) {
            this.status = "nomore"
          } else {
            this.status = "loadmore"
          }
          console.log(this.total)
          console.log(this.questionInfo)
        })
      },
      getNextInfo() {
        if (this.questionInfo.length >= this.total) {
          return
        }
        this.status = "loading"
        this.queryParams.pageNum++
        this.getInfo()
      },
      goPaperExamPage() {
        uni.switchTab({
          url: '/pages/exam/index'
        })
      },
    },
  }
</script>

<style lang="scss">
  .list-item {
    padding: 20px 5%;
    border-bottom: 5px #f4f4f5 solid;
  }
</style>