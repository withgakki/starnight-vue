<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="题目ID" prop="infoTextContentId">
        <el-input
          v-model="queryParams.id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学科" prop="subjectId">
        <subject-selector :data.sync="queryParams.subjectId"></subject-selector>
      </el-form-item>
      <el-form-item label="年级" prop="gradeLevel">
        <level-selector :data.sync="queryParams.gradeLevel"></level-selector>
      </el-form-item>
      <el-form-item label="题型" prop="questionType">
        <question-type-selector
          :data.sync="queryParams.questionType"
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
          >修改</el-button>
        </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="questionList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="Id" align="center" prop="id" />
      <el-table-column label="学科" align="center" prop="subjectId">
        <template slot-scope="scope">
          <span>{{ parseSubject(scope.row.subjectId) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题型" align="center" prop="questionType">
        <template slot-scope="scope">
          <span>{{ parseQuestionType(scope.row.questionType) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分数" align="center" prop="score" />
      <el-table-column label="难度" align="center" prop="difficult" />
      <el-table-column
        label="题干"
        align="center"
        show-overflow-tooltip
        prop="shortTitle"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleInspect(scope.row)"
            >预览</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 题目预览对话框 -->
    <el-dialog
      title="题目预览"
      :visible.sync="inspectOpen"
      width="500px"
      append-to-body
    >
      <Inspect :id="inspectId"></Inspect>
    </el-dialog>
  </div>
</template>
  
  <script>
import { listQuestion, delQuestion } from "@/api/question/index";
import LevelSelector from "@/components/LevelSelector";
import SubjectSelector from "@/components/SubjectSelector";
import QuestionTypeSelector from "@/components/QuestionTypeSelector";
import Inspect from "./components/Inspect";

export default {
  name: "Question",
  components: { LevelSelector, SubjectSelector, QuestionTypeSelector, Inspect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 题目表格数据
      questionList: [],
      // 预览弹出层数据
      inspectId: null,
      // 预览弹出层
      inspectOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        questionType: null,
        subjectId: null,
        score: null,
        gradeLevel: null,
        difficult: null,
        correct: null,
        infoTextContentId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询题目列表 */
    getList() {
      this.loading = true;
      listQuestion(this.queryParams).then((response) => {
        this.questionList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$tab.openPage("/question/edit/singleChoice");
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      let url = this.parseEditUrl(row.questionType);
      this.$tab.openPage(url, { id: row.id });
    },
    /** 预览按钮操作 */
    handleInspect(row) {
      this.inspectId = row.id;
      this.inspectOpen = true;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除题目编号为"' + ids + '"的数据项？')
        .then(function () {
          return delQuestion(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
  },
};
</script>
  