<template>
  <view class="item-box" :class="{active}" @tap="$emit('select', info)">
    <view class="video-wrapper">
      <image mode="aspectFit" :src="info.img_url"></image>
      <view class="play-box">
        <view class="play-btn">
          <uni-icons @tap="previewVideo(info)" custom-prefix="iconfont-qm" type="icon-qm-play" color="rgba(255,255,255,.8)" size="40" />
        </view>
      </view>
    </view>
    <view>
      <u-gap height="20rpx" />
      <view class="title">{{info.title}}</view>
      <u-gap height="20rpx" />
    </view>
  </view>
</template>

<script>
export default {
  inject: ['previewVideo'],
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePlay() {
      console.log(123)
    },
  }
}
</script>

<style lang="scss" scoped>
.item-box {
  border: 1px solid #23242C;
  border-radius: 20rpx;
  background-color: #23242C;
  position: relative;
  overflow: hidden;
  &.active {
    border-color: #ff0000;
  }
  .video-wrapper {
    width: 100%;
    aspect-ratio: 9 / 9;
    overflow: hidden;
    position: relative;
    display: grid;
    place-items: center;
    border-radius: 20rpx;
    image {
      width: 100%;
      height: 100%;
      background-color: #23242C;
    }
    .play-box {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0,0,0,.5);
      .play-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        border-radius: 50%;
      }
    }
  }
  .title {
    color: #fff;
    font-size: 28rpx;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
  }
}
</style>