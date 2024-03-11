<template>
	<!-- 音频播放器组件 -->
	<view class="audio" v-if='url'>
		  <view class="flex">
			  <view>{{title}}</view>
			  <view class='ml-3'>{{getTime(Math.round(currentTime))}}</view>
		  </view>
		  <view class='slider'>
		  	<slider @change='changeAudio' :activeColor='activeColor' :min='0' :max='duration.toFixed(0)' :value='currentTime.toFixed(0)' :step='0.1'></slider>
		  </view>
		  <view class="iconPlay"  @click='start(audioId)'>
			  <i class="iconfont icon-zanting icon" v-show='status'></i>
			  <i class="iconfont icon-bofang2 icon" v-show='!status'></i>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				context: null,
				currentTime: 0,
				duration: 100,
				status: false,
				audioId:''
			}
		},
		props: {
			url: String,
			activeColor: {
				type: String,
				default: '#F60652'
			},
			endPic: String,
			title: String,
		},
		created() {
			this.context = uni.createInnerAudioContext();
			this.context.src = this.url;
			this.onTimeUpdate();
			this.onCanplay();
			this.onEnded();
			uni.$on('stop',(id)=> {
				if(id && id != this.audioId) {
					this.context.stop();
					this.status = false;
				} else if(!id){
					this.context.stop();
					this.status = false;
				}
			})
		},
		methods: {
			start(id) { //点击播放
				let audioId = id;
				if(this.status) {
					this.context.pause();
					this.status = !this.status;
				}else {
					uni.$emit('stop',id)
					this.context.play()
					this.status = !this.status;
				}
			},
			onCanplay() { //进入可播放状态
				this.context.onCanplay(() => {
					this.context.duration;
					setTimeout(()=>{
						this.duration = this.context.duration;
					},1000)
				})
			},
			onTimeUpdate() { //音频播放进度
				 this.context.onTimeUpdate(() => {
					 if (!Number.isFinite( this.context.duration)) {
						this.duration = this.context.currentTime + 10;
						this.currentTime = this.context.currentTime;
					 } else {
						 this.duration = this.context.duration;
						 this.currentTime = this.context.currentTime;
					 }
				 })
			},
			onEnded() { //播放结束
				this.context.onEnded(()=> {
					this.status = false;
					this.currentTime = 0;
				})
			},
			changeAudio(e) {
				let paused = this.context.paused;
				this.context.pause();
				this.context.seek(e.detail.value)
				if(!paused) {
					this.context.play();
				} 
			},
			getTime(time) {
				let m = parseInt(time / 60);
				let s = time % 60;
				return this.towNum(m) + ':' + this.towNum(s);
			},
			towNum(num) {
				if(num >= 10) {
					return num;
				}else {
					return '0' + num;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.audio{
		padding: 0 100rpx 0 0;
		position: relative;
		.flex{
			display:flex;
			justify-content: space-between;
		}
		.bar{
			height: 4px;
			line-height:4px;
			background:#999;
			margin-top: 14rpx;
			border-radius: 10rpx;
		}
		.iconPlay{
			position: absolute;
			right: 0;
			top: 0;
		}
		uni-slider{
			margin: 10rpx 0;
		}
		/deep/.uni-slider-thumb,{
			width: 20rpx!important;
			height: 20rpx!important;
			margin-top: -10rpx!important;
			margin-left: 0!important;
		}
	}
</style>
