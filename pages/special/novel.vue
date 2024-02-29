<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view>
			<NovelTextarea ref="novelText"></NovelTextarea>
			<view class="novel">
				<NovelVideo ref="NovelVideo" @onLayout="onLayout"></NovelVideo>
			</view>
			<view class="next">
				<view class="nextBtn" @tap="nextStep()">下一步</view>
				<view class="tips">(消耗40积分)</view>
			</view>
		</view>
		<ScreenPop @setNovelData="setNovelData" title="画面风格" v-if="screenPop" :show.sync="screenPop"></ScreenPop>
		<EraPop @setEraData="setEraData" title="年代风格" v-if="eraPop" :show.sync="eraPop"></EraPop>
		<VideoPop @setTaskData="setTaskData" title="配音选择" v-if="videoPop" :show.sync="videoPop" ref="videoPop"></VideoPop>
		<BgmPop @setMusic="setMusic" title="背景音乐" v-if="bgmPop" :show.sync="bgmPop"></BgmPop>
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
	import {NovelApi} from '@/api'
	import {userApi} from '@/api'
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
				screenId:'',
				taskId:'',
				volumeId:'',
				speedId:'',
				inverId:'',
				capId:'',
				musicId:'',
				eraId:''
			}
		},
		onShow (){
			const eventChannel = this.getOpenerEventChannel();
			this.eventChannel=eventChannel
			eventChannel.on('setMusic',data =>{
				this.$nextTick(() =>{
					this.$refs.NovelVideo.tabList[1].choose = data.title
					this.musicId = data.id
				})
			 })
		},
		mounted() {
			this.getUserInfo()
		},
		methods: {
			onLayout(name) {
				this[`${name}`] = true
			},
			setNovelData(data){
				this.$refs.NovelVideo.burList[0].choose = data.title
				this.screenId = data.id
				this.screenPop = false
			},
			setEraData(data){
				this.$refs.NovelVideo.burList[1].choose = data.title
				this.eraId = data.id
				this.eraPop = false
			},
			setTaskData(data){
				this.$refs.NovelVideo.tabList[0].choose = data.data.title
				this.taskId = data.data.id
				this.volumeId = data.volume
				this.speedId = data.speed
				this.videoPop = false
			},
			setCapData(data){
				this.$refs.NovelVideo.tabList[2].choose = data.title
				this.capId = data.id
				this.captionsPop = false
			},
			setInverData(data){
				this.$refs.NovelVideo.tabList[3].choose = data.scale
				this.inverId = data.id
				this.inverPop = false
			},
			getUserInfo(){
				userApi.getUserInfo({}).then(data => {
					this.user_id = data.user_id
				}).catch(() => {
					
				})
			},
			nextStep(){
				if(this.$refs.novelText.novelValue == ''){
					uni.$u.toast('请输入标题');
					return false
				}
				if(this.$refs.novelText.current == ''){
					uni.$u.toast('请输入文字内容');
					return false
				}
				if(this.screenId == ''){
					uni.$u.toast('请选择画面风格');
					return false
				}
				if(this.taskId == ''){
					uni.$u.toast('请选择视频配音');
					return false
				}
				if(this.inverId == ''){
					uni.$u.toast('请选择视频比例');
					return false
				}
				let data = {
					user_id:this.user_id,
					text:this.$refs.novelText.current || '',
					title:this.$refs.novelText.novelValue,
					screen_style:this.screenId,
					dub:this.taskId,
					dub_speed:this.speedId,
					dub_volume:this.volumeId,
					videoscale:this.inverId,
					typeface:this.capId,
					music:this.musicId,
					time_style:this.eraId,
					show_captions:2
				}
				uni.setStorageSync('data',JSON.stringify(data))
				NovelApi.articlesSplit({
					data,
					no_sign: 1,
					sourceCode:"100001",
					sign:"52d89ffef49b65edaf5d232104d42fac",
					timestamp:"1545454552"
				}).then(data => {
					uni.navigateTo({
					   url: './clause',
					   success:(res)=>{
							res.eventChannel.emit('setList',data)
					   }
					})
				}).catch(() => {
					
				})
			},
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