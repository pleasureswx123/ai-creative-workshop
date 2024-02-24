<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="videoPop">
			<view class="title">场景</view>
			<view>白发女子</view>
		</view>
		<view class="nextBtn" @tap="nextStep">下一步</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.page-container {
		background: var(--bg-color1);
		font-size: 24rpx;
		padding: 0 30rpx 40rpx;
		margin-top: 40rpx;
		position: relative;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx 30rpx;
		margin-bottom:30rpx;
		color:var(--txt-color1);
		position: relative;
		font-size:28rpx;
		.title{
			color:#ccc;
			font-size:24rpx;
			margin-bottom: 8rpx;
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