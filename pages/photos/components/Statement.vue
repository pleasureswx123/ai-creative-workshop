<template>
  <view class="statement-box">
    <view class="txt-con" @tap="showStatement">
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-warning1" color="var(--txt-color2)" size="16" />
      <text class="txt">免责声明</text>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    showStatement() {
      uni.showModal({
        title: '提示',
        content: '供用交产品前你次理能，A1产出必路叔送于人工部说对大故进的深厦学习，不机校其中部分信息可脂存在殺、故，不合理成号1发不候之处；品，你須确保，依法使用本服务生陇A作不公花任约部三方的版权、场标团其花合法权利，；不得好生成的作品用于任饲非法用途;如四你的不当处用行为宁放任何苑三方权益受按的，你招依法永担相皮法律费住。',
        confirmText: '确定',
        showCancel: false,
        success: function () {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.statement-box {
  margin-top: 20rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  color: rgba(255,255,255, .9);
  font-size: 28rpx;
  display: grid;
  place-items: center;
  .txt-con {
    display: flex;
    align-items: center;
  }
  .txt {
    padding-left: 8rpx;
  }
}
</style>