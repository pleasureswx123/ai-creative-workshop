<template>
  <u-popup :show="showPop" mode="bottom" @close="showPop = false" overlayStyle="background: rgba(0,0,0,.7)"
           :safeAreaInsetBottom="safeAreaInsetBottom">
    <view class="pop-container" v-if="info">
      <view class="top-bar">
        <view class="tips-con">
          <view v-if="isShowIndicator" class="tips-sn">{{imgCurrent + 1}}/{{imgLen}}</view>
        </view>
        <view class="close-box">
          <icon class="pointer" @tap="showPop = false" color="var(--txt-color1)" type="cancel" size="30" />
        </view>
      </view>
      <view class="pop-main-content" :class="{isVideo: isVideoTaskType(info.task_type)}">
        
        <template v-if="isVideoTaskType(info.task_type)">
          <VideoItem :info="info"></VideoItem>
        </template>
        <template v-if="!isVideoTaskType(info.task_type)">
          <ImgItem @change="sn => { imgCurrent = sn }" :info="info"></ImgItem>
        </template>
        
      </view>
      <view class="footer-bar">
        <view class="footer-inner">
          <view class="footer-con">
            <QmTaskInfo :info="info"></QmTaskInfo>
          </view>
          <view class="ft-btn-box">
            <view v-if="isVideoTaskType(info.task_type)" class="btn-box" @tap="handleDownVideo">
              <view class="icon-box" v-if="downloadStatus">
                <uni-icons custom-prefix="iconfont-qm" type="icon-qm-loading-1" color="#333" size="18" />
              </view>
              <view>下载视频</view>
            </view>
            <template v-if="!isVideoTaskType(info.task_type)">
              <view class="btn-box" @tap="handleDownImage">
                <view class="icon-box" v-if="downloadStatus">
                  <uni-icons custom-prefix="iconfont-qm" type="icon-qm-loading-1" color="#333" size="18" />
                </view>
                <view>下载图片</view>
              </view>
              <view v-if="info.task_type === 1" class="btn-box" @tap="jumpToTextToPicture">
                <text>一键同款</text>
              </view>
            </template>
          </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import VideoItem from './VideoItem.vue';
import ImgItem from './ImgItem.vue';

export default {
  props: {
    info: {
      type: Object,
      default: null
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
      downloadStatus: false,
      imgCurrent: 0
    }
  },
  components: {
    VideoItem, ImgItem
  },
  computed: {
    imgUrls() {
      return this.info?.img_urls || []
    },
    imgLen() {
      return this.imgUrls.length;
    },
    isShowIndicator() {
      return this.imgLen > 1
    },
    showPop: {
      get() {
        return this.show;
      },
      set(status) {
        this.$emit('update:show', status);
      }
    }
  },
  watch: {
    showPop: {
      immediate: true,
      handler(status) {
        this.toggleBodyPositionStatus(status)
      }
    },
  },
  beforeDestroy() {
    this.toggleBodyPositionStatus(false)
  },
  methods: {
    async handleDownVideo() {
      this.download(this.info.video_url);
    },
    handleDownImage() {
      const src = this.info.img_urls?.[this.imgCurrent] || '';
      src && this.download(src);
    },
    download(url) {
      if(this.downloadStatus) {
        return;
      }
      this.downloadStatus = true;
      this.downLoadFile(url).then(() => {}, () => {
        uni.$u.toast('下载失败');
      }).finally(() => {
        this.downloadStatus = false;
      });
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
  background: rgba(0,0,0,.5);
  color: var(--txt-color1);
  font-size: 28rpx;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .top-bar {
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    top: 80rpx;
    left: 0;
    right: 0;
    padding: 0 40rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    z-index: 90;
    height: 60rpx;
    .tips-con {
      flex: 1;
      min-width: 0;
      display: grid;
      place-items: center;
      .tips-sn {
        padding: 0 20rpx;
        border-radius: 20rpx;
        color: #000;
        background: rgba(255,255,255,.5)
      }
    }
    .close-box {
      position: absolute;
      top: 0;
      right: 40rpx;
      display: grid;
      place-items: center;
      background: rgba(0,0,0,.5);
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
    }
  }
  .footer-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 90;
  }
  .footer-inner {
    padding: 10rpx 20rpx 50rpx 0;
    background-color: rgba(0,0,0,.5);
    box-sizing: border-box;
    .ft-btn-box {
      padding: 0 30rpx;
    }
  }
  .ft-btn-box {
    display: flex;
    align-items: center;
    height: 70rpx;
    box-sizing: border-box;
    gap: 40rpx;
  }
  .btn-box {
    background-color: var(--txt-color1);
    color: var(--bg-color1);
    font-size: 24rpx;
    height: 70rpx;
    border-radius: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    cursor: pointer;
    gap: 6rpx;
  }
}
@supports (-webkit-touch-callout: none) {
  .pop-container {
    height: 100dvh;
  }
}
.pop-main-content {
  height: 100%;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  &.isVideo {
    height: calc(100% - 300rpx);
  }
}


@media screen and (min-width: 750px) and (max-width: 960px){
  /deep/ .u-popup__content {
    width: 80%;
    margin: 0 auto;
  }
}

@media screen and (min-width: 960px) and (max-width: 1200px) {
  /deep/ .u-popup__content {
    width: 50%;
    margin: 0 auto;
  }
  /deep/ .u-popup__content {
    background-color: rgba(0,0,0,.1);
  }
  /deep/ {
    .pictrue-box .u-swiper__wrapper__item,
    .pictrue-box .u-swiper__wrapper__item__wrapper,
    .pictrue-box .u-swiper__wrapper__item__wrapper__image,
    .pictrue-box uni-image > div, .pictrue-box uni-image > img {
      background-color: transparent!important;
    }
  }
  .footer-inner {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -5px 5px rgba(255,255,255,.3);
    .footer-con {
      flex: 1;
      min-width: 0;
    }
    .ft-btn-box {
      width: 200px;
      justify-content: flex-end;
    }
  }
}
@media screen and (min-width: 1200px) {
  /deep/ .u-popup__content {
    width: 50%;
    margin: 0 auto;
  }
  /deep/ .u-popup__content {
    background-color: rgba(0,0,0,.1);
  }
  /deep/ {
    .pictrue-box .u-swiper__wrapper__item,
    .pictrue-box .u-swiper__wrapper__item__wrapper,
    .pictrue-box .u-swiper__wrapper__item__wrapper__image,
    .pictrue-box uni-image > div, .pictrue-box uni-image > img {
      background-color: transparent!important;
    }
  }
  .footer-inner {
    width: 70%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -5px 5px rgba(255,255,255,.3);
    .footer-con {
      flex: 1;
      min-width: 0;
    }
    .ft-btn-box {
      width: 200px;
      justify-content: flex-end;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.icon-box {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon-qm-loading-1 {
    animation: rotate 1s linear infinite;
  }
}
</style>