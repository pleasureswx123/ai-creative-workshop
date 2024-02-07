<template>
  <u-popup zIndex="100750" :show="show" mode="center" @close="show = false" overlayStyle="background: rgba(0,0,0,.1)">
    <view class="video-pop-wrapper">
      <view class="video-box">
        <view class="close-box">
          <icon @tap="show = false" color="var(--txt-color1)" type="cancel" size="30" />
        </view>
        <video v-if="info" object-fit="contain" :src="videoUrl" />
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {
    showPreview: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object
    }
  },
  computed: {
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
  .video-box {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
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