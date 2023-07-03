<template>
  <view>
    <Navbar :hideBtn="false" bgColor="#f3f4f6"></Navbar>
    <view style="background-color: #2b85e4; padding: 40rpx;">
      <view style="width: 140rpx; height: 140rpx; border: 1px solid #fff; border-radius: 50%; margin: 0 auto;">
        <u-upload :maxCount="1" @afterRead="uploadAvatar">
          <u-avatar :src="userInfo.avatarPath" size="120rpx" style="margin: 10rpx;"></u-avatar>
        </u-upload>
      </view>
    </view>
    <view style="padding: 40rpx;">
      <u--form :model="userInfo" ref="uForm" labelWidth="160rpx" labelAlign="left">
        <u-form-item label="真实姓名" prop="realName" class="u-border-bottom">
          <u--input placeholder="请输入内容" border="none" v-model="userInfo.realName"></u--input>
        </u-form-item>
        <u-form-item label="手机号码" prop="phone" class="u-border-bottom">
          <u--input placeholder="请输入内容" border="none" v-model="userInfo.phone"></u--input>
        </u-form-item>
        <u-form-item label="年龄" prop="age" class="u-border-bottom">
          <u--input placeholder="请输入内容" border="none" v-model="userInfo.age"></u--input>
        </u-form-item>
        <u-form-item label="性别" prop="sex" class="u-border-bottom">
          <u-radio-group v-model="userInfo.sex" size="36rpx">
            <u-radio shape="circle" label="男" :name="1" labelSize="32rpx"></u-radio>
            <u-radio shape="circle" label="女" :name="2" labelSize="32rpx" style="margin-left: 36rpx;"></u-radio>
          </u-radio-group>
        </u-form-item>
      </u--form>
    </view>
    <view style="padding: 40rpx;">
      <u-row gutter="32">
        <u-col span="6">
          <u-button icon="arrow-left" text="返回" plain @click="goBack()"></u-button>
        </u-col>
        <u-col span="6">
          <u-button icon="checkmark-circle" text="保存" type="primary" @click="updateInfo()"></u-button>
        </u-col>
      </u-row>
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
  import Navbar from '@/components/navbar/Navbar'

  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        userInfo: {},
        uFormRules: {
          realName: [
            {
              type: 'string',
              required: true,
              message: '请填写姓名',
              trigger: ['blur', 'change']
            },
            {
              min: 2,
              max: 4,
              message: '请输入正确的姓名',
              trigger: ['blur', 'change']
            },
          ],
          phone: [
            {
              required: true,
              message: '请填写手机号',
              trigger: ['blur', 'change']
            },
            {
              validator: (rule, value, callback) => {
                return uni.$u.test.mobile(value);
              },
              message: '手机号码不正确',
              trigger: ['change', 'blur'],
            },
          ],
          age: {
            type: 'number',
            required: true,
            message: '请正确填写年龄',
            trigger: ['blur', 'change']
          },
          sex: {
            type: 'number',
            enum: [1, 2],
            required: true,
            message: '请选择男或女',
            trigger: ['blur', 'change']
          },
        },
      }
    },
    created() {
      this.getInfo()
    }, 
    methods: {
      getInfo() {
        this.$store.dispatch('Info').then(res => {
          this.userInfo = res
        }).then(() => {
          this.$refs.uForm.setRules(this.uFormRules)
        })
      },
      updateInfo() {
        this.$refs.uForm.validate().then(res => {
          this.$store.dispatch('UpdateInfo', this.userInfo).then(res => {
            this.$refs.uToast.show({
              message: '修改成功',
              type: 'success',
              complete: () => {
                this.goBack()
              }
            })
          })
        })
      },
      uploadAvatar(event) {
        this.$store.dispatch('UpdateAvatar', event.file.url).then(res => {
          this.userInfo.avatarPath = event.file.url
          this.$refs.uToast.show({
            message: '修改成功',
            type: 'success',
            complete: () => {
              this.goBack()
            }
          })
        })
      },
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
</style>