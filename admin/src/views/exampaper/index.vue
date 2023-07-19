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
      <el-form-item label="试卷名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入试卷名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年级" prop="gradeLevel">
        <level-selector :data.sync="queryParams.gradeLevel"></level-selector>
      </el-form-item>
      <el-form-item label="学科" prop="subjectId">
        <subject-selector
          :data.sync="queryParams.subjectId"
          :level="queryParams.gradeLevel"
        ></subject-selector>
      </el-form-item>
      <el-form-item label="类型" prop="paperType">
        <exampaper-type-selector
          :data.sync="queryParams.paperType"
        ></exampaper-type-selector>
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
          >自定义新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleRandomAdd"
          >随机新增</el-button
        >
      </el-col>
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
      :data="exampaperList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="Id" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="学科" align="center" prop="subjectId">
        <template slot-scope="scope">
          <span>{{ parseSubject(scope.row.subjectId) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
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

    <!-- 随机新增试卷对话框 -->
    <el-dialog
      title="随机新增试卷"
      :visible.sync="open"
      width="500px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="试卷名" prop="paperName" required>
          <el-input v-model="form.paperName" placeholder="请输入试卷名" />
        </el-form-item>
        <el-form-item label="年级" prop="level" required>
          <level-selector :data.sync="form.level"></level-selector>
        </el-form-item>
        <el-form-item label="学科" prop="subjectId" required>
          <subject-selector :data.sync="form.subjectId" :level="form.level"></subject-selector>
        </el-form-item>
        <el-form-item label="单选题数量" prop="singleChoice" required>
          <el-slider v-model="form.singleChoice" :max="20" show-stops></el-slider>
        </el-form-item>
        <el-form-item label="多选题数量" prop="multipleChoice" required>
          <el-slider v-model="form.multipleChoice" :max="20" show-stops></el-slider>
        </el-form-item>
        <el-form-item label="判断题数量" prop="judgeChoice" required>
          <el-slider v-model="form.judgeChoice" :max="20" show-stops></el-slider>
        </el-form-item>
        <el-form-item label="难度" prop="difficult" required>
          <el-rate v-model="form.difficult" style="line-height: 50px;"></el-rate>
        </el-form-item>
        <el-form-item label="建议时长" prop="suggestTime" required>
          <el-tooltip effect="dark" content="单位：分钟" placement="bottom">
            <el-input-number v-model="form.suggestTime" :precision="0" :step="1"></el-input-number>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :loading="formLoading">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listExampaper, delExampaper, addRandomExampaper } from "@/api/exampaper";
import LevelSelector from "@/components/LevelSelector";
import SubjectSelector from "@/components/SubjectSelector";
import ExampaperTypeSelector from "@/components/ExampaperTypeSelector";

export default {
  name: "Exampaper",
  components: {
    LevelSelector,
    SubjectSelector,
    ExampaperTypeSelector,
  },
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
      // 试卷表格数据
      exampaperList: [],
      // 是否显示弹出层 - 随机新增试卷
      open: false,
      // 随机新增试卷表单
      form: {},
      // 表单校验
      rules: {},
      // 表单按钮遮罩
      formLoading: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        subjectId: null,
        paperType: null,
        gradeLevel: null,
        score: null,
        questionCount: null,
        suggestTime: null,
        limitStartTime: null,
        limitEndTime: null,
        frameTextContentId: null,
        taskExamId: null,
      },
    };
  },
  created() {
    this.$store.dispatch("subject/getSubjectList");
    this.getList();
  },
  methods: {
    /** 查询试卷列表 */
    getList() {
      this.loading = true;
      listExampaper(this.queryParams).then((response) => {
        this.exampaperList = response.rows;
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
      this.$tab.openPage("/exampaper/edit");
    },
    /** 随机新增按钮操作 */
    handleRandomAdd() {
      this.reset();
      this.open = true;
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        level: null,
        paperName: null,
        subjectId: null,
        singleChoice: 0,
        multipleChoice: 0,
        judgeChoice: 0,
        difficult: null,
        suggestTime: null,
      };
      this.resetForm("form");
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.formLoading = true;
          addRandomExampaper(this.form).then(res => {
            this.$modal.msgSuccess("新增成功");
            this.open = false;
            this.formLoading = false;
            this.getList();
          });
        }
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.$tab.openPage("/exampaper/edit", { id: row.id });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除试卷编号为"' + ids + '"的数据项？')
        .then(function () {
          return delExampaper(ids);
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
