<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="title-box">
      <view>算力详情</view>
      <view class="rule-btn" @tap="jumpRule">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-warning11" color="rgba(255,255,255,.8)" size="14" />
        <text>消耗规则</text>
      </view>
    </view>
    <view class="rule-box">
      <view class="item" v-for="(item, index) in info.items" :key="index">
        <view class="title">{{item.title}}</view>
        <view class="desc">{{item.desc}}</view>
      </view>
    </view>
    
    <div class="balanceList-box">
      <div
          class="item"
          v-for="(item, index) in info.balanceList"
          :key="index">
      <view>{{item.title}}</view>
      <view class="balance">{{item.balance}}</view>
      <view class="desc">{{item.desc}}</view>
      <view class="btn" @tap="jumpType(item.type)">{{item.btnTxt}}</view>
      </div>
    </div>
    
    <view class="btn-box">
      <view class="btn" @tap="show = true">兑换永久算力</view>
      <view class="btn" @tap="jumpRecord">消耗历史记录</view>
    </view>
    <ConversionCode :show.sync="show" />
  </view>
</template>

<script>
import { userApi } from '@/api';

export default {
  onShow() {
    this.getMyJiFenDetail();
  },
  data() {
    return {
      show: false,
      detail: {}
    }
  },
  computed: {
    info() {
      const {sum_consume, month_consume, balance_data} = this.detail || {};
      return {
        items: [
          {title: '总计消耗', desc: sum_consume},
          {title: '本月已消耗', desc: month_consume},
        ],
        balanceList: (balance_data || []).map(item => {
          const temp = {
            1: '充值',
            2: '升级会员',
          }
          return {
            ...item,
            btnTxt: temp[`${item.type}`] || ''
          }
        })
      }
    },
  },
  methods: {
    jumpType(type) {
      const temp = {
        1: '/pages/user/integral-package',
        2: '/pages/member/index',
      }
      let url = temp[`${type}`] || '';
      url && uni.navigateTo({url});
    },
    jumpRecord() {
      uni.navigateTo({
        url: '/pages/user/integral'
      })
    },
    jumpRule() {
      uni.navigateTo({
        url: '/pages/user/integral-rule'
      })
    },
    getMyJiFenDetail() {
      return userApi.getMyJiFenDetail().then(res => {
        this.detail = res || {};
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  font-size: 24rpx;
  padding: 0 30rpx 300rpx;
}
.title-box {
  color: #fff;
  font-size: 28rpx;
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .rule-btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate3d(0, -50%, 0);
    font-size: 24rpx;
    color: rgba(255, 255, 255, .9);
    height: 50rpx;
    line-height: 50rpx;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8rpx;
  }
}
.btn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30rpx;
  .btn {
    text-align: center;
    box-sizing: border-box;
    width: 80%;
    font-size: 28rpx;
    color: rgba(255, 255, 255, .9);
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 16rpx;
    border: 2rpx solid rgba(255, 255, 255, .9);
    cursor: pointer;
  }
}
.rule-box {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20rpx;
  margin-bottom: 20rpx;
  .item {
    border-radius: 20rpx;
    background-color: #1D1E23;
    display: flex;
    align-items: center;
    height: 100rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    color: #fff;
    gap: 20rpx;
    .title {
      flex: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .desc {
      color: #F47421;
    }
  }
}

.balanceList-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  .item {
    display: flex;
    align-items: center;
    gap: 20rpx;
    flex-direction: column;
    border-radius: 20rpx;
    background-color: #1D1E23;
    padding: 30rpx 20rpx;
    font-size: 28rpx;
    color: rgba(255,255,255,.9);
    text-align: center;
    .balance {
      font-size: 40rpx;
      font-weight: bold;
      color: #fff;
    }
    .desc {
      flex: 1;
      min-height: 0;
      font-size: 24rpx;
    }
    .btn {
      margin-top: 20rpx;
      width: 80%;
      max-width: 300rpx;
      border: 2rpx solid #F0C298;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      border-radius: 16rpx;
      color: #F0C298;
      cursor: pointer;
    }
  }
}

@media screen and (min-width: 750px) {
  .rule-box {
    grid-template-columns: repeat(2, 1fr);
  }
  .btn-box .btn {
    width: 500rpx;
  }
}
</style>
