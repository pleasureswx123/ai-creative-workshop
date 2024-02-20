<template>
	<view class="content">
    <QmNavTop></QmNavTop>
    <QmHomeBanner></QmHomeBanner>
    <QmAiTypeMenu></QmAiTypeMenu>
    
    <QmHomeTypeTabs
        :value.sync="model_subclass_id" />
    <QmWaterfall
        :paramsInfo="paramsInfo"
        :proxyList="item => {
          const task = item.task_info || {};
          const {img_height: h, img_url: image, img_width: w, model_info: title} = task;
          return {...task, w, h, image, allowEdit: false, title}
        }"
        :getList="homeApi.getHomeFeedsList"
        @select="getDetailsInfo" />
    
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
		onLoad() {
			this.getHomeInfo();
		},
		methods: {
      ...mapActions('HomeInfo', ['getHomeInfo']),
      getDetailsInfo({task_id}) {
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