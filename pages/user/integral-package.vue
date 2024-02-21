<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="goods-box">
      <view
          class="item"
          :class="{active: goodsId === item.id}"
          @tap="goodsId = item.id"
          v-for="(item, index) in list"
          :key="index">
        <view class="price-box">
          <view class="price">￥<text>{{ item.price }}</text>/月</view>
          <view class="market-price">￥{{ item.market_price }}</view>
        </view>
        <view class="power">{{item.title}}</view>
        <view class="date">{{item.descTxt}}</view>
      </view>
    </view>
    <view class="package-ft">
      <view class="package-ft-inner">
        <QmPayBuy :params="params"></QmPayBuy>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState, mapActions,mapMutations} from 'vuex';

export default {
  data() {
    return {
      agree: true,
      goodsId: '',
    }
  },
  computed: {
    ...mapState('OrderInfo', ['goodsList']),
    list() {
      return (this.goodsList || []).map(item => {
        const descTxt = item.desc.join(' ');
        return {
          ...item,
          descTxt
        }
      })
    },
    params() {
      return {
        type: 'goods',
        goods_id: this.goodsId
      }
    },
  },
  onShow() {
    this.setGoodsList();
    this.getGoodsList({type: 'goods'}).then((res) => {
      const temp = (this.list || []).find(item => +item.is_default === 1);
      this.goodsId = temp ? temp.id :(this.list || [])?.[0]?.id;
    });
  },
  methods: {
    ...mapActions('OrderInfo', ['getGoodsList']),
    ...mapMutations('OrderInfo', ['setGoodsList']),
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background: #0D0D0D;
  font-size: 24rpx;
  padding: 30rpx 30rpx 300rpx;
}
.goods-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  .item {
    box-sizing: border-box;
    padding: 20rpx 30rpx;
    border-radius: 16rpx;
    background: #303138;
    border: 2rpx solid #303138;
    cursor: pointer;
    font-size: 24rpx;
    color: rgba(255,255,255,.5);
    &.active {
      border: 2rpx solid #F0BB8B;
      background: rgba(240, 187, 139, 0.1);
      .power, .date {
        color: #F0BB8B;
      }
    }
    .price-box {
      display: flex;
      align-items: center;
      gap: 20rpx;
      padding-bottom: 30rpx;
      .price {
        color: #F0BB8B;
        text {
          font-size: 60rpx;
          font-weight: bold;
        }
      }
      .market-price {
        font-size: 28rpx;
        text-decoration: line-through;
      }
    }
    .power {
      color: rgba(255,255,255,.8);
      font-size: 36rpx;
      line-height: 2;
    }
  }
}
.package-ft {
  position: fixed;
  bottom: 30rpx;
  left: 30rpx;
  right: 30rpx;
  .package-ft-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 750px) {
  .goods-box {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>