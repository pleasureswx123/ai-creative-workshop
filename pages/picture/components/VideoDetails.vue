<template>
  <u-popup :show="showPop" mode="bottom" @close="showPop = false" overlayStyle="background: rgba(0,0,0,.8)"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      :round="round" bgColor="var(--bg-color1)">
    <view :style="{borderRadius: `${round}px`}" class="pop-container" v-if="info">
      <view class="top-bar">
        <uni-icons class="close-btn" @tap="showPop = false" custom-prefix="iconfont-qm" type="icon-qm-close" color="rgba(255,255,255,.5)" size="30" />
<!--        <icon class="close-btn" @tap="showPop = false" color="var(&#45;&#45;txt-color1)" type="cancel" size="30" />-->
      </view>
      <template v-if="info.task_type === 2">
        <view class="main-video-con">
          <VideoItem :info="info"></VideoItem>
        </view>
      </template>
      <template v-if="info.task_type !== 2">
        <view class="main-img-con">
          <ImgItem @change="sn => { imgCurrent = sn }" :info="info"></ImgItem>
        </view>
      </template>
      <view class="footer-bar">
        <ItemFooter :info="info" />
        <view>
          <template v-if="info.task_type === 2">
            <view class="btn-box" @tap="handleDownVideo">
              <text>下载视频</text>
            </view>
          </template>
          <template v-if="info.task_type === 1">
            <view class="btn-box" @tap="handleDownImage">
              <text>下载图片</text>
            </view>
            <view class="btn-box" @tap="jumpToTextToPicture">
              <text>一键同款</text>
            </view>
          </template>
          <template v-if="![1,2].includes(info.task_type)">
            <view class="btn-box" @tap="handleDownImage">
              <text>下载图片</text>
            </view>
          </template>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import ItemFooter from './ItemFooter.vue';
import ImgItem from './ImgItem.vue';
import VideoItem from './VideoItem.vue';

export default {
  components: {ImgItem, VideoItem, ItemFooter},
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    show: {
      type: Boolean,
      default: false
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    round: {
      type: [Boolean, String, Number],
      default: 8
    }
  },
  data() {
    return {
      imgCurrent: 0
    }
  },
  computed: {
    showPop: {
      get() {
        return this.show;
      },
      set(status) {
        this.$emit('update:show', status);
      }
    }
  },
  methods: {
    async handleDownVideo() {
      // const a = await this.getFileSize('/proxyApi/upload/video/55/55_1706503682_44677.mp4');
      // const b = await this.getFileSize('/proxyApi/upload/video/65/65_1706513822_28764.png');
      // const c = await this.getFileSize('/proxyApi/upload/dub/26/26_1706501199_46375.mp3');
      
      // const a = await this.downLoadFile('/proxyApi/upload/video/55/55_1706503682_44677.mp4');
      // const b = await this.downLoadFile('/proxyApi/upload/video/65/65_1706513822_28764.png');
      // const c = await this.downLoadFile('/proxyApi/upload/dub/26/26_1706501199_46375.mp3');
      this.downLoadFile(this.info.video_url);
    },
    handleDownImage() {
      const src = this.info.img_urls?.[this.imgCurrent] || '';
      src && this.downLoadFile(src);
    },
    jumpToTextToPicture() {
      const {task_id} = this.info || {};
      uni.$u.route({
        url: 'pages/photos/index',
        params: {
          task_id: task_id
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.pop-container {
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  color: var(--txt-color1);
  background: var(--bg-color1);
  max-height: 95vh;
  overflow-y: auto;
  .top-bar {
    //position: absolute;
    //top: 0;
    //left: 0;
    //right: 0;
    //width: 100%;
    height: 80rpx;
    //z-index: 100;
    box-sizing: border-box;
    padding: 0 20rpx;
    display: flex;
    align-items: center;
    .close-btn {
      position: relative;
      margin-left: auto;
      z-index: 2000;
    }
  }
  .footer-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: rgba(0,0,0,.8);
    padding-bottom: 60rpx;
    box-sizing: border-box;
    min-height: 180px;
  }
  .main-video-con {
    color: var(--txt-color1);
  }
  .main-img-con {
    color: var(--txt-color1);
    height: calc(95vh - 80rpx);
    position: relative;
  }
}
.btn-box {
  margin: 20rpx 60rpx 0;
  background-color: var(--txt-color1);
  color: var(--bg-color1);
  font-size: 24rpx;
  height: 60rpx;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>