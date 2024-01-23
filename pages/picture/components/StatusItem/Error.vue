<template>
  <view class="pictrue-box">
    <view class="msg-con">
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-warning" color="#c7c7c7" size="40" />
      <view>任务失败</view>
      <view>这可能是网络问题导致，请稍后重试。</view>
      <view>此次任务消耗的积分已退还到你的账户中。</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.pictrue-box {
  background-color: #f7f7f7;
  height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .msg-con {
    text-align: center;
    color: #979797;
    font-size: 20rpx;
    line-height: 1.5;
  }
}
</style>