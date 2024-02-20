<template>
  <view class="user-info-container">
    <view class="user-box" @tap="jumpSetting">
      <view class="avatar">
        <image v-if="userInfoState.avatar" :src="userInfoState.avatar" mode="aspectFit" />
      </view>
      <view class="info">
        <view class="name-box">
          <view class="name">{{userInfoState.nickname || '未设置昵称' }}</view>
          <view :class="levelClass" v-if="isVip">
            <uni-icons custom-prefix="iconfont-qm" type="icon-qm-vip1" color="rgba(255,255,255,.6)" size="16" />
          </view>
        </view>
        <view class="user-id">MID:{{userInfoState.user_id}}</view>
      </view>
      <view v-if="isShowEdit" class="edit-btn-box">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-editoutline" color="rgba(255,255,255,.5)" size="16" />
      </view>
    </view>
    <view class="balance-box" v-if="isShowBalance">
      <view class="lf"></view>
      <view class="info">
        <view class="tag-box" @tap="jumpBalance">
          <view class="tag">
            <view class="icon-wrapper">
              <uni-icons custom-prefix="iconfont-qm" type="icon-qm-flash3" color="rgb(255 174 26)" size="16" />
            </view>
            <text>{{userInfoState.balance}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: {
    isShowBalance: {
      type: Boolean,
      default: true
    },
    isShowEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
    isVip() {
      return !!(+this.userInfoState.is_vip)
    },
    vipLevel() {
      return this.userInfoState.vip_level
    },
    levelClass() {
      const level = +this.vipLevel;
      return {
        common: level === 1,
        silver: level === 2,
        gold: level === 3,
      }
    }
  },
  methods: {
    jumpSetting() {
      this.checkLoginStatus().then(res => {
        uni.navigateTo({
          url: '/pages/user/setting/index'
        });
      })
    },
    jumpBalance() {
      this.checkLoginStatus().then(res => {
        uni.navigateTo({
          url: '/pages/user/integral-detail'
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-info-container {
  padding: 30rpx 0 30rpx;
}
.balance-box {
  display: flex;
  align-items: center;
  gap: 30rpx;
  .lf {
    width: 65rpx;
  }
  .info {
    flex: 1;
    min-width: 0;
  }
}
.user-box {
  display: flex;
  align-items: center;
  gap: 30rpx;
  font-size: 28rpx;
  cursor: pointer;
  .edit-btn-box {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .avatar {
    height: 65rpx;
    width: 65rpx;
    background-color: gray;
    border-radius: 50%;
    overflow: hidden;
    image {
      height: 100%;
      width: 100%;
    }
  }
  .info {
    flex: 1;
    min-width: 0;
    .user-id {
      margin-top: 6rpx;
      color: #818181;
    }
  }
}
.name-box {
  display: flex;
  align-items: center;
  gap: 10rpx;
  .name {
    color: rgba(255,255,255,.7);
    font-weight: 700;
  }
}
.tag-box {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-top: 8rpx;
  .tag {
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    gap: 6rpx;
    padding: 2rpx 15rpx 2rpx 4rpx;
    color: #fff;
    font-size: 20rpx;
    line-height: 1;
    background-color: rgba(124, 124, 124, .4);
  }
}
.icon-wrapper, .gold {
  background: linear-gradient(135deg, #f9d001 7%, #d36c00 103%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.common {
  .icon-qm-vip1 {
    color: rgba(255,255,255,.6)!important;
  }
}
.silver {
  background: linear-gradient(135deg, #ffffff 7%, #717171 103%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
</style>