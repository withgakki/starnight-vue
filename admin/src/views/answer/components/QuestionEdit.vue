<template>
  <div class="question-item">

    <div class="item-title">
      <div>{{ question.itemOrder }}、</div>
      <div v-html="question.title"></div>
      <div>（{{ question.score }}分）</div>
    </div>

    <div class="item-content">
      <div class="item-content">
        <div v-if="qType === 1" class="picker-style">
          <el-radio-group :value="answer.content">
            <el-radio
              v-for="(item, index) in question.items"
              :key="index"
              :label="item.prefix"
            >
              {{ item.prefix }}、 <span v-html="item.content"></span>
            </el-radio>
          </el-radio-group>
        </div>
        <div v-if="qType === 2" class="picker-style">
          <el-checkbox
            v-for="(item, index) in question.items"
            :value="answer.content.includes(item.prefix)"
            :key="index"
            :label="item.prefix"
          >
            {{ item.prefix }}、 <span v-html="item.content"></span>
          </el-checkbox>
        </div>
        <div v-if="qType === 3" class="picker-style">
          <el-radio-group :value="answer.content">
            <el-radio
              v-for="(item, index) in question.items"
              :key="index"
              :label="item.prefix"
            >
              {{ item.prefix }}、 {{ item.content }}
            </el-radio>
          </el-radio-group>
        </div>
        <div v-if="qType === 4" class="text-style">
          <el-form-item
            v-for="(item, index) in question.items"
            :key="index"
            :label="item.prefix"
          >
            <el-input
              :value="answer.contentArray[item.prefix - 1]"
              readonly
            ></el-input>
          </el-form-item>
        </div>
        <div v-if="qType === 5" class="text-style">
          <el-form-item>
            <el-input
              v-if="answer.contentImage === '' || answer.contentImage === null"
              :value="answer.content"
              readonly
              type="textarea"
              :rows="10"
            ></el-input>
            <el-image
              v-else
              style="width: 500px; height: 100px"
              :src="answer.contentImage"
              :preview-src-list="[answer.contentImage]"
            ></el-image>
          </el-form-item>
        </div>
      </div>

      <div class="item-result">
        <div>
          结果：
          <el-tag v-if="qType === 4 || qType === 5" type="warning" size="mini">待批改</el-tag>
          <el-tag v-else-if="answer.doRight" type="success" size="mini">正确</el-tag>
          <el-tag v-else type="danger" size="mini">错误</el-tag>
        </div>
        <div v-if="qType !== 4 && qType !== 5">
          分数：
          <span>{{ answer.score }}分</span>
        </div>
        <div class="inline-box">
          难度：
          <el-rate v-model="question.difficult" disabled></el-rate>
        </div>
        <div class="inline-box">
          正确答案：
          <div
            v-if="qType == 1 || qType == 2 || qType == 5"
            v-html="question.correct"
          ></div>
          <div v-if="qType == 3" v-html="trueFalseFormatter(question)"></div>
          <div v-if="qType == 4">
            <div v-for="(correct, index) in question.correctArray" :key="index">
              <div v-html="correct" class="array-gap"></div>
            </div>
          </div>
        </div>
        <div>
          解析：
          <span v-html="question.analyze"></span>
        </div>
        <div v-if="qType === 4 || qType === 5" class="judge-input">
          批改：
          <el-input-number v-model="judgeScore" @change="handleChange" :min="0" :max="Number(question.score)" :step="0.1"></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      default: () => {},
    },
  },
  data() {
    return {
      judgeScore: 0,
    };
  },
  methods: {
    handleChange(val) {
      this.answer.score = val;
      this.$emit("update:answer", this.answer);
    },
    trueFalseFormatter(question) {
      return question.items.filter((d) => d.prefix === question.correct)[0]
        .content;
    },
  },
};
</script>
<style scoped lang="scss">
.question-item {
  padding: 50px 15px;
  border-bottom: 2px solid #ebeef5;

  .item-title {
    display: flex;
    align-items: center;
  }

  .item-content {
    .picker-style {
      margin: 10px 25px;
    }

    .text-style {
      margin: 10px 25px;
      .el-input {
        width: 50%;
      }
      .el-textarea {
        width: 60%;
      }
    }
  }

  .item-result {
    > div {
      margin: 15px 0;
    }

    .inline-box {
      display: flex;
      align-items: center;
    }

    .judge-input {
      color: #E6A23C;
      font-weight: 100px;
    }

  }
}
</style>