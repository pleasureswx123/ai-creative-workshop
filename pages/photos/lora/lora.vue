<template>
	<view class="lora">
		<!-- 风格弹框 -->
		<view class="lora-popup" >
			<u-popup  :show="photosLoraShow" mode="bottom"  :round="10"  @open="open" @close="onPotosPopupClose">
				<view  class="lora-list">
					 <u--text text="选择Lora模型" align="center" size="18" lineHeight="70"></u--text>
					 <view class="lora-popup-list">
					 	<view :class="['popup-list',photosLoraNumber === index?'photos-active':'']" v-for="(item,index) in photosLoraList" :key="index" @click="onPhotosLoraPopup(index)">
					 		<u--image :showLoading="true" :src="src" width="100%" height="130px" radius="5"></u--image>
					 		<!-- <u--image :showLoading="true" :src="item.img_url" width="100%" height="130px" radius="5"></u--image> -->
							<view class="popup-list-text">
								<u--text :text="item.title" size="12" lineHeight="20"></u--text>
								<u--text :text="item.content" size="10" color="#909193"></u--text>
							</view>
					 	</view>
					 </view>
					 <u-button text="确认" class="popup-list-but" @click="onPhotosLoraConfig"></u-button>
				</view>
				</u-popup>
		</view>	 
	</view>
</template>

<script>
	import util from '@/utils/util.js'
	export default {
		props:{id:{type:Number},isLogin:{type:Boolean}},
		data() {
			return {
				photosLoraNumber:0,//控制风格弹框中的index
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				photosLoraList:[],
				photosLoraShow:false,//风格弹框显示和隐藏
			}
		},
		methods: {
			open() {
					this.photosLoraShow = true 
					this.onloraList()
				},
			//关闭弹框
			onPotosPopupClose(){
				this.photosLoraShow = false
				},
			//风格弹框中确认事件
			onPhotosLoraConfig(){
				if (!this.isLogin) {
					util.toLogin('请登录')
					return
				}
					// console.log(this.photosLoraList[this.photosLoraNumber])
					let photosLoraInfo =  this.photosLoraList[this.photosLoraNumber]
							photosLoraInfo['value'] = 0.8
					this.photosLoraShow = false
						console.log(photosLoraInfo)
					this.$emit('loralist',photosLoraInfo)
					// this.photosLoraInfoShow = true
			},
			//风格弹框中选择每一项
			onPhotosLoraPopup(index){
				this.photosLoraNumber = index
			},
			//请求风格数据
			async	onloraList(){
					let data = {page:1,pagesize:10,class_id:this.id}
				const res = await	util.request({url: '/AiDraw/LoraList',data})
					console.log(res.data.list)
					this.photosLoraList = res.data.list
			},
		},
		onLoad() {
			// this.onloraList()
		}
	}
</script>

<style lang="scss" scoped>
.lora{
	.lora-popup{
		.lora-list{
			width: 95%;
			margin: auto;
			height: 650px;
			position: relative;
			.lora-popup-list{
				width: 100%;
				height: 100%;
				display: flex;
				.popup-list{
					width: 225rpx;
					height: 402rpx;
					margin-left: 10rpx;
					background: #e5e5e5;
					.popup-list-text{
						// height: 120rpx;
						// background: #e5e5e5;
						padding: 10rpx 10rpx;
					}
				}
				
			}
			.popup-list-but{
				background: #000;
				color: #fff;
				border-radius: 15rpx;
				position: absolute;
				bottom: 40rpx;
			}
		}
	}
	
	
.photos-active{
			border: 2rpx #000 solid;
			border-radius: 15rpx;
	}
}
</style>
