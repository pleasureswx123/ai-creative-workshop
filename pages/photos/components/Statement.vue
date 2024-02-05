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
        content: '使用本产品前你须理解，AI产出内容取决于人工智能对大数据的深度学习，不排除其中部分信息可能存在瑕疵、不合理或引发不快之处；故，你须确保，依法使用本服务生成AI作品，不侵犯任何第三方的版权、商标或其他合法权利，不得将生成的作品用于任何非法用途；如因你的不当使用行为导致任何第三方权益受损的，你将依法承担相应法律责任。',
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