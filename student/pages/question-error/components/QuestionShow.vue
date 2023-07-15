<template>
  <view>
    <view class="title">
      <view class="content" v-html="question.title"></view>
      <view>（{{ question.score }}分）</view>
    </view>
    <view v-if="qType === 1" class="select-input">
      <radio-group>
        <label v-for="item in question.items" :key="item.prefix" :name="item.prefix">
          <radio :checked="question.correct === item.prefix" style="transform:scale(0.7)"></radio>
          <view class="content">
            <view class="prefix">{{ item.prefix }}</view>
            <view v-html="item.content"></view>
          </view>
        </label>
      </radio-group>
    </view>
    <view v-if="qType === 2" class="select-input">
      <checkbox-group>
        <label v-for="item in question.items" :key="item.prefix" :name="item.prefix">
          <checkbox :checked="question.correct.includes(item.prefix)" color="#3C9CFF" style="transform:scale(0.7)">
          </checkbox>
          <view class="content">
            <view class="prefix">{{ item.prefix }}</view>
            <view v-html="item.content"></view>
          </view>
        </label>
      </checkbox-group>
    </view>
    <view v-if="qType === 3" class="select-input">
      <radio-group>
        <label v-for="item in question.items" :key="item.prefix" :name="item.prefix">
          <radio :checked="question.correct === item.prefix" style="transform:scale(0.7)"></radio>
          <view class="content">
            <view v-html="item.content"></view>
          </view>
        </label>
      </radio-group>
    </view>
    <view v-if="qType === 4" class="text-input">
      <u-form-item v-for="item in question.items" :key="item.prefix" :label="item.prefix" labelWidth="20px">
        <u--input v-model="question.correctArray[item.prefix - 1]" border="surround" spellcheck="false"></u--input>
      </u-form-item>
    </view>
    <view v-if="qType === 5" class="text-input">
      <u--textarea v-model="question.correct" height="120" :maxlength="500" spellcheck="false" :confirmType="null"></u--textarea>
    </view>
    <view class="info-card">
      <view>
        <span class="label">学科：</span>
        {{ subjectName }}
      </view>
      <view>
        <span class="label">难度：</span>
        <u-rate :value="question.difficult" count="5" activeColor="#F7BA2A" readonly></u-rate>
      </view>
      <view>
        <span class="label">解析： </span>
        {{ question.analyze }}
      </view>
      <view>
        <span class="label">错误次数：</span>
        {{ errorCount }}次
      </view>
    </view>
  </view>
</template>

<script>
  import Gap from '@/components/gap/Gap'

  export default {
    name: 'QuestionShow',
    components: {
      Gap,
    },
    props: {
      qType: {
        type: Number,
        default: 0,
      },
      question: {
        type: Object,
        default: () => {},
      },
      errorCount: {
        type: Number,
        default: 1,
      },
      subjectName: {
        type: String,
        default: '未知',
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  .title {
    width: 90vw;
    display: flex;
    justify-content: flex-start;

    .label:after {
      content: '、';
      margin-right: 3px;
    }

    .content {
      width: 80%;
    }

  }

  .text-input {
    width: 75vw;
    margin-top: 5px;

    /deep/ .u-form-item__body {
      padding: 5px 0;
    }

    /deep/ .u-input {
      padding: 3px 9px !important;
    }

    /deep/ .u-textarea {
      padding: 3px 9px !important;
    }

  }

  .select-input {
    margin-top: 5px;
    width: 75vw;

    .uni-label-pointer {
      display: flex;
      margin: 10px 0;
    }

    .content {
      line-height: 23px;
      display: flex;

      .prefix:after {
        content: '.';
        margin-right: 5px;
      }
    }

  }

  .info-card {
    
    margin-top: 10px;
    
    .label {
      margin-right: 5px;
      font-size: 16px;
      color: $u-info-dark;
    }

    > view {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 3px 10px;
      line-height: 20px;
    }

    .array-gap {
      margin: 0 10px;
    }

  }
</style>