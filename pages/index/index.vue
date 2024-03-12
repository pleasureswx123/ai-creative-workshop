<template>
	<view class="content">
    <QmNavTop></QmNavTop>
    <QmHomeBanner></QmHomeBanner>
    <QmAiTypeMenu></QmAiTypeMenu>
    
    <QTabs :value.sync="model_subclass_id" />
    <view style="min-height: 90vh">
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
    </view>
    <QmHomeFooter />
    <MyCreateDetails
        v-if="showDetails"
        :show.sync="showDetails"
        :info="detailsInfo" />
	</view>
</template>

<script>
import {userApi, homeApi} from '@/api'
import {mapActions} from 'vuex';
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
      paramsInfo() {
        return {
          model_subclass_id: this.model_subclass_id
        }
      }
    },
    onPullDownRefresh() {
      this.$refs?.waterfall?.resetColumnCount?.()?.then(() => {
        uni.stopPullDownRefresh();
      });
    },
    onReachBottom() {
      this.$refs?.waterfall?.loadMore?.();
    },
		onLoad() {
			this.getHomeInfo();
		},
		methods: {
      ...mapActions('HomeInfo', ['getHomeInfo']),
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