<template>
	<view class="create">
		<!-- 创建弹框 -->
		<view class="create-popup" >
			<u-popup  :show="photosCreateShow" mode="bottom"  :round="10"  @open="open" @close="onPotosPopupClose">
				<view  class="create-list">
					 <u--text text="选择要处理的图片" align="center" size="18" lineHeight="70"></u--text>
					 <scroll-view  scroll-y="true" @scrolltolower="onPhotosModelList" style="height: 600px;">
					 <view class="create-content">
						<view >
							<view   :style="`height:${item.img_height/2}rpx`" :class="['content-image',photosCreateNumber === index?'photos-active':'']" @click="onPhotosLoraPopup(index)" v-for="(item,index) in photosCreateList" :key="index">
														 <image :showLoading="true" :src="item.img_url"   class="image"></image>
							</view>
						</view>
					 </view>
					 	<view v-if="showMoreData" style="text-align: center;height: 500rpx;">没有数据了...</view>
					</scroll-view> 
					 
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
				page: 1, // 当前页码
				pageSize: 6, // 每页数据量
				total:0,//总数量
				showMoreData:false,//显示和隐藏没有数据了
			}
		},
		methods: {
			open() {
					this.photosCreateShow = true 
					// this.onloraList()
				},
			//触底加载数据
			onPhotosModelList(){
				if (this.page * this.pageSize >= this.total) return this.showMoreData = true
					this.page +=1
				this.onloraList()
			},
			//关闭弹框
			onPotosPopupClose(){
				this.photosCreateShow = false
				},
			//创建弹框中确认事件
			onPhotosLoraConfig(){
					let photosCreateInfo =  this.photosCreateList[this.photosCreateNumber]
					this.photosCreateShow = false
					this.$emit('createlist',photosCreateInfo)
			},
			//创建弹框中选择每一项
			onPhotosLoraPopup(index){
				this.photosCreateNumber = index
			},
			//请求创建数据
			async	onloraList(){
				const res = await	util.request({url: '/AiDraw/getHistory'})
				// console.log(res)
					// this.photosCreateList = res.data.list
					this.photosCreateList  = [...this.photosCreateList ,...res.data.list]
					this.total	= res.data.count
			},
		},
		onLoad() {
			// this.onloraList()
		},
		created(){
			 this.onloraList()
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
			.create-content {
				padding:5rpx;
				column-count: 2; // 规定元素应该被划分的列数
				column-gap: 20rpx; // 列之间的间隔
				font-size: 0rpx;
				.content-image{
					width: 100%;
					display: inline-block;
					margin-bottom: 20rpx;
					// background: red;
					.image{
						width:100%;
						height:100%;
					}
				}
			}
		}
	}
	
	
.photos-active{
	// outline: 1px solid #eee;
	outline: 2px solid #000;
			// border: 2rpx #000 solid;
			// border-radius: 15rpx;
	}
}
</style>
