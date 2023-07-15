<template>
  <div v-loading.fullscreen.lock="formLoading" class="center">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="info-card">
          <div slot="header" class="header">
            <span class="title">{{ form.paper.name }}</span>
            <div>
              得分：
              <span>{{ form.answer.score }}</span>
              /
              <span>{{ form.paper.score }}</span>
            </div>
            <div>
              耗时：
              <span>{{ form.answer.doTime }}</span>
              分钟
            </div>
            <div>
              提交人：
              <span>{{ form.user.realName || form.user.userName }}</span>
            </div>
          </div>
          <div class="question-index">
            <div
              v-for="(item, index) in form.answer.answerItems"
              :key="index"
              @click="goAnchor(index)"
            >
              <el-tag
                v-if="hasGapAndShortAnswer(item.itemOrder)"
                type="warning"
                >{{ index + 1 }}</el-tag
              >
              <el-tag v-else-if="item.doRight" type="success">{{
                index + 1
              }}</el-tag>
              <el-tag v-else type="danger">{{ index + 1 }}</el-tag>
            </div>
          </div>
          <div class="submit-button">
            <el-button
              @click="submitJudge"
              :loading="submitLoading"
              type="primary"
              >提交批改</el-button
            >
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-form
          v-for="(item, index) in form.paper.titleItems"
          :key="index"
          label-width="35px"
          label-suffix="、"
        >
          <el-card class="title-card">
            <div slot="header" class="header">
              <span
                >{{
                  (index + 1).toLocaleString("zh-hans-CN-u-nu-hanidec", {
                    useGrouping: false,
                  })
                }}、</span
              >
              <span v-html="item.name"></span>
            </div>
            <div
              v-for="qItem in item.questionItems"
              :key="qItem.itemOrder"
              :ref="`question-${qItem.itemOrder - 1}`"
            >
              <question-edit
                :q-type="qItem.questionType"
                :question="qItem"
                :answer.sync="form.answer.answerItems[qItem.itemOrder - 1]"
              ></question-edit>
            </div>
          </el-card>
        </el-form>
      </el-col>
    </el-row>
    <!-- right无效 自适应靠左 -->
    <el-backtop :right="NaN"></el-backtop>
  </div>
</template>

<script>
import { getAnswerPaper, judgeAnswerPaper } from "@/api/answer";
import QuestionEdit from "./components/QuestionEdit";
import { scrollTo } from "@/utils/scroll-to";

export default {
  components: {
    QuestionEdit,
  },
  data() {
    return {
      form: {
        paper: {},
        answer: {},
        user: {},
      },
      formLoading: false,
      submitLoading: false,
    };
  },
  created() {
    let id = this.$route.query.id;
    let _this = this;
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true;
      getAnswerPaper(id).then((res) => {
        _this.form = res.data;
        _this.formLoading = false;
        console.log(_this.form);
      });
    }
  },
  methods: {
    submitJudge() {
      this.submitLoading = true;
      judgeAnswerPaper(this.form.answer).then((res) => {
        const score = res.msg;
        this.$alert(`当前试卷总分为： ${score}`, "批改成功", {
          confirmButtonText: "确定",
          callback: action => {
            this.$tab.closeOpenPage('/answer/judge-list');
          },
        }).finally(() => (this.submitLoading = false));
      });
    },
    goAnchor(index) {
      const dom = this.$refs[`question-${index}`][0];
      scrollTo(dom.offsetTop, 800);
    },
    // 通过题目序号获取题目（paper）
    getQuestionByItemOrder(itemOrder) {
      return this.form.paper.titleItems
        .map((item) => item.questionItems)
        .flat()
        .find((item) => item.itemOrder === itemOrder);
    },
    hasGapAndShortAnswer(itemOrder) {
      const question = this.getQuestionByItemOrder(itemOrder);
      return question.questionType === 4 || question.questionType === 5;
    },
  },
};
</script>
<style scoped lang="scss">
.center {
  margin: 2%;
}

.info-card {
  .header {
    .title {
      font-size: 1.5rem;
      font-weight: bold;
    }

    div {
      margin: 0.8rem 0.3rem;
    }
  }

  .question-index {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(2rem, 1fr));
    grid-gap: 0.5rem;

    .el-tag {
      cursor: pointer;
    }
  }

  .submit-button {
    margin-top: 50px;
    text-align: center;
  }
}

.title-card {
  margin-bottom: 25px;

  .header {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>