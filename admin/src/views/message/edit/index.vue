<template>
  <div class="app-container">
    <el-form
      :model="form"
      ref="form"
      label-width="100px"
      v-loading="formLoading"
      :rules="rules"
    >
      <el-form-item label="标题：" prop="title" required>
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content" required>
        <el-input type="textarea" rows="13" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="接收人：" required>
        <!-- <el-select
          v-model="form.receiveUserIds"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入用户名"
          :loading="selectLoading"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">发送</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sendMessage } from "@/api/message";

export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        receiveUserIds: [1],  // TODO 等待对接 elastic search
      },
      formLoading: false,
      selectLoading: false,
      options: [],
      rules: {
        title: [{ required: true, message: "请输入消息标题", trigger: "blur" }],
        realName: [
          { required: true, message: "请输入消息内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getUserByUserName(query) {
      let _this = this;
      if (query !== "") {
        _this.selectLoading = true;


      } else {
        _this.options = [];
      }
    },
    submitForm() {
      let _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formLoading = true;
          console.log(this.form)
          sendMessage(this.form).then(res => {
            _this.$modal.msgSuccess("发送成功");
            _this.$router.push("/message/list");
          }).finally(() => _this.formLoading = false)
        }
      });
    },
    resetForm() {
      let lastId = this.form.id;
      this.$refs["form"].resetFields();
      this.form = {
        title: "",
        content: "",
        receiveUserIds: [],
      };
      this.form.id = lastId;
    },
  },
};
</script>
