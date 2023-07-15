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
      <el-form-item label="标题：" prop="title" required>
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="试卷：" required>
        <el-table
          :data="form.paperItems"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column prop="subjectId" label="学科" width="120px" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="createTime" label="创建时间" width="160px" />
          <el-table-column label="操作" align="center" width="160px">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                type="danger"
                @click="removePaper(row)"
                class="link-left"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="success" @click="addPaper">添加试卷</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="paperPage.open" width="70%">
      <el-form :model="paperPage.queryParams" ref="queryForm" :inline="true">
        <el-form-item label="学科：">
          <subject-selector
            :data.sync="paperPage.queryParams.subjectId"
            :level="form.gradeLevel"
          ></subject-selector>
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
        v-loading="paperPage.loading"
        :data="paperPage.exampaperList"
        @selection-change="handleSelectionChange"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="Id" width="90px" />
        <el-table-column prop="subjectId" label="学科" width="120px">
          <template slot-scope="scope">
            <span>{{ parseSubject(scope.row.subjectId) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="createTime" label="创建时间" width="160px" />
      </el-table>

      <pagination
        v-show="paperPage.total > 0"
        :total="paperPage.total"
        :page.sync="paperPage.queryParams.pageNum"
        :limit.sync="paperPage.queryParams.pageSize"
        :pageSizes="[5, 10, 20]"
        @pagination="getExampaperList"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="paperPage.open = false">取 消</el-button>
        <el-button type="primary" @click="confirmPaperSelect">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTaskexam, addTaskexam, updateTaskexam } from "@/api/taskexam/index";
import { listByTaskExamPaper } from "@/api/exampaper";
import LevelSelector from "@/components/LevelSelector";
import SubjectSelector from "@/components/SubjectSelector";

export default {
  components: {
    LevelSelector,
    SubjectSelector,
  },
  data() {
    return {
      form: {
        id: null,
        gradeLevel: null,
        title: "",
        paperItems: [],
      },
      formLoading: false,
      paperPage: {
        open: false,
        loading: true,
        datas: [],
        single: true,
        multiple: true,
        showSearch: true,
        total: 0,
        exampaperList: [],
        queryParams: {
          pageNum: 1,
          pageSize: 5,
          subjectId: null,
          gradeLevel: null,
          paperType: 6,
        },
      },
      rules: {
        gradeLevel: [
          { required: true, message: "请输入年级", trigger: "change" },
        ],
        title: [{ required: true, message: "请输入任务标题", trigger: "blur" }],
      },
    };
  },
  created() {
    let _this = this;
    let id = this.$route.query.id;
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true;
      getTaskexam(id).then((res) => {
        _this.form = res.data;
        _this.formLoading = false;
      });
    }
    this.$store.dispatch('subject/getSubjectList');
  },
  methods: {
    addPaper() {
      this.paperPage.queryParams.gradeLevel = this.form.gradeLevel;
      this.paperPage.queryParams.subjectId = null;
      this.paperPage.open = true;
      this.getExampaperList();
    },
    confirmPaperSelect() {
      this.paperPage.datas.forEach((data) => this.form.paperItems.push(data));
      this.paperPage.open = false;
    },
    getExampaperList() {
      this.paperPage.loading = true;
      listByTaskExamPaper(this.paperPage.queryParams).then((response) => {
        this.paperPage.exampaperList = response.rows;
        this.paperPage.total = response.total;
        this.paperPage.loading = false;
      });
    },
    handleSelectionChange(selection) {
      this.paperPage.datas = selection;
      this.paperPage.single = selection.length !== 1;
      this.paperPage.multiple = !selection.length;
    },
    handleQuery() {
      this.paperPage.queryParams.pageNum = 1;
      this.getExampaperList();
    },
    resetQuery() {
      this.paperPage.queryParams.subjectId = null;
      this.handleQuery();
    },
    removePaper(row) {
      this.form.paperItems.forEach((item, index, arr) => {
        if (item.id === row.id) {
          arr.splice(index, 1);
        }
      });
    },
    submitForm() {
      let _this = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true;
          if (_this.form.id != null) {
            updateTaskexam(this.form)
              .then(() => {
                _this.$modal.msgSuccess("修改成功");
                _this.$tab.closeOpenPage("/taskexam/list");
              })
              .catch(() => {
                this.formLoading = false;
              });
          } else {
            addTaskexam(this.form)
              .then(() => {
                _this.$modal.msgSuccess("新增成功");
                _this.$tab.closeOpenPage("/taskexam/list");
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
    resetForm() {
      let lastId = this.form.id;
      this.$refs["form"].resetFields();
      this.form = {
        id: null,
        gradeLevel: null,
        title: "",
        paperItems: [],
      };
      this.form.id = lastId;
    },
  },
};
</script>
