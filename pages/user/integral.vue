<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="title-box">
      <view>消耗历史记录</view>
<!--      <view class="rule-btn" @tap="jumpRule">消耗规则</view>-->
    </view>
    <view class="list-box">
      <view class="item" v-for="(item,index) in list" :key="index">
        <view class="info">
          <view class="title">任务类型 - {{ item.jifen_title }}</view>
          <view class="con">
            <text>任务id：{{ item.task_id }}</text>
            <text>生成时间：{{ item.create_time }}</text>
          </view>
        </view>
        <view class="num" :class="{add: item.jifen_consume_type !== 1}">{{ item.jifen_val }}</view>
      </view>
    </view>
    <u-gap height="30"></u-gap>
    <QmLoadMore :status="loadStatus" @load="loadNextData"></QmLoadMore>
  </view>
</template>

<script>
import { userApi } from '@/api';

export default {
  data() {
    return {
      list: [],
      page: 1,
      pagesize: 20,
      loadStatus: '', // more/loading/noMore
    };
  },
  onShow() {
    this.initParams();
    this.loadMore();
  },
  onPullDownRefresh() {
    this.initParams();
    this.loadMore().then(() => {
      uni.stopPullDownRefresh();
    });
  },
  onReachBottom() {
    this.loadNextData();
  },
  methods: {
    loadNextData() {
      this.page += 1;
      this.loadMore();
    },
    jumpRule() {
      uni.navigateTo({
        url: '/pages/user/integral-rule'
      })
    },
    initParams() {
      this.list = [];
      this.page = 1;
      this.loadStatus = '';
    },
    loadMore() {
      if(this.loadStatus === 'noMore') {
        return;
      }
      this.loadStatus = 'loading';
      return userApi.getMyJiFenRecord({page: this.page, pagesize: this.pagesize}).then(res => {
        const {list = []} = res || {};
        this.list = [...this.list, ...(list || [])];
        this.loadStatus = list.length < this.pagesize ? 'noMore' : 'more';
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
    right: 30rpx;
    transform: translate3d(0, -50%, 0);
    font-size: 28rpx;
    color: rgba(255, 255, 255, .9);
    height: 50rpx;
    line-height: 50rpx;
    border-radius: 12rpx;
    border: 2rpx solid rgba(255, 255, 255, .9);
    padding: 0 25rpx;
    cursor: pointer;
  }
}
.list-box {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20rpx;
  .item {
    border-radius: 20rpx;
    background-color: #1D1E23;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 30rpx;
    gap: 20rpx;
  }
  .info {
    flex: 1;
    min-width: 0;
  }
  .title {
    color: #fff;
    font-size: 28rpx;
    margin-bottom: 10rpx;
  }
  .con {
    color: #909399;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    gap: 30rpx;
  }
  .num {
    font-size: 28rpx;
    font-weight: 700;
    color: #F47421;
    &.add{
      color: #00DACD;
    }
  }
}

@media screen and (min-width: 750px) {
  .list-box {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
