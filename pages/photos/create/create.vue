<template>
	<view class="create">
		<!-- 创建弹框 -->
		<view class="create-popup" >
			<u-popup  :show="photosCreateShow" mode="bottom"  :round="10"  @open="open" @close="onPotosPopupClose" :closeable="true">
				<view class="list">
					<view  class="create-list">
						 <u--text color="#FFFFFF" text="选择要处理的图片" align="center" size="18" lineHeight="70"></u--text>
						 <scroll-view  scroll-y="true" @scrolltolower="onPhotosModelList" style="height: 600px;">
						 <view class="container">
						   <view
						     class="cont-box"
						     :style="{ '--layout-width': 100 / flowData.column - flowData.columnSpace + '%' }"
						     v-for="(numVal, index) in flowData.column"
						     :key="numVal"
						   >
						     <view class="item-box" v-for="(item, j) in flowData[`column_${index + 1}`]" :key="j" @click="onPhotosLoraPopup(item)">
						       <image :class="['img-tip',photosCreateImg === item.img_url?'photos-active':'']" :src="item.img_url" mode="widthFix" lazy-load />
						     </view>
						   </view>
						 </view>
						 
						 	<view v-if="showMoreData" style="text-align: center;height: 80rpx;"></view>
						</scroll-view> 
						 
						 <u-button text="确认" class="popup-list-but" @click="onPhotosLoraConfig"></u-button>
					</view>
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
				photosCreateImg:'',
				flowData: {
				  list: [], // 数据值
				  column: 2, // 瀑布列数
				  columnSpace: 2 // 瀑布列宽间距
				},
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
					// let photosCreateInfo =  this.photosCreateList[this.photosCreateNumber]
					let photosCreateInfo = {img_url:this.photosCreateImg}	
					this.photosCreateShow = false
					this.$emit('createlist',photosCreateInfo)
			},
			//创建弹框中选择每一项
			onPhotosLoraPopup(img){
				// console.log(img)
				this.photosCreateImg = img.img_url
			},
			//请求创建数据
			async	onloraList(){
				const res = await	util.request({url: '/AiDraw/getHistory'})
					this.photosCreateImg = res.data.list[0].img_url
					this.total	= res.data.count
					this.flowData.list = [...this.flowData.list,...res.data.list]
					this.initData();
			},
			/* 数据初始化 */
			initData() {
			  const groupList = this.dynamicGrouping(this.flowData.list, this.flowData.column); // 数据动态分组
			  groupList.forEach((item, i) => (this.flowData[`column_${i + 1}`] = item));
			},
			   
			dynamicGrouping(data, i) {
			  if (i <= 0) return "分组数必须大于0";
			  const groups = [];
			  for (let j = 0; j < i; j++) {
			    groups.push([]);
			  }
			  for (let k = 0; k < data.length; k++) {
			    const groupIndex = k % i;
			    groups[groupIndex].push(data[k]);
			  }
			  return groups;
			},
		},
		onLoad() {
			// this.onloraList()
		},
		created(){
			 this.onloraList()
			 /* 初始化每一列的数据 */
			 for (let i = 1; i <= this.flowData.column; i++) {
			   this.$set(this.flowData, `column_${i}`, []);
			 }
		}
	}
</script>

<style lang="scss" scoped>
.create{
	.create-popup{
		.list{
			width: 100%;
			height: 1300rpx;
			background: #000000;
			position: relative;
		}
		.create-list{
			width: 95%;
			margin: auto;
			// height: 1300rpx;
			// position: relative;
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
				width: 95%;
				background: #FF0000;
				color: #fff;
				border-radius: 15rpx;
				position: absolute;
				bottom: 40rpx;
				border: none;
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
		.container {
		  display: flex;
		      justify-content: space-around;
			  // justify-content: space-evenly;
		  // padding: 20rpx;
		  $borderRadius: 12rpx;
		  .cont-box {
		    width: var(--layout-width);
		    .item-box {
				margin-top: 5rpx;
		      width: 100%;
		      // padding-bottom: 20rpx;
		      margin-bottom: 5rpx;
		      border-radius: $borderRadius;
		      // box-shadow: 0rpx 3rpx 6rpx rgba(0, 46, 37, 0.08);
		      .img-tip {
		        width: 100%;
				border-radius: 15rpx;
		      }
		    }
		  }
		}
		}
	}
	
	
.photos-active{
	// outline: 1px solid #eee;
	outline: 2px solid #FF0000;
			// border: 2rpx #000 solid;
			// border-radius: 15rpx;
	}
}
</style>
