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
        <QmPayBuy :params="params"></QmPayBuy>
      </view>
    </u-popup>
  </view>
</template>

<script>
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
    }
  },
  computed: {
    params() {
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