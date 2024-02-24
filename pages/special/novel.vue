<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view>
			<NovelTextarea></NovelTextarea>
			<view class="novel">
				<NovelVideo ref="NovelVideo" @onLayout="onLayout"></NovelVideo>
			</view>
			<view class="next">
				<view class="nextBtn" @tap="nextStep">下一步</view>
				<view class="tips">(消耗40积分)</view>
			</view>
		</view>
		<ScreenPop @setNovelData="setNovelData" title="画面风格" v-if="screenPop" :show.sync="screenPop"></ScreenPop>
		<EraPop title="年代风格" v-if="eraPop" :show.sync="eraPop"></EraPop>
		<VideoPop @setTaskData="setTaskData" title="配音选择" v-if="videoPop" :show.sync="videoPop"></VideoPop>
		<BgmPop title="背景音乐" v-if="bgmPop" :show.sync="bgmPop"></BgmPop>
		<CaptionsPop @setCapData="setCapData" title="" v-if="captionsPop" :show.sync="captionsPop"></CaptionsPop>
		<InverPop @setInverData="setInverData" title="视频比例" v-if="inverPop" :show.sync="inverPop"></InverPop>
	</view>
</template>

<script>
	import NovelTextarea from './components/NovelTextarea.vue';
	import NovelVideo from './components/NovelVideo.vue';
	import VideoPop from './components/VideoPop.vue';
	import BgmPop from './components/BgmPop.vue';
	import CaptionsPop from './components/CaptionsPop.vue';
	import InverPop from './components/InverPop.vue';
	import ScreenPop from './components/ScreenPop.vue';
	import EraPop from './components/EraPop.vue';
	export default {
		components: {
			NovelTextarea,
			NovelVideo,
			VideoPop,
			BgmPop,
			CaptionsPop,
			InverPop,
			ScreenPop,
			EraPop
		},
		data() {
			return {
				videoPop: false,
				bgmPop:false,
				captionsPop:false,
				inverPop:false,
				screenPop:false,
				eraPop:false,
				musicStr:""
			}
		},
		created (){
			uni.$on('setMusic',data =>{
				this.musicStr = data
				this.$refs.NovelVideo.tabList[1].choose = this.musicStr.title
			 })
		},
		methods: {
			onLayout(name) {
				this[`${name}`] = true
			},
			setNovelData(data){
				this.$refs.NovelVideo.burList[0].choose = data.title
				this.screenPop = false
			},
			setTaskData(data){
				this.$refs.NovelVideo.tabList[0].choose = data
				this.videoPop = false
			},
			setCapData(data){
				this.$refs.NovelVideo.tabList[2].choose = data.title
				this.captionsPop = false
			},
			setInverData(data){
				this.$refs.NovelVideo.tabList[3].choose = data.scale
				this.inverPop = false
			},
			nextStep(){
				uni.navigateTo({
				   url: './clause' // 要跳转到的页面路径
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page-container {
		background: var(--bg-color1);
		font-size: 24rpx;
		padding: 0 30rpx 40rpx;
		margin-top: 40rpx;
		.box-container {
			padding: 0;
		}
	}
	.next{
		text-align: center;
		.nextBtn{
			width: 100%;
			height: 80rpx;
			line-height:80rpx;
			background-color: #6978fd;
			color:#fff;
			border-radius:20rpx;
			font-size:32rpx;
			margin:80rpx auto 10rpx;
		}
		.tips{
			color: var(--txt-color1);
			opacity: 0.7;
		}
	}
</style>