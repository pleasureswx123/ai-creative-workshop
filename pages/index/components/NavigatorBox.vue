<template>
  <view class="navigator-box">
    <view class="top-nav">
      <view class="item" v-for="(item, index) in topNavList" :key="index" @tap="jumpToPath(item.web_path)">
        <text>{{item.title}}</text>
      </view>
    </view>
    <view class="grid-nav">
      <view class="item" v-for="(item, index) in gridNavList" :key="index" @tap="jumpToPath(item.web_path)">
        <uni-icons v-if="item.iconName" custom-prefix="iconfont-qm" :type="item.iconName" color="#77787B" size="28" />
        <view class="title">{{item.short_title}}</view>
      </view>
    </view>
    <view class="ai-btn" v-for="(item, index) in btnList" :key="index" @tap="jumpToPath(item.web_path)">{{item.title}}</view>
  </view>
</template>

<script>
export default {
  props: {
    topNavList: {
      type: Array,
      default: () => ([])
    },
    gridNavList: {
      type: Array,
      default: () => ([])
    },
    btnList: {
      type: Array,
      default: () => ([])
    },
  },
  methods: {
    jumpToPath(path) {
      uni.navigateTo({
        url: `/${path}`
      })
    }
  },
  data() {
    return {
      gridNavListTemplate: [
        {
          "title": "跳舞视频",
          "short_title": "跳舞视频",
          "img": "",
          iconName: 'icon-qm-MaterialSymbolsLinkedCameraRounded',
          "web_path": "pages/picture/text-to-dance-video?type=26"
        },
      ],
      topNavListTemplate: [
        {
          "title": "文生视频",
          "short_title": "文生视频",
          "img": "",
          "web_path": "pages/picture/text-to-video?type=25"
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.navigator-box {
  position: relative;
  margin: -150rpx 30rpx 30rpx;
  padding: 30rpx 30rpx 20rpx;
  background: #fff;
  border-radius: 30rpx;
  box-shadow: 0 0 20rpx 2rpx rgba(0, 0, 0, .1);
  user-select: none;
}
.top-nav {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
  .item {
    flex: 1;
    min-width: 0;
    border-radius: 20rpx;
    background: red;
    color: #fff;
    font-size: 36rpx;
    height: 100px;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
    box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, .3);
    &:first-child {
      background: linear-gradient(90deg, #F7034D 0%, #D24FEB 100%);
    }
    &:last-child {
      background: linear-gradient(90deg, #FFC526 0%, #04B4AB 100%);
    }
  }
}
.grid-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 -30rpx;
  .item {
    height: 120rpx;
    border-right: 2rpx solid #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 30rpx;
    cursor: pointer;
    &:nth-child(4n) {
      border-right: none;
    }
    .title {
      padding-top: 4rpx;
      font-size: 24rpx;
    }
  }
}
.ai-btn {
  margin: 0 auto;
  width: 95%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  background: #2F2F2F;
  color: #fff;
  font-size: 28rpx;
  text-align: center;
  cursor: pointer;
  margin-bottom: 20rpx;
  &:last-child {
    margin-bottom: 0;
  }
}

</style>