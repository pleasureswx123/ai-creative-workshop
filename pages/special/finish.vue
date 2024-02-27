<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="iconfont icon-shipinshengchengzhong"></view>
		<view class="finish">
			<text>（预估5-10分钟完成）</text>
			<view class="videoPop">
				<view class="finishTit">视频生成中</view>
				<text>当前状态可返回，不会数据丢失，视频生成后可在<br>"AI视频"->"我的作品"处查看</text>
				<view class="btn-bar">
					<view class="btn back" @tap="back">返回</view>
					<view class="btn next">我的作品</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateTo({
				   url: './clause'
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