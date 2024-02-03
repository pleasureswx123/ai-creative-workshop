<template>
  <u-popup :show="showPop" mode="bottom" @close="showPop = false" overlayStyle="background: #000"
           :safeAreaInsetBottom="safeAreaInsetBottom">
    <view class="pop-container" v-if="info">
      <view class="top-bar">
        <view class="tips-con">
          <view v-if="isShowIndicator" class="tips-sn">{{imgCurrent + 1}}/{{imgLen}}</view>
        </view>
        <view class="close-box">
          <icon @tap="showPop = false" color="var(--txt-color1)" type="cancel" size="30" />
        </view>
      </view>
      <view class="pop-main-content">
        
        <template v-if="info.task_type === 2">
          <VideoItem :info="info"></VideoItem>
        </template>
        <template v-if="info.task_type !== 2">
          <ImgItem @change="sn => { imgCurrent = sn }" :info="info"></ImgItem>
        </template>
        
      </view>
      <view class="footer-bar">
        <DetailsFooter :info="info"></DetailsFooter>
        <view class="ft-btn-box">
          <view v-if="info.task_type === 2" class="btn-box" @tap="handleDownVideo">
            <text>下载视频</text>
          </view>
          <template v-if="info.task_type === 1">
            <view class="btn-box" @tap="handleDownImage">
              <text>下载图片</text>
            </view>
            <view class="btn-box" @tap="jumpToTextToPicture">
              <text>一键同款</text>
            </view>
          </template>
          <view v-if="![1,2].includes(info.task_type)" class="btn-box" @tap="handleDownImage">
            <text>下载图片</text>
          </view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import DetailsFooter from './footer.vue';
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
      imgCurrent: 0
    }
  },
  components: {
    DetailsFooter, VideoItem, ImgItem
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
  methods: {
    async handleDownVideo() {
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
  background: var(--bg-color1);
  color: var(--txt-color1);
  font-size: 28rpx;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .top-bar {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
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
    padding: 0 30rpx;
    z-index: 90;
    background-color: rgba(0,0,0,.85);
  }
  .ft-btn-box {
    display: flex;
    align-items: center;
    padding: 30rpx 30rpx 50rpx;
    gap: 40rpx;
  }
  .btn-box {
    padding-top: 10rpx;
    background-color: var(--txt-color1);
    color: var(--bg-color1);
    font-size: 24rpx;
    height: 60rpx;
    border-radius: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
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
  //background-color: red;
}
</style>