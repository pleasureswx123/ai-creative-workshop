<template>
  <u-popup
      :show="show"
      mode="bottom"
      @close="closeHandler"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      :round="round"
      bgColor="#000"
  >
    <view :style="{borderRadius: `${round}px`}" class="pop-container" v-if="show">
      <view class="main-con">
        <video class="video-box"
            object-fit="contain"
            src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
            controls />
<!--        <view class="pic-box">
          <u-swiper
              height="100px"
              bgColor="transparent"
              :list="list"
              indicator
              indicatorMode="line"
              circular
          />
        </view>-->
      </view>
      <view class="ft">
        <view class="title">{{info.prompt}}</view>
        <view class="info">{{info.model_style_name}}</view>
        <view class="info">{{info.lora_name}}</view>
        <view class="info">{{info.controlnet_type}}</view>
        <view class="info">消耗200积分</view>
        <view class="info">768 * 1024</view>
        <view class="info">生成时间2024.1.12 -15:30</view>
        <view class="info">opacity: 0.5;</view>
        <view class="btn-box" @tap="handleDownImageOrVideo">
          <text>下载视频</text>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
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
      default: 20
    }
  },
  data() {
    return {
      list: [
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      ],
    }
  },
  methods: {
    handleDownImageOrVideo() {
      this.downLoadVideoOrImgFile({
        src: 'https://web-assets.dcloud.net.cn/unidoc/zh/uni-app.png',
        fileType: 'img'
      });
      // this.downLoadVideoOrImgFile({
      //   src: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4',
      //   fileType: 'video'
      // });
    },
    closeHandler() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-container {
  color: #fff;
  //max-height: 1000rpx;
  overflow-y: auto;
  .main-con {
    aspect-ratio: 4 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    .video-box {
      width: 100%;
      height: 100%;
    }
    .pic-box {
      width: 100%;
    }
  }
}

.ft {
  padding: 10rpx 30rpx 40rpx;
  .title {
    font-size: 24rpx;
    padding: 20rpx 0;
    line-height: 1.8;
    margin-bottom: 10rpx;
  }
  .info {
    display: inline-block;
    margin: 0 10rpx 10rpx 0;
    color: rgba(255,255,255,.5);
  }
}
.btn-box {
  margin: 50rpx 0 30rpx;
  background-color: #fff;
  color: #333;
  font-size: 24rpx;
  height: 60rpx;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
</style>