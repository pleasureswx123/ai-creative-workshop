<template>
	<view class="page-container">
    <TopBar></TopBar>
    <Banners :list="bannerList"></Banners>
    <NavigatorBox :topNavList="topNavList" :gridNavList="gridNavList" :btnList="btnList"></NavigatorBox>
    <view class="page-bd-container">
      <view v-for="(info, index) in feedsList" :key="index">
        <SwiperCard :info="info" @select="toDetails"></SwiperCard>
      </view>
    </view>
    <QmHomeFooter />
    <u-gap height="60"></u-gap>
    <AuiMyCreateDetails v-if="showDetails" :show.sync="showDetails" :info="detailsInfo"></AuiMyCreateDetails>
    <QmPreviewVideo
        v-if="showPreviewVideo"
        :showPreview.sync="showPreviewVideo"
        :info="previewVideoInfo" />
	</view>
</template>

<script>
import TopBar from './components/TopBar.vue';
import Banners from './components/Banners.vue';
import NavigatorBox from './components/NavigatorBox.vue';
import SwiperCard from './components/SwiperCard.vue';
import {userApi, homeApi} from '@/api';
import {mapActions} from 'vuex';

export default {
  components: {TopBar, Banners, NavigatorBox, SwiperCard},
  data() {
    return {
      bannerList: [],
      topNavList: [],
      gridNavList: [],
      btnList: [],
      feedsList: [],
      showDetails: false,
      detailsInfo: {},
      showPreviewVideo: false,
      previewVideoInfo: null,
    }
  },
  onLoad() {
    this.getHomeInfo();
    this.getHomeV2();
    this.getRecommendList();
  },
  methods: {
    ...mapActions('HomeInfo', ['getHomeInfo']),
    getHomeV2() {
      homeApi.getHomeV2().then(res => {
        this.bannerList = res?.banner || [];
        this.topNavList = res?.channel_recommend || [];
        this.gridNavList = res?.channel_list || [];
        this.btnList = res?.channel_end || [];
      })
    },
    getRecommendList() {
      homeApi.getRecommendList().then(res => {
        this.feedsList = res?.list || [];
      })
    },
    previewImage(src) {
      uni.previewImage({
        urls: [src]
      });
    },
    getDetailsInfo({class_type, task_id}) {
      const temp = {
        1: 'getAiDetailsInfo',
        2: 'getDrawDetailsInfo',
        3: 'getDigitDetailsInfo',
        4: 'getNovelDetailsInfo',
      }
      const methodName = temp?.[`${class_type}`] || 'getDrawDetailsInfo';
      return userApi?.[methodName]({task_id})
    },
    toDetails(item) {
      const {task_id, img_url, video_url, class_type} = item || {};
      if(!class_type) {
        if(!!video_url) {
          this.previewVideoInfo = item;
          this.showPreviewVideo = true;
        } else {
          this.previewImage(img_url);
        }
        return
      }
      this.getDetailsInfo({class_type, task_id}).then(res => {
        this.detailsInfo = res || {};
        this.showDetails = true;
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}
.page-bd-container {
  padding: 0 30rpx 30rpx;
}
</style>