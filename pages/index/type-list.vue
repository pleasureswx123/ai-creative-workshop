<template>
  <view class="page-container">
    <u-sticky style="top: 0!important">
      <view style="background: #fff; padding: 0 10rpx;">
        <view style="height: 44px; border-bottom: 2rpx solid rgba(0,0,0,.1)">
          <TopBar type="new"></TopBar>
        </view>
        <AuiQTabs :list="feedsTabs" :value.sync="model_subclass_id" />
      </view>
    </u-sticky>
    <view v-if="model_subclass_id">
      <AuiQmWaterfalls
          ref="waterfall"
          :columnCount="2"
          :paramsInfo="paramsInfo"
          :proxyList="item => {
            const {img_url: image} = item;
            return {...item, image, allowEdit: false}
          }"
          :getList="homeApi.getHomeFeedsList2"
          @select="toDetails"
      ></AuiQmWaterfalls>
    </view>
    <AuiMyCreateDetails
        v-if="showDetails"
        :show.sync="showDetails"
        :info="detailsInfo" />
    <QmPreviewVideo
        v-if="showPreviewVideo"
        :showPreview.sync="showPreviewVideo"
        :info="previewVideoInfo" />
  </view>
</template>

<script>
import {userApi, homeApi} from '@/api'
import {mapMutations, mapState, mapActions} from 'vuex';
import TopBar from './components/TopBar.vue';

export default {
  components: {TopBar},
  data() {
    return {
      homeApi,
      model_subclass_id: '',
      showDetails: false,
      detailsInfo: {},
      showPreviewVideo: false,
      previewVideoInfo: null,
    }
  },
  computed: {
    ...mapState('HomeInfo', ['feedsTabs']),
    paramsInfo() {
      return {
        model_subclass_id: this.model_subclass_id
      }
    }
  },
  onLoad({type}) {
    this.setFeedsTabs();
    this.getFeedsTab({type}).then(res => {
      this.model_subclass_id = res?.[0]?.model_subclass_id;
    });
  },
  onPullDownRefresh() {
    this.$refs?.waterfall?.initData?.()?.then(() => {
      uni.stopPullDownRefresh();
    });
  },
  onReachBottom() {
    this.$refs?.waterfall?.loadMore?.();
  },
  methods: {
    ...mapActions('HomeInfo', ['getFeedsTab']),
    ...mapMutations('HomeInfo', ['setFeedsTabs']),
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
        this.previewVideoInfo = item;
        this.showPreviewVideo = true;
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
  padding: 0 0 100px;
}
</style>