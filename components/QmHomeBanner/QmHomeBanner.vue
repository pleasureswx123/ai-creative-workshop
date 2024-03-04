<template>
  <view class="banner-cont">
    <view class="banner">
      <template v-if="bannerInfo.url_type === 'image'">
        <Imgs :imgs="bannerInfo.url_data"></Imgs>
      </template>
      <QmVideo v-if="bannerInfo.url_type === 'video'" :src="bannerInfo.url"></QmVideo>
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
import Imgs from './Imgs.vue';

export default {
  components: { Imgs },
  computed: {
    ...mapState('HomeInfo', ['bannerInfo']),
  },
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
    .img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .bannerText {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      color: #fff;
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
        text-shadow: 0 0 20rpx rgba(0,0,0,.8);
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