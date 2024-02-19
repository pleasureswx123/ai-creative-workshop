<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="title-box">
      <view>算力消耗规则</view>
    </view>
    <view class="rule-box">
      <view class="item" v-for="(item, index) in ruleList" :key="index">
        <view class="title">{{item.title}}</view>
        <view class="desc">{{item.content}}</view>
      </view>
    </view>
    
  </view>
</template>

<script>
import { userApi } from '@/api';

export default {
  onShow() {
    this.getJiFenRule();
  },
  data() {
    return {
      ruleList: [],
    }
  },
  methods: {
    getJiFenRule() {
      return userApi.getJiFenRule().then(res => {
        this.ruleList = res || [];
      })
    },
  }
}
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