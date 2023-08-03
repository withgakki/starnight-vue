<template>
  <view>
    <view class="title">
      <view class="label">{{ question.itemOrder }}</view>
      <view class="content" v-html="question.title"></view>
      <view>（{{ question.score }}分）</view>
    </view>
    <view v-if="qType === 1" class="select-input">
      <radio-group @change="selectHandler">
        <label v-for="item in question.items" :key="item.prefix" :name="item.prefix">
          <radio :value="item.prefix" style="transform:scale(0.7)"></radio>
          <view class="content">
            <view class="prefix">{{ item.prefix }}</view>
            <view v-html="item.content"></view>
          </view>
        </label>
      </radio-group>
    </view>
    <view v-if="qType === 2" class="select-input">
      <checkbox-group @change="selectMtHandler">
        <label v-for="item in question.items" :key="item.prefix" :name="item.prefix">
          <checkbox :value="item.prefix" color="#3C9CFF" style="transform:scale(0.7)"></checkbox>
          <view class="content">
            <view class="prefix">{{ item.prefix }}</view>
            <view v-html="item.content"></view>
          </view>
        </label>
      </checkbox-group>
    </view>
    <view v-if="qType === 3" class="select-input">
      <radio-group @change="selectHandler">
        <label v-for="item in question.items" :key="item.prefix" :name="item.prefix">
          <radio :value="item.prefix" style="transform:scale(0.7)"></radio>
          <view class="content">
            <view v-html="item.content"></view>
          </view>
        </label>
      </radio-group>
    </view>
    <view v-if="qType === 4" class="text-input">
      <u-form-item v-for="item in question.items" :key="item.prefix" :label="item.prefix" labelWidth="20px">
        <u--input v-model="answer.contentArray[item.prefix - 1]" @change="answer.completed = true" border="surround"
          spellcheck="false"></u--input>
      </u-form-item>
    </view>
    <view v-if="qType === 5" class="text-input">
      <u--textarea v-model="answer.content" placeholder="请输入答案" height="120" :confirmType="null" :maxlength="500"
        spellcheck="false"></u--textarea>
        <upload :url.sync="answer.contentImage"></upload>
    </view>
  </view>
</template>

<script>
  import Gap from '@/components/gap/Gap'
  import Upload from '@/components/upload/Upload'

  export default {
    name: 'QuestionEdit',
    components: {
      Gap,
      Upload,
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
            contentImage: '',
            contentArray: [],
            completed: false,
          }
        }
      },
    },
    methods: {
      selectHandler(event) {
        this.answer.completed = true
        this.answer.content = event.detail.value
      },
      selectMtHandler(event) {
        this.answer.completed = true
        this.answer.contentArray = event.detail.value
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
</style>