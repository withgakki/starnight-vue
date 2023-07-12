<template>
  <view>
    <view class="title">
      <view class="label">{{ question.itemOrder }}</view>
      <view class="content" v-html="question.title"></view>
      <view>（{{ question.score }}分）</view>
    </view>
    <view v-if="qType === 1" class="select-input">
      <radio-group>
        <label v-for="item in question.items" :key="item.prefix" :name="item.prefix">
          <radio :checked="answer.content === item.prefix" style="transform:scale(0.7)"></radio>
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
          <checkbox :checked="answer.content.includes(item.prefix)" color="#3C9CFF" style="transform:scale(0.7)">
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
          <radio :checked="answer.content === item.prefix" style="transform:scale(0.7)"></radio>
          <view class="content">
            <view v-html="item.content"></view>
          </view>
        </label>
      </radio-group>
    </view>
    <view v-if="qType === 4" class="text-input">
      <u-form-item v-for="item in question.items" :key="item.prefix" :label="item.prefix" labelWidth="20px">
        <u--input v-model="answer.contentArray[item.prefix - 1]" border="surround" spellcheck="false"></u--input>
      </u-form-item>
    </view>
    <view v-if="qType === 5" class="text-input">
      <u--textarea v-model="answer.content" height="120" :maxlength="500" spellcheck="false"></u--textarea>
    </view>
    <view class="info-card">
      <view>
        <span class="label">标答：</span>
        <span v-if="qType == 1 || qType == 2 || qType == 5" v-html="question.correct"></span>
        <span v-if="qType == 3" v-html="trueFalseFormatter(question)"></span>
        <span v-if="qType == 4" v-for="(correct, index) in question.correctArray" :key="index">
          <view v-html="correct" class="array-gap"></view>
        </span>
      </view>
      <view>
        <span class="label">结果：</span>
        <u-tag v-if="answer.doRight" text="正确" type="success" size="mini"></u-tag>
        <u-tag v-else text="错误" type="error" size="mini"></u-tag>
      </view>
      <view>
        <span class="label">得分：</span>
        {{ answer.score }}分
      </view>
      <view>
        <span class="label">难度：</span>
        <u-rate :value="question.difficult" count="5" activeColor="#F7BA2A" readonly></u-rate>
      </view>
      <view>
        <span class="label">解析： </span>
        {{ question.analyze }}
      </view>
    </view>
  </view>
</template>

<script>
  import Gap from '@/components/gap/Gap'

  export default {
    name: 'QuestionEdit',
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
      answer: {
        type: Object,
        default: () => {
          return {
            id: null,
            content: '',
            contentArray: [],
            completed: false,
          }
        }
      },
    },
    methods: {
      trueFalseFormatter(question) {
        return question.items.filter(d => d.prefix === question.correct)[0].content
      },
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
      width: 70%;
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