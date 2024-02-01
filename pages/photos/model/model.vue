<template>
	<view class="model" >
		<!-- 模型选择弹框 -->
		<u-popup   :show="photosModeleShow" mode="bottom"  :round="10" @click="open"    ref="popup">
			<view class="model-popup" >
				<view class="photos-popup" >
					<view @mousewheel.prevent>
						<view class="popup-up">选择{{photosModelInfo.title}}</view>
						<text class="popup-op">{{photosModelInfo.content}}</text>
					</view>
					<scroll-view  scroll-y="true" @scrolltolower="onPhotosModelList" style="height: 600px;" @touchmove.stop.prevent="() => {}">
					 <view class="popup-row" @touchmove.stop>
						<view :class="['popup-col',photosPopupNumber === index?'photos-active':''] " v-for="(item,index) in photosPopupList" :key="index" @click="onPopupNumber(index)">
						 <!-- <u-image width="100%" height="300rpx" radius="8px" style="margin-bottom: 10rpx;" :src="item.img_url"></u-image> -->
						 <!-- <u-image width="100%" height="300rpx" radius="8px" style="margin-bottom: 10rpx;" :src="item.img_url"></u-image> -->
								<view style="overflow: hidden;">
									<image    :src="item.img_url" mode="widthFix" style="width: 100%;height: 100%;border-radius:15rpx"></image>
								</view>
							<u--text :text="item.title" color="#FFFFFF" size="24rpx"  style="width: 90%;margin: auto;margin-top: 10rpx;" :lines="2" ></u--text>
							<u--text  :text="item.content" color="#909193" size="20rpx"  style="width: 90%;margin: auto;margin-top: 10rpx;" :lines="2"></u--text>
							</view>
								</view>
							<view v-if="showMoreData" style="text-align: center;height: 280rpx;"></view>
					</scroll-view>
					<view @mousewheel.prevent >
						<u-button  @click="onPopupConfirm" class="popup-but" >确认</u-button>
					</view>	
						</view>	
				<!-- <u-icon name="close-circle" size="60rpx" color="#FFFFFF" class="model-icon" @click="onPotosPopupClose"></u-icon> -->
					<icon color="#fff" type="cancel" size="30" class="model-icon" @click="onPotosPopupClose"/>
			</view>
		</u-popup>	
	</view>
</template>

<script>
	import util from '@/utils/util.js'
	export default {
		props:{id:{type:Number}},
		data() {
			return {
				photosModelInfo:{},
				photosSubseCtionList:['SD1.5模型','SDXL模型','MJ模型'],
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				photosPopupNumber:0,//弹框选择模型的index
				photosModeleShow:false,//模型选择的显示和隐藏
				photosPopupList:[],//模型选择的数据
				listData: [], // 列表数据
				page: 1, // 当前页码
				pageSize: 10, // 每页数据量
				total:0,//总数量
				showMoreData:false,//显示和隐藏没有数据了
			}
		},
		methods: {
			open() {
					this.photosModeleShow = true 
					this.page = 1
					this.photosPopupList = []
					this.onshowPopup()
					this.onshowList()
					this.photosPopupNumber = 0
				},
			//触底加载数据
			onPhotosModelList(){
				// 判断是否还有下一页数据
				if (this.page * this.pageSize >= this.total) return this.showMoreData = true
				// 让页码值自增 +1
					this.page +=1
				// 重新获取列表数据
				this.onshowPopup()
			},
			//关闭弹框
			onPotosPopupClose(){
				this.photosModeleShow = false
				// this.$refs.popup.close();
				},
			//弹框模型选择确认事件
			onPopupConfirm(){
				let info = this.photosPopupList[this.photosPopupNumber]
				// info['contents'] = this.photosModelInfo.content
				info['contents'] = info.content
				this.$emit('modelist',info)
				this.photosModeleShow = false	
				this.photosPopupNumber = 0
				// this.page = 1
				// this.photosPopupList = []
				},
			//点击选择模型弹框中的一项事件
			onPopupNumber(num){
				this.photosPopupNumber = num
				},
			//请求模型选择数据
			async onshowPopup(){
					let data ={page:this.page,pagesize:this.pageSize,class_id:this.id}
					const res = await	 util.request({url: '/AiDraw/ModelStyleList',data})
					this.photosPopupList = [...this.photosPopupList,...res.data.list]
					this.total	= res.data.count
			},
			//请求请求导航数据事件
			async	onshowList(){
				const res = await	util.request({url: '/AiDraw/ModelClass'})
					if(this.id === 1){
							this.photosModelInfo = res.data[0]
					}else if(this.id === 2){
						this.photosModelInfo = res.data[1]
					}else{
						this.photosModelInfo = res.data[2]
					}
					},
		},
		
	}
</script>

<style lang="scss" scoped>
.model{
	
	.model-popup{
		width: 100%;
		height: 1280rpx;
			background: #000000;
			position: relative;
	}
	.model-icon{
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}
	.photos-popup{
			width: 90%;
			// height: 1280rpx;
			margin: auto;
			// position: relative;
			.popup-up{
				height: 160rpx;
				text-align: center;
				font-size: 50rpx;
				line-height: 160rpx;
				color: #FFFFFF;
			}
			.popup-op{
				font-size: 24rpx;
				color: #d5d5d5;
				// opacity: 0.8;
				// margin-bottom: 20rpx;
			}
			
			.popup-row{
				// background: saddlebrown;
				margin-top: 20rpx;
				display: flex;
				// justify-content: space-between;
				justify-content: space-around;
				flex-wrap: wrap;
				.popup-col{
					width: 220rpx;
					height: 446rpx;
					background: #1D1E23;
					margin-bottom: 40rpx;
					.popup-rol{
						width: 90%;
						margin: auto;
						height: 120rpx;
					.popup-rol-text{
						font-size: 26rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.popup-rol-test{
						margin-top: 10rpx;
						font-size: 20rpx;
						color:#ccc;
					}	
					}
				}
			}
			.popup-row:after{
				content: '';
				width: 220rpx;
				// flex: 1;、
				flex: auto;
			}
			.popup-but{
				width: 90%;
				margin: auto;
				background: #FF0000;
				color: #fff;
				position: absolute;
				bottom: 40rpx;
				border: none;
			}
	}	
	.photos-active{
				outline: 1rpx solid #FF0000;
				// border: 2rpx #FF0000 solid;
				border-radius: 15rpx;
		}
	
}
// ::v-deep .uni-croll-view{
// 	overscroll-behavior-y: contain !important;
// }

 
	/deep/ .uni-scroll-view {
		// 在真正的滚动区域设置 阻断滚动穿透
		overscroll-behavior-y: contain !important;
	}



</style>
