<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <MemberInfo></MemberInfo>
    <template v-if="$getModuleStatus().pay">
      <AuiMemberVipDesc></AuiMemberVipDesc>
      <AuiOrderGoodsList :value.sync="goodsId" :list="goodsList"></AuiOrderGoodsList>
      <AuiOrderGoodsType v-show="goodsId !== '17'" :type.sync="typeNum" :list="goodsType"></AuiOrderGoodsType>
      <view class="btn-box" @tap="handleUpgrader">{{ btnTxt }}</view>
    </template>
    <OrderCommonProblem :list="commonProblem"></OrderCommonProblem>
    <UpgradePop :value.sync="showUpgradePop" :info="orderInfo" :goodsId="goodsId"></UpgradePop>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
    ...mapState('OrderInfo', ['goodsList', 'goodsType', 'commonProblem', 'orderInfo']),
    isVip() {
      return !!(+this.userInfoState.is_vip)
    },
    btnTxt() {
      return this.isVip ? '购买会员' : '升级会员'
    }
  },
  data() {
    return {
      showUpgradePop: false,
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
    this.bindWechatAuth();
    this.getGoodsType();
    this.getCommonProblem();
  },
  methods: {
    ...mapActions('OrderInfo', ['getGoodsType', 'getGoodsList', 'getCommonProblem', 'confirmOrder']),
    handleUpgrader() {
      this.confirmOrder({
        type: 'vip',
        goods_id: this.goodsId,
      }).then(res => {
        this.showUpgradePop = true;
      })
    }
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