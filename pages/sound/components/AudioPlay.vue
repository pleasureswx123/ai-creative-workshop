<template>
	<view>
		<view class="text" v-for="(item,index) in textList">
			<view>{{item.name}}</view>
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
				<view class="prompt-loader">
					<view class="em" v-for="(item,index) in 15" :key="index"></view>
				</view>
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
				<view v-if="statusName =='重新录制'" class="play-reprod">
					<i class="iconfont icon-luzhi1 icon-luzhi2"></i>
					<view>复刻</view>
				</view>
			</view>
			<mumu-recorder ref='recorder' @success='handlerSuccess' @error='handlerError'></mumu-recorder>
		</view>
	</view>
</template>
<script>
	import {
		soundApi
	} from '@/api'
	export default {
		data() {
			return {
				statusName: '点击录制',
				playShow: true,
				audioContext: null,
				textList: [],
				audioUrl: ''
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
				uni.uploadFile({
					name: 'audio', //文件上传的name值
					url: 'https://localhost:8099/web.php/upload/audio', //接口地址
					header: {}, //头信息
					formData: {}, //上传额外携带的参数
					filePath: res.localUrl, //临时路径
					fileType: "audio", //文件类型
					success: (uploadFileRes) => {
						const ret = JSON.parse(uploadFileRes.data);
						console.log(ret)
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
					pagesize: 20,
				}).then(res => {
					this.textList = res.text_info.map(item => {
						return {
							name: item
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes load {
		0% {
			height: 10%;
		}

		50% {
			height: 100%;
		}

		100% {
			height: 10%;
		}
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
		}

		.tips {
			margin: 20rpx 0 40rpx;
		}
	}

	/* 语音音阶------------- */
	.prompt {
		width: 70%;
		background-color: #333;
		margin: 0 auto 30rpx;
		padding: 20rpx 0;
	}

	.prompt-loader {
		width: 150px;
		height: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6px;
		margin: 0 auto;
	}

	.prompt-loader .em {
		display: block;
		background: #3f4bf0;
		width: 1px;
		height: 10%;
		margin-right: 2.5px;
		float: left;
	}

	.prompt-loader .em:last-child {
		margin-right: 0px;
	}

	.prompt-loader .em:nth-child(1) {
		animation: load 2.5s 1.4s infinite linear;
	}

	.prompt-loader .em:nth-child(2) {
		animation: load 2.5s 1.2s infinite linear;
	}

	.prompt-loader .em:nth-child(3) {
		animation: load 2.5s 1s infinite linear;
	}

	.prompt-loader .em:nth-child(4) {
		animation: load 2.5s 0.8s infinite linear;
	}

	.prompt-loader .em:nth-child(5) {
		animation: load 2.5s 0.6s infinite linear;
	}

	.prompt-loader .em:nth-child(6) {
		animation: load 2.5s 0.4s infinite linear;
	}

	.prompt-loader .em:nth-child(7) {
		animation: load 2.5s 0.2s infinite linear;
	}

	.prompt-loader .em:nth-child(8) {
		animation: load 2.5s 0s infinite linear;
	}

	.prompt-loader .em:nth-child(9) {
		animation: load 2.5s 0.2s infinite linear;
	}

	.prompt-loader .em:nth-child(10) {
		animation: load 2.5s 0.4s infinite linear;
	}

	.prompt-loader .em:nth-child(11) {
		animation: load 2.5s 0.6s infinite linear;
	}

	.prompt-loader .em:nth-child(12) {
		animation: load 2.5s 0.8s infinite linear;
	}

	.prompt-loader .em:nth-child(13) {
		animation: load 2.5s 1s infinite linear;
	}

	.prompt-loader .em:nth-child(14) {
		animation: load 2.5s 1.2s infinite linear;
	}

	.prompt-loader .em:nth-child(15) {
		animation: load 2.5s 1.4s infinite linear;
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