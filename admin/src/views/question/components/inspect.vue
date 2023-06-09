<template>
  <div style="line-height: 1.8">
    <div v-if="qType == 1" v-loading="qLoading">
      <div class="q-title" v-html="question.title" />
      <div class="q-content">
        <span
          :key="item.id"
          v-for="item in question.items"
          class="q-item-contain"
        >
          <span class="q-item-prefix">{{ item.prefix }}</span>
          <span v-html="item.content" class="q-item-content"></span>
        </span>
      </div>
    </div>
    <div v-else-if="qType == 2" v-loading="qLoading">
      <div class="q-title" v-html="question.title" />
      <div class="q-content">
        <span
          :key="item.id"
          v-for="item in question.items"
          class="q-item-contain"
        >
          <span class="q-item-prefix">{{ item.prefix }}</span>
          <span v-html="item.content" class="q-item-content"></span>
        </span>
      </div>
    </div>
    <div v-else-if="qType == 3" v-loading="qLoading">
      <div
        class="q-title"
        v-html="question.title"
        style="display: inline; margin-right: 10px"
      />
      <span>（</span>
      <span :key="item.id" v-for="item in question.items">
        <span v-html="item.content" class="q-item-content"></span>
      </span>
      <span>）</span>
    </div>
    <div v-else-if="qType == 4" v-loading="qLoading">
      <div class="q-title" v-html="question.title" />
    </div>
    <div v-else-if="qType == 5" v-loading="qLoading">
      <div class="q-title" v-html="question.title" />
    </div>
    <div v-else>未找到题目</div>
  </div>
</template>

<script>
import { getQuestion } from "@/api/question/index";

export default {
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      // 加载标识
      qLoading: false,
      // 题目数据
      question: {},
    };
  },
  watch: {
    id: {
      handler: function (val) {
        if (val) {
          this.qLoading = true;
          getQuestion(this.id).then((res) => {
            this.question = res.data;
            this.qLoading = false;
          });
        }
      },
      immediate: true,
    },
  },
  computed: {
    qType() {
      return this.question.questionType;
    },
  },
};
</script>
