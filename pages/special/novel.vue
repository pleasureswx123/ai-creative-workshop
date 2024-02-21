<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view>
			<NovelTextarea></NovelTextarea>
			<view class="novel">
				<NovelVideo @onLayout="onLayout"></NovelVideo>
			</view>
		</view>
		<VideoPop title="配音选择" v-if="videoPop" :show.sync="videoPop"></VideoPop>
		<BgmPop title="背景音乐" v-if="bgmPop" :show.sync="bgmPop"></BgmPop>
		<CaptionsPop title="" v-if="captionsPop" :show.sync="captionsPop"></CaptionsPop>
		<InverPop title="视频比例" v-if="inverPop" :show.sync="inverPop"></InverPop>
		
	</view>
</template>

<script>
	import NovelTextarea from './components/NovelTextarea.vue';
	import NovelVideo from './components/NovelVideo.vue';
	import VideoPop from './components/VideoPop.vue';
	import BgmPop from './components/BgmPop.vue';
	import CaptionsPop from './components/CaptionsPop.vue';
	import InverPop from './components/InverPop.vue';
	export default {
		components: {
			NovelTextarea,
			NovelVideo,
			VideoPop,
			BgmPop,
			CaptionsPop,
			InverPop
		},
		data() {
			return {
				videoPop: false,
				bgmPop:false,
				captionsPop:false,
				inverPop:false
			}
		},
		methods: {
			onLayout(name) {
				this[`${name}`] = true
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page-container {
		background: var(--bg-color1);
		font-size: 24rpx;
		padding: 0 30rpx 300rpx;
		margin-top: 40rpx;

		.box-container {
			padding: 0;
		}

		
	}
</style>