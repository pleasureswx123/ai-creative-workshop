<template>
  <view class="video-box">
    <view class="item">
      <view id="canvasBox" ref="canvasBox" class="video-canvas-box">
<!--        <canvas
            class="canvas"
            canvas-id="myCanvas"
            ref="myCanvas"
            :style="{width: width + 'px', height: height + 'px'}"
        ></canvas>-->
      </view>
    </view>
    <view class="item">
      <view id="videoBox" ref="videoBox" class="video-canvas-box">
<!--        <video
            class="video"
            ref="myVideo"
            id="myVideo"
            crossorigin="anonymous"
            :width="width"
            :height="height"
            :style="`width: ${width}px; height: ${height}px; object-fit: fill;`"
            :autoplay="false"
            :loop="true"
            :src="src"
            @loadedmetadata="loadedmetadata"
            @play="handlePlay"
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
            x5-video-orientation="portraint" />-->
      </view>
    </view>
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
      width: 0,
      height: 0,
      videoContext: null,
      canvas: null,
      canvasCtx: null,
      videoCtx: null,
      videoWidth: 0,
      videoHeight: 0,
    }
  },
  created() {
    uni.getVideoInfo({
      src: this.src,
      success: ({width, height}) => {
        this.videoWidth = width;
        this.videoHeight = height;
      }
    })
  },
  mounted() {
    const {width, height} = this.$refs.canvasBox.$el.getBoundingClientRect();
    this.width = width;
    this.height = height;
    // this.videoContext = uni.createVideoContext('myVideo', this);
    this.$nextTick(() => {
      this.rdVideo.draw(this.src, width, height);
      setTimeout(() => {
        this.rdVideo.startDraw();
      }, 3000)
    })
  },
  methods: {
    computeFrame() {
      // this.canvasCtx.drawImage(this.videoCtx, 0, 0, this.videoWidth / 2, this.videoHeight / 2);
    },
    draw() {
      this.computeFrame();
      setTimeout(() => {
        this.draw();
      }, 0);
    },
    startDraw() {
      setTimeout(() => {
        // this.canvasCtx.clearRect(0, 0, this.width, this.height);
        // this.canvasCtx.fillStyle = 'blue';
        // this.canvasCtx.fillRect(0, 0, this.width, this.height);
        // const a = this.videoContext;
        // const video = document.getElementById('myVideo').querySelector('video');
        // debugger
        // this.canvasCtx.drawImage(video, 0, 0, this.width, this.height);
        // this.canvasCtx.draw();
        //
        
      }, 2000)
    },
    handlePlay() {
    
    },
    loadedmetadata() {
      // this.videoContext.play();
    }
  }
}
</script>


<script module="rdVideo" lang="renderjs">
  import mixinVideo from './videoDraw.js'
  // 监听videos, 有更改调用rdVideo.getAllPoster方法获取视频封面
  export default {
    mixins: [mixinVideo]
  }
</script>
<!--
<script module="111videojs" lang="renderjs">
export default {
  methods: {
    initData() {
      this.initCanvas();
      //this.initVideo();
    },
    initCanvas() {
      const canvas = document.createElement('canvas');
      canvas.id='myCanvas';
      canvas.width=`${this.width}`;
      canvas.height=`${this.height}`;
      canvas.style = `width: ${this.width}px; height: ${this.height}px;`;
      const canvasBox = document.getElementById('canvasBox')
      canvasBox.appendChild(canvas);
      this.canvas = canvas;
    },
    initVideo() {
      const video = document.createElement('VIDEO');
      video.id='myVideo';
      video.setAttribute('ref', 'myVideo');
      video.setAttribute('crossorigin', 'anonymous');
      video.width=`${this.width}`;
      video.height=`${this.height}`;
      video.style = `width: ${this.width}px; height: ${this.height}px;`;
      video.setAttribute('object-fit', 'fill');
      video.setAttribute('muted', 'muted');
      video.setAttribute('autoplay', true);
      video.setAttribute('controls', 'controls');
      video.setAttribute('src', this.src);
      // const y = document.createElement("SOURCE");
      // y.setAttribute("src", this.src);
      // y.setAttribute("type", "video/mp4");
      // video.appendChild(y);
      const videoBox = document.getElementById('videoBox')
      videoBox.appendChild(video);
    },
    processor() {
      const processor = {};
  
      processor.doLoad = function doLoad() {
        const video = document.getElementById("myVideo");
        this.video = video;
        this.c1 = document.getElementById("myCanvas");
        this.ctx1 = this.c1.getContext("2d");
        video.addEventListener("play", () => {
          debugger
          this.width = video.videoWidth / 2;
          this.height = video.videoHeight / 2;
          this.timerCallback();
        }, false);
        video.addEventListener("loadedmetadata", () => {
          debugger
          // video.play();
        }, false);
      };
  
      processor.timerCallback = function timerCallback() {
        if (this.video.paused || this.video.ended) {
          return;
        }
        this.computeFrame();
        setTimeout(() => {
          this.timerCallback();
        }, 0);
      };
  
      processor.computeFrame = function () {
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        // const frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        // const data = frame.data;
        //
        // for (let i = 0; i < data.length; i += 4) {
        //   const red = data[i + 0];
        //   const green = data[i + 1];
        //   const blue = data[i + 2];
        //   if (green > 100 && red > 100 && blue < 43) {
        //     data[i + 3] = 0;
        //   }
        // }
        // this.ctx2.putImageData(frame, 0, 0);
      };
  
      processor.doLoad();
  
  
  
    },
  }
}
</script>-->

<style lang="scss" scoped>
.video-box {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10rpx;
  .canvas, .video {
    width: 100%;
    height: 100%;
  }
  .item {
    min-width: 0;
    .video-canvas-box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>