<template>
	<view>
		<view class="text">梦里寻梦，携手同行。<br>心之所向，未来可期。<br>共赴长路，不畏风雨。<br>笑对人生，岁月静好。</view>
		<view class="tips">请用普通话大声朗读上方文字</view>
		<view class="audio" v-if="playShow">
		  <view class="play-icon" @tap="start"><i class="iconfont icon-luzhi1"></i></view>
		  <view class="play-name">{{playtext}}</view>
		</view>
		<view class="audio" v-else>
			<view class="prompt">
				<view class="prompt-loader">
					<view class="em" v-for="(item,index) in 15" :key="index"></view>
				</view>
			</view>
			<view class="play-icon" @tap="start"><i class="iconfont icon-tingzhiluzhi"></i></view>
			<view class="play-name">{{playtext}}</view>
		</view>
	</view>
</template>
<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
export default{
	data(){
		return{
			playtext:'点击录制',
			playShow:true,
			voicePath: ''
		}
	},
	onLoad() {
		let self = this;
		recorderManager.onStop(function (res) {
			console.log('recorder stop' + JSON.stringify(res));
			self.voicePath = res.tempFilePath;
		});
	},
	methods:{
		start(){
			if(this.playtext){
				this.playtext = '停止录制'
				this.playShow = false
			}
			console.log('开始录音');
			recorderManager.start();
		}
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
.audio{
	.play-icon{
		cursor: pointer;
	}
	.play-name{
		margin: 10rpx 0;
	}
}
.nav-item{
	.text{
		font-size: 28rpx;
	}
	.tips{
		margin: 20rpx 0 40rpx;
	}
}

/* 语音音阶------------- */
.prompt{
	width: 70%;
	background-color: #333;
	margin:0 auto 30rpx;
	padding: 20rpx 0;
}
.prompt-loader {
	width: 150px;
	height: 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 6px;
	margin:0 auto;
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
</style>