<template>
  <view>
    <view class="title">常见问题</view>
    <view class="problem-box">
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="problem">{{item.problem}}</view>
        <view class="answer">{{item.answer}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  line-height: 60rpx;
  font-size: 30rpx;
  color: rgba(255, 255, 255, .7);
}
.problem-box {
  border-radius: 16rpx;
  background: #303138;
  margin: 10rpx 40rpx;
  padding: 30rpx 30rpx;
  .item {
    padding-bottom: 40rpx;
    &:last-child {
      padding-bottom: 0;
    }
    .problem {
      font-size: 26rpx;
      color: #fff;
      line-height: 2;
      text-align: justify;
    }
    .answer {
      font-size: 24rpx;
      color: rgba(255,255,255,.6);
      line-height: 1.8;
      text-align: justify;
    }
  }
}
</style>