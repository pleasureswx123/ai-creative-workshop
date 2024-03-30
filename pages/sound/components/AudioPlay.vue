<template>
	<view>
		<view class="text">
			<view v-for="(item,index) in filteredList" class="item">{{item.item}}</view>
		</view>
		<view class="tips">请用普通话大声朗读上方文字</view>
		<view class="audio">
			<view v-if="statusName =='重新录制'" class="overplay">
				<view>红色字读错了，建议重录</view>
				<view class="try-listen" @tap="play">
					<text>试听</text>
					<uni-icons custom-prefix="iconfont-qm" type="icon-qm-volume" color="var(--txt-color1)" size="20" />
				</view>
			</view>
			<view class="prompt" v-if="playShow == false">
				<AudioLoader></AudioLoader>
			</view>
			<view>
				<view @click='handlerOnCahnger' class="play-icon" v-if="playShow">
					<i class="iconfont icon-luzhi1"></i>
					<view>{{statusName}}</view>
				</view>
				<view @click='handlerStopCahnger' class="play-icon" v-else>
					<i class="iconfont icon-tingzhiluzhi"></i>
					<view>{{statusName}}</view>
				</view>
				<view v-if="statusName =='重新录制'" class="play-reprod" @click='handReproduction'>
					<i class="iconfont icon-luzhi1 icon-luzhi2"></i>
					<view>复刻</view>
				</view>
			</view>
		</view>
		<mumu-recorder ref='recorder' @success='handlerSuccess' @error='handlerError'></mumu-recorder>
	</view>
</template>
<script>
	import AudioLoader from './AudioLoader.vue';
	import {soundApi} from '@/api'
	export default {
		components:{AudioLoader},
		data() {
			return {
				statusName: '点击录制',
				playShow: true,
				audioContext: null,
				filteredList: [],
				audioUrl: '',
				dub_url:'',
				id:'',
				timer:null
			}
		},
		mounted() {
			this.GetRecognitionStr()
			
		},
		beforeDestroy() {
			this.destroyAudio();
		},
		methods: {
			handlerSave() {
				let tag = document.createElement('a')
				tag.href = this.recorder.localUrl
				tag.download = '录音'
				tag.click()
			},
			handlerOnCahnger() {
				this.$refs.recorder.start()
				this.playShow = false
				this.statusName = '停止录制'
			},
			handlerStopCahnger() {
				this.$refs.recorder.stop()
				this.playShow = true
				this.statusName = '重新录制'
			},
			handlerSuccess(res) {
				this.recorder = res
				this.recorder.localUrl = res.localUrl
				this.upload()
			},
			upload(){
				var that = this
				uni.showLoading({
					title: "上传中",
				});
				uni.uploadFile({
					name:'audio',
					url: 'https://192.168.31.168:8099/web.php/upload/audio', //接口地址
					header: {}, //头信息
					files:[{
						name:'audio',
						file:this.recorder.file,
						uri: this.recorder.data,
					}],
					fileType: "audio", //文件类型
					success: (uploadFileRes) => {
						const ret = JSON.parse(uploadFileRes.data);
						that.dub_url = ret.data.path
						this.SubmitRecognitionText()
					},
				});
			},
			handlerError(code) {
				switch (code) {
					case '101':
						uni.showModal({
							content: '当前浏览器版本较低，请更换浏览器使用，推荐在微信中打开。'
						})
						break;
					case '201':
						uni.showModal({
							content: '麦克风权限被拒绝，请刷新页面后授权麦克风权限。'
						})
						break
					default:
						uni.showModal({
							content: '未知错误，请刷新页面重试'
						})
						break
				}
			},
			destroyAudio() {
				if (this.audioContext) {
					this.audioContext.pause();
					this.audioContext.destroy();
					this.audioContext = null;
				}
			},
			play() {
				this.destroyAudio();
				this.audioContext = uni.createInnerAudioContext();
				this.audioContext.src = this.recorder.localUrl;
				// 设置音量（范围：0 到 1）
				this.audioContext.volume = 0.5;
				this.audioContext.play();
			},
			GetRecognitionStr() {
				soundApi.GetRecognitionStr({
					page: 1,
					pagesize: 20
				}).then(res => {
					this.filteredList = res.text_info.map(item => {
						return {
							item
						}
					})
				})
			},
			SubmitRecognitionText() {
				soundApi.SubmitRecognitionText({
					dub_url:this.dub_url
				}).then(res => {
					this.id = res.id
					this.GetRecognitionText()
					this.timer = setInterval(() => {
					    setTimeout(this.GetRecognitionText, 0)
					}, 5000);
					
				})
			},
			GetRecognitionText() {
				soundApi.GetRecognitionText({
					id:this.id
				}).then(res => {
					// if(res.state ==1 ||res.state==2){
					// 	clearInterval(this.timer);
					// }
					if(res.state==2){
						uni.hideLoading();
						clearInterval(this.timer);
						this.filteredList = res.text.map(item => {
							return{
								item
							}
						})
						// const matchedItems = this.filteredList.filter(item=>res.text.includes(item))
					}
				})
			},
			handReproduction(){
				uni.showLoading({
					title: "音频复刻中",
				});
				soundApi.CreateReproduction({
					dub_url:this.dub_url
				}).then(res => {
					uni.hideLoading();
					uni.$u.toast('音频复刻完成');
					this.$emit('close')
				}).catch(res =>{
					uni.hideLoading();
				})
			}
		},
		onHide() {
			clearInterval(this.timer);
		},
	}
</script>

<style lang="scss" scoped>
.prompt {
	width: 70%;
	background-color: #333;
	margin: 0 auto 30rpx;
	padding: 20rpx 0;
}
.audio {
	.play-icon {
		cursor: pointer;
	}
	.play-name {
		margin: 10rpx 0;
	}
}
.nav-item {
	.text {
		font-size: 28rpx;
		margin: auto;
	}
	.tips {
		margin: 20rpx 0 40rpx;
	}
}
.overplay,
.try-listen {
	display: flex;
	align-items: center;
	justify-content: center;
}
.try-listen {
	margin-left: 100rpx;
}
.overplay {
	margin-bottom: 60rpx;
}
.icon-luzhi2:before {
	color: #73B06F !important;
}
.play-reprod,
.play-icon {
	display: inline-block;
	margin: 0 20rpx;
}
</style>