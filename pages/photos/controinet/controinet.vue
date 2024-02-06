<template>
	<view class="conntroinet" @mousewheel.prevent>
		<!-- 控制网弹框 -->
		<view class="controinet-popup">
			<u-popup  :show="photosControinetShow"  @open="open" >
			<view class="controinnet-content">
				<view class="condition-popup">
					<view class="controinet-popup-text">
						<u--text text="选择控制类型" align="center" size="50rpx" color="#FFFFFF" lineHeight="160rpx"></u--text>
					</view>
					<view class="controinet-popup-tabs">
					<view :class="['controinet-tabs',controinetPopupNumber == index?'controinet-active':'']"  v-for="(item,index) in photosControinetPopupList" @click="oncontroinetPopuptabs(index)">
					<view class="controinet-tabs-b">{{ item.title}}</view>
					</view>
					</view>
					<!-- 点击切换内容 -->
					<view class="controinet-popup-content">
					<view  v-if="controinetPopupNumber == 0 || controinetPopupNumber == 1 || controinetPopupNumber == 2 || controinetPopupNumber == 3">
					<!-- 标题 -->
					<view class="controinet-content">
					<u--text :text="photosControinetText"  size="24rpx" color="#d5d5d6"></u--text>
					</view>
					<!-- 图片 -->
					<view class="controinet-image">
					<u--image :showLoading="true" :src="photosControinetImg" width="360px" height="120px" ></u--image>
					</view>
					<!-- 上传图片 -->
					<u-row customStyle="margin-bottom: 10px" class="controinet-upload">
						<u-col span="5.5">
						 <view class="demo-layout bg-purple-light">
							<u--text text="参考图" align="center" color="#FFFFFF" size="28rpx"></u--text>
					<view class="upload" @tap="uploadAvatar"> 
						<!-- <u--image v-if="photosControinetSrc" :showLoading="true" mode="widthFix" :src="photosControinetSrc" width="150px" height="213px" style="margin-left: 10rpx;"></u--image> -->
						<!-- <view 	style="margin: 0 auto;"  > -->
							<image  v-if="photosControinetSrc"  :src="photosControinetSrc" mode="aspectFit" style="width: 100%;height: 100%;"></image>
						<!-- </view> -->
						<view v-else class="upload-image">
						    <view class="upload-icon">
						        <u-icon class="icon" name="plus" :bold="true"  size="28rpx" color="#FFFFFF"></u-icon>
						    </view>
						    <view class="upload-text">
						        <u--text text="点击上传" align="center" color="#909193" size="28rpx"></u--text>
						        <u--text text="支持jpg/png/gif格式"  align="center" color="#909193" size="24rpx"></u--text>
						    </view>
						</view>
					</view>
					
						</view>
							</u-col>
							<u-col span="1">
							<view class="upload-layout">
								<u-icon name="play-right-fill" class="layout-icon"></u-icon>
							</view>
							</u-col>
							<u-col span="5.5">
						<u--text text="控制图" align="center" color="#FFFFFF" size="24rpx"></u--text>
							<view class="upload-purple">
						<!-- <u--image v-if="photosControinetUploadSrc" :showLoading="true" :src="photosControinetUploadSrc" width="140px" height="210" style="margin-left: 25rpx;"></u--image> -->
						<!-- <image v-if="photosControinetUploadSrc"  :src="photosControinetUploadSrc" mode="widthFix" style="width: 310rpx;height: auto;"></image> -->
						<image  v-if="photosControinetSrc"  :src="photosControinetUploadSrc" mode="aspectFit" style="width: 100%;height: 100%;"></image>
						<view  v-else   :class="['upload-info',photosControinetUploadText == '正在生成，请耐心等候......'?'upload-active':'']">
						<view class="purple">{{photosControinetUploadText}}</view>
						</view>
						</view>
						</u-col>
					</u-row>
						<!-- 确定按钮 -->
					<u-button text="确定" class="controinet-primary" @click="onPhotosUploadBut"></u-button>
				</view></view></view>
				<icon color="#fff" type="cancel" size="30" class="model-icon" @click="onPotosPopupClose"/>
			</view>
		</u-popup>
		</view>
	</view>
</template>

<script>
	import util from '@/utils/util.js'
	export default {
    props: {
      showStatus: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      photosControinetShow(status) {
        !status && this.$emit('update:showStatus', false)
      }
    },
		data() {
			return {
				src:'',
				photosControinetUploadSrc:'',//控制图的图片
				photosControinetUploadText:'上传参考图后自动生成',
				photosControinetSrc:'',//上传图片回显图片
				photosControinetText:'',
				photosControinetImg:'',
				photosUploadList:[],//控制网弹框中上传图片列表
				controinetPopupNumber:0,//控制网弹框中//切换导航的index
				photosControinetShow:false,//弹框控制网显示和隐藏,
				photosControinetPopupList:[]//控制网弹框导航数据
			}
		},
		methods: {
			open() {
					this.photosControinetShow = true 
					this.oncontroineList()	
				},
				//上传图片
				uploadAvatar() {
				    const _this = this;
				    uni.chooseImage({
				        count: 1,
				        success: function(res) {
				            uni.showLoading({
				                title: '正在上传'
				            });
				            util.upload({url: '/Upload/image',filePath: res.tempFilePaths[0]})
				            .then(res=>{
								_this.photosControinetSrc = res.data.path
								_this.photosControinetUploadText = '正在生成，请耐心等候......'
								_this.oncontroineUpload()
				            })
				        }
				    })
				},
			//点击弹框确认按钮
			onPhotosUploadBut(){
				if(this.photosControinetSrc === '')return util.confirm('请添加上传图片再操作')
				this.photosControinetShow = false
				this.photosControinetInfoShow = true
					let info = this.photosControinetPopupList[this.controinetPopupNumber]
						info['img'] = this.photosControinetSrc
						info['url'] = this.photosControinetUploadSrc
						info['value'] = 0.8
					this.$emit('controninetlist',info)
					this.photosControinetUploadSrc = ''
					this.photosControinetSrc = ''
					this.photosControinetUploadText = '上传参考图后自动生成'
				},
			//关闭弹框
			onPotosPopupClose(){
				this.photosControinetShow =false
					this.photosControinetUploadSrc = ''
					this.photosControinetSrc = ''
					this.photosControinetUploadText = '上传参考图后自动生成'
				},
			//控制网弹框中切换标题
			oncontroinetPopuptabs(index){
				this.controinetPopupNumber = index
				this.photosControinetText = this.photosControinetPopupList[index].content
				this.photosControinetImg = this.photosControinetPopupList[index].img_url
				console.log(111111)
				this.photosControinetSrc = ''
				this.photosControinetUploadSrc = ''
				this.photosControinetUploadText = '上传参考图后自动生成'
			},
			//	请求控制网标题
			async oncontroineList(){
				const res = await	util.request({url: '/AiDraw/ControlNetType'})
					this.photosControinetPopupList = res.data
					this.photosControinetText = res.data[0].content
					this.photosControinetImg = res.data[0].img_url
			},
			//请求控制网弹框中控制图
			async oncontroineUpload(){
				try{
					let data = {img_url:this.photosControinetSrc,type_id:this.photosControinetPopupList[this.controinetPopupNumber].id}
					const res = await	util.request({url: '/AiDraw/ControlNetDetect',data})
						// console.log(res)
					this.photosControinetUploadSrc	= res.data.img_url
				}catch(e){
					console.log(e)
					if(e.statusCode === 500)return util.confirm('生成失败，请稍后从试')
				}

			}
		},
		onLoad() {
			// this.oncontroineList()	
		}
	}
</script>

<style lang="scss" scoped>
.conntroinet{

	.controinet-popup{

		.controinnet-content{
			width: 100%;
			// height: 1300rpx;
			height: 95vh;
			background: #000000;
			position: relative;
			
			.model-icon{
			        position: absolute;
			        right: 20rpx;
			        top: 20rpx;
			    }
		}
			.condition-popup{
				width: 90%;
				margin: auto;
				// overflow: auto;
				// box-sizing: border-box;
				.controinet-popup-tabs{
					width: 100%;
					height: 80upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					// color: #909193;
						color: #FFFFFF;
					.controinet-tabs{
						width: 200rpx;
						height: 100%;
						font-size: 28rpx;
							// line-height: 80rpx;
							// text-align: center;
							// color: #909193;
						.controinet-tabs-b{
							height: 100%;
							line-height: 80rpx;
							text-align: center;
							// color: #909193;
						}
					}
			
				}
			}
			// .controinet-popup-text{
			// 	// height: 120rpx;
			// 	// text-align: center;
			// 	// line-height: 120rpx;
			// }
		  .controinet-popup-content{
			  .controinet-content{
				  margin-top: 40rpx;
					margin-bottom: 20rpx;
			  }
			  .controinet-image{
				  display: flex;
			  }
			  .controinet-upload{
				  width: 100%;
				  height: 500rpx;
				  margin-top: 20rpx;
				  // margin-bottom: 200rpx;
				.upload-style{
					width: 300rpx;
					height: 400rpx;
					background: #e5e5e5;
					border: #e5e5e5 2rpx solid;
					border-radius: 15rpx;
					position: relative;
					.upload-up{
						width: 100%;
						height: 200rpx;
						// background: #000;
						position: absolute;
						  left: 50%; 
						  top: 50%; 
						  transform: translate(-50%, -50%);
						  .upload-icon{
							  width: 100%;
							  // margin: 0 auto;
							  text-align: center;
							  font-weight: bold;
							  font-size: 60rpx;
						  }
						}
				}
				.upload-purple{
					width: 310rpx;
					height: 380rpx;
					background: #1D1E23;
					margin-top: 10rpx;
					font-size: 28rpx;
					overflow: hidden;
					// border: #e5e5e5 2rpx solid;
					// border-radius: 15rpx;
					.upload-info{
						// width:300rpx;
						// height:400rpx;
						width: 100%;
						// width: 180rpx;
						 text-align: center;
						height: 100%;
						
					}
					position: relative;
					.purple{
						// height: 100%;
						height: 100rpx;
						width: 180rpx;
						 position: absolute;
						   left: 50%; 
						   top: 50%; 
						   transform: translate(-50%, -50%);
						   color: #909193;
						   text-align: center;
					}
				}
			  }
			  .upload-layout{
				  margin-top: 40rpx;
							height: 400rpx;
							
							.layout-icon{
								margin-top: 190rpx;
								margin-left: 15rpx;
							}
						}
		  }
			.controinet-primary{
				background: #FF0000;
				border:none;
				color: #fff;
				border-radius: 15rpx;
				margin-top: 50rpx;
			}
		.upload{
			width: 310rpx;
			height: 380rpx;
			background: #1D1E23;
			margin-top: 10rpx;
			overflow: hidden;
			// border: #e5e5e5 2rpx solid;
			// border-radius: 15rpx;
			text-align: center;
			.upload-image{
				width: 100%;
				// margin-top: 100rpx;
				// height: 200rpx;
				overflow: hidden;
				.upload-icon{
					width: 100%;
					margin-top: 80rpx;
					margin-bottom: 30rpx;
					.icon{
						width: 26rpx;
						margin: auto;
						 // margin-left: 120rpx;
						 // margin-bottom: 20rpx;
						 // padding: 120rpx 120rpx 30rpx;
					}
					// text-align: center;
				}
			}
		}
		}
	 /* 修改Popup组件的内部滚动区域的高度 */
	  ::v-deep .u-drawer__scroll-view {
	    height: auto !important;
	  }
	.controinet-active{
		color: #FF0000;
		// color: red;
		border-bottom: #FF0000 5rpx solid;
	}
	.upload-active{
		background: #2B2B2B;
		// background: #fff;
		// 	border: #FF0000 1px solid;
	}
	
}
</style>
