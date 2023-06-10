<template>
  <div class="app-container">
    <el-form
      :model="form"
      ref="form"
      label-width="100px"
      v-loading="formLoading"
      :rules="rules"
    >
      <el-form-item label="年级：" prop="gradeLevel" required>
        <level-selector :data.sync="form.gradeLevel"></level-selector>
      </el-form-item>
      <el-form-item label="学科：" prop="subjectId" required>
        <subject-selector :data.sync="form.subjectId"></subject-selector>
      </el-form-item>
      <el-form-item label="试卷类型：" prop="paperType" required>
        <exampaper-type-selector
          :data.sync="form.paperType"
        ></exampaper-type-selector>
      </el-form-item>
      <el-form-item label="时间限制：" required v-show="form.paperType === 4">
        <el-date-picker
          v-model="limitDateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="试卷名称：" prop="name" required>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        :key="index"
        :label="'标题' + (index + 1) + '：'"
        required
        v-for="(titleItem, index) in form.titleItems"
      >
        <el-input v-model="titleItem.name" style="width: 80%" />
        <el-button
          type="text"
          class="link-left"
          style="margin-left: 20px"
          size="mini"
          @click="addQuestion(titleItem)"
        >
          添加题目
        </el-button>
        <el-button
          type="text"
          class="link-left"
          size="mini"
          @click="form.titleItems.splice(index, 1)"
          >删除</el-button
        >
        <el-card
          class="exampaper-item-box"
          v-if="titleItem.questionItems.length !== 0"
        >
          <el-form-item
            :key="questionIndex"
            :label="'题目' + (questionIndex + 1) + '：'"
            v-for="(questionItem, questionIndex) in titleItem.questionItems"
            style="margin-bottom: 15px"
          >
            <el-row>
              <el-col :span="23">
                <Preview
                  :qType="questionItem.questionType"
                  :question="questionItem"
                />
              </el-col>
              <el-col :span="1">
                <el-button
                  type="text"
                  size="mini"
                  @click="titleItem.questionItems.splice(questionIndex, 1)"
                  >删除
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item label="建议时长" prop="suggestTime" required>
        <el-tooltip
          effect="dark"
          content="单位：分钟"
          placement="bottom"
        >
          <el-input-number
            v-model="form.suggestTime"
            :precision="0"
            :step="1"
          ></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="success" @click="addTitle">添加标题</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="questionPage.open" width="70%">
      <el-form :model="questionPage.queryParam" ref="queryForm" inline>
        <el-form-item label="ID">
          <el-input
            placeholder="题目ID"
            v-model="questionPage.queryParams.id"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="题型" prop="questionType">
          <question-type-selector
            :data.sync="questionPage.queryParams.questionType"
          ></question-type-selector>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        v-loading="questionPage.loading"
        :data="questionPage.questionList"
        @selection-change="handleSelectionChange"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="Id" align="center" width="60px" />
        <el-table-column label="题型" align="center" prop="questionType">
          <template slot-scope="scope">
            <span>{{ parseQuestionType(scope.row.questionType) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="题干"
          align="center"
          show-overflow-tooltip
          prop="shortTitle"
        />
      </el-table>

      <pagination
        v-show="questionPage.total > 0"
        :total="questionPage.total"
        :page.sync="questionPage.queryParams.pageNum"
        :limit.sync="questionPage.queryParams.pageSize"
        :pageSizes="[5, 10, 20]"
        @pagination="getQuestionList"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="questionPage.open = false">取 消</el-button>
        <el-button type="primary" @click="confirmQuestionSelect"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LevelSelector from "@/components/LevelSelector";
import SubjectSelector from "@/components/SubjectSelector";
import ExampaperTypeSelector from "@/components/ExampaperTypeSelector";
import QuestionTypeSelector from "@/components/QuestionTypeSelector";
import Preview from "../../question/components/Preview";
import { listQuestion, getQuestion } from "@/api/question/index";
import {
  getExampaper,
  addExampaper,
  updateExampaper,
} from "@/api/exampaper/index";

export default {
  components: {
    LevelSelector,
    SubjectSelector,
    ExampaperTypeSelector,
    QuestionTypeSelector,
    Preview,
  },
  data() {
    return {
      form: {
        id: null,
        level: null,
        subjectId: null,
        paperType: 1,
        limitStartTime: null,
        limitEndTime: null,
        name: "",
        suggestTime: null,
        titleItems: [],
      },
      subjectFilter: null,
      formLoading: false,
      rules: {
        level: [{ required: true, message: "请选择年级", trigger: "change" }],
        subjectId: [
          { required: true, message: "请选择学科", trigger: "change" },
        ],
        paperType: [
          { required: true, message: "请选择试卷类型", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入试卷名称", trigger: "blur" }],
        suggestTime: [
          { required: true, message: "请输入建议时长", trigger: "blur" },
        ],
      },
      questionPage: {
        loading: true,
        ids: [],
        single: true,
        multiple: true,
        total: 0,
        open: false,
        questionList: [],
        queryParams: {
          pageNum: 1,
          pageSize: 5,
          id: null,
          questionType: null,
          subjectId: null,
        },
      },
      currentTitleItem: null,
    };
  },
  computed: {
    // limitDateTime <==> [limitStartTime, limitEndTime]
    limitDateTime: {
      get() {
        if (!this.form.limitStartTime || !this.form.limitEndTime) {
          return [];
        }
        return [this.form.limitStartTime, this.form.limitEndTime];
      },
      set(val) {
        this.form.limitStartTime = val[0];
        this.form.limitEndTime = val[1];
      }
    }
  },
  created() {
    let id = this.$route.query.id;
    let _this = this;
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true;
      getExampaper(id).then((res) => {
        _this.form = res.data;
        _this.formLoading = false;
      });
    }
  },
  methods: {
    submitForm() {
      let _this = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          if (_this.form.id != null) {
            updateExampaper(this.form)
              .then(() => {
                _this.$modal.msgSuccess("修改成功");
                _this.$tab.closeOpenPage("/exampaper/list");
              })
              .catch(() => {
                this.formLoading = false;
              });
          } else {
            addExampaper(this.form)
              .then(() => {
                _this.$modal.msgSuccess("新增成功");
                _this.$tab.closeOpenPage("/exampaper/list");
              })
              .catch(() => {
                this.formLoading = false;
              });
          }
        } else {
          return false;
        }
      });
    },
    addTitle() {
      this.form.titleItems.push({
        name: "",
        questionItems: [],
      });
    },
    addQuestion(titleItem) {
      this.currentTitleItem = titleItem;
      this.questionPage.open = true;
      this.getQuestionList();
    },
    removeTitleItem(titleItem) {
      this.form.titleItems.remove(titleItem);
    },
    removeQuestion(titleItem, questionItem) {
      titleItem.questionItems.remove(questionItem);
    },
    confirmQuestionSelect() {
      let _this = this;
      this.questionPage.ids.forEach((id) => {
        getQuestion(id).then((res) => {
          _this.currentTitleItem.questionItems.push(res.data);
        });
      });
      this.questionPage.open = false;
    },
    handleQuery() {
      this.questionPage.queryParams.pageNum = 1;
      this.getQuestionList();
    },
    resetQuery() {
      this.questionPage.queryParams.id = null;
      this.questionPage.queryParams.questionType = null;
      this.handleQuery();
    },
    getQuestionList() {
      this.questionPage.queryParams.subjectId = this.form.subjectId;
      this.questionPage.loading = true;
      listQuestion(this.questionPage.queryParams).then((response) => {
        this.questionPage.questionList = response.rows;
        this.questionPage.total = response.total;
        this.questionPage.loading = false;
      });
    },
    handleSelectionChange(selection) {
      this.questionPage.ids = selection.map((item) => item.id);
      this.questionPage.single = selection.length !== 1;
      this.questionPage.multiple = !selection.length;
    },
    resetForm() {
      let lastId = this.form.id;
      this.$refs["form"].resetFields();
      this.form = {
        id: null,
        level: null,
        subjectId: null,
        paperType: 1,
        limitStartTime: null,
        limitEndTime: null,
        name: "",
        suggestTime: null,
        titleItems: [],
      };
      this.form.id = lastId;
    },
  },
};
</script>

<style lang="scss">
.exampaper-item-box {
  .q-title {
    margin: 0px 5px 0px 5px;
  }
}
</style>
