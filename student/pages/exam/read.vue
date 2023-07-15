<template>
  <view>
    <Navbar title="试卷答题" bgColor="#fff" :h5Show="true" :fixed="false"></Navbar>
    <u-sticky>
      <view class="sticky-box">
        最终得分：{{ answerInfo.score }}/{{ examInfo.score }}分
      </view>
    </u-sticky>
    <view class="paper-info-box">
      <view>{{ examInfo.name }}</view>
      <view class="info">
        <view>试卷耗时：{{ answerInfo.doTime }}秒</view>
      </view>
    </view>
    <u--form :model="examInfo" ref="uForm" class="paper-center">
      <u-row v-for="(item, index) in examInfo.titleItems" :key="index">
        <u-col>
          <h3>{{ (index + 1).toLocaleString('zh-hans-CN-u-nu-hanidec',{useGrouping:false}) }}. {{ item.name }}</h3>
          <u-form-item v-for="qItem in item.questionItems" :key="qItem.itemOrder" class="question-item">
            <question-answer-show :qType="qItem.questionType" :question="qItem"
              :answer="answerInfo.answerItems[qItem.itemOrder - 1]"></question-answer-show>
          </u-form-item>
        </u-col>
      </u-row>
    </u--form>
  </view>
</template>

<script>
  import QuestionAnswerShow from './components/QuestionAnswerShow'
  import Navbar from '@/components/navbar/Navbar'
  import Gap from '@/components/gap/Gap'
  import {
    getAnswerInfo
  } from '../../api/exam'

  export default {
    components: {
      Navbar,
      Gap,
      QuestionAnswerShow,
    },
    data() {
      return {
        examInfo: {},
        answerInfo: {},
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
        getAnswerInfo(id).then(res => {
          const data = res.data
          this.examInfo = data.paper
          this.answerInfo = data.answer
        })
      },
    }
  }
</script>

<style lang="scss">
  .sticky-box {
    display: flex;
    justify-content: center;
    justify-items: center;
    padding: 8px 0;
    background-color: $u-primary;
    font-size: 17px;
    color: #FFFFFF
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