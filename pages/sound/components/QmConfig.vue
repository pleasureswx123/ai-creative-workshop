<template>
	<view class="container">
		<view class="item" :show="configShow" v-if="configShow">
			<view class="title">音量</view>
			<HuSlider :value.sync="volume" type="volume" :titShow="titShow=false"></HuSlider>
		</view>
		<view class="item" :show="configShow" v-if="configShow">
			<view class="title">语速</view>
			<HuSlider :value.sync="speed" type="speed" :titShow="titShow=false"></HuSlider>
		</view>
		<view class="item" :show="wordShow" v-if="wordShow">
			<view class="title">字幕</view>
			<u-switch v-model="value" activeColor="#f60652" @change="change" size="35"></u-switch>
		</view>
		<view class="item" :show="wordShow" v-if="wordShow">
			<view class="title">字体</view>
			<HuCaptions ref="HuCaptions" @changeSwitch="changeSwitch" :homShow="homShow=false" :display="'flex'"></HuCaptions>
		</view>
	</view>
</template>

<script>
import HuSlider from '@/pages/human/components/HuSlider.vue';
import HuCaptions from '@/pages/human/components/HuCaptions.vue';
export default{
	components: {HuSlider,HuCaptions},
	props:{
		configShow:{
			type:Boolean,
			default:true
		},
		wordShow:{
			type:Boolean,
			default:true
		},
	},
	data(){
		return{
			volume: 2,
			speed: 2,
			value:''
		}
	},
	methods:{
		changeSwitch(isSwitch){
			if(isSwitch == true){
				this.show_captions = 1
			}else{
				this.show_captions = 0
			}
			console.log(this.volume,this.speed)
		},
		change(e) {
			console.log('change', e);
		},
	}
}
</script>

<style lang="scss" scoped>
.container{
	padding:10rpx 30rpx 60rpx 30rpx ;
	.item{
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
		.title{
			font-size: 30rpx;
			width: 18%;
			color:var(--txt-color2);
		}
	}
}
@media screen and (min-width: 960px){
	.title{
		width: 5%!important;
	}
}
</style>