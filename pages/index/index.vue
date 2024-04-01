<template>
	<view class="content">
    <QmNavTop></QmNavTop>
    <QmHomeBanner></QmHomeBanner>
    <AuiQmAiTypeMenu></AuiQmAiTypeMenu>
    
    <AuiQTabs :list="feedsTabs" :value.sync="model_subclass_id" />
    <view style="min-height: 90vh">
      <!-- #ifdef APP -->
      <AuiQmWaterfalls
          ref="waterfall"
          :columnCount="2"
          :paramsInfo="paramsInfo"
          :proxyList="item => {
            const task = item.task_info || {};
            const {img_height: h, img_url: image, img_width: w, model_info: title} = task;
            return {...task, w, h, image, allowEdit: false, title}
          }"
          :getList="homeApi.getHomeFeedsList"
          @select="getDetailsInfo"
      ></AuiQmWaterfalls>
      <!-- #endif -->
      <!-- #ifndef APP -->
      <QmWaterfall
          ref="waterfall"
          :paramsInfo="paramsInfo"
          :proxyList="item => {
            const task = item.task_info || {};
            const {img_height: h, img_url: image, img_width: w, model_info: title} = task;
            return {...task, w, h, image, allowEdit: false, title}
          }"
          :getList="homeApi.getHomeFeedsList"
          @select="getDetailsInfo" />
      <!-- #endif -->
    </view>
    <QmHomeFooter />
    <u-gap height="60"></u-gap>
    <MyCreateDetails
        v-if="showDetails"
        :show.sync="showDetails"
        :info="detailsInfo" />
	</view>
</template>

<script>
import {userApi, homeApi} from '@/api'
import {mapState, mapActions} from 'vuex';
	export default {
		data() {
			return {
        homeApi,
        model_subclass_id: '100',
        showDetails: false,
        detailsInfo: {},
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
    onPullDownRefresh() {
      // #ifdef APP
      this.$refs?.waterfall?.initData?.()?.then(() => {
        uni.stopPullDownRefresh();
      });
      // #endif
      // #ifndef APP
      this.$refs?.waterfall?.resetColumnCount?.()?.then(() => {
        uni.stopPullDownRefresh();
      });
      // #endif
    },
    onReachBottom() {
      this.$refs?.waterfall?.loadMore?.();
    },
		onLoad() {
			this.getHomeInfo();
      this.getFeedsTab();
		},
		methods: {
      ...mapActions('HomeInfo', ['getHomeInfo', 'getFeedsTab']),
      previewImage(src) {
        uni.previewImage({
          urls: [src]
        });
      },
      getDetailsInfo(item) {
        const {task_id, detail_img_url, type} = item || {};
        if(type === 2) {
          this.previewImage(detail_img_url);
          return
        }
        userApi.getAiDetailsInfo({task_id}).then(resData => {
          this.detailsInfo = resData;
          this.showDetails = true;
        });
      },
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #0D0D0D;
	}
</style>