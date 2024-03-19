<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="code" v-for="(item,index) in list" :key="index">
      <view class="title">{{item.title}}</view>
      <image :src="item.img_url" mode="aspectFit"></image>
      <view>请使用微信扫一扫</view>
    </view>
  </view>

</template>

<script>
import { articleApi } from '@/api';

export default {
  data() {
    return {
      list: []
    }
  },
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      articleApi.getAboutUs().then(res => {
        this.list = res.list || [];
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.page-container {
  background: #0D0D0D;
  padding: 30rpx 30rpx 300rpx;
  font-size: 28rpx;
  text-align: center;
}
.code {
  padding: 30rpx 0;
  margin: 50rpx 30rpx 0;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  color: #B2B2B2;
  .title {
    font-size: 30rpx;
    font-weight: bold;
  }
  image {
    margin: 0 auto;
  }
}
</style>