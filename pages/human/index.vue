<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="box-container">
			<HuTab @tab="tab"></HuTab>
			<HuUpload ref="HuUpload"></HuUpload>
			<HuTextarea v-if="type == 1" ref="HuTextarea"></HuTextarea>
		</view>
		<view class="box-container" v-if="type == 1">
			<HuRadio @onSelected="onSelected" ref="HuRadio"></HuRadio>
			<HuSlider :value.sync="volume" type="volume"></HuSlider>
			<HuSlider :value.sync="speed" type="speed"></HuSlider>
		</view>
		<view class="box-container" v-if="type == 2">
			<HuAudio></HuAudio>
		</view>
		<view class="box-container">
			<HuCaptions ref="HuCaptions"></HuCaptions>
		</view>
		<view class="box-container">
			<view class="btn" @tap="handGenerate">立即生成</view>
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
import HuAudio from './components/HuAudio.vue'
import HuSlider from './components/HuSlider.vue';
import {HumanApi} from '@/api'
export default{
	components: {HuTab,HuUpload,HuTextarea,HuRadio,HuCaptions,HuAudio,HuSlider},
	data(){
		return{
			type:1,
			dub_id:'',
			dub_url:'',
			show_captions:1,
			volume: 2,
			speed: 2
		}
	},
	methods:{
		tab(e){
			this.type = e.id
		},
		onSelected(data){
			this.dub_id = data.dub_id
			this.dub_url = data.url
		},
		handGenerate(){
			let obj = {
				dub_volume: ['0.2', '0.3', '1', '2', '3'][this.volume],
				dub_speed: ['0.7', '0.8', '1', '1.3', '1.6'][this.speed],
			}
			HumanApi.confirmTask({
				type:this.type,
				content:this.$refs.HuTextarea.current,
				dub_id:this.dub_id || '',
				dub_speed:obj.dub_speed || '',
				dub_volume:obj.dub_volume || '',
				dub_url:this.dub_url,
				show_captions:this.$refs.HuCaptions.show_captions,
				reference_image:this.$refs.HuUpload.imgSrc,
				typeface_id:this.$refs.HuCaptions.capId
			}).then(res => {
				this.getList = res.list
			})
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