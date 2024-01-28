<template>
	<view class="lora">
		<!-- 样式弹框 -->
		<view class="lora-popup" >
			<u-popup  :show="photosStyleShow" mode="bottom"  :round="10"  @open="open" @close="onPotosPopupClose">
				<view  class="lora-list">
					 <u--text text="选择样式" align="center" size="18" lineHeight="70"></u--text>
					<scroll-view  scroll-y="true" @scrolltolower="onPhotosSstyleList" style="height: 600px;">
					 <view class="lora-popup-list">
					 	<view :class="['popup-list',photosStyleNumber === index?'photos-active':'']" v-for="(item,index) in photosStyleList" :key="index" @click="onPhotosLoraPopup(index)">
					 		<u--image :showLoading="true" :src="src" width="100%" height="130px" radius="8"></u--image>
							<view class="popup-list-text">
								<u--text :text="item.title" size="12" lineHeight="20"></u--text>
								<u--text :text="item.en_title" size="10" color="#909193"></u--text>
							</view>
					 	</view>
					 </view>
					 <view v-if="showMoreData" style="text-align: center;height: 300rpx;line-height: 100rpx;">没有更多数据...</view>
					 </scroll-view>
					 <u-button text="确认" class="popup-list-but" @click="onPhotosStyleConfig"></u-button>
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
					// this.onloraList()
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
			},
			//样式弹框中选择每一项
			onPhotosLoraPopup(index){
				this.photosStyleNumber = index
			},
			//请求样式数据
			async	onloraList(){
				let data = {page:this.page,pagesize:this.pageSize,class_id:this.id}
				const res = await	util.request({url: '/AiDraw/ImgStyleList',data})
				// console.log(res.data.list)
					this.total  =  res.data.count
					this.photosStyleList = [...this.photosStyleList,...res.data.list]
			}
		},
		created(){
			this.onloraList()
		}
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
		.lora-list{
			width: 95%;
			margin: auto;
			height: 1300rpx;
			position: relative;
			.lora-popup-list{
				width: 100%;
				// height: 100%;
				display: flex;
				flex-wrap: wrap;
				.popup-list{
					width: 225rpx;
					height: 402rpx;
					margin-left: 10rpx;
					background: #e5e5e5;
					// margin-bottom: 10rpx;
					margin-top: 10rpx;
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
	outline: 2rpx solid #000;
			// border: 2rpx #000 solid;
			border-radius: 15rpx;
	}
}
</style>
