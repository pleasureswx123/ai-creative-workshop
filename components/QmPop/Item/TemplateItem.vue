<template>
  <view class="item-box" :class="{active}" @tap.stop>
    <view class="pic-box">
      <video class="video-box" object-fit="contain" :src="info.video_url" />
      <!--      <video
                :id="`video-temp-${info.id}`"
                :autoplay="false" :loop="true" :controls="false"
                :show-center-play-btn="false"
                object-fit="contain"
                :src="info.video_url" />-->
    </view>
    <view @tap="$emit('select', info)">
      <u-gap height="20rpx" />
      <view class="title">{{info.title}}</view>
      <u-gap height="20rpx" />
    </view>
  </view>
</template>

<script>
export default {
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
  .pic-box {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    position: relative;
    display: grid;
    place-items: center;
    video {
      width: 100%;
      height: 100%;
      background-color: #23242C;
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