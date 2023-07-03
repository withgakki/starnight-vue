<template>
  <u-modal :show="show" title="修改密码" showCancelButton @confirm="confirm" @cancel="cancel">
    <view class="slot-content">
      <u--form :model="pwd" ref="uForm" :rules="uFormRules" labelWidth="160rpx" labelAlign="left">
        <u-form-item label="原密码" prop="oldPassword" class="u-border-bottom">
          <u--input v-model="pwd.oldPassword" type="password" placeholder="请输入原密码" border="none"></u--input>
        </u-form-item>
        <u-form-item label="新密码" prop="newPassword" class="u-border-bottom">
          <u--input v-model="pwd.newPassword" type="password" placeholder="请输入新密码" border="none"></u--input>
        </u-form-item>
        <u-form-item label="确认密码" prop="confirmPwd" class="u-border-bottom">
          <u--input v-model="pwd.confirmPwd" type="password" placeholder="请输入确认密码" border="none"></u--input>
        </u-form-item>
      </u--form>
    </view>
  </u-modal>
</template>

<script>
  export default {
    props: {
      show: Boolean
    },
    data() {
      return {
        pwd: {
          oldPassword: '',
          newPassword: '',
          confirmPwd: ''
        },
        uFormRules: {
          oldPassword: {
            type: 'string',
            required: true,
            message: '请填写原始密码',
            trigger: ['blur', 'change']
          },
          newPassword: [{
              type: 'string',
              required: true,
              message: '请填写新密码',
              trigger: ['blur', 'change']
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: '8位以上包含字母和数字',
              trigger: ['blur', 'change']
            },
          ],
          confirmPwd: [{
              type: 'string',
              required: true,
              message: '请填写确认密码',
              trigger: ['blur', 'change']
            },
            {
              validator: (rule, value, callback) => {
                return value === this.pwd.newPassword
              },
              message: '两次密码不一致',
              trigger: ['blur', 'change']
            },
          ],
        },
      }
    },
    methods: {
      confirm() {
        this.$refs.uForm.validate().then(res => {
          this.$store.dispatch('UpdatePwd', this.pwd).then(res => {
            uni.$u.toast('密码修改成功')
          })
          this.$emit('close')
        })
      },
      cancel() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>