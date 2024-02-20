<template>
  <view>
    <view class="status-box" :class="{vip: isVip}">
      <view class="title">{{statusInfo.tips}}</view>
      <view class="btn-box" @tap="statusInfo.cb">
        <text>{{statusInfo.btnTxt}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
    isVip() {
      return !!(+this.userInfoState.is_vip)
    },
    vipLevel() {
      return this.userInfoState.vip_level
    },
    statusInfo() {
      const vip = this.isVip;
      const temp = ['', '普通会员', '白银会员', '黄金会员'];
      const levelTxt = temp[`${this.vipLevel}`] || '';
      return {
        tips: vip ? `${levelTxt}VIP` : '成为VIP会员解锁更多权益',
        btnTxt: vip ? '查看' : '升级',
        cb: vip ? this.handleView : this.handleUpgrade
      }
    }
  },
  methods: {
    handleView() {
      alert(`查看`)
    },
    handleUpgrade() {
      uni.navigateTo({
        url: '/pages/member/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.status-box {
  height: 80rpx;
  border-radius: 16rpx;
  background: #1D1E23;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin: 0 0 20rpx;
  font-size: 28rpx;
  &.vip {
    background: linear-gradient(92deg, #69523D 6%, #90531A 103%);
    .title {
      color: #F0C8A3;
    }
  }
  .title {
    flex: 1;
    min-width: 0;
    color: #F0BB8B;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .btn-box {
    padding: 0 16rpx;
    height: 45rpx;
    border-radius: 10rpx;
    background: linear-gradient(95deg, #F1CDAD 8%, #EEA25C 102%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0,0,0,.9);
    cursor: pointer;
  }
}
</style>