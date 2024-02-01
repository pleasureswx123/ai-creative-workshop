<template>
	<view class="lora" >
		<!-- 风格弹框 @mousewheel.prevent-->
		<view class="lora-popup" >
			<u-popup   :show="photosLoraShow" mode="bottom"  :round="10"  @click="open" >
				<view class="list" >
					<view  class="lora-list">
						<view @mousewheel.prevent>
						 <u--text  text="选择Lora模型" align="center" size="50rpx" lineHeight="160rpx" color="#FFFFFF"></u--text>
						  <u--text :text="`基于${photosStyleId[id-1]}训练或微调的各种大模型，对各种面风Lora的兼容表现更好，兼顾出图质量和速度。`"  size="24rpx" lineHeight="40rpx" color="#d5d5d5"></u--text>
						</view>
						 <scroll-view  scroll-y="true" @scrolltolower="onPhotosModelList" style="height: 600px;" @touchmove.stop.prevent="() => {}">
						 <view class="lora-popup-list">
						 	<view :class="['popup-list',photosLoraNumber === index?'photos-active':'']" v-for="(item,index) in photosLoraList" :key="index" @click="onPhotosLoraPopup(index)">
						 		<u--image :showLoading="true" :src="item.img_url" width="100%" height="130px" radius="8"></u--image>
								<view class="popup-list-text">
									<!-- <u--text :text="item.title" size="12" lineHeight="20" class="text-up"></u--text>
									<u--text :text="item.content" size="10" color="#909193"></u--text> -->
									<view class="popup-rol-text">{{item.title}}</view>
										<view class="popup-rol-test">{{item.content}}</view>
								</view>
						 	</view>
						 </view>
						  <view v-if="showMoreData" style="text-align: center;height: 200rpx;"></view>
						 </scroll-view>
						 <view @mousewheel.prevent >
						 	 <u-button  text="确认" class="popup-list-but" @click="onPhotosLoraConfig"></u-button>
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
				page: 1, // 当前页码
				pageSize: 10, // 每页数据量
				total:0,//总数量
				showMoreData:false,//显示和隐藏没有数据了
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
			//触底加载数据
			onPhotosModelList(){
				if (this.page * this.pageSize >= this.total) return this.showMoreData = true
					this.page +=1
					this.onloraList()
			},
			//关闭弹框
			onPotosPopupClose(){
				this.photosLoraShow = false
				this.photosLoraList = []
				this.page = 1
				this.photosLoraNumber = 0
				},
			//风格弹框中确认事件
			onPhotosLoraConfig(){
				if (!this.isLogin) {
					util.toLogin('请登录')
					return
				}
					let photosLoraInfo =  this.photosLoraList[this.photosLoraNumber]
							photosLoraInfo['value'] = 0.8
					this.photosLoraShow = false
					this.$emit('loralist',photosLoraInfo)
					this.photosLoraList = []
					this.page = 1
					this.photosLoraNumber = 0
			},
			//风格弹框中选择每一项
			onPhotosLoraPopup(index){
				this.photosLoraNumber = index
			},
			//请求风格数据
			async	onloraList(){
					let data = {page:this.page,pagesize:this.pageSize,class_id:this.id}
				const res = await	util.request({url: '/AiDraw/LoraList',data})
							console.log(res)
					this.total = res.data.count

					this.photosLoraList = [...this.photosLoraList,...res.data.list]
			},
		},
		created() {
			// this.onloraList()
		}
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
			.lora-popup-list{
				margin-top: 20rpx;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				.popup-list{
					width: 220rpx;
					height: 402rpx;
					// margin-left: 10rpx;
					background: #1D1E23;
					margin-bottom: 40rpx;
					// margin-left: 1rpx;
					.popup-list-text{
						padding: 10rpx;
						// box-sizing: border-box;
						.popup-rol-text{
							margin-top: 10rpx;
							font-size: 24rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							color: #FFFFFF;
						}
						.popup-rol-test{
							margin-top: 10rpx;
							font-size: 20rpx;
							// color:#ccc;
							color:#fff;
							opacity: 0.7;
						}
					}
				}
				
			}
			.lora-popup-list:after{
			      // width: 220rpx;
				  flex: 1;
			      content: "";
			    }
			.popup-list-but{
				width: 90%;
				background: #FF0000;
				color: #fff;
				border-radius: 15rpx;
				position: absolute;
				bottom: 40rpx;
				border: none;
			}
		}
	}
	
	
.photos-active{
			outline: 2rpx solid #FF0000;
			// border: 2rpx #000 solid;
			border-radius: 15rpx;
	}
}
/deep/ .uni-scroll-view {
		// 在真正的滚动区域设置 阻断滚动穿透
		overscroll-behavior-y: contain !important;
	}
</style>
