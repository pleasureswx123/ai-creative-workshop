<template>
	<view class="lora">
		<!-- 样式弹框  @open="open" -->
		<view class="lora-popup" >
			<u-popup  :show="photosStyleShow" mode="bottom"  :round="10"  @click="open" >
				<view class="list">
					<view  class="lora-list">
						<view @mousewheel.prevent>
							 <u--text text="选择样式" align="center" size="50rpx" lineHeight="160rpx" color="#FFFFFF"></u--text>
						</view>
						 <u--text :text="`基于${photosStyleId[id-1]}训练或微调的各种大模型，对各种面风Lora的兼容表现更好，兼顾出图质量和速度。`"  size="24rpx" lineHeight="20" color="#d5d5d5"></u--text>
						<scroll-view  scroll-y="true" @scrolltolower="onPhotosSstyleList" style="height: 600px;">
						 <view class="lora-popup-list">
						 	<view :class="['popup-list',photosStyleNumber === index?'photos-active':'']" v-for="(item,index) in photosStyleList" :key="index" @click="onPhotosLoraPopup(index)">
						 		<u--image :showLoading="true" :src="item.img_url" width="100%" height="130px" radius="8"></u--image>
								<view class="popup-list-text">
									<u--text :text="item.title" size="24rpx" lineHeight="30" color="#FFFFFF" ></u--text>
									<u--text :text="item.en_title" size="20rpx" color="#909193"></u--text>
								</view>
						 	</view>
						 </view>
						 <view v-if="showMoreData" style="text-align: center;height: 200rpx;"></view>
						 </scroll-view>
						 <view @mousewheel.prevent>
						 	<u-button text="确认" class="popup-list-but" @click="onPhotosStyleConfig"></u-button>
						 </view>
					</view>
					<icon color="#fff" type="cancel" size="30" class="model-icon" @click="onPotosPopupClose"/>
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
				photosStyleId:['SD1.5','SDXL','ML'],
				photosStyleNumber: 0,//控制样式弹框中的index
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				photosStyleList:[],
				photosStyleShow:false,//样式弹框显示和隐藏
				page: 1, // 当前页码
				pageSize: 10, // 每页数据量
				total:0,//总数量
				showMoreData:false,//显示和隐藏没有数据了
			}
		},
		methods: {
			open() {
					this.photosStyleShow = true 
					this.onloraList()
				},
				////触底加载数据
				onPhotosSstyleList(){
					if (this.page * this.pageSize >= this.total) return this.showMoreData=true
					this.page +=1
					this.onloraList()
				},
			//关闭弹框
			onPotosPopupClose(){
				this.photosStyleShow = false
				this.photosLoraList = []
				this.page = 1
				this.photosStyleNumber = 0
				},
			//样式弹框中确认事件
			onPhotosStyleConfig(){
				if (!this.isLogin) {
					util.toLogin('请登录')
					return
				}
					let photosSTyleInfo =  this.photosStyleList[this.photosStyleNumber]
					photosSTyleInfo['value'] = 0.8
					this.photosStyleShow = false
					this.$emit('stylelist',photosSTyleInfo)
					this.photosStyleNumber = 0
			},
			//样式弹框中选择每一项
			onPhotosLoraPopup(index){
				this.photosStyleNumber = index
			},
			//请求样式数据
			async	onloraList(){
				let data = {page:this.page,pagesize:this.pageSize,class_id:this.id}
				const res = await	util.request({url: '/AiDraw/ImgStyleList',data})
				console.log(res)
					this.total  =  res.data.count
					this.photosStyleList = [...this.photosStyleList,...res.data.list]
			}
		},
		// created(){
		// 	this.onloraList()
		// }
		// onLoad() {
		// 	// this.onloraList()
		// },
		// onReady(){
		// 	this.onloraList()
		// },
			
		// onShow(){
		// 	this.onloraList()
		// }
	}
</script>

<style lang="scss" scoped>
.lora{
	.lora-popup{
		.list{
			width: 100%;
			height: 1300rpx;
			background: #000000;
			position: relative;
			.model-icon{
			        position: absolute;
			        right: 20rpx;
			        top: 20rpx;
			    }
		}
		.lora-list{
			width: 90%;
			margin: auto;
			
			// position: relative;
			.lora-popup-list{
				margin-top: 20rpx;
				width: 100%;
				// height: 100%;
				display: flex;
				justify-content: space-around;
				// justify-content: space-between;
				 // align-content: space-between;
				flex-wrap: wrap;
				.popup-list{
					width: 220rpx;
					height: 402rpx;
					background: #1D1E23;
					margin-bottom: 40rpx;
					.popup-list-text{
						// height: 120rpx;
						// background: #e5e5e5;
						padding: 10rpx 10rpx;
					}
				}
				
			}
			.lora-popup-list:after{
			    content: '';
			    width: 220rpx;
			    // border:1px solid transparent;
			  }

			.popup-list-but{
				width: 90%;
				background: #FF0000;
				color: #fff;
				border-radius: 15rpx;
				position: absolute;
				bottom: 40rpx;
				// bottom: 40rpx;
				border: none;
			}
		}
	}
	
	
.photos-active{
	outline: 2rpx solid #FF0000;
			// border: 2rpx # solid;
		border-radius: 15rpx;
	}
}
/deep/ .uni-scroll-view {
		// 在真正的滚动区域设置 阻断滚动穿透
		overscroll-behavior-y: contain !important;
	}
</style>
