<!-- 蓝色简洁注册页面 -->
<template>
  <view class="t-login">
    <!-- 页面装饰图片 -->
    <image class="img-a" src="/static/img/b-1.png"></image>
    <image class="img-b" src="/static/img/b-2.png"></image>
    <!-- 标题 -->
    <view class="t-b" style="padding-top: 200rpx;">{{ title }}</view>
    <view class="t-b2">{{ subTitle }}</view>
    <form class="cl">
      <view class="login-form-item">
        <u-input v-model="form.userName" placeholder="请输入用户名" maxlength="30">
          <u-icon slot="prefix" name="account" size="35px"></u-icon>
        </u-input>
      </view>
      <view class="login-form-item">
        <u-input v-model="form.password" type="password" placeholder="请输入密码" maxlength="16">
          <u-icon slot="prefix" name="lock" size="35px"></u-icon>
        </u-input>
      </view>
      <view class="login-form-item">
        <u-input v-model="form.confirm" type="password" placeholder="请输入确认密码" maxlength="16">
          <u-icon slot="prefix" name="lock" size="35px"></u-icon>
        </u-input>
      </view>
      <view @click="showLevelPicker = true" class="login-form-item">
        <u-input :value="parseLevel(form.userLevel)" placeholder="请输入年级" maxlength="30" disabled>
          <u-icon slot="prefix" name="account" size="35px"></u-icon>
        </u-input>
        <level-picker :value.sync="form.userLevel" :show.sync="showLevelPicker"></level-picker>
      </view>
      <button @tap="submit()">注 册</button>
    </form>
    <view class="link-box">
      <u--text @click="goLoginPage()" type="primary" text="去登录" size="17"></u--text>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>
<script>
  import {
    isEmpty
  } from '@/utils/verify.js'
  import {
    register
  } from '@/api/login.js'
  import LevelPicker from '@/components/level-picker/index'

  export default {
    components: {
      LevelPicker
    },
    data() {
      return {
        title: '星空在线考试系统',
        subTitle: '填写信息加入星空考试！',
        form: {
          userLevel: 1,
          userName: '',
          password: '',
          confirm: '',
        },
        showLevelPicker: false,
      };
    },
    methods: {
      // 验证表单内容
      validItem() {
        const form = this.form
        if (isEmpty(form.userName)) {
          uni.$u.toast('请输入登录用户名')
          return false
        }
        if (isEmpty(form.password)) {
          uni.$u.toast('请输入登录密码')
          return false
        }
        if (isEmpty(form.confirm)) {
          uni.$u.toast('请输入确认密码')
          return false
        }
        if (form.password.length < 6) {
          uni.$u.toast('密码长度必须大于6位')
          return false
        }
        const pat = /(?=.*[A-Za-z])(?=.*\d).+/
        if (!pat.test(form.password)) {
          uni.$u.toast('密码应由数字和字母组成')
          return false
        }
        if (form.password !== form.confirm) {
          uni.$u.toast('输入密码与确认密码不一致')
          form.password = ""
          form.confirm = ""
          return false
        }
        return true
      },
      // 确认注册
      submit() {
        const app = this
        let valid = app.validItem()
        if (valid) {
          app.isLoading = true
          register(this.form).then(res => {
            this.$refs.uToast.show({
              message: '注册成功，请登录！',
              type: 'success',
              duration: 1000,
              complete: () => {
                this.goLoginPage()
              }
            })
          }).finally(() => app.isLoading = false)
        }
      },
      goLoginPage() {
        uni.navigateTo({
          url: '/pages/login/index',
        })
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../login/index.scss';
</style>