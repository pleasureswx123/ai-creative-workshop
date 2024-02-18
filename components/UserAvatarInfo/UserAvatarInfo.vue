<template>
  <view class="user-box">
    <view class="avatar">
      <image v-if="userInfoState.avatar" :src="userInfoState.avatar" mode="aspectFit" />
    </view>
    <view class="info">
      <view class="name">{{userInfoState.nickname || '未设置昵称' }}</view>
      <view class="user-id">MID:{{userInfoState.user_id}}</view>
      <view class="tag-box">
        <view class="tag">
          <uni-icons custom-prefix="iconfont-qm" type="icon-qm-flash3" color="rgb(255 174 26)" size="18" />
          <text>{{userInfoState.balance}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
  },
}
</script>

<style lang="scss" scoped>
.user-box {
  padding: 30rpx 0 10rpx;
  display: flex;
  align-items: center;
  gap: 30rpx;
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
    .name {
      font-size: 24rpx;
      color: rgba(255,255,255,.7);
      font-weight: 700;
    }
    .user-id {
      font-size: 24rpx;
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