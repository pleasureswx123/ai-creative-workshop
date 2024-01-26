<template>
	<view class="create">
		<!-- 创建弹框 -->
		<view class="create-popup" >
			<u-popup  :show="photosCreateShow" mode="bottom"  :round="10"  @open="open" @close="onPotosPopupClose">
				<view  class="create-list">
					 <u--text text="选择要处理的图片" align="center" size="18" lineHeight="70"></u--text>
					 <view class="create-popup-list">
					 	<view :class="['popup-list',photosCreateNumber === index?'photos-active':'']" v-for="(item,index) in photosCreateList" :key="index" @click="onPhotosLoraPopup(index)">
					 		<u--image :showLoading="true" :src="item.img_url" width="110px" height="130px" radius="5"></u--image>
					 	</view>
					 </view>
					 <!-- <u-button text="确认" class="popup-list-but" @click="onPhotosLoraConfig"></u-button> -->
					 <u-button text="确认" class="popup-list-but" @click="onPhotosLoraConfig"></u-button>
				</view>
				</u-popup>
		</view>	 
	</view>
</template>

<script>
	import util from '@/utils/util.js'
	export default {
		data() {
			return {
				photosCreateNumber:0,//控制风格弹框中的index
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				photosCreateList:[],
				photosCreateShow:false,//风格弹框显示和隐藏
			}
		},
		methods: {
			open() {
					this.photosCreateShow = true 
					this.onloraList()
				},
			//关闭弹框
			onPotosPopupClose(){
				this.photosCreateShow = false
				},
			//创建弹框中确认事件
			onPhotosLoraConfig(){
					// console.log(this.photosLoraList[this.photosLoraNumber])
					let photosLoraInfo =  this.photosCreateList[this.photosCreateNumber]
					this.photosCreateShow = false
					this.$emit('loralist',photosLoraInfo)
					// this.photosLoraInfoShow = true
			},
			//创建弹框中选择每一项
			onPhotosLoraPopup(index){
				this.photosCreateNumber = index
			},
			//请求创建数据
			async	onloraList(){
				const res = await	util.request({url: '/AiDraw/getHistory'})
				console.log(res)
					this.photosCreateList = res.data.list
			},
		},
		onLoad() {
			// this.onloraList()
		}
	}
</script>

<style lang="scss" scoped>
.create{
	.create-popup{
		.create-list{
			width: 95%;
			margin: auto;
			height: 650px;
			position: relative;
			// overflow: hidden;
			.create-popup-list{
				width: 100%;
				// height: 130rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.popup-list{
					// height: 130px;
					margin-bottom: 20rpx;
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
			border: 6rpx #000 solid;
			border-radius: 15rpx;
	}
}
</style>
