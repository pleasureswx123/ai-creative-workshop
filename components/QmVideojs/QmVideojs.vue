<template>
  <view>
    <view :id="id"></view>
  </view>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      id: uni.$u.guid(20),
      player: null,
      videoOptions: {
        autoplay: false,
        controls: false,
        fluid: true,
        fullscreen: {
          options: {navigationUI: 'auto'}
        },
        sources: [
          {
            src: this.src,
            type: 'video/mp4'
          }
        ],
      }
    }
  },
  methods: {},
  mounted() {
    function myClickHandler(event) {
      // this.requestFullscreen();
    };
    
    const videoElement = document.createElement('video');
    const id = uni.$u.guid(20);
    videoElement.id = id;
    videoElement.className = 'video-js';
  
    const container = document.getElementById(this.id);
    container.appendChild(videoElement);
  
    this.player = videojs(id, Object.assign({}, this.videoOptions, {
      userActions: {
        click: myClickHandler
      }
    }), () => {
      this.player.log('onPlayerReady', this);
    });
    
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<!--


<template>
  <view class="video-player-box" :id="id">
  </view>
</template>

<script>
import createVideoPlayer from '@/utils/videoUtil.js'

export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      player: null,
      id: uni.$u.guid(20)
    }
  },
  mounted() {
    this.player = createVideoPlayer(this.id, this.src);
  },
  beforeDestroy() {
    this.player = null;
  }
}
</script>

<style lang="scss" scoped>
.video-player-box {
  display: block;
  width: 100%;
  height: 100%;
}
</style>-->
