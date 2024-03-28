<template>
  <view class="video-box">
    <!--#ifndef APP-PLUS-->
    <video
        class="video"
        ref="myVideo"
        id="myVideo"
        crossorigin="anonymous"
        :autoplay="false"
        :loop="true"
        :src="src"
        :poster="poster"
        @loadedmetadata="loadedmetadata"
        :controls="false"
        :muted="true"
        :show-center-play-btn="false"
        disablepictureinpicture disableRemotePlayback
        object-fit="fill"
        x5-playsinline="true"
        playsinline="true"
        webkit-playsinline="true"
        x-webkit-airplay="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen=""
        x5-video-orientation="portraint" />
    <!--#endif-->
    <!--#ifdef APP-PLUS-->
    <view class="video-inner" v-html="videoHtml"></view>
    <!--#endif-->
  </view>
</template>

<script>
import poster from '@/static/images/empty.png'
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      poster,
      videoContext: null
    }
  },
  computed: {
    videoHtml() {
      return `
      <video class="video" ref="myVideo" id="myVideo" crossorigin="anonymous" autoplay loop muted disablepictureinpicture disableRemotePlayback
      poster="${poster}"
      object-fit="fill" x5-playsinline="true" playsinline="true" webkit-playsinline="true"
      x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="" x5-video-orientation="portraint">
      <source src="${this.src}" type="video/mp4" />
</video>
      `
    }
  },
  created() {
    this.videoContext = uni.createVideoContext('myVideo', this);
  },
  mounted() {
    if(this.isWeixiBrowser) {
      setTimeout(() => {
        const v = document.getElementById('myVideo');
        document.removeEventListener('click', this.play);
        document.addEventListener('click', this.play);
      }, 1000)
    }
  },
  methods: {
    play() {
      this.videoContext.play();
    },
    loadedmetadata() {
      this.play();
    }
  }
}
</script>

<style lang="scss" scoped>
.video-box {
  &, .video, .video-inner {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  /deep/ {
    video, .video {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
    video::-webkit-media-controls-start-playback-button {
      display: none;
    }
  
  }
}
</style>