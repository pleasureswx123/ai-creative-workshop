<template>
  <view class="tips">
    <view class="tips-con">
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-warning" color="#9d8520" size="16" />
      所有任务自生成之日起为您保留30天，请尽快下载你的图片和视频哦。
    </view>
    <uni-icons custom-prefix="iconfont-qm" type="icon-qm-close" color="rgba(255,255,255,.8)" size="25" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    getData() {}
  }
}
</script>

<style lang="scss" scoped>
.tips {
  background: #3a3a3a;
  color: #757575;
  padding: 20rpx 30rpx;
  line-height: 1.5;
  font-size: 24rpx;
  margin: 0 0 20rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
  .icon-qm-warning {
    display: inline-block;
    vertical-align: -2rpx;
    margin-right: 8rpx;
  }
  .tips-con {
    flex: 1;
    min-width: 0;
  }
}
</style>