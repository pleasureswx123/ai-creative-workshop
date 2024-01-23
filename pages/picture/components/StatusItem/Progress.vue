<template>
  <view class="pictrue-box">
    <view class="progress-box">
      <view class="progress-bar">
        <u-line-progress :showText="false" :percentage="percentage"></u-line-progress>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 50
    }
  }
}
</script>

<style lang="scss" scoped>
.pictrue-box {
  background-color: #FEEDEE;
  .progress-box {
    height: 300rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .progress-bar {
      width: 30%;
    }
  }
}
</style>