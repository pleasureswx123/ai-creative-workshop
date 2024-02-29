<template>
  <view class="video-box" ref="videoBox">
<!--    <canvas
        id="myCanvas"
        canvas-id="myCanvas"
        :width="width + 'px'" :height="height + 'px'"
    ></canvas>-->
<!--    <video
        :width="width + 'px'" :height="height + 'px'"
        ref="videoPlayer"
        id="videoPlayer"
        @loadedmetadata="loadedmetadata"
        :src="src"
        :autoplay="false"
        :loop="true"
        :controls="false"
        :muted="true"
        :show-center-play-btn="false"
        object-fit="cover"
        x5-playsinline="true"
        playsinline="true"
        webkit-playsinline="true"
        x-webkit-airplay="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen=""
        x5-video-orientation="portraint" />-->
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
      videoCtx: null,
      width: 0,
      height: 0,
    }
  },
  mounted() {
    const {width, height} = this.$refs.videoBox.$el.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.video.initVideo(this.src, {style: `width: ${width}px; height: ${height}px; object-fit: fill;`});
    // this.ctx = uni.createCanvasContext('myCanvas', this);
  },
  methods: {
    // renderFrame() {
    //   this.ctx.drawImage(this.videoCtx.el(), 0, 0, this.width, this.height);
    //   requestAnimationFrame(this.renderFrame);
    // },
  }
}
</script>

<!--<script module="video" lang="renderjs">-->
<script module="video" lang="renderjs">
export default {
  data() {
    return {
    }
  },
  methods: {
    initVideo(url, {style}) {
      const self = this;
      if (this.videoCtx) {
        this.videoCtx.dispose();
        this.videoCtx = null;
      }
      const video = document.createElement('video');
      video.id = 'video';
      video.setAttribute('class', 'video-js vjs-default-skin vjs-big-play-centered');
      video.style = style;
      video.setAttribute('object-fit', 'cover');
      video.controls = false;
      this.$refs.videoBox.$el.appendChild(video);
      // 设置option
      let option = {
        controls: false,
        muted: false, // 静音切换
        autoplay: 'muted',
        fluid: true, //宽高自适应
        preload: 'auto',
        loop: true,//循坏播放
        sources: [
          {
            type: "video/mp4", // mp4格式
            src: url
          },
          // {
          //   type: "video/webm",// webm格式
          //   src: url
          // }
        ],
        controlBar: {
          // //控制条组件
          // children: [
          //   {
          //     name: 'playToggle',
          //   }, // 播放按钮
          //   {
          //     name: 'volumePanel', // 音量控制
          //     inline: false, // 不使用水平方式
          //   },
          //   {
          //     name: 'currentTimeDisplay',
          //   }, // 当前已播放时间
          //   {
          //     name: 'timeDivider',
          //   }, // 时间分割线
          //   {
          //     name: 'durationDisplay',
          //   }, // 总时间
          //   {
          //     name: 'progressControl',
          //   }, // 播放进度条
          // ]
        },
      };
      this.videoCtx = videojs(video, option, function onPlayerReady() {
        // this.on("loadstart", function () {
        //   console.log("开始请求数据 ");
        // })
        // this.on("progress", function () {
        //   console.log("正在请求数据 ");
        // })
        this.on("loadedmetadata", function () {
          this.play();
          // self.renderFrame();
          console.log("获取资源长度完成 ")
        })
        // this.on("canplaythrough", function () {
        //   console.log("视频源数据加载完成")
        // })
        // this.on("waiting", function () {
        //   console.log("等待数据")
        // });
        // this.on("play", function () {
        //   console.log("视频开始播放")
        // });
        // this.on("playing", function () {
        //   console.log("视频播放中")
        // });
        // this.on("pause", function () {
        //   console.log("视频暂停播放")
        // });
        // this.on("ended", function () {
        //   console.log("视频播放结束");
        // });
        // this.on("error", function () {
        //   console.log("加载错误")
        // });
        // this.on("seeking", function () {
        //   console.log("视频跳转中");
        // })
        // this.on("seeked", function () {
        //   console.log("视频跳转结束");
        // })
        // this.on("ratechange", function () {
        //   console.log("播放速率改变")
        // });
        // this.on("timeupdate", function () {
        //   console.log("播放时长改变");
        // })
        // this.on("volumechange", function () {
        //   console.log("音量改变");
        // })
        // this.on("stalled", function () {
        //   console.log("网速异常");
        // })
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.video-box {
  &, canvas, video {
    width: 100%;
    height: 100%;
  }
  canvas {
    display: none;
    position: absolute;
    top:0;
    z-index: 100;
  }
}
</style>