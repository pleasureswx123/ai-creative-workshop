<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="box-container">
			<HuTab></HuTab>
			<HuUpload></HuUpload>
			<HuTextarea></HuTextarea>
		</view>
		<view class="box-container">
			<HuRadio></HuRadio>
		</view>
		<view class="box-container">
			<HuCaptions></HuCaptions>
		</view>
		<view class="box-container">
			<view class="btn">立即生成</view>
		</view>
		<view class="tips">由于消耗算力较高，每15秒为一个计算单位，不足15秒按照15秒计算</view>
	</view>
</template>

<script>
import HuTab from './components/HuTab.vue'
import HuUpload from './components/HuUpload.vue'
import HuTextarea from './components/HuTextarea.vue'
import HuRadio from './components/HuRadio.vue'
import HuCaptions from './components/HuCaptions.vue'
export default{
	components: {HuTab,HuUpload,HuTextarea,HuRadio,HuCaptions},
	data(){
		return{
			
		}
	}
}
</script>

<style lang="scss" scoped>
.page-container {
	padding: 0 20rpx 50rpx;
	position: relative;
	margin: 30rpx 0;
}
.box-container{
	background: #25262b;
	border: 1px solid #373a40;
	padding: 10rpx 20rpx 20rpx;
	border-radius: 5px;
	margin-bottom: 20rpx;
}
.btn{
	width: 100%;
	background-color: #F60652;
	color: var(--txt-color1);
	text-align: center;
	border-radius: 10rpx;
	padding:10rpx 0;
}
.tips{
	color: var(--txt-color1);
	text-align: center;
	font-size: 24rpx;
	width: 90%;
	margin:20rpx auto 0;
	line-height: 1;
}
</style>