<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="/static/img/b-1.png"></image>
		<image class="img-b" src="/static/img/b-2.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="t-b2">{{ subTitle }}</view>
		<form class="cl">
			<!-- 登录账号 -->
			<view class="login-form-item">
				<u-input v-model="username" placeholder="请输入登录用户名" maxlength="30">
					<u-icon slot="prefix" name="account" size="35px"></u-icon>
				</u-input>
			</view>
			<!-- 登录密码 -->
			<view class="login-form-item">
				<u-input v-model="password" type="password" placeholder="请输入登录密码" maxlength="16">
					<u-icon slot="prefix" name="lock" size="35px"></u-icon>
				</u-input>
			</view>
			<button @tap="login()">登 录</button>
		</form>
	</view>
</template>
<script>
import { isEmpty } from '@/utils/verify.js'

export default {
	data() {
		return {
			title: '星空在线考试系统',
			subTitle: '欢迎回来，开始考试吧！',
			// 登录账号
			username: 'student',
			// 密码
			password: '123456',
		};
	},
	methods: {
		// 验证表单内容
		validItem() {
			const app = this
			if (isEmpty(app.username)) {
				uni.$u.toast('请输入登录用户名')
				return false
			}
			if (isEmpty(app.password)) {
				uni.$u.toast('请输入登录密码')
				return false
			}
			return true
		},
		// 确认登录
		login() {
      const app = this
			let valid = app.validItem();
			if (valid) {
				app.isLoading = true
				app.$store.dispatch('Login', {
				  username: app.username,
				  password: app.password,
          role: "STUDENT",
				}).then(result => {
					uni.switchTab({
						url: '/pages/index/index',
						fail(err) {
							console.log(err)
						}
					})
				}).finally(() => app.isLoading = false)
			}
		},
	}
};
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
