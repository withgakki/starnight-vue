<template>
  <view>
    <Navbar :hideBtn="true" bgColor="#f3f4f6"></Navbar>
    <view class="profile-top">
      <view class="user-info">
        <view>
          <view class="user-info--name">{{ user.realName }}</view>
          <text class="user-info--account">{{ user.userName }}</text>
        </view>
        <view>
          <u-avatar :src="user.avatarPath" size="120rpx"></u-avatar>
        </view>
      </view>
      <view style="padding: 40rpx 40rpx 0 40rpx;">
        <view class="profile-rule">
          <u-row>
            <u-col span="8">
              <view style="color: white; font-size: 15px;">{{ parseLevel(user.userLevel) }}学生</view>
            </u-col>
            <u-col span="4">
              <u-button icon="question-circle" text="问题反馈" style="height: 36px;"></u-button>
            </u-col>
          </u-row>
        </view>
      </view>
    </view>
    <view style="padding: 40rpx; background-color: #fff;">
      <u-grid class="tools-grid">
        <u-grid-item @click="navigateTo('/pages/center/profile')">
          <u-icon name="account-fill" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">个人资料</text>
        </u-grid-item>
        <u-grid-item @click="resetPassword = true">
          <u-icon name="lock-fill" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">修改密码</text>
        </u-grid-item>
        <u-grid-item @click="navigateTo('/pages/center/log')">
          <u-icon name="coupon-fill" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">操作日志</text>
        </u-grid-item>
        <u-grid-item @click="navigateTo('/pages/question-error/index')">
          <u-icon name="bookmark-fill" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">错题本</text>
        </u-grid-item>
        <u-grid-item @click="navigateTo('/pages/exam/query')">
          <u-icon name="search" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">试卷搜索</text>
        </u-grid-item>
        <u-grid-item @click="navigateTo('/pages/message/index')">
          <u-icon name="email-fill" color="#2979ff" size="60rpx"></u-icon>
          <text class="btn-text">个人消息</text>
          <view class="badge">
            <u-badge :value="unReadMessageCount" type="error" max="99" absolute :offset="[-50, -20]"></u-badge>
          </view>
        </u-grid-item>
      </u-grid>
    </view>

    <view style="padding: 40rpx; margin-top: 200rpx;">
      <u-row gutter="32">
        <u-col span="6">
          <u-button icon="phone" text="联系我们" plain @click="resetContact = true"></u-button>
        </u-col>
        <u-col span="6">
          <u-button icon="reload" text="退出" type="error" @click="logout"></u-button>
        </u-col>
      </u-row>
    </view>

    <Password :show="resetPassword" @close="resetPassword = false"></Password>

    <!-- 联系我们弹出框 -->
    <u-modal :show="resetContact" title="联系我们" :closeOnClickOverlay="true" :showConfirmButton="false"
      @close="resetContact = false">
      <span>联系电话: 123456789</span>
    </u-modal>
  </view>
</template>

<script>
  import Navbar from '@/components/navbar/Navbar'
  import Password from './password.vue'
  import { getUnReadCount } from '@/api/message/index'

  export default {
    components: {
      Navbar,
      Password,
    },
    data() {
      return {
        user: {},
        resetPassword: false,
        resetContact: false,
        unReadMessageCount: 0,
      }
    },
    created() {
      this.getInfo()
      this.getMessageInfo()
    },
    methods: {
      getInfo() {
        const app = this
        app.$store.dispatch('Info').then(res => {
          app.user = res.data
        })
      },
      getMessageInfo() {
        getUnReadCount().then(res => {
          this.unReadMessageCount = res.data
        })
      },
      navigateTo(url) {
        uni.navigateTo({
          url: url
        })
      },
      logout() {
        const app = this
        app.$store.dispatch('Logout').then(res => {
          uni.reLaunch({
            url: '/pages/login/index'
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .profile-top {
    background-color: #f3f4f6;
    padding-top: 50rpx;
  }

  .profile-rule {
    height: 140rpx;
    line-height: 140rpx;
    padding: 0px 40rpx;
    background-color: $u-main-color;
    border-radius: 16px 16px 0 0;
    box-shadow: 0px 16px 26px rgba(0, 0, 0, .8);
  }

  .btn-text {
    font-size: 28rpx;
    color: #606266;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    padding: 40rpx;
    max-width: 100%;
    color: #303133;

    &--name {
      font-size: 56rpx;
      font-weight: bold;
      width: 100%
    }

    &--account {
      font-size: 26rpx;
      color: #909399;
    }

  }
  
  .tools-grid {
    .u-grid-item {
      margin-bottom: 30px;
    }
  }
  
  .badge {
    position: relative;
  }
  
</style>