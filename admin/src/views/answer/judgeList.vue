<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学科" prop="subjectId">
        <subject-selector :data.sync="queryParams.subjectId" :level="queryParams.gradeLevel" init-all></subject-selector>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="answerPaperList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="Id" align="center" prop="id" />
      <el-table-column label="试卷名称" align="center" prop="paperName" />
      <el-table-column label="用户名称" align="center" prop="userName" />
      <el-table-column label="得分" align="center" prop="userScore">
        <template slot-scope="scope">
          <span>
            <span>{{ scope.row.userScore }}</span>
            /
            <span>{{ scope.row.paperScore }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="题目对错" align="center" prop="questionCorrect">
        <template slot-scope="scope">
          <span>
            <span>{{ scope.row.questionCorrect }}</span>
            /
            <span>{{ scope.row.questionCount }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="耗时" align="center" prop="doTime">
        <template slot-scope="scope">
          <span>{{ scope.row.doTime }}秒</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleJudge(scope.row)"
          >人工批改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            :loading="judgeAutoLoading[scope.$index]"
            @click="handleJudgeAuto(scope.row, scope.$index)"
          >智能批改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
  import {listAnswerPaper, delAnswerPaper, judgeAnswerPaperAuto} from "@/api/answer";
  import LevelSelector from "@/components/LevelSelector";
  import SubjectSelector from "@/components/SubjectSelector";
  import ExampaperTypeSelector from "@/components/ExampaperTypeSelector";

  export default {
  name: "Exampaper",
  components: {
    LevelSelector,
    SubjectSelector,
    ExampaperTypeSelector
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
      // 答卷表格数据
      answerPaperList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: 1,  // 待批改
        subjectId: null,
      },
      // 智能批改加载按钮
      judgeAutoLoading: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询答卷列表 */
    getList() {
      this.loading = true;
      listAnswerPaper(this.queryParams).then(response => {
        this.answerPaperList = response.rows;
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    handleJudge(row) {
      this.$tab.openPage('/answer/judge', { id: row.id });
    },
    handleJudgeAuto(row, index) {
      this.$set(this.judgeAutoLoading, index, true)
      judgeAnswerPaperAuto(row.id).then(res => {
        this.$set(this.judgeAutoLoading, index, false)
        this.getList();
        this.$notify({
          title: '智能批改成功',
          message: `答卷编号为 ${row.id} 的最终分数为 ${res.msg} 分`,
          type: 'success'
        });
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除答卷编号为"' + ids + '"的数据项？').then(function() {
        return delAnswerPaper(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>
