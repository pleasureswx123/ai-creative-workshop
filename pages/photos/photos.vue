<template>
	
	<view class="phogos-tontent">
		<!-- 提示 -->
	 <u-cell-group class="u-cell-group">
		<u-cell	v-if="photosTastNumber>0" value="去创建历史查看" :title="photosTastNumber+'个任务生成中...'" isLink url="/pages/componentsB/tag/tag" @click="onCellGroup"></u-cell>
	</u-cell-group>
	<!-- 内容 -->
	<view class="photos-centont">
		<!--	导航  -->
		<u-subsection inactiveColor="#000" activeColor="#fff" class="u-subsection" keyName="title" :list="photosSubseCtionList" :current="photosSubseCtionCurrent" @change="onSubseCtionChange"></u-subsection>
		<!-- 中间内容 -->
		<view v-if="photosSubseCtionCurrent == 0 || photosSubseCtionCurrent == 1 || photosSubseCtionCurrent == 2">
		 <!-- 模型选择 -->
		<view class="photos-model">
		 <u--text text="模型选择*" class="model-text"> </u--text>
		 <u-row customStyle="margin-bottom: 10px" class="photos-row" @click="onPhotosRow">
		 	<u-col span="3" >
		 	 <view class="demo-layout bg-purple-light">
		 		<u--image :showLoading="true" :src="photosPopupLora.img_url" width="80px" height="80px" ></u--image>
		 	</view>
		 	</u-col>
		  <u-col span="8">
		  <view class="demo-layout bg-purple">
		 	<u--text :text="photosPopupLora.title"></u--text>
		 	<u--text type="info" size="14" :text="photosPopupLora.content"></u--text>
		  </view>
	      </u-col>
		 <u-col span="1">
		 <view class="demo-layout bg-purple">
		 <u-icon  size="25" name="arrow-right"></u-icon>
		 </view></u-col>	</u-row>
		</view>	
		<!-- 画面生成词 -->
	<view class="photos-textarea">
	 <view class="photos-textarea-text">
		<u--text text="画面描述词*" class="photos-textarea-text"></u--text>
	 </view>
	 <view class="textarea-list">
	 	<u--textarea @focus="onPhotoTextareaFocus" maxlength="600" v-model="photosTextareaValue" placeholder="请输入内容" class="list-input"></u--textarea>
		<view class="list-but">
			<u--text v-if="photosTextareaValue.length>5" class="numbers-is" size="13" color="red" :iconStyle="{'color': 'yellow','font-size': '20px',}" prefixIcon="warning-fill"  text="字符数超过限制"></u--text>
			<view  :class="['number-text',photosTextareaValue.length>5?'photos-textarea-active':'']" >{{photosTextareaValue.length}}/500</view>
		</view>
	 </view>
	</view>
	<!-- 使用ControINet -->
	<view class="photos-controinet" v-if="photosSubseCtionCurrent<2">
	 <view class="photos-controinet-text"><u--text text="使用ControINet"></u--text></view>
	 <view class="photos-controinet-row" v-show="photosControinetInfoShow">
	  <u-row customStyle="margin-bottom: 10px">
		<u-col span="3">
		<view class="demo-layout bg-purple-light">
			<u--image :showLoading="true" :src="photosControinetInfo.url" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image>
		</view>
		</u-col>
	    <u-col span="8">
		<view class="demo-layout bg-purple">
		<u--text :text="photosControinetInfo.title"></u--text>
		<u-slider max="1" :showValue="true" v-model="photosControinetInfo.value" activeColor="#3c9cff" inactiveColor="#c0c4cc" step="0.1"></u-slider>
		</view>
		</u-col>
		<u-col span="1">
		<view class="demo-layout bg-purple">
		<u-icon name="close-circle-fill" size="25" top="-20" @click="onPhotosControinetIcon"></u-icon>
		</view>
		</u-col>
	</u-row>
	</view>
	<u-button class="photos-controinet-but"v-if="photosControinetInfoShow == false" text="添加控制网" icon="plus" @click="onPhotosControinetAdd"></u-button>
</view>	
		<!-- 使用Lora -->
<view class="photos-lora" v-if="photosSubseCtionCurrent<2">
			 <view class="photos-lora-text"><u--text text="使用Lora"></u--text></view>
			 <view class="photos-lora-row"  v-show="photosLoraInfoShow">
			   <u-row customStyle="margin-bottom: 10px">
			 	<u-col span="3">
			 	<view class="demo-layout bg-purple-light">
			 		<!-- <u--image :showLoading="true" :src="photosLoraInfo.img_url" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image> -->
			 		<u--image :showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image>
			 	</view>
			 	</u-col>
			     <u-col span="8">
			 	<view class="demo-layout bg-purple">
			 	<u--text :text="photosLoraInfo.title"></u--text>
			 	<u-slider max="1" :showValue="true" v-model="photosLoraInfo.value" activeColor="#3c9cff" inactiveColor="#c0c4cc" step="0.1"></u-slider>
			 	</view>
			 	</u-col>
			 	<u-col span="1">
			 	<view class="demo-layout bg-purple">
			 	<u-icon name="close-circle-fill" size="25" top="-20" @click="onPhotosLoraIcon"></u-icon>
			 	</view>
			 	</u-col>
			 </u-row>
			 </view>
			 <u-button class="photos-lora-but"v-if="photosLoraInfoShow == false" text="添加风格" icon="plus" @click="onPhotosLoraAdd"></u-button>
		</view>
	<!-- 图片样式哦 -->
		<view class="photos-style">
			<view class="photos-style-text"><u--text text="图片样式Style"></u--text></view>
			<view class="photos-style-row" v-show="photosStyleInfoShow">
			  <u-row customStyle="margin-bottom: 10px">
				<u-col span="3">
				<view class="demo-layout bg-purple-light">
					<!-- <u--image :showLoading="true" :src="photosStyleInfo.img_url" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image> -->
					<u--image :showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image>
				</view>
				</u-col>
			    <u-col span="8">
				<view class="demo-layout bg-purple">
				<u--text :text="photosStyleInfo.title"></u--text>
				<u--text :text="photosStyleInfo.prompt" color="#ccc" style="margin-top: 10rpx;"></u--text>
				
				</view>
				</u-col>
				<u-col span="1">
				<view class="demo-layout bg-purple">
				<u-icon name="close-circle-fill" size="25" top="-20" @click="onPhotosStyleIcon"></u-icon>
				</view>
				</u-col>
			</u-row>
			</view>
			<u-button v-if="photosStyleInfoShow == false" class="photos-style-but" text="添加样式" icon="plus" @click="onPhotoStyleAdd"></u-button>
		</view>
		<!-- 	参考图片 -->
	<view class="photos-uploadup">
		<view class="photos-image">
			<view class="photos-image-group" >
				<view class="image-group-test">
					<u--text text="参考图片"></u--text>
				</view>
				<view class="image-group-text">
					<u--text   suffixIcon="arrow-right" iconStyle="font-size: 15px" text="创作历史选择" @click="onPhotosText"></u--text>
				</view>
			</view>
		</view>
		<view class="photos-upload-row"  v-if="photosUploadInfoShow">
		  <u-row customStyle="margin-bottom: 10px">
			<u-col span="3">
			<view class="demo-layout bg-purple-light">
				<u--image :showLoading="true" :src="photosUploadInfo.url" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image>
				<!-- <u--image :showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image> -->
			</view>
			</u-col>
		    <u-col span="8">
			<view class="demo-layout bg-purple">
			<u--text :text="photosUploadInfo.name" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"></u--text>
			<!-- <u--text >1024*1024 &nbsp;{{photosUploadInfo.size}}</u--text> -->
				<view style="font-size: 15px;color: #909193; ">1024*1024 &nbsp;&nbsp;{{(photosUploadInfo.size / (1024 * 1024)).toFixed(2)}}MB</view>
			</view>
			</u-col>
			<u-col span="1">
			<view class="demo-layout bg-purple">
			<u-icon name="close-circle-fill" size="25" top="-20" @click="onPhotosUploadIcon"></u-icon>
			</view>
			</u-col>
		</u-row>
		</view>
		<view class="photos-upload" v-else>
			<view class="upload-contont" @tap="onPhotosUploadAvatar">
				<view class="upload-image">
					<view class="upload-icon">
					    <u-icon name="plus-square-fill"  size="28"></u-icon>
					</view>
					<view class="upload-text">
					    <u--text text="点击上传"></u--text>
					    <u--text text="支持png,jpn,jpeg格式,不超过20m" size="13" ></u--text>
					</view>
				</view>
			</view>
		</view>	
	</view>

		
		<!-- 负面描述词 -->
		<view class="photos-negative">
			<view class="negative-text">
				<u--text text="负面描述词"></u--text>
			</view>
		<u--textarea @focus="onPhotoTextareaFocu"   v-model="photosTextareaNegativeValue" placeholder="输入不希望在面面中看见的内容，越靠前作用越明显"  height="80" ></u--textarea>	
		</view>
		<!-- 出图比例 -->
		<view class="photos-plot">
			<view class="plot-text"><u--text text="出图比例"></u--text></view>
			<view class="photos">
			<view  :class="['photos-proportion',photosPlotNumber === index?'plot-list-active':'']" v-for="(item,index) in photosPlotList" :key="index" @click="onPhotosLiist(index)">
					<view class="proportion-num">{{item.scale}}</view>
					<view class="proportion-list">	{{item.title}}</view>
			</view>	
			</view>
		 </view>
		
		
		</view>
		
	</view>
	<!-- 开始生成 -->
	<view class="photps-generate" >
	         <view class="generate">
	         <u-button  class="generate-but" @click="onPhotoSselect"><view >{{photosSelectNumber}}&nbsp;张</view><u-icon color="#fff" name="arrow-right"></u-icon></u-button>
	         <u-button class="generate-buts"  @click="onPhotosStart"><view  class="butts">开始生成</view><view >消耗10</view></u-button>
	         <u-action-sheet   :closeOnClickOverlay="true" @close="ononPhotoSselectClose" @select="onPhotoSselectList"  :actions="photosSelecList" :show="photosSelecShow"></u-action-sheet>	
	         </view>
	</view>	
	<lora  ref="secludedlora" @loralist="loralist" :id="photosSubseCtionCurrent+1" :isLogin="isLogin"/>
	<controinet  ref="secludedcontroinet" @controninetlist="ontroninetlist"/>
	<model ref="secludedmodel" @modelist="modelist" :id="photosSubseCtionCurrent+1"/>
	<sstyle ref="secludedstyle" @stylelist="stylelist" :id="photosSubseCtionCurrent+1" :isLogin="isLogin"/>
	<create ref="secludcreate"/>
	</view>
</template>

<script>
	
import util from '@/utils/util.js'
import lora from './lora/lora.vue'
import controinet from './controinet/controinet.vue'
import model from './model/model.vue'
import sstyle from './sstyle/sstyle.vue'
import create from './create/create.vue'
	const app = getApp()
	export default {
		components: {	lora,controinet,model,sstyle,create	},
		data() {
			return {
				isLogin:false,
				photosSelecShow:false,//开始生成前张数选择的显示和隐藏
				photosSelecList:[
					  { name:1 ,fontSize:'20'},
					  { name:2, fontSize:'20'},
					  { name:3, fontSize:'20'},
					  { name:4, fontSize:'20'},
				],//开始生成前张数的数据
				photosUploadInfo:{},//上传图片之后展示图片
				photosUploadInfoShow:false,//上传图片的显示图片
				photosPlotList:[],//出图比例的数据
				photosPlotNumber:0,//出图比例，出图的切换index
				photosSelectNumber:1,//选择张数的
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				photosStyleInfoShow:false,//样式的显示和隐藏
				photosStyleInfo:{},//样式展示数据
				photosStyleNumber:0,//图片样式 切换index
				photosLoraInfo:{},//风格展示数据
				photosLoraInfoShow:false,//风格添加和删除显示和隐藏
				photosControinetInfo:{},//控制网展示数据
				photosControinetInfoShow:false, //控制网添加和删除显示和隐藏
				photosTextareaNegativeValue:'',//负面生成词
				photosTextareaValue:'',//画面生成词的值
				photosPopupLora:{},//模型选择展示数据
				photosSubseCtionList:[],//	导航的数据
				photosSubseCtionCurrent: 0,//切换导航的index
				photosTastNumber:0,//任务展示排队
			}
		},
		methods: {
			//开始生成
			async onPhotosStart(){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				// if(this.photosTextareaValue === '')return util.confirm('请输入画面描述词')
				// if(Object.keys(this.photosControinetInfo).length==0)return util.confirm('请添加控制网')
				// if(Object.keys(this.photosLoraInfo).length==0)return util.confirm('请添加风格')
				// if(Object.keys(this.photosStyleInfo).length==0)return util.confirm('请添加样式')
				// if(this.photosUploadInfoShow === false)return util.confirm('请添加上传图片')
				// if(this.photosTextareaNegativeValue === '')return util.confirm('请输入负面描述词')
					let data = {
						task_type:1,// 	任务类型
						model_style_id:this.photosPopupLora.model_style_id,// 模型ID
						prompt:this.photosTextareaValue,// 正向提示词
						negative_prompt:this.photosTextareaNegativeValue,// 反向提示词
						controlnet_type_id:this.photosControinetInfo.id,// 控制类型 id
						controlnet_img:this.photosControinetInfo.url,// 控制垫图
						controlnet_weight:this.photosControinetInfo.value,// 控制权重
						lora_id:this.photosLoraInfo.lora_id,// Loraid
						lora_weight:	this.photosLoraInfo.value,//	lora 权重
						reference_image:this.photosUploadInfo.url,//参考图
						img_style_id:this.photosStyleInfo.img_style_id,//图片样式 id
						img_scale:this.photosPlotList[this.photosPlotNumber].scale,//	图片比例
						batch_size:this.photosSelectNumber,// 生成图片数量
					}
				// 	console.log(data)
				// const res = await  util.request({url: '/AiDraw/CreateTask',data})
				// 	console.log(res)
			},
			//画面描述词的没有登陆提示
			onPhotoTextareaFocus(){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
			},
			//负面描述词的没有登陆提示
			onPhotoTextareaFocu(){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
			},
			//关闭
			ononPhotoSselectClose(){
				this.photosSelecShow = false
			},
			//张数的显示内容
			onPhotoSselect(){
				this.photosSelecShow = true
			},
			//张数选择的事件
			onPhotoSselectList(index){
				this.photosSelectNumber = index.name
				this.photosSelecShow = false
			},
			//删除上传图片展示
			onPhotosUploadIcon(){
				this.photosUploadInfo = {}
				this.photosUploadInfoShow = false
			},
			//上传图片
			onPhotosUploadAvatar(){
				const _this = this;
				if (!_this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				uni.chooseImage({
				    count: 1,
				    success: function(res) {
				        console.log(res.tempFiles[0])
						_this.photosUploadInfo["name"] = res.tempFiles[0].name
						_this.photosUploadInfo["size"] = res.tempFiles[0].size
						console.log(_this.photosUploadInfo)
				        uni.showLoading({
				            title: '正在上传'
				        });
				        util.upload({url: '/Upload/image',filePath: res.tempFilePaths[0]})
				        .then(data=>{
				            uni.hideLoading(); 
							_this.photosUploadInfo["url"] = data.data.path
							_this.photosUploadInfoShow = true
							// _this.photosUploadInfo = {name}
							// _this.photosUploadInfo['name'] = res.tempFilePaths[0].name
							// _this.avatar = res.data.path
				        })
				// 		.catch(res => {
				// 		if(res.errno == 403) {
				// 		app.globalData.util.toLogin('请登录')
				// 	}
				// })
				    }
				})
			},
			//创作历史中选择
			onPhotosText(){
					this.$refs.secludcreate.open()
			},
			//图片比例
			onPhotosLiist(index){
				this.photosPlotNumber = index
				let info = this.photosPlotList[this.photosPlotNumber]
				console.log(info)
			},
			//选择张数
			onPhotosSelect(){
				this.show = true
			},
			//删除图片样式数据展示
			onPhotosStyleIcon(){
				this.photosStyleInfo = {}
				this.photosStyleInfoShow = false
			},
			//添加图片样式
			onPhotoStyleAdd(){
					this.$refs.secludedstyle.open()
			},
			//样式展示数据
			stylelist(info){
				console.log(info)
				this.photosStyleInfo = info
				this.photosStyleInfoShow = true
			},
			//模型选择数据展示
			modelist(info){
				this.photosPopupLora = info
			},
			//控制网展示数据
			ontroninetlist(info){
				this.photosControinetInfoShow = true
				this.photosControinetInfo = info
			},
			//lora数据展示
			loralist(info){
					console.log(info)
				this.photosLoraInfoShow = true
				this.photosLoraInfo = info

			},
			//删除添加风格展示数据
			onPhotosLoraIcon(){
				this.photosLoraInfo = {}
				this.photosLoraInfoShow = false
			},
			//添加风格事件
			onPhotosLoraAdd(){
				// this.photosLoraShow = true
				this.$refs.secludedlora.open();
			},
			//删除控制网
			onPhotosControinetIcon(){
				this.photosControinetInfo = {}
				this.photosControinetInfoShow = false						
				},
			//添加控制网事件
			onPhotosControinetAdd(){
					// this.photosControinetShow = true
					this.$refs.secludedcontroinet.open();
				},
			//点击模型选择
			onPhotosRow(){
				this.$refs.secludedmodel.open();
				// this.photosModeleShow = true
					},
			//点击标题进行切换事件
			onSubseCtionChange(index){
					this.photosSubseCtionCurrent = index
					this.onshowPlot()
			},
			//标题去创作历史查看
			onCellGroup(){
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			//请求导航数据事件
			async	onshowList(){
				const res = await	util.request({url: '/AiDraw/ModelClass'})
					this.photosSubseCtionList = res.data
					},
			//请求模型选择数据
			async onshowPopup(){
				const res = await	 util.request({url: '/AiDraw/ModelStyleList'})
					// console.log(res)
						this.photosPopupLora  = res.data.list[0]
					// this.photosPopupLora = {title:'超级语言通用1.5',content:'使用各种应用的全面文生國的模型，可配合多种ControlNet和Lora使用',img_url:'https://cdn.uviewui.com/uview/album/1.jpg'}
			},
			//请求任务进行中展示 
			async onshowTask(){
				try{
					const res = await  util.request({url: '/AiDraw/GetQueue'})
							this.photosTastNumber = res.data.queue_num
							this.isLogin = true
				}catch(e){
						console.log(e)
					//TODO handle the exception
				}
			},
			//请求出图比例数据进行展示
			async onshowPlot(){
					let data = {class_id:this.photosSubseCtionCurrent+1}
					const res = await  util.request({url: '/AiDraw/GetImgScale',data})
					this.photosPlotList = res.data.list
			}
		},
		onLoad(){	
					this.onshowPlot()
					this.onshowList()
					this.onshowPopup()
					this.onshowTask()
				}
	}
</script>

<style lang="scss" scoped>
.phogos-tontent{
	width: 100%;
	.u-cell-group{
		// width: 100%;
			background: paleturquoise;
			// position: fixed;
			// left: 0;
			// top:80rpx;
			// z-index:100;
		}
	.photos-centont{
		width: 95%;
		margin: auto;
		.photos-controinet{
					margin-top: 40rpx;
				.photos-controinet-text{
							margin-bottom: 20rpx;
				}
				.photos-controinet-but{
				background: #e5e5e5;
				border-radius: 15rpx;
				}
				.photos-controinet-row{
					width: 100%;
					height: 160rpx;
					background: #f7f7f7;
					margin-bottom: 20rpx;
					
				}
			}
		.photos-lora{
			width: 100%;
			margin-top: 40rpx;
			.photos-lora-text{
				// margin-top: 20rpx;
				margin-bottom: 20rpx;
			}	
			.photos-lora-row{
				height: 160rpx;
				background: #f7f7f7;
				margin-bottom: 20rpx;
			}
			.photos-lora-but{
			background: #e5e5e5;
			border-radius: 15rpx;
			}
		}
		.u-subsection{
					margin-top: 40rpx;
				}
		.photos-textarea{
				height: 360rpx;
				margin-top: 40rpx;
				.photos-textarea-text{
					margin-bottom: 20rpx;
				}
				.textarea-list{
					width: 100%;
					height: 260rpx;
					position: relative;
					.list-input{
						height: 100%;
					}
					.list-but{
						position: absolute;
						right: 0;
						bottom: -10px;
						display: flex;
						color: #909193;
					  .numbers-is{
					  	width: 300rpx;
					  	margin-right: 50rpx;
					  }
					  .number-text{
					  	margin-right: 20px;
					  }
					}
				}
			}
	}
	.photos-model{
			margin-top: 40rpx;
			.photos-row{
				width: 100%;
				height: 160rpx;
				margin-top: 10rpx;
				background: #f7f7f7;
			}
		}
		
		
	.photos-style{
		margin-top: 40rpx;
		// background: saddlebrown;
		.photos-style-text{
			margin-bottom: 20rpx;
		}
		.photos-style-row{
			background: #f7f7f7;
		}
		.photos-style-but{
			background: #e5e5e5;
			border-radius: 15rpx;
		}
	}	
	.photos-uploadup{
		margin-top: 40rpx;
		.photos-image{
			margin-bottom: 10rpx;
			.photos-image-group{
				width: 100%;
				height: 50rpx;
				display: flex;
				justify-content: space-between;
				
			}
		}
	}	
	.photos-upload{
		.upload-contont{
			width: 100%;
			height: 160rpx;
			background: #f7f7f7;
			.upload-image{
				width: 100%;
				height: 160rpx;
				display: flex;
				align-items: center;
				.upload-icon{
					margin-left: 50rpx;
					margin-right: 20rpx;
				}
			}
		}
		
		
	}
	.photos-upload-row{
		width: 100%;
		height: 160rpx;
		background: #e5e5e5;
		margin-top: 20rpx;
	}
	.photos-negative{
		margin-top: 40rpx;
		.negative-text{
			margin-bottom: 20rpx;
		}
	}
	.photos-plot{
		height: 800rpx;
		margin-top: 40rpx;
		.plot-text{
			margin-bottom: 20rpx;
		}
	 .photos{
	 		width: 100%;
	 		height: 500rpx;
	 		display: flex;
	 		flex-wrap: wrap;
	 		justify-content: space-between; 
	 		align-items: center;
			font-size: 25rpx;
	 	.photos-proportion:nth-child(1){
	 		width: 100px;
	 		height: 100px;
	 		background: #f7f7f7;
	 		margin-bottom: 20rpx;
	 		/* text-align: center; */
	 		.proportion-num{
	 			width: 100rpx;
	 			height: 100rpx;
	 			background: #e5e5e5;
	 			margin: auto;
	 			text-align: center;
	 			line-height: 100rpx;
	 			margin-top: 20rpx;
	 		}
	 		.proportion-list{
	 			width: 100%;
	 			height: 78rpx;
	 			text-align: center;
	 			line-height: 78rpx;
	 		}
	 		}
	 		.photos-proportion:nth-child(2){
	 			width: 100px;
	 			height: 100px;
	 			background: #f7f7f7;
	 			margin-bottom: 20rpx;
	 			.proportion-num{
	 				width: 100rpx;
	 				height: 70rpx;
	 				background: #e5e5e5;
	 				margin: auto;
	 				text-align: center;
	 				line-height: 70rpx;
	 				margin-top: 40rpx;
	 				margin-bottom: 10rpx;
	 			}
	 			.proportion-list{
	 				width: 100%;
	 				height: 78rpx;
	 				text-align: center;
	 				line-height: 78rpx;
	 				
	 			}
	 			}
	 		.photos-proportion:nth-child(3){
	 			width: 100px;
	 			height: 100px;
	 			background: #f7f7f7;
	 			margin-bottom: 20rpx;
	 			.proportion-num{
	 				width: 80rpx;
	 				height: 100rpx;
	 				background: #e5e5e5;
	 				margin: auto;
	 				text-align: center;
	 				line-height: 100rpx;
	 				margin-top: 20rpx;
	 			}
	 			.proportion-list{
	 				width: 100%;
	 				height: 78rpx;
	 				text-align: center;
	 				line-height: 78rpx;
	 			}
	 			}
	 			.photos-proportion:nth-child(4){
	 				width: 100px;
	 				height: 100px;
	 				background: #f7f7f7;
	 				margin-bottom: 20rpx;
	 				.proportion-num{
	 					width: 50rpx;
	 					height: 100rpx;
	 					background:#e5e5e5;
	 					margin: auto;
	 					text-align: center;
	 					line-height: 100rpx;
	 					margin-top: 20rpx;
	 				}
	 				.proportion-list{
	 					width: 100%;
	 					height: 78rpx;
	 					text-align: center;
	 					line-height: 78rpx;
	 				}
	 				}
	 			.photos-proportion:nth-child(5){
	 				width: 100px;
	 				height: 100px;
	 				background: #f7f7f7;
	 				margin-bottom: 20rpx;
	 				.proportion-num{
	 					width: 100rpx;
	 					height: 60rpx;
	 					background: #e5e5e5;
	 					margin: auto;
	 					text-align: center;
	 					line-height: 60rpx;
	 					margin-top: 50rpx;
	 					margin-bottom: 5rpx;
	 				}
	 				.proportion-list{
	 					width: 100%;
	 					height: 78rpx;
	 					text-align: center;
	 					line-height: 78rpx;
	 				}
	 				}
	 				.photos-proportion:nth-child(6){
	 					width: 100px;
	 					height: 100px;
	 					background: #f7f7f7;
	 					margin-bottom: 20rpx;
	 					.proportion-num{
	 						width: 65rpx;
	 						height: 100rpx;
	 						background: #e5e5e5;
	 						margin: auto;
	 						text-align: center;
	 						line-height: 100rpx;
	 						margin-top: 20rpx;
	 					}
	 					.proportion-list{
	 						width: 100%;
	 						height: 78rpx;
	 						text-align: center;
	 						line-height: 78rpx;
	 					}
	 					}
						.photos-proportion:nth-child(7){
							width: 100px;
							height: 100px;
							background: #f7f7f7;
							margin-bottom: 20rpx;
							// text-align: left;
							.proportion-num{
								width: 65rpx;
								height: 100rpx;
								background: #e5e5e5;
								margin: auto;
								text-align: center;
								line-height: 100rpx;
								margin-top: 20rpx;
							}
							.proportion-list{
								width: 100%;
								height: 78rpx;
								text-align: center;
								line-height: 78rpx;
							}
							}
	 			
	 }	}

.photps-generate{
        width: 100%;
        height: 150rpx;
        margin-top: 10rpx;
        background: #f7f7f7;
		.generate{
			width: 90%;
			height: 100%;
			margin: auto;
			display: flex;
		}
        .generate-but{
            width: 100rpx;
            margin-top: 40rpx;
            background: #000;
            color: #fff;
			margin-right: 20rpx;
        }
        .generate-buts{
            width: 530rpx;
            margin-top: 40rpx;
            background: #000;
            color: #fff;
            .butts{
                width: 80%;
            }
        }
        
    }
	}

.plot-list-active{
	border: #000 1rpx solid;
	background-blend-mode: #000;
}
.plot-lists-active{
	background: #909193;
}
.plot-active{
	background: #909193;
}
 /* 修改Popup组件的内部滚动区域的高度 */
  ::v-deep .u-drawer__scroll-view {
    height: auto !important;
  }
::v-deep .u-textarea--radius[data-v-09988a29] {
    border-radius: 4px;
    border: #e5e5e5 1px solid;
	background: #f7f7f7;
}
::v-deep uni-slider{
	margin: 0;
}
.controinet-active{
	color: #000;
	// color: red;
	border-bottom: #909193 6rpx solid;
}
.style-active{
	color: #000;
	// color: red;
	border: #000 2rpx solid;
}
::v-deep .u-subsection--button__bar[data-v-78c1286e]{
	background:#909193;
}
.photos-textarea-active{
	color: red;
}
</style>
