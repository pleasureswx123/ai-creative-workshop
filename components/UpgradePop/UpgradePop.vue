<template>
  <view v-if="popMode && show && info">
    <u-popup
        round="20rpx"
        :show="show"
        :mode="popMode"
        @close="show = false">
      <view class="upgrade-container" :class="{'pc': !isMobile}">
        <view class="hd">会员升级信息确认</view>
        <view class="flex-box">
          <view class="title">{{info.title}}</view>
          <view class="price">￥{{info.price}}/月</view>
        </view>
        <view class="desc-box">
          <view class="pointer-row" v-for="(desc, index) in info.desc" :key="index">{{ desc }}</view>
        </view>
        <view class="expiration-box">
          <view class="flex-box">
            <view class="title">会员期限</view>
            <view class="num">{{info.num}}个月</view>
          </view>
          <view class="pointer-row">{{info.vip_expiration_date}}</view>
        </view>
        <view class="flex-box price-box">
          <view class="title">总金额</view>
          <view>￥{{info.pay_price}}</view>
        </view>
        
        <view class="upgrade-ft">
          <view class="tips-box">
            <uni-icons custom-prefix="iconfont-qm" type="icon-qm-wechatpay" color="#039703" size="18" />
            <view>即将跳转到微信安全支付</view>
          </view>
          <view class="btn-box" @tap="handleBuy">确定购买</view>
          <view class="tips-box" @tap="agree = !agree">
            <uni-icons v-if="agree" custom-prefix="iconfont-qm" type="icon-qm-checked1" color="rgba(255,255,255,.8)" size="16" />
            <uni-icons v-else custom-prefix="iconfont-qm" type="icon-qm-unchecked" color="rgba(255,255,255,.5)" size="16" />
            <view>购买即视为同意 <text @tap.stop="handleView">《会员和积分服务协议》</text></view>
          </view>
        </view>
      </view>
    </u-popup>
    <WechatPop :value.sync="showPayPop" :info="payPopInfo"></WechatPop>
  </view>
</template>

<script>
const aaa = {
  "id": 6,
  "title": "超级语言白银会员VIP",
  "price": 143,
  "num": 3,
  "pay_price": 429,
  "desc": [
    "V3.5语言模型无限用",
    "SDXL/SD1.5无限出图",
    "ControlNet控图免费",
    "服务器排队优先特杈",
    "无限创作储存空间"
  ],
  "vip_expiration_date": "2024-02-20~2024-05-20"
};

const a = {
  "order_id": 18,
  "total_fee": 143,
  "pay_url": "weixin://wxpay/bizpayurl?pr=aZ6QHKpzz"
};
import {mapState, mapActions} from 'vuex';
const app = getApp();
export default {
  props: {
    goodsId: {
      type: [String, Number],
      default: ''
    },
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
      agree: true,
      showPayPop: false,
      payOrderInfo: {},
    }
  },
  computed: {
    ...mapState('OrderInfo', ['orderInfo']),
    payPopInfo() {
      return {
        ...this.orderInfo,
        ...this.payOrderInfo,
      }
    },
    createOrderParams() {
      return {
        type: 'vip',
        goods_id: this.goodsId
      }
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
  watch: {
    show: {
      immediate: true,
      handler(status) {
        this.toggleBodyPositionStatus(status)
      }
    },
  },
  beforeDestroy() {
    this.toggleBodyPositionStatus(false)
  },
  methods: {
    ...mapActions('OrderInfo', ['createOrder']),
    handleBuy() {
      let platform = 'web';
      // if (!this.qmIsWechat() && this.qmIsMobile()) {
      if (this.qmIsWechat()) {
        platform = 'h5';
      }
      this.createOrder(Object.assign({}, this.createOrderParams, {
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
                    url: '/pages/index/index'
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
                complete: () => {}
              });
            }
          });
        } else {
          this.payOrderInfo = res;
          this.showPayPop = true;
        }
      });
    },
    handleView() {
      // uni.navigateTo({
      //   url: '/pages/user/integral-rule'
      // })
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/ .u-popup__content {
  background-color: transparent;
}
.upgrade-container {
  background: #303138;
  box-shadow: 0px -10px 8px 0px rgba(0, 0, 0, 0.8);
  padding: 40rpx;
  border-radius: 20rpx 20rpx 0 0;
  box-sizing: border-box;
  user-select: none;
  &.pc {
    //width: 500px;
    border-radius: 20rpx;
  }
  .hd {
    font-size: 36rpx;
    line-height: 2;
    text-align: center;
    color: rgba(255,255,255,.8);
  }
}
.upgrade-ft {
  padding: 30rpx 0;
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
.flex-box {
  display: flex;
  align-items: center;
  color: rgba(255,255,255,1);
  gap: 20rpx;
  height: 80rpx;
  font-size: 28rpx;
  .title {
    flex: 1;
    min-width: 0;
  }
}
.price-box {
  font-size: 32rpx;
}
.expiration-box {
  margin: 50rpx 0 30rpx;
  border-top: 2rpx solid rgba(255,255,255,.1);
  border-bottom: 2rpx solid rgba(255,255,255,.1);
  padding: 10rpx 0 20rpx;
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
.pointer-row {
  color: #fff;
  font-size: 24rpx;
  line-height: 1.5;
  padding-left: 25rpx;
  position: relative;
  margin-bottom: 10rpx;
  &::before {
    display: block;
    content: '';
    width: 8rpx;
    height: 8rpx;
    background: rgba(255,255,255,.5);
    border-radius: 50%;
    position: absolute;
    top: 14rpx;
    left: 0;
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
</style>