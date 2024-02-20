<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <MemberInfo></MemberInfo>
    <MemberVipDesc></MemberVipDesc>
    <OrderGoodsList :value.sync="goodsId" :list="goodsList"></OrderGoodsList>
    <OrderGoodsType :type.sync="typeNum" :list="goodsType"></OrderGoodsType>
    <view class="btn-box">{{goodsId}}-{{typeNum}}-升级会员</view>
    <OrderCommonProblem :list="commonProblem"></OrderCommonProblem>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  computed: {
    ...mapState('OrderInfo', ['goodsList', 'goodsType', 'commonProblem']),
  },
  data() {
    return {
      goodsId: '',
      typeNum: '',
    }
  },
  watch: {
    typeNum(num) {
      if(num) {
        this.getGoodsList({type: 'vip', num});
      }
    }
  },
  onShow() {
    this.getGoodsType();
    this.getCommonProblem();
  },
  methods: {
    ...mapActions('OrderInfo', ['getGoodsType', 'getGoodsList', 'getCommonProblem']),
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background: #0D0D0D;
  font-size: 24rpx;
  padding: 30rpx 0 300rpx;
  .btn-box {
    margin: 40rpx;
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
}
</style>