<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="videoPop">图片配置支持AI绘图或者上传素材(2选1)，若选择AI绘图，每张图片会根据图片配置小号对应的积分(修改会重新消耗积分)。</view>
		<view class="videoPop">
			<view class="title">白发女子白发女子白发女子白发女子白发女子白发女子白发女子</view>
			<view class="generate">
				<view class="info">
					<i class="iconfont icon-AI"></i>
					<view class="">AI生成</view>
				</view>
				<!-- <view class="info">
					<view class="add">+</view>
					<view class="">上传图片</view>
				</view> -->
			</view>
		</view>
		<view class="nextBtn" @tap="nextTop">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			nextTop(){
				uni.navigateTo({
				   url: './finish'
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
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx;
		margin-top:30rpx;
		color:var(--txt-color2);
		position: relative;
		font-size:24rpx;
		.title{
			border-bottom:1px solid var(--txt-color3);
			padding-bottom: 30rpx;
		}
	}
	.generate{
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20rpx;
		margin-top: 30rpx;
		.info{
			 background-color: #31344a;
			 height: 142rpx;
			 text-align: center;
			 border-radius:30rpx;
			 .iconfont{
				 display:block;
				 margin: 20rpx 0 0;
			 }
			 .add{
				 width: 50rpx;
				 height: 50rpx;
				 border:1px dashed var(--txt-color2);
				 margin: 30rpx auto 14rpx;
				 font-size:40rpx;
				 border-radius:6rpx;
			 }
		}
	}
	.nextBtn{
		position: fixed;
		bottom: 0;
		left: 0;
		background: #2877ff;
		text-align:center;
		width: 100%;
		padding:30rpx 0;
		color:var(--txt-color1);
		border-radius:20rpx 20rpx 0 0;
		font-size:28rpx;
		font-weight:700;
	}
</style>