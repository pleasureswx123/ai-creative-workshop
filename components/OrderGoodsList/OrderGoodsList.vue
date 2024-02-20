<template>
  <view style="color: #fff;">
    <scroll-view class="scroll-view_H" scroll-x="true">
      <view
          class="scroll-view-item_H"
          v-for="item in list"
          :key="item.id">
        <view
            class="item-box"
            :class="{active: item.id === 3}"
        >
          <view class="title">{{item.title}}</view>
          <view class="line"></view>
          <view class="desc-box">
            <view class="desc-row" v-for="(desc, index) in item.desc" :key="index">{{desc}}</view>
          </view>
          <view class="item-ft">
            <view class="price-box">
              <view class="price">￥<text>{{item.price}}</text>/月</view>
              <view class="market-price">￥{{item.market_price}}</view>
            </view>
            <view class="num">{{item.computing_power}}</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
const a = {
  "id": 6,
  "title": "白银会员",
  "price": 143,
  "market_price": 159,
  "num": 3,
  "hint": null,
  "desc": [
    "V3.5语言模型无限用",
    "SDXL/SD1.5无限出图",
    "ControlNet控图免费"
  ],
  "is_default": 0
};
export default {
  props: {
    type: {
      type: [String, Number],
      default: ''
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
}
</script>

<style lang="scss" scoped>
.scroll-view_H {
  white-space: nowrap;
  width: 100%;
  padding: 20rpx 0 40rpx;
}
.scroll-view-item_H {
  display: inline-block;
  width: 60%;
  height: 540rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  vertical-align: middle;
  .item-box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20rpx 30rpx;
    border-radius: 16rpx;
    background: #303138;
    border: 2rpx solid #303138;
    white-space: normal;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &.active {
      border: 2rpx solid #F0BB8B;
      background: rgba(240, 187, 139, 0.1);
      .title {
        color: #F0BB8B;
      }
    }
  }
}
.item-box {
  .title {
    text-align: center;
    font-size: 40rpx;
    color: rgba(255,255,255,.8);
  }
  .line {
    position: relative;
    left: 50%;
    height: 20rpx;
    border-bottom: 2rpx solid rgba(255,255,255,.3);
    width: 10%;
    margin-bottom: 20rpx;
    transform: translate3d(-50%, 0, 0);
  }
  .desc-box {
    flex: 1;
    min-height: 0;
  }
  .desc-row {
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
}
.item-ft {
  .price-box {
    display: flex;
    align-items: center;
    padding: 20rpx 0 0;
    gap: 10rpx;
    .price {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      color: #F0BB8B;
      text {
        font-size: 48rpx;
      }
    }
    .market-price {
      font-size: 32rpx;
      color: rgba(255,255,255,.5);
      text-decoration: line-through;
    }
  }
  .num {
    font-size: 24rpx;
    color: #C59972
  }
}

@media screen and (min-width: 750px) {
  .scroll-view-item_H {
    width: 33%;
  }
}
</style>