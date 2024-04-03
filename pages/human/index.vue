<template>
	<view class="page-container">
		<view v-if="pageShow">
			<QmNavTop></QmNavTop>
			<view class="box-container">
				<HuTab @tab="tab"></HuTab>
				<HuUpload ref="HuUpload"></HuUpload>
				<HuTextarea v-show="type == 1" ref="HuTextarea"></HuTextarea>
			</view>
			<view class="box-container" v-if="type == 1">
				<HuRadio @onSelected="onSelected" ref="HuRadio"></HuRadio>
				<HuSlider :value.sync="volume" type="volume"></HuSlider>
				<HuSlider :value.sync="speed" type="speed"></HuSlider>
			</view>
			<view class="box-container" v-if="type == 2">
				<HuAudio ref="HuAudio"></HuAudio>
			</view>
			<view class="box-container">
				<HuCaptions ref="HuCaptions" @changeSwitch="changeSwitch"></HuCaptions>
			</view>
			<view class="box-container">
				<view class="btn" @tap="handGenerate">
					立即生成
					<view class="time">{{integralTips}}</view>
				</view>
			</view>
			<view class="tips">由于消耗算力较高，每15秒为一个计算单位，不足15秒按照15秒计算</view>
			<view class="tipsPop">
				<u-modal :show="tipShow" :title="tips.info" :content='tips.tag'
				 :showCancelButton="true" confirmText="确定生成" cancelText="返回修改"
				 confirmColor="#fff" cancelColor="#fff" @confirm="confirm" @cancel="cancel"
				 ></u-modal>
			</view>
		</view>
		<HuGenerate v-else :videoUrl="videoUrl" :taskId="taskId" @Handload="Handload"></HuGenerate>
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
import HuGenerate from './components/HuGenerate.vue';
import {HumanApi} from '@/api'
export default{
	components: {HuTab,HuUpload,HuTextarea,HuRadio,HuCaptions,HuAudio,HuSlider,HuGenerate},
	data(){
		return{
			type:1,
			dub_id:'',
			dub_url:'',
			show_captions:1,
			volume: 2,
			speed: 2,
			imgSrc:'',
			tipShow:false,
			tips:{},
			pageShow:true,
			taskId:0,
			state:0,
			timer:null,
			videoUrl:''
		}
	},
	computed: {
		integralTips() {
		  const result = (this.userIntegral?.['24'] || {})?.consume?.A_show;
		  return result
		},
	},
	methods:{
		tab(e){
			this.type = e.id
			// this.show_captions = 1
			
			this.$refs.HuTextarea.current = ''
			this.$refs.HuUpload.uploadShow = true
		},
		onSelected(data){
			this.dub_id = data.dub_id
			this.dub_url = data.url
		},
		changeSwitch(isSwitch){
			if(isSwitch == true){
				this.show_captions = 1
			}else{
				this.show_captions = 0
			}
		},
		handGenerate(){
			let obj = {
				dub_volume: ['0.2', '0.3', '1', '2', '3'][this.volume],
				dub_speed: ['0.7', '0.8', '1', '1.3', '1.6'][this.speed],
			}
			if(this.type==1){
				this.dub_url = this.dub_url
			}else{
				this.dub_url = this.$refs.HuAudio.audioCont.dub_url
			}
			HumanApi.confirmTask({
				type:this.type,
				content:this.$refs.HuTextarea.current,
				dub_id:this.dub_id || '',
				dub_speed:obj.dub_speed || '',
				dub_volume:obj.dub_volume || '',
				show_captions:this.show_captions,
				reference_image:this.$refs.HuUpload.imgSrc|| '',
				typeface_id:this.$refs.HuCaptions.capId,
				dub_url:this.dub_url,
			}).then(res => {
				this.tips = res
				this.tipShow = true
				this.videoId = res.dub_url
			})
		},
		cancel(){
			this.tipShow = false
		},
		confirm(){
			this.tipShow = false
			let obj = {
				dub_volume: ['0.2', '0.3', '1', '2', '3'][this.volume],
				dub_speed: ['0.7', '0.8', '1', '1.3', '1.6'][this.speed],
			}
			uni.showLoading({
				title: "创建中",
			});
			HumanApi.createTask({
				type:this.type,
				content:this.$refs.HuTextarea.current,
				dub_id:this.dub_id || '',
				dub_speed:obj.dub_speed || '',
				dub_volume:obj.dub_volume || '',
				show_captions:this.show_captions,
				reference_image:this.$refs.HuUpload.imgSrc,
				typeface_id:this.$refs.HuCaptions.capId,
				dub_url:this.videoId
			}).then(res => {
				uni.hideLoading();
				this.pageShow = false
				this.taskId = res.task_id
			}).catch(res =>{
				this.pageShow = true
				uni.hideLoading();
			})
		},
		Handload(data){
			if(data == '重新生成'){
				this.pageShow = true
			}
		}
	},
	onHide() {
		clearInterval(this.timer);
	},
}
</script>

<style lang="scss" scoped>
.page-container {
	background: var(--bg-color1);
	padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
	/deep/.u-popup__content{
		background-color: #373A40;
		.u-modal{
			padding: 0 80rpx;
			box-sizing: border-box;
		}
		.u-modal__title{
			color: var(--txt-color1);
			font-size: 28rpx;
			font-weight: normal;
		}
		.u-modal__content__text{
			color:#F60652;
			font-size: 24rpx;
		}
		.u-line{
			display: none;
		}
		.u-modal__content{
			padding: 0!important;
			margin-top: 20rpx;
		}
		.u-modal__button-group{
			margin: 30rpx 0;
			display: grid;
			gap: 10px;
			grid-template-columns: repeat(2,1fr);
		}
		.u-modal__button-group__wrapper{
			background-color: #A49D9D;
			height: 60rpx;
			line-height: 60rpx;
			border-radius:10rpx;
		}
		.u-modal__button-group__wrapper__text{
			font-size: 24rpx;
		}
		.u-modal__button-group__wrapper--confirm{
			background-color: #F60652;
		}
	}
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
	padding:20rpx 0;
	cursor: pointer;
	position: relative;
	.time{
		position: absolute;
		right: 10rpx;
		font-size:20rpx;
		bottom: 0;
	}
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