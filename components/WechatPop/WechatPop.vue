<template>
  <view v-if="showPay">
    <u-popup
        round="20rpx"
        :show="show"
        :mode="popMode"
        @close="show = false">
      <view class="pay-pop" :class="{'pc': !isMobile}">
        <view class="wx-logo">
          <uni-icons custom-prefix="iconfont-qm" type="icon-qm-wechatfill" color="#fff" size="50" />
        </view>
        <view class="title">请打开微信扫码支付</view>
        <view class="sub-title">正在购买：{{info.title}}-{{info.num}}个月</view>
        <view class="pay-price">
          支付金额： <text>{{info.total_fee}}</text>元
        </view>
        <view class="code-box">
          <vue-qr v-if="info.pay_url" :text="info.pay_url" :size="200" style="width: 400rpx; height: 400rpx;" />
        </view>
        <view class="code-tips">请扫码支付</view>
        <view class="btn-box">
          <view class="btn" @tap="show = false">取消</view>
          <view class="btn confirm">已完成支付</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {mapActions} from 'vuex';
import VueQr from 'vue-qr';
const app = getApp();

export default {
  components: { VueQr },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {
        return null
      }
    },
  },
  data() {
    return {
      timer: null
    }
  },
  computed: {
    showPay() {
      return !!this.popMode && !!this.show && !!this.info
    },
    isMobile() {
      return !!['android', 'ios'].includes(app.globalData.system)
    },
    popMode() {
      return this.isMobile ? 'bottom' : 'center';
    },
    show: {
      get() {
        return this.value
      },
      set(status) {
        this.$emit('update:value', status)
      }
    }
  },
  beforeDestroy() {
    this.clearPay();
  },
  watch: {
    showPay(status) {
      if(status) {
        this.payCb()
      } else {
        this.clearPay();
      }
    }
  },
  methods: {
    ...mapActions('OrderInfo', ['checkPay']),
    clearPay() {
      if(this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    payCb() {
      this.clearPay();
      const id = this.info?.order_id;
      if(!id) {
        return false;
      }
      this.timer = setInterval(() => {
        this.checkPay({order_id: id}).then(resData => {
          if(resData?.ispay) {
            this.clearPay();
            uni.showModal({
              title: '提示',
              content: '支付成功',
              showCancel: false,
              confirmText: '确定',
              complete: function () {
                uni.reLaunch({
                  url: '/pages/index/index'
                });
              }
            });
          }
        }).catch(err => {
          this.clearPay();
        })
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .u-popup__content {
  background-color: transparent;
}
.pay-pop {
  background-color: #fff;
  padding: 40rpx;
  border-radius: 20rpx 20rpx 0 0;
  box-sizing: border-box;
  user-select: none;
  &.pc {
    border-radius: 20rpx;
  }
}

@media screen and (max-width: 750px) {
  .pc {
    width: 100%;
    margin: 0 auto;
  }
}

@media screen and (min-width: 750px) {
  .pc {
    width: 500px;
    margin: 0 auto;
  }
}

.wx-logo {
  width: 130rpx;
  height: 130rpx;
  margin: 0 auto;
  background-color: green;
  border-radius: 50%;
  display: flex;
  place-content: center;
}
.pay-pop {
  text-align: center;
  color: #333;
  .title {
    font-size: 36rpx;
    padding: 30rpx 60rpx;
  }
  .sub-title, .pay-price, .code-tips {
    padding: 10rpx 0;
    font-size: 28rpx;
  }
  .pay-price text, .code-tips{
      color: red;
      font-weight: bold;
  }
}
.btn-box {
  padding: 30rpx 50rpx;
  display: flex;
  align-items: center;
  gap: 50rpx;
  .btn {
    font-size: 30rpx;
    height: 80rpx;
    line-height: 80rpx;
    flex: 1;
    min-width: 0;
    color: #fff;
    border-radius: 10rpx;
    background: #787878;
    &.confirm {
      background: linear-gradient(94deg, #F1CDAD 7%, #EEA25C 102%);
      color: #46290F;
    }
  }
}
.code-box {
  margin: 20rpx auto;
  width: 400rpx;
  height: 400rpx;
  background: #f7f7f8;
  overflow: hidden;
  border-radius: 20rpx;
}
</style>