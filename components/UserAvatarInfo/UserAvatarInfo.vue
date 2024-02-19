<template>
  <view class="user-box">
    <view class="avatar" @tap="jumpSetting">
      <image v-if="userInfoState.avatar" :src="userInfoState.avatar" mode="aspectFit" />
    </view>
    <view class="info">
      <view class="name" @tap="jumpSetting">{{userInfoState.nickname || '未设置昵称' }}</view>
      <view class="user-id">MID:{{userInfoState.user_id}}</view>
      <view class="tag-box" @tap="jumpBalance">
        <view class="tag">
          <uni-icons custom-prefix="iconfont-qm" type="icon-qm-flash3" color="rgb(255 174 26)" size="16" />
          <text>{{userInfoState.balance}}</text>
        </view>
      </view>
    </view>
    <view v-if="isShowEdit" class="edit-btn-box">
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-editoutline" color="rgba(255,255,255,.5)" size="16" />
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: {
    isShowEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
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
.user-box {
  padding: 30rpx 0 30rpx;
  display: flex;
  gap: 30rpx;
  font-size: 28rpx;
  cursor: pointer;
  .edit-btn-box {
    margin-top: 10rpx;
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .avatar {
    margin-top: 10rpx;
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
    .name {
      color: rgba(255,255,255,.7);
      font-weight: 700;
    }
    .user-id {
      margin-top: 6rpx;
      color: #818181;
    }
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
</style>