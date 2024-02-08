<template>
	<view class="content">
    <QmNavTop></QmNavTop>
    <QmHomeBanner></QmHomeBanner>
    <QmAiTypeMenu></QmAiTypeMenu>
    
    <QmHomeTypeTabs
        :value.sync="model_subclass_id" />
    <QmWaterfall
        :modeId="model_subclass_id"
        @getDetailsInfo="getDetailsInfo" />
    
    <QmHomeFooter />
    <MyCreateDetails
        v-if="showDetails"
        :show.sync="showDetails"
        :info="detailsInfo" />
	</view>
</template>

<script>
import {userApi} from '@/api'
import {mapActions} from 'vuex';
	export default {
		data() {
			return {
        model_subclass_id: '100',
        showDetails: false,
        detailsInfo: {},
			}
		},
		onLoad() {
			this.getHomeInfo();
		},
		methods: {
      ...mapActions('HomeInfo', ['getHomeInfo']),
      getDetailsInfo(task_id) {
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