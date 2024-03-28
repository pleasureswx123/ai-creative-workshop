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
    <AuiWechatPop :value.sync="show" :info="payPopInfo" :type="params.type"></AuiWechatPop>
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
    ...mapState('UserInfo', ['userInfoState']),
    isBindWechat() {
      return !!(+this.userInfoState?.bind_wechat);
    },
    payPopInfo() {
      return {
        ...(this.orderInfo || {}),
        ...this.payOrderInfo,
      }
    },
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions('OrderInfo', ['createOrder', 'confirmOrder']),
    ...mapActions('UserInfo', ['getUserInfo']),
    // weixinPay: function (t) {
    //   var e = this;
    //   Jt({
    //     order_id: t,
    //     pay_type: this.pay_type
    //   }).then((function (t) {
    //         t.data.code_url && "wx_wap" === e.pay_type ? window.location.href = t.data.code_url + "&redirect_url=https://gptai.chaojiyuyan.com/web/" : e.pay_url = t.data.code_url
    //       }
    //   )).catch((function (t) {
    //         403 === t.errno && e.showLogin()
    //       }
    //   ))
    // },
    // aaa: function () {
    //   this.getVipList(),
    //       "desktop" === this.$store.state.app.device ? (this.vip_id = 3, this.pay_type = "wx_qr", this.createOrder()) : this.pay_type = "wx_wap"
    // },
    handleBuy() {
      this.checkLoginStatus().then(() => {
        if(this.qmIsWechat() && !this.isBindWechat) {
          uni.showModal({
            title: '提示',
            content: '请先进行微信授权后再支付',
            cancelText: '取消',
            confirmText: '跳转授权',
            success: () => {
              this.getWechatCode();
            }
          });
          return
        }
        this.confirmOrder(this.params).then(() => {
          let trade_type = this.qmIsMobile() ? 'mweb' : 'native';
          if(this.qmIsWechat() && this.isBindWechat) {
            trade_type = 'jsapi'
          }
          // jsapi：是微信浏览器   mweb：是移动端手机浏览器   native：是web端浏览器
          this.createOrder(Object.assign({}, this.params, {
            // platform: this.qmIsMobile() ? 'h5' : 'web', trade_type
            platform: 'h5', trade_type
          })).then(res => {
            if (trade_type === 'jsapi') {
              const config = res || {};
              const url = window.location.hash.slice(1);
              const {appId, nonceStr, package: packageStr, paySign, signType, timeStamp} = res || {};
              this.payReady({
                appId,     //公众号ID，由商户传入
                timeStamp,         //时间戳，自1970年以来的秒数
                nonceStr, //随机串
                package: packageStr,
                signType,         //微信签名方式：
                paySign //微信签名
              }, url);
              return
              uni.showModal({
                title: '提示',
                content: `${JSON.stringify(res)}`,
                cancelText: '取消',
                confirmText: '确定',
                success: () => {
  
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
                            url: '/pages/index/index'
                          })
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
                            url: '/pages/index/index'
                          })
                        }
                      });
                    }
                  });
                  
                  
                }
              });
            }
            if (trade_type === 'mweb') {
              window.location.href= `${res.pay_url}&redirect_url=${encodeURIComponent(window.location.href)}`;
            }
            if(trade_type === 'native') {
              this.payOrderInfo = res;
              this.show = true;
            }
          });
        });
      })
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