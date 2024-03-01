<template>
  <view class="video-box">
    <video
        class="video"
        ref="myVideo"
        id="myVideo"
        crossorigin="anonymous"
        :autoplay="false"
        :loop="true"
        :src="src"
        @loadedmetadata="loadedmetadata"
        :controls="false"
        :muted="true"
        :show-center-play-btn="false"
        object-fit="fill"
        x5-playsinline="true"
        playsinline="true"
        webkit-playsinline="true"
        x-webkit-airplay="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen=""
        x5-video-orientation="portraint" />
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      videoContext: null,
    }
  },
  created() {
    this.videoContext = uni.createVideoContext('myVideo', this);
  },
  mounted() {
  },
  methods: {
    loadedmetadata() {
      this.videoContext.play();
    }
  }
}
</script>

<style lang="scss" scoped>
.video-box {
  &, .video {
    width: 100%;
    height: 100%;
  }
}
</style>