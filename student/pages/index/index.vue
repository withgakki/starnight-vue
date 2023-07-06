<template>
  <view>
    <Navbar :hideBtn="true" title="首页" bgColor="#fff" :h5Show="false" :fixed="false"></Navbar>
    <u-swiper :list="swiperList" previousMargin="30" nextMargin="30" circular radius="5" bgColor="#ffffff"
      height=170></u-swiper>
      
    <gap height="15"></gap>

    <!-- 任务中心 -->
    <u--text prefixIcon="hourglass-half-fill" iconStyle="font-size: 25px" text="任务中心" class="collapse-title"
      color="#3c9cff" :iconStyle="{'color': '#3c9cff', 'font-size': '25px', 'padding-right': '15rpx'}"></u--text>
    <u-collapse>
      <u-collapse-item v-for="item in taskList" :key="item.id" :title="item.title">
        <u-row v-for="(paperItem, index) in item.paperItems" :key="index" justify="space-between" class="paper-content">
          <u-col span="8">{{ paperItem.examPaperName }}</u-col>
          <u-col v-if="paperItem.status === null" span="4" class="right-box">
            <u-tag text="未完成" plain size="mini" type="error"></u-tag>
            <u-link href="" text="进入考试" fontSize="12"></u-link>
          </u-col>
          <u-col v-else-if="paperItem.status === 1" span="4" class="right-box">
            <u-tag text="待批阅" plain size="mini" type="warning"></u-tag>
            <u-link href="" text="查看答卷" fontSize="12"></u-link>
          </u-col>
          <u-col v-else-if="paperItem.status === 2" span="4" class="right-box">
            <u-tag text="已完成" plain size="mini" type="success"></u-tag>
            <u-link href="" text="查看答卷" fontSize="12"></u-link>
          </u-col>
        </u-row>
      </u-collapse-item>
    </u-collapse>

    <gap height="15"></gap>

    <!-- 试卷中心 -->
    <u--text prefixIcon="order" iconStyle="font-size: 25px" text="试卷中心" class="collapse-title" color="#3c9cff"
      :iconStyle="{'color': '#3c9cff', 'font-size': '25px', 'padding-right': '15rpx'}"></u--text>
    <uni-card v-for="item in examList.timeLimitPaper" class="paper-card">
      <h3>{{ item.name }}</h3>
      <u--text type="info" :text="'学科：' + item.subjectId"></u--text>
      <u--text type="info" :text="'题目数：' + item.questionCount"></u--text>
      <u--text type="info" :text="'试卷总分：' + item.score"></u--text>
      <u--text type="info" :text="'考试时长：' + item.suggestTime"></u--text>
      <u--text type="info" :text="'开始时间：' + item.limitStartTime"></u--text>
      <u--text type="info" :text="'结束时间：' + item.limitEndTime"></u--text>
      <u-link href="" text="开始答题"></u-link>
    </uni-card>
    <uni-card v-for="item in examList.fixedPaper" class="paper-card">
      <h3>{{ item.name }}</h3>
      <u--text type="info" :text="'学科：' + item.subjectId"></u--text>
      <u--text type="info" :text="'题目数：' + item.questionCount"></u--text>
      <u--text type="info" :text="'试卷总分：' + item.score"></u--text>
      <u--text type="info" :text="'考试时长：' + item.suggestTime"></u--text>
      <u-link href="" text="开始答题"></u-link>
    </uni-card>

  </view>
</template>

<script>
  import Navbar from '@/components/navbar/Navbar'
  import Gap from '@/components/gap/Gap'
  import {
    getTaskListIndex
  } from '../../api/task'
  import {
    getExamListIndex
  } from '../../api/exam'

  export default {
    components: {
      Navbar,
      Gap,
    },
    data() {
      return {
        // 轮播图数据
        swiperList: [
          'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        ],
        taskList: [],
        examList: [],
      }
    },
    created() {
      this.getTaskList()
    },
    methods: {
      getTaskList() {
        getTaskListIndex().then(res => {
          console.log("task", res.data)
          this.taskList = res.data
        })
        getExamListIndex().then(res => {
          console.log("exam", res.data)
          this.examList = res.data
        })
      }
    },
  }
</script>

<style lang="scss">
  .collapse-title {
    padding: 15rpx;
  }

  .paper-content {
    margin-bottom: 8px;
  }

  .right-box {
    height: 23px;
    display: flex;
    flex-direction: row;

    /deep/ .u-link {
      justify-content: center;
      justify-items: center;
    }

    /deep/ span {
      line-height: 23px;
    }
  }
  
  .paper-card {
    h3 {
      margin-bottom: 6px;
    }
    /deep/ .u-link {
      float: right;
      margin: 10px 0;
    }
  }
</style>