<template>
  <view>
    <Navbar title="试卷答题" bgColor="#fff" :h5Show="true" :fixed="false"></Navbar>
    <u-sticky>
      <view class="timer-box">
        <u-count-down :time="examInfo.suggestTime * 60 * 1000" @finish="submitPaper()" @change="Timerhandle"
          format="HH:mm:ss" ref="countDown"></u-count-down>
      </view>
    </u-sticky>
    <view class="paper-info-box">
      <view>{{ examInfo.name }}</view>
      <view class="info">
        <view>试卷总分：{{ examInfo.score }}</view>
        <view>考试时间：{{ examInfo.suggestTime }} 分钟</view>
      </view>
    </view>
    <u--form :model="examInfo" ref="uForm" class="paper-center">
      <u-row v-for="(item, index) in examInfo.titleItems" :key="index">
        <u-col>
          <h3>{{ (index + 1).toLocaleString('zh-hans-CN-u-nu-hanidec',{useGrouping:false}) }}. {{ item.name }}</h3>
          <u-form-item v-for="qItem in item.questionItems" :key="qItem.itemOrder" class="question-item">
            <question-edit :qType="qItem.questionType" :question="qItem"
              :answer="answerInfo.answerItems[qItem.itemOrder - 1]"></question-edit>
          </u-form-item>
        </u-col>
      </u-row>
    </u--form>
    <view class="submit-button">
      <u-button @click="submitPaper()" text="提交试卷" type="success"></u-button>
    </view>
    <u-modal :show="scoreShow" @confirm="goRecordPage()" title="试卷完成">
      <view style="text-align: center;">{{ scoreShowContent }}</view>
    </u-modal>
  </view>
</template>

<script>
  import QuestionEdit from './components/QuestionEdit'
  import Navbar from '@/components/navbar/Navbar'
  import Gap from '@/components/gap/Gap'
  import {
    getExamInfo,
    submitAnswer
  } from '../../api/exam'

  export default {
    components: {
      Navbar,
      Gap,
      QuestionEdit,
    },
    data() {
      return {
        examInfo: {},
        answerInfo: {
          id: null,
          doTime: 0,
          answerItems: [],
        },
        timer: {},
        scoreShow: false,
        scoreShowContent: "",
      }
    },
    onLoad(options) {
      const paperId = options.id
      if (paperId === null || paperId === undefined) {
        uni.switchTab({
          url: '/pages/index/index',
        })
        return
      }
      this.getInfo(paperId)
    },
    methods: {
      getInfo(id) {
        getExamInfo(id).then(res => {
          this.examInfo = res.data
          this.initAnswer()
        })
      },
      initAnswer() {
        this.answerInfo.id = this.examInfo.id
        const titleItemArray = this.examInfo.titleItems
        for (let tIndex in titleItemArray) {
          const questionArray = titleItemArray[tIndex].questionItems
          for (let qIndex in questionArray) {
            const question = questionArray[qIndex]
            this.answerInfo.answerItems.push({
              questionId: question.id,
              content: null,
              contentImage: null,
              contentArray: [],
              completed: false,
              itemOrder: question.itemOrder
            })
          }
        }
      },
      submitPaper() {
        // 试卷提交
        this.scoreShow = true
        this.$refs.countDown.pause();
        const doTime = this.examInfo.suggestTime * 60 - (this.timer.hours * 60 * 60 + this.timer.minutes * 60 + this
          .timer.seconds)
        this.answerInfo.doTime = doTime
        uni.showLoading({title: '判卷中...'})
        submitAnswer(this.answerInfo).then(res => {
          uni.hideLoading()
          if (res.code === 200) {
            const score = res.msg
            if (this.examInfo.paperType === 6) {  // 任务试卷
              this.scoreShowContent = "试卷已提交，请等待老师批改"
            } else {
              this.scoreShowContent = `试卷得分： ${score} 分`
            }
            this.scoreShow = true
          }
        })
      },
      goRecordPage() {
        uni.switchTab({
          url: '/pages/record/index',
        })
      },
      Timerhandle(timer) {
        this.timer = timer
      }
    }
  }
</script>

<style lang="scss">
  .timer-box {
    display: flex;
    justify-content: center;
    justify-items: center;
    padding: 8px 0;
    background-color: $u-primary;

    /deep/ span {
      font-size: 17px;
      color: #FFFFFF
    }
  }

  .paper-info-box {
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-bottom: 1px $u-border-color solid;

    .info {
      margin: 10px 0;
      display: flex;
      justify-content: space-around
    }
  }

  .question-item {
    padding: 10px;
  }

  .paper-center {
    width: 95%;
    margin: 0 auto;
  }

  .submit-button {
    border-top: 2px $u-border-color solid;
    padding: 10px;
  }
</style>