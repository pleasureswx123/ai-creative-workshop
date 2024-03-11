<template>
  <u-popup zIndex="100750" :show="show" mode="center" @close="show = false" overlayStyle="background: rgba(0,0,0,.1)">
    <view class="video-pop-wrapper">
      <view class="video-wrapper">
        <view class="close-box">
          <icon @tap="show = false" color="var(--txt-color1)" type="cancel" size="30" />
        </view>
        <view class="video-box">
          <video v-if="info && videoUrl" controls="controls" object-fit="contain" :src="videoUrl" />
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {
    aspectRatio: {
      type: String,
      default: '16 / 9'
    },
    showPreview: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object
    }
  },
  computed: {
    // videoBoxStyle(info) {
    //   return info => {
    //     const {width, height} = info || {};
    //     const ratio = (width && height) ? `${width} / ${height}` : this.aspectRatio;
    //     return {
    //       'aspect-ratio': ratio
    //     }
    //   }
    // },
    show: {
      get() {
        return this.showPreview
      },
      set(status) {
        this.$emit('update:showPreview', status)
      }
    },
    videoUrl() {
      return this.info?.video_url || this.info?.url || ''
    }
  },
}
</script>

<style lang="scss" scoped>
.video-pop-wrapper {
  background: rgba(0,0,0,1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  .video-wrapper {
    position: relative;
    width: 100%;
    max-width: 1200px;
    .video-box {
      aspect-ratio: 16 / 9;
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
  .close-box {
    position: absolute;
    top: -100rpx;
    right: 40rpx;
    display: grid;
    place-items: center;
    background: rgba(0,0,0,.5);
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    z-index: 1;
  }
}
</style>