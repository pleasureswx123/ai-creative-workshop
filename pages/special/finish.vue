<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="iconfont icon-shipinshengchengzhong"></view>
		<view class="finish">
			<text>（预估5-10分钟完成）</text>
			<view class="videoPop">
				<view class="finishTit">{{status}}</view>
				<text>当前状态可返回，不会数据丢失，视频生成后可在<br>"AI视频"->"我的创作"处查看</text>
				<view class="btn-bar">
					<view class="btn back" @tap="back">返回</view>
					<view class="btn next" @tap="goBack">我的创作</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {NovelApi} from '@/api'
	export default {
		data() {
			return {
				status:''
			}
		},
		mounted() {
			this.getName()
			let timer = setInterval(() => {
			    setTimeout(this.getName, 0)
			}, 10000);
		},
		beforeDestroy() {
			this.$once('hook:beforeDestroy', () => {
			    clearInterval(timer);
			});
		},
		methods: {
			back(){
				uni.navigateTo({
				   url: './clause'
				})
			},
			goBack(){
				uni.navigateTo({
				   url: './tabulation'
				})
			},
			getName(){
				let row = JSON.parse(uni.getStorageSync('task'))
				NovelApi.getTaskInfo({
					data:{
						task_id:row
					},
					no_sign: 1,
					sourceCode:"100001",
					sign:"52d89ffef49b65edaf5d232104d42fac",
					timestamp:"1545454552"
				}).then(res => {
					const state = res.state
					if(state == 0 || state == 1){
						this.status = '分镜处理中'
					}
					if(state == 2){
						this.status = '分镜已完成'
					}
					if(state == 3){
						this.status = '视频合成中'
					}
					if(state == 4){
						this.status = '完成'
					}
					if(state == 100){
						this.status = '任务失败'
					}
					if(res.is_automatic == 1 && state == 4){
						uni.navigateTo({
							url: './tabulation'
						})
					}
					if(res.is_automatic == 2 && state == 2){
						uni.navigateTo({
							url: './config'
						})
					}
				}).catch(() => {
					this.status = '任务失败'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page-container{
		background: var(--bg-color1);
		padding: 0 30rpx;
		position: relative;
		font-size: 28rpx;
		.iconfont{
			text-align: center;
			margin: 15vh auto 12vh;
		}
	}
	.finish{
		text-align: center;
		text{
			color:var(--txt-color2);
			font-size: 24rpx;
		}
		.videoPop{
			background-color:#3b3f57;
			border-radius:20rpx;
			padding:50rpx 40rpx 30rpx;
			margin:30rpx 0 30rpx;
			color:var(--txt-color1);
			position: relative;
			text-align: center;
			.finishTit{
				margin-bottom: 30rpx;
			}
		}
		.btn-bar{
			display: flex;
			gap:20px;
			margin-top: 40rpx;
			.btn{
				flex:1;
				padding:20rpx 0;
				border-radius: 20rpx;
			}
			.back{
				background-color: #2c2f44;
				color:var(--txt-color2);
				border: 1px solid #2c2f44;
			}
			.next{
				border: 1px solid var(--txt-color1);
			}
		}
	}
</style>