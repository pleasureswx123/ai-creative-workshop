<template>
  <view class="video-js" ref="video">
  </view>
</template>

<script>
// <QmVideojs :src="item.video_url"></QmVideojs>
// <QmVideojs
//     v-if="bannerInfo.url_type === 'video'"
//           :src="bannerInfo.url"
// :options="{
// autoplay: 'muted',
//     controls: false,
//     vStyle: 'object-fit: fill;'
// }"
// ></QmVideojs>
export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      id: uni.$u.guid(20),
      player: null,
      defaultOptions: {
        id: this.id,
        sources: [{
          src: this.src,
          // type: "application/x-mpegURL"
          type: 'video/mp4'
        }],
        // poster: getImageUrl(this.activityDetail.indexpic),
        // title: this.activityDetail.title,
        poster: '',
        title: '',
        width: '100%',
        height: '100%',
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoDisable: true,
        preload: 'auto', //auto - 当页面加载后载入整个视频 metadata - 当页面加载后只载入元数据 none - 当页面加载后不载入视频
        language: 'zh-CN',
        fluid: true, // 自适应宽高 流体模式
        muted: false, //  是否静音
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"） 或者，可以将类vjs-16-9、vjs-9-16、vjs-4-3或vjs-1-1添加到播放器
        controls: true, //是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
        autoplay: false, //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
        loop: false, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
        techOrder: ['html5'], //播放顺序
        screenshot: true,
        disablePictureInPicture: true, // 如果true，则禁用将视频元素切换为画中画。默认为false.
        enableSmoothSeeking: true, // 如果设置为true，将在移动和桌面设备上提供更流畅的搜索体验。
        playsinline: true, // 向浏览器指示当全屏播放是本机默认设置时（例如在 iOS Safari 中），首选非全屏播放。
        // plugins: {
        //   foo: {bar: true},
        //   boo: {baz: false}
        // },
        controlBar: {
          volumePanel: {
            inline: false // 不使用水平方式
          },
          timeDivider: false, // 时间分割线
          durationDisplay: true, // 总时间
          progressControl: false, // 进度条
          remainingTimeDisplay: true, //当前以播放时间
          // remainingTimeDisplay: { // 默认剩余时间显示为负时间。要不显示负号
          //   displayNegative: true
          // },
          fullscreenToggle: true, //全屏按钮
          pictureInPictureToggle: false //画中画
        }
      }
    }
  },
  mounted() {
    const videoBoxEl = this.$refs.video.$el;
    const {width, height} = videoBoxEl.getBoundingClientRect()
    const video = document.createElement('video');
    video.id = this.id;
    video.style = `width: 100%; height: 100%; ${this.options.vStyle || ''}`;
    video.controls = true;
    video.preload = 'auto';
    // video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
    video.setAttribute("crossOrigin", "anonymous");
    // video.setAttribute('webkit-playsinline', true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全zhi屏播放的video标签的一个属性
    video.setAttribute('x5-video-player-type', 'h5') //安卓 声明启用同层H5播放器 可以在video上面加东西
    videoBoxEl.appendChild(video);
    const options = Object.assign({}, this.defaultOptions, {
      aspectRatio: `${width.toFixed()}:${height.toFixed()}`,
      // width: `${width}px`, height: `${height}px`
    }, this.options);
    this.player = this.$vJs(this.id, options);
    this.player.ready(() => {
      this.player.addClass('vjs-qmi');
      this.player.log('onPlayerReady999', this.id);
      // player.options({ enableSmoothSeeking: true });
      // player.autoplay('muted');
      
      // myPlayer.src('http://www.example.com/path/to/video.mp4');
      // myPlayer.src({type: 'video/mp4', src: 'http://www.example.com/path/to/video.mp4'});
      // this.player.src({type: 'video/mp4', src: this.src});
      // myPlayer.src([
      //   {type: 'video/mp4', src: 'http://www.example.com/path/to/video.mp4'},
      //   {type: 'video/webm', src: 'http://www.example.com/path/to/video.webm'},
      //   {type: 'video/ogg', src: 'http://www.example.com/path/to/video.ogv'}
      // ]);

      // // set
      // myPlayer.poster('http://example.com/myImage.jpg');
      //
      // // get
      // console.log(myPlayer.poster());
  
      // var lengthOfVideo = myPlayer.duration();
      // should be 10 seconds less than duration
      // console.log(myPlayer.remainingTime());
  
      // var howMuchIsDownloaded = myPlayer.bufferedPercent();
  
      // // get
      // var howLoudIsIt = this.player.volume();
      // // set
      // this.player.volume(0.5); // Set volume to half
  
      // // get, should be false
      // console.log(myPlayer.muted());
      // // set to true
      // myPlayer.muted(true);
      // // get should be true
      // console.log(myPlayer.muted());

      // / get, should be false
      // console.log(myPlayer.isFullscreen());
      //
      // // set, tell the player it's in fullscreen
      // myPlayer.isFullscreen(true);
      //
      // // get, should be true
      // console.log(myPlayer.isFullscreen());
      
      // myPlayer.requestFullscreen();
      // myPlayer.requestFullscreen();
      // myPlayer.exitFullscreen();
      
      // myPlayer.play();
      // myPlayer.pause();
      // true
      // console.log(myPlayer.paused());
      // // false
      // console.log(!myPlayer.paused());
      //
      // myPlayer.play();
      // // false
      // console.log(myPlayer.paused());
      // // true
      // console.log(!myPlayer.paused());
      //
      // myPlayer.pause();
      // // true
      // console.log(myPlayer.paused());
      // // false
      // console.log(!myPlayer.paused());
  
      // // set current time to 2 minutes into the video
      // myPlayer.currentTime(120);
      //
      // // get the current time, should be 120 seconds
      // var whereYouAt = myPlayer.currentTime();
    });
    
    this.player.on('ended', () => {
      console.log('ended', this.id)
    });
  
    this.player.on('error', () => {
      console.log('error', this.id)
    });
  
    this.player.on('stalled', () => {
      console.log('stalled', this.id)
    });
  
    this.player.on('pause', () => {
      console.log('pause', this.id)
      //
      // // Modals are temporary by default. They dispose themselves when they are
      // // closed; so, we can create a new one each time the player is paused and
      // // not worry about leaving extra nodes hanging around.
      // var modal = player.createModal('This is a modal!');
      //
      // // When the modal closes, resume playback.
      // modal.on('modalclose', function() {
      //   player.play();
      // });
    });
  
    this.player.on('play', () => {
      console.log('play', this.id)
    });
  
    this.player.on('timeupdate', () => {
      console.log('timeupdate', this.id)
    });
  
    // const EVENTS = [
    //   'loadstart',
    //   'progress',
    //   'suspend',
    //   'abort',
    //   'error',
    //   'emptied',
    //   'stalled',
    //   'loadedmetadata',
    //   'loadeddata',
    //   'canplay',
    //   'canplaythrough',
    //   'playing',
    //   'waiting',
    //   'seeking',
    //   'seeked',
    //   'ended',
    //   'durationchange',
    //   'timeupdate',
    //   'play',
    //   'pause',
    //   'ratechange',
    //   'resize',
    //   'volumechange',
    // ]
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<style lang="scss" scoped>
.video-js {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vjs-qmi {
  ///* Change all text and icon colors in the player. */
  //&.video-js {
  //  color: #00ff00;
  //}
  //
  ///* Change the border of the big play button. */
  //.vjs-big-play-button {
  //  border-color: #00ff00;
  //}
  //
  ///* Change the color of various "bars". */
  //.vjs-volume-level,
  //.vjs-play-progress,
  //.vjs-slider-bar {
  //  background: #00ff00;
  //}
}
</style>
