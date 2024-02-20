<template>
  <Layout :info="info" :disabled="true" >
    <view class="pictrue-box">
      <view class="msg-con">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-eye-closed" color="var(--txt-color2)" size="40" />
        <view>作品被系统判定为违规</view>
        <view class="err-msg">{{info.state_err_msg}}</view>
      </view>
    </view>
  </Layout>
</template>

<script>
import Layout from './Layout.vue';

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
  },
  components: { Layout },
}
</script>

<style lang="scss" scoped>
.pictrue-box {
  background-color: var(--txt-color3);
  height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .msg-con {
    text-align: center;
    color: var(--txt-color2);
    font-size: 20rpx;
    line-height: 1.5;
  }
  .err-msg {
    width: 60%;
    margin: 0 auto;
  }
}
</style>