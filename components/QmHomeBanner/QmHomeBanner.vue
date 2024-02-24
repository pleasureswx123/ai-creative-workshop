<template>
  <view class="banner-cont">
    <view class="banner">
      <view class="bannerBg">
        <video
            id="myVideo"
            @loadedmetadata="loadedmetadata"
            :src="bannerInfo.url"
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
            x5-video-orientation="portraint" />
      </view>
      <view class="bannerText">
        <text class="eng">{{bannerInfo.slogan_en}}</text>
        <view>
          <text class="cn">{{bannerInfo.slogan_cn}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      videoContext: null
    }
  },
  created() {
    this.videoContext = uni.createVideoContext('myVideo', this);
  },
  computed: {
    ...mapState('HomeInfo', ['bannerInfo']),
  },
  methods: {
    loadedmetadata() {
      this.videoContext.play()
    },
  }
}
</script>

<style lang="scss" scoped>
.banner-cont {
  width: 100%;
  padding: 0 20rpx;
  box-sizing: border-box;
  margin: 20rpx 0;
  .banner {
    border-radius: 10rpx;
    height: 344rpx;
    width: 100%;
    overflow: hidden;
    position: relative;
    .bannerBg {
      width: 100%;
      height: 100% !important;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    
    .bannerText {
      color: #fff;
      position: relative;
      z-index: 2;
      box-sizing: border-box;
      padding: 60rpx 0 0 30rpx;
      
      text {
        display: inline-block;
      }
      
      .eng {
        font-size: 28rpx;
      }
      
      .cn {
        font-size: 60rpx;
      }
      
      .cnmain {
        color: #F60652;
        font-weight: 700;
        font-size: 60rpx;
      }
    }
  }
}

uni-video {
  width: 100%;
  height: 100%;
}
</style>