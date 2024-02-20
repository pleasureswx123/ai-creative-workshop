<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="title-box">
      <view>算力详情</view>
      <view class="rule-btn" @tap="jumpRule">消耗规则</view>
    </view>
    <view class="rule-box">
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="title">{{item.title}}</view>
        <view class="desc">{{item.desc}}</view>
      </view>
    </view>
    <view class="btn-box">
      <view class="btn" @tap="jumpRecord">消耗历史记录</view>
    </view>
  </view>
</template>

<script>
import { userApi } from '@/api';

export default {
  onShow() {
    this.getMyJiFenDetail();
  },
  data() {
    return {
      detail: {}
    }
  },
  computed: {
    list() {
      const {balance_reset_date, sum_consume, month_consume, balance} = this.detail || {};
      return [
        {title: '总计消耗', desc: sum_consume},
        {title: '本月已消耗', desc: month_consume},
        {title: '本月度算力余额', desc: balance},
        {title: '算力重置日期', desc: balance_reset_date},
      ]
    }
  },
  methods: {
    jumpRecord() {
      uni.navigateTo({
        url: '/pages/user/integral'
      })
    },
    jumpRule() {
      uni.navigateTo({
        url: '/pages/user/integral-rule'
      })
    },
    getMyJiFenDetail() {
      return userApi.getMyJiFenDetail().then(res => {
        this.detail = res || {};
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  font-size: 24rpx;
  padding: 0 30rpx 300rpx;
}
.title-box {
  color: #fff;
  font-size: 28rpx;
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .rule-btn {
    position: absolute;
    top: 50%;
    right: 30rpx;
    transform: translate3d(0, -50%, 0);
    font-size: 28rpx;
    color: rgba(255, 255, 255, .9);
    height: 50rpx;
    line-height: 50rpx;
    border-radius: 12rpx;
    border: 2rpx solid rgba(255, 255, 255, .9);
    padding: 0 25rpx;
    cursor: pointer;
  }
}
.btn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .btn {
    text-align: center;
    box-sizing: border-box;
    width: 300rpx;
    font-size: 28rpx;
    color: rgba(255, 255, 255, .9);
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 12rpx;
    border: 2rpx solid rgba(255, 255, 255, .9);
    cursor: pointer;
  }
}
.rule-box {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20rpx;
  .item {
    border-radius: 20rpx;
    background-color: #1D1E23;
    display: flex;
    align-items: center;
    height: 100rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    color: #fff;
    gap: 20rpx;
    .title {
      flex: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .desc {
      color: #F47421;
    }
  }
}

@media screen and (min-width: 750px) {
  .rule-box {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
