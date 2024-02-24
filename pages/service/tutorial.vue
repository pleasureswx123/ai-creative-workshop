<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="list-box">
      <view
          class="item"
          v-for="(item, index) in list"
          :key="item.id"
          @tap="jumpArticle(item.id)">
        <view class="title">{{item.title}}</view>
        <view class="info">
          <view class="img-box">
            <image :src="item.icon" mode="aspectFill"></image>
          </view>
          <view class="con">{{item.content_introduce}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { articleApi } from '@/api'

export default {
  data() {
    return {
      list: []
    };
  },
  onShow() {
    this.getList();
  },
  methods: {
    getList() {
      articleApi.getArticleList({type: 'help'}).then(res => {
        this.list = res.list || [];
      })
    },
    jumpArticle(id) {
      uni.navigateTo({
        url: `/pages/service/article?type=help&id=${id}`
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  background: #0D0D0D;
  font-size: 24rpx;
  padding: 30rpx 30rpx 300rpx;
}
.list-box {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30rpx;
  .item {
    border-radius: 10rpx;
    padding: 0 30rpx 30rpx;
    background-color: #fff;
  }
  .title {
    color: #333;
    font-size: 28rpx;
    font-weight: 700;
    height: 80rpx;
    line-height: 80rpx;
  }
  .info {
    display: flex;
    gap: 30rpx;
    .img-box {
      width: 240rpx;
      height: 180rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .con {
      flex: 1;
      min-width: 0;
      color: #888;
      font-size: 28rpx;
    }
  }
}

@media screen and (min-width: 750px) {
  .list-box {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
