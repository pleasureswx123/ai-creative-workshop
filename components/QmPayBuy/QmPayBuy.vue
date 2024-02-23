<template>
  <view>
    <view class="upgrade-ft">
      <view class="tips-box">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-wechatpay" color="#039703" size="18" />
        <view>即将跳转到微信安全支付</view>
      </view>
      <view class="btn-box" @tap="handleBuy">确定购买</view>
      <view class="tips-box">
        <uni-icons v-if="agree" custom-prefix="iconfont-qm" type="icon-qm-checked1" color="rgba(255,255,255,.8)" size="16" />
        <uni-icons v-else custom-prefix="iconfont-qm" type="icon-qm-unchecked" color="rgba(255,255,255,.5)" size="16" />
        <view>购买即视为同意 <text @tap.stop="handleView">《会员和积分服务协议》</text></view>
      </view>
    </view>
    <WechatPop :value.sync="show" :info="payPopInfo"></WechatPop>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
const app = getApp();

export default {
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          goods_id: '',
          type: '', // vip goods
        }
      }
    },
  },
  data() {
    return {
      agree: true,
      show: false,
      payOrderInfo: {},
    }
  },
  computed: {
    ...mapState('OrderInfo', ['orderInfo']),
    payPopInfo() {
      return {
        ...(this.orderInfo || {}),
        ...this.payOrderInfo,
      }
    },
  },
  methods: {
    ...mapActions('OrderInfo', ['createOrder', 'confirmOrder']),
    handleBuy() {
      this.confirmOrder(this.params).then(() => {
        let platform = 'web';
        // if (!this.qmIsWechat() && this.qmIsMobile()) {
        if (this.qmIsWechat()) {
          platform = 'h5';
        }
        this.createOrder(Object.assign({}, this.params, {
          platform
        })).then(res => {
          if (res.pay_url) {
            platform = 'web';
          }
          if(platform === 'h5') {
            const config = res || {};
            app.globalData.jssdk.chooseWXPay({
              timestamp: config.timestamp,
              nonceStr: config.nonceStr,
              package: config.package,
              signType: config.signType,
              paySign: config.paySign,
              success: () => {
                uni.showModal({
                  title: '提示',
                  content: '支付成功',
                  showCancel: false,
                  confirmText: '确定',
                  complete: () => {
                    uni.reLaunch({
                      url: '/pages/member/index'
                    });
                  }
                });
              },
              fail: () => {
                uni.showModal({
                  title: '提示',
                  content: '发起支付失败',
                  showCancel: false,
                  confirmText: '确定',
                  complete: () => {
                    uni.reLaunch({
                      url: '/pages/member/index'
                    });
                  }
                });
              }
            });
          } else {
            this.payOrderInfo = res;
            this.show = true;
          }
        });
      });
    },
    handleView() {
      // uni.navigateTo({
      //   url: '/pages/user/integral-rule'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.upgrade-ft {
  padding: 30rpx 0;
  user-select: none;
}
.tips-box {
  font-size: 24rpx;
  display: flex;
  gap: 10rpx;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  color: rgba(255,255,255,.5)
}
.btn-box {
  margin: 30rpx 0;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 10rpx;
  box-shadow: 0 8rpx 8rpx 0 rgba(0, 0, 0, .25);
  text-align: center;
  font-size: 30rpx;
  color: #46290F;
  background: linear-gradient(91deg, #F1CDAD 6%, #EEA25C 103%);
  cursor: pointer;
}
</style>