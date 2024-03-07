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
	padding: 0 20rpx ;
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
</style>