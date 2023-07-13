<template>
  <view>
    <Navbar :hideBtn="true" title="试卷中心" bgColor="#fff" :h5Show="false" :fixed="false"></Navbar>
    <u-sticky style="top: 0;" bg-color="#FFFFFF">
      <u-tabs :list="tabsList" @change="changeTypeHandle" :scrollable="false" lineWidth="100"
        :activeStyle="{color: '#303133',fontWeight: 'bold',transform: 'scale(1.05)'}"
        :inactiveStyle="{color: '#606266',transform: 'scale(1)'}"></u-tabs>
    </u-sticky>
    <u-list height="100%">
      <u-list-item v-for="(item, index) in examInfo" :key="index">
        <view @click="goExamDoPage(item.id)" class="item-card">
          <view class="base-info">
            <h5>{{ item.name }}</h5>
            <u-tag :text="`${item.suggestTime}分钟`" plain size="mini"></u-tag>
          </view>
          <view>学科：{{ parseSubject(item.subjectId) }}</view>
          <view>题目数量：{{ item.questionCount }} 道</view>
          <view>试卷总分：{{ item.score }} 分</view>
          <view v-if="item.paperType === 4">  <!-- 时段试卷 -->
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
    listExamInfo
  } from '../../api/exam'

  export default {
    components: {
      Navbar,
      Gap,
    },
    data() {
      return {
        tabsList: [{
            name: '固定试卷',
            code: 1,
          },
          {
            name: '时段试卷',
            code: 4,
          },
          {
            name: '班级试卷',
            code: -1,
            disabled: true,
          },
        ],
        status: 'loadmore',
        queryParams: {
          paperType: 1,
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
        listExamInfo(this.queryParams).then(res => {
          this.total = res.total
          this.examInfo.push.apply(this.examInfo, res.rows)
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
      changeTypeHandle(event) {
        this.queryParams.paperType = event.code
        this.queryParams.pageNum = 1
        this.examInfo = []
        this.getInfo()
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 100,
        })
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
    
    > view {
      margin: 5px 0;
      font-size: 14px;
      color: $u-info;
    }
  }

</style>