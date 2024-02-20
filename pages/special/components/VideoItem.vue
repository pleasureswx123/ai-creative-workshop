<template>
  <view class="video-wrapper" :style="[videoBoxStyle(info)]">
    <video v-if="info" :controls="true" object-fit="contain" :src="videoUrl" :poster="info.cover_img" />
<!--    <img :src="info.cover_img" alt="" />-->
    <view class="play-box">
      <view class="play-btn">
        <uni-icons @tap="previewVideo(info)" custom-prefix="iconfont-qm" type="icon-qm-play" color="rgba(255,255,255,.8)" size="40" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  inject: ['previewVideo'],
  props: {
    info: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  computed: {
    videoBoxStyle(info) {
      return info => {
        const {width, height} = info || {};
        const ratio = (width && height) ? `${width} / ${height}` : `16 / 9`;
        return {
          'aspect-ratio': ratio
        }
      }
    },
    videoUrl() {
      return this.info?.video_url || this.info?.url || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrapper {
  border: 2rpx solid rgba(255,255,255,.1);
  background: rgba(255,255,255,.01);
  border-radius: 8rpx;
  padding: 8rpx;
  margin-bottom: 8rpx;
  position: relative;
  box-sizing: border-box;
  aspect-ratio: 16 / 9;
  video {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: auto;
    border: none;
    padding: 0;
    margin: 0;
  }
  .play-box {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    display: none;
    .play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      border-radius: 50%;
    }
  }
}

@media screen and (min-width: 750px) {
  .video-wrapper {
    width: 320px;
    margin: 0 auto 8rpx;
  }
}
</style>