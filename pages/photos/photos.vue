<template>
	<view class="phogos-tontent" >
		<!-- 标图展示 -->
		<!-- <navmeun></navmeun> -->
		<!-- 页头 -->
		<!-- <u--text text="生成图片" size="24" color="#FFFFFF" align="center" lineHeight="80"></u--text> -->
		<!-- 提示  @click="onCellGroup" -->
	<u-cell-group class="u-cell-group"  v-if="photosTastNumber>0">
		<u-cell   :titleStyle="{'color':'#FFFFFF'}" :rightIconStyle="{'color':'#FFFFFF'}" 	:border="false"  value="去创建历史查看" :title="photosTastNumber+'个任务进行中...'" isLink url="/pages/picture/index" ></u-cell>
	</u-cell-group>
	<!-- 内容 -->
	<view class="photos-centont">
		<!--	导航  -->
		<view class="phogos-group" >
			<!-- <view class="phogos-group-item" v-for="item in photosSubseCtionList" :key="item.id">{{item.title}}</view> -->
				<view :class="['phogos-group-item',photosSubseCtionCurrent===0?'phogos-group-active':'']" @click="onSubseCtionChange(photosSubseCtionListOne.id)">{{photosSubseCtionListOne.title}}</view>
				<view :class="['phogos-group-item','item',photosSubseCtionCurrent===1?'phogos-group-actives':'']" @click="onSubseCtionChange(photosSubseCtionListTow.id)">{{photosSubseCtionListTow.title}}</view>
				<view :class="['phogos-group-item',photosSubseCtionCurrent===2?'phogos-group-activeis':'']" @click="onSubseCtionChange(photosSubseCtionListThenn.id)">{{photosSubseCtionListThenn.title}}</view>
		</view>
		<!-- 中间内容 -->
		<view v-if="photosSubseCtionCurrent == 0 || photosSubseCtionCurrent == 1 || photosSubseCtionCurrent == 2">
		 <!-- 模型选择 -->
		<view class="photos-model">
		 <u--text text="模型选择*" class="model-text" color="#FFFFFF" size="28rpx"> </u--text>
		 <u-row customStyle="margin-bottom: 10px" class="photos-row" @click="onPhotosRow">
		 	<u-col span="3" >
		 	 <view class="demo-layout bg-purple-light">
		 		<u--image  :src="photosPopupLora.img_url" width="150rpx" height="160rpx" ></u--image>
		 	</view>
		 	</u-col>
		  <u-col span="8">
		  <view class="demo-layout bg-purple">
		 	<u--text :text="photosPopupLora.title" :lines="1" color="#FFFFFF" size="28rpx"></u--text>
			<view  class="model-list" v-if="photosPopupLora.contents">{{photosPopupLora.contents}}</view>
			<view  v-else class="model-list" >{{photosModelList.content}}</view>							
	
		  </view>
	      </u-col>
		 <u-col span="1">
		 <view class="demo-layout bg-purple" >
				<u-icon  size="28rpx" name="arrow-right" color="#FF0000" style="opacity: 0.5;margin-left: 10rpx;" ></u-icon> 
		 </view></u-col>	</u-row>
		</view>	
		<!-- 画面生成词 -->
	<view class="photos-textarea">
	 <view class="photos-textarea-text">
		<u--text text="画面描述词*" class="photos-textarea-text" color="#FFFFFF" size="28rpx"></u--text>
	 </view>
	 <view class="textarea-list">
	 	<u--textarea height="240rpx" @focus="onPhotoTextareaFocus" maxlength="600" v-model="photosTextareaValue" placeholder="请输入描述文字以短句、短语为佳，支持中、英文输入" class="list-input"></u--textarea>
		<view class="list-but">
			<u--text v-if="photosTextareaValue.length>500" class="numbers-is" size="13" color="red" :iconStyle="{'color': 'yellow','font-size': '20px',}" prefixIcon="warning-fill"  text="字符数超过限制"></u--text>
			<view  :class="['number-text',photosTextareaValue.length>500?'photos-textarea-active':'']" >{{photosTextareaValue.length}}/500</view>
		</view>
	 </view>
	</view>
	<!-- 使用ControINet -->
	<view class="photos-controinet" v-if="photosSubseCtionCurrent == 0  " >
	 <view class="photos-controinet-text"><u--text text="使用ControINet" color="#FFFFFF" size="28rpx"></u--text></view>
	 <view class="photos-controinet-row" v-show="photosControinetInfoShow">
	  <u-row customStyle="margin-bottom: 10px">
		<u-col span="3">
		<view class="demo-layout bg-purple-light">
			<u--image :showLoading="true" :src="photosControinetInfo.url" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image>
		</view>
		</u-col>
	    <u-col span="9">
		<view class="demo-layout bg-purple">
		 <view class="row-col-item">
		  <u--text :text="photosControinetInfo.title" :lines="1" color="#FFFFFF" size="28rpx"></u--text>
		  <u-icon color="#ccc"  name="trash" size="28rpx" style="margin-right:20rpx" top="-10px" @click="onPhotosControinetIcon"></u-icon> 
		 </view>
		 <view class="row-col-list" >
		 	<u-slider style="width: 99%;" @change="onPhotosInputControinet":showValue="true" class="col-slider"  max="1"  v-model="photosControinetInfo.value" activeColor="#FF0000" block-color="#FF0000" blockSize="16" step="0.1"></u-slider>
		 	<!-- <view class="" style="width: 130rpx;color:#ccc;font-size: 28rpx;text-align: center;">&nbsp;强度{{photosControinetInfo.value}}</view> -->
		 </view>
		</view>
		</u-col>
	
	</u-row>
	</view>
		<u-button class="photos-controinet-but" iconColor="#FFFFFF" v-if="photosControinetInfoShow == false" text="添加控制网" icon="plus" @click="onPhotosControinetAdd"></u-button>
</view>	
		<!-- 使用Lora -->
<view class="photos-lora" v-if="photosSubseCtionCurrent<2">
				<view class="photos-lora-text"><u--text text="使用Lora" color="#FFFFFF" size="28rpx"></u--text></view>
				<view class="photos-lora-row" v-show="photosLoraInfoShow" >
			     <u-row customStyle="margin-bottom: 10px">
			 	  <u-col span="3">
			 	   <view class="demo-layout bg-purple-light">
			 		<u--image :showLoading="true" :src="photosLoraInfo.img_url" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image>
			 	  </view>
			 	  </u-col>
			     <u-col span="9">
			 	  <view class="demo-layout bg-purple">
				   <view class="row-col-item">
				    <u--text color="#FFFFFF" :text="photosLoraInfo.title" :lines="1" size="28rpx"></u--text>
				    <u-icon  color="#ccc" name="trash" size="28rpx" style="margin-right:20rpx" top="-10px" @click="onPhotosLoraIcon"></u-icon>    
				   </view>
				   <view class="row-col-list" >
					<u-slider @change="onPhotosInputLora" :showValue="true" class="col-slider" style="width: 99%;"    max="1"  v-model="photosLoraInfo.value" activeColor="#FF0000" block-color="#FF0000" blockSize="16" step="0.1"></u-slider>
					<!-- <view class=""  style="width: 130rpx;color:#ccc;font-size: 28rpx;text-align: center;">&nbsp;强度{{photosLoraInfo.value}}</view> -->
				  </view>
			 	</view>
			   </u-col>
		     </u-row>
	       </view>
	      <u-button class="photos-lora-but" iconColor="#FFFFFF" v-if="photosLoraInfoShow == false" text="添加风格" icon="plus" @click="onPhotosLoraAdd"></u-button>
</view>
	<!-- 图片样式哦 --> 
		<view class="photos-style">
		            <view class="photos-style-text"><u--text text="图片样式Style" color="#FFFFFF" size="28rpx"></u--text></view>
					<view class="photos-style-row" v-show="photosStyleInfoShow" >
		              <u-row customStyle="margin-bottom: 10px">
		                <u-col span="3">
		                <view class="demo-layout bg-purple-light">
		                    <u--image :showLoading="true" :src="photosStyleInfo.img_url" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image>
		                </view>
		                </u-col>
		                <u-col span="9">
		                <view class="demo-layout bg-purple">
		                <view class="row-col-item">
		                <u--text :text="photosStyleInfo.title" :lines="1" color="#FFFFFF" size="28rpx" lineHeight="56rpx"></u--text>
		                <u-icon color="#ccc" name="trash" size="28rpx" style="margin-right:20rpx" top="-10px" @click="onPhotosStyleIcon"></u-icon>    
		                </view>
		                <u--text :lines="2" :text="photosStyleInfo.en_title" color="#909193" size="24rpx"></u--text>
		                </view>
		                </u-col>
		             </u-row>
		            </view>
		        <u-button  iconColor="#FFFFFF" v-if="photosStyleInfoShow == false" class="photos-style-but" text="添加样式" icon="plus" @click="onPhotoStyleAdd"  ></u-button>
		    </view>
			
			
	<!-- 	参考图片 -->
<view class="photos-uploadup">
		<view class="photos-image">
			<view class="photos-image-group" >
				<view class="image-group-test">
					<u--text text="参考图片" color="#FFFFFF" size="28rpx"></u--text>
				</view>
				<view class="image-group-text">
					<u--text color="#FFFFFF"   suffixIcon="arrow-right" :iconStyle="{'font-size': '15px','color':'#FFFFFF'}" text="创作历史选择" @click="onPhotosText"size="28rpx" ></u--text>
				</view>
			</view>
		</view>
		<view class="photos-upload-row"  v-if="photosUploadInfoShow">
		  <u-row customStyle="margin-bottom: 10px">
			<u-col span="3">
			<view class="demo-layout bg-purple-light">
				<u--image  :src="photosUploadInfo.url" width="60px" height="60px" radius="5px" style="margin: 10px 10px;"></u--image>
			</view>
			</u-col>
		    <u-col span="9" >
			<view class="demo-layout bg-purple" >
			<view class="row-col-item">
			 <!-- <u--text :text="photosUploadInfo.name" :lines="1" color="#FFFFFF"></u--text> -->
			 	 <view style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;color:#FFFFFF;font-size: 28rpx">{{photosUploadInfo.name}}</view>
			 <u-icon color="#ccc" name="trash" size="28rpx" style="margin-right:20rpx" top="-10px" @click="onPhotosUploadIcon"></u-icon>    
			</view>
			<view class="row-col-list" >
				<u-slider style="width: 99%;" @change="onPhotosInputSstyle" :showValue="true" class="col-slider"  max="1"  v-model="photosUploadInfo.value" activeColor="#FF0000" block-color="#FF0000" blockSize="16" step="0.1"></u-slider>
				<!-- <view class="" style="width: 130rpx;color:#ccc;font-size: 28rpx;text-align: center;">&nbsp;强度{{photosUploadInfo.value}}</view> -->
			</view>
			</view>
			</u-col>
		</u-row>
		</view>
		<view class="photos-upload" v-else>
			<view class="upload-contont" @tap="onPhotosUploadAvatar">
				<view class="upload-image">
					<view class="upload-icon">
					    <u-icon name="plus-square-fill"  size="60rpx" color="#FFFFFF"></u-icon>
					</view>
					<view class="upload-text">
					    <u--text text="点击上传" color="#FFFFFF" style="margin-bottom: 10rpx;" size="28rpx"></u--text>
					    <u--text text="支持png,jpn,jpeg格式,不超过20M" size="24rpx" color="#FFFFFF" style="opacity: 0.5;"></u--text>
					</view>
				</view>
			</view>
		</view>	
	</view>	
		<!-- 负面描述词 -->
		<view class="photos-negative">
			<view class="negative-text">
				<u--text text="负面描述词" color="#FFFFFF" size="28rpx" maxlength="500" ></u--text>
			</view>
		<u--textarea @focus="onPhotoTextareaFocu"   v-model="photosTextareaNegativeValue" placeholder="输入不希望在面面中看见的内容，越靠前作用越明显"  height="200rpx" style="background: #23242C;"></u--textarea>	
		</view>
		<!-- 出图比例 -->
		<view class="photos-plot">
			<view class="plot-text"><u--text text="出图比例" color="#FFFFFF" size=""></u--text></view>
			<view class="photos">
			<view style="margin-left: 1rpx;margin-right: 1rpx;" :class="['photos-proportion',photosPlotNumber === item.id?'plot-list-active':'']" v-for="(item,index) in photosPlotList" :key="index" @click="onPhotosLiist(item.id)">
					<view class="proportion-num">
					<view  :class="[photosPlotNumber === item.id?'plot-lists-active':'']">{{item.scale}}</view></view>
					<view  class="proportion-list">	{{item.title}}</view>
			</view>	
			</view>
		 </view>
		
		
		</view>
		
	</view>
	<!-- 开始生成 -->
	<view class="photps-generate" >
	         <view class="generate">
	         <u-button v-if="photosSubseCtionCurrent<2" size="large" class="generate-but" @click="onPhotoSselect"><view style="margin-left: 20rpx;">{{photosSelectNumber}}&nbsp;张</view><u-icon color="#fff" name="arrow-down" style="margin-left: 10rpx;margin-right: 10rpx;"></u-icon></u-button>
	         <u-button  size="large"  class="generate-buts"  @click="onPhotosStart"><view  class="butts">开始生成</view>
			 <view  v-if="photosSubseCtionCurrent !== 2" class="but" style="font-size: 28rpx;color: #d5d5d5;">消耗{{this.photosSelectNumber}}万</view>
			 <view v-else class="but" style="font-size: 28rpx;color: #d5d5d5;">消耗4万</view>
			 </u-button>
	         <!-- <u-button :disabled="photosDisabled" size="large"  class="generate-buts"  @click="onPhotosStart"><view  class="butts">开始生成</view><view class="but" style="font-size: 28rpx;color: #d5d5d5;">消耗{{this.photosSelectNumber}}万</view></u-button> -->
	         	<u-action-sheet   :closeOnClickOverlay="true" @close="ononPhotoSselectClose" @select="onPhotoSselectList"  :actions="photosSelecList" :show="photosSelecShow"></u-action-sheet>	
	         </view>
	</view>	

	<lora  ref="secludedlora" @loralist="loralist" :id="photosSubseCtionCurrent+1" :isLogin="isLogin"/>
	<controinet  ref="secludedcontroinet" @controninetlist="ontroninetlist"/>
	<model ref="secludedmodel" @modelist="modelist" :id="photosSubseCtionCurrent+1"/>
	<sstyle ref="secludedstyle" @stylelist="stylelist" :id="photosSubseCtionCurrent+1" :isLogin="isLogin"/>
	<create ref="secludcreate" @createlist="createlist"/>
	</view>
</template>

<script>
	
import util from '@/utils/util.js'
import lora from './lora/lora.vue'
import controinet from './controinet/controinet.vue'
import model from './model/model.vue'
import sstyle from './sstyle/sstyle.vue'
import create from './create/create.vue'
import user from './user/user.vue'
// import navmeun from '@/components/navMeun/index.vue';
	const app = getApp()
	export default {
		components: {lora,controinet,model,sstyle,create,	},
		data() {
			return {
				photosDisabled:true,//禁用状态按钮
				isLogin:true,//登陆的判断
				photosSelecShow:false,//开始生成前张数选择的显示和隐藏
				photosSelecList:[
					  { name:1 ,fontSize:'28'},
					  { name:2, fontSize:'28'},
					  { name:3, fontSize:'28'},
					  { name:4, fontSize:'28'},
				],//开始生成前张数的数据
				photosUploadInfo:{},//上传图片之后展示图片
				photosUploadInfoShow:false,//上传图片的显示图片
				photosPlotList:[],//出图比例的数据
				photosPlotNumber:5,//出图比例，出图的切换index
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
				photosSubseCtionListOne: {},
				photosSubseCtionListTow: {},
				photosSubseCtionListThenn: {},
				photosSubseCtionCurrent: 0,//切换导航的index
				photosTastNumber:0,//任务展示排队
				photosTaskId:'',//一件同款的数据接受
				photosModelList:{},//接受数据
			}
		},
		methods: {
			//更新控制网的滑块的值
			onPhotosInputControinet(value){
			    this.photosControinetInfo.value = value
			    },
			//更新上传图片的滑块的值
			onPhotosInputSstyle(value){
			    this.photosUploadInfo.value = value
			    },
			//更新lora滑块的值
			onPhotosInputLora(value){
			    this.photosLoraInfo.value = value
			    },
			//开始生成
			async onPhotosStart(){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				if(this.photosTextareaValue.length>500)return util.confirm('字符数超出数量，无法提交')
				if(this.photosSubseCtionCurrent === 2){this.photosSelectNumber = 4}
				// if(this.photosTextareaValue === '')return util.confirm('请输入画面描述词')
				// if(Object.keys(this.photosControinetInfo).length==0)return util.confirm('请添加控制网')
				// if(Object.keys(this.photosLoraInfo).length==0)return util.confirm('请添加风格')
				// if(Object.keys(this.photosStyleInfo).length==0)return util.confirm('请添加样式')
				// if(this.photosUploadInfoShow === false)return util.confirm('请添加上传图片')
				// if(this.photosTextareaNegativeValue === '')return util.confirm('请输入负面描述词')
					let data = {
						task_type:1,// 	任务类型
						model_parentclass_id:this.photosSubseCtionCurrent+1,//模型所属分类 模型分类接口获取的id
						model_style_id:this.photosPopupLora.model_style_id,// 模型ID
						prompt:this.photosTextareaValue || '',// 正向提示词
						negative_prompt:this.photosTextareaNegativeValue,// 反向提示词
						controlnet_type_id:this.photosControinetInfo.id || '',// 控制类型 id
						controlnet_img:this.photosControinetInfo.img || '',//控制参考图
						controlnet_img_detect:this.photosControinetInfo.url || '',// 控制垫图
						controlnet_weight:this.photosControinetInfo.value || '',// 控制权重
						lora_id:this.photosLoraInfo.lora_id || '',// Loraid
						lora_weight:this.photosLoraInfo.value || '',//	lora 权重
						reference_image:this.photosUploadInfo.url || '',//参考图
						reference_image_weight:this.photosUploadInfo.value || '',//参考图权重值 
						img_style_id:this.photosStyleInfo.img_style_id || '',//图片样式 id
						img_scale:this.photosPlotNumber,//	图片比例
						batch_size:this.photosSelectNumber,// 生成图片数量
					}
				try{
					const res = await  util.request({url: '/AiDraw/CreateTask',data})
						console.log(res)
						if(res.data.task_id !== ''){
						uni.navigateTo({
							url:'/pages/picture/index'
						});
							return;
						}else{
							util.confirm('生成失败，请从新生成！')
						}
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
					//清空
					// this.photosTextareaValue = ''
					// this.photosTextareaNegativeValue = ''
					// this.photosControinetInfo = {}
					// this.photosLoraInfo = {}
					// this.photosUploadInfo = {}
					// this.photosStyleInfo = {}
			},
			//画面描述词的没有登陆提示
			onPhotoTextareaFocus(){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				// if(this.photosTextareaValue !== '')return  this.photosDisabled = false
				if(this.photosTextareaValue !== '')return  console.log(111111)
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
			//从创作历史选择中拿去
			createlist(info){
				this.photosUploadInfo.url = info.img_url
				this.photosUploadInfo["value"] = 0.75
				this.photosUploadInfo["name"] = info.img_url.slice(43, 53)
				this.photosUploadInfoShow = true
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
							_this.photosUploadInfo["value"] = 0.8
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
					console.log(index)
				this.photosPlotNumber = index
				// let info = this.photosPlotList[this.photosPlotNumber]
				// console.log(info)
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
					console.log(info)
				this.photosPopupLora = info
			},
			//控制网展示数据
			ontroninetlist(info){
				// console.log(info)
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
					if(index === 1){
						this.photosModelList = this.photosSubseCtionListOne
						this.onshowPopup(index)
					}else if(index === 2){
						this.photosModelList = this.photosSubseCtionListTow 
						this.onshowPopup(index)
					}else{
						this.photosModelList  = this.photosSubseCtionListThenn
						this.onshowPopup(index)
					}
					this.photosSubseCtionCurrent = index-1
					this.onshowPlot()
					this.photosTextareaValue = ''
					this.onPhotosControinetIcon()
					this.onPhotosLoraIcon()
					this.onPhotosStyleIcon()
					this.photosTextareaNegativeValue = ''
					this.photosPlotNumber = 5
					this.onPhotosUploadIcon()
					this.photosSelectNumber = 1
			},
			//请求导航数据事件
			async	onshowList(){
				const res = await	util.request({url: '/AiDraw/ModelClass'})
					this.photosSubseCtionListOne = res.data[0]
					this.photosSubseCtionListTow = res.data[1]
					this.photosSubseCtionListThenn = res.data[2]
					this.photosSubseCtionList = res.data
					this.photosModelList  = res.data[0]
					},
			//请求模型选择数据
			async onshowPopup(id){
					let data = {page:1,pagesize:10,class_id:id || 1}
				const res = await	 util.request({url: '/AiDraw/ModelStyleList',data})
						this.photosPopupLora  = res.data.list[0]
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
			},
			//请求一键同款数据
			 async onshowDate(id){
				 let data = {task_id:id}
				const res = await  util.request({url: '/AiDraw/GetSameModel',data})
					console.log(res)
					//模型分类
					this.photosSubseCtionCurrent = res.data.model_parentclass_id-1
					//模型选择
					this.photosPopupLora = {img_url:res.data.model_style_img,content:res.data.model_style_content,model_style_id:res.data.model_style_id,title:res.data.model_style_title}
					//画面生成
					this.photosTextareaValue = res.data.prompt
					//控制网
		
					if(res.dataontrolnet_type_id){
						this.photosControinetInfo = {id:res.data.controlnet_type_id,title:'',url:res.data.controlnet_img_detect,img:res.data.controlnet_img,value:res.data.controlnet_weight}
						this.photosControinetInfoShow = true
					}else{
						this.photosControinetInfoShow = false
					}
					
					//lora
						
					if(res.data.lora_id){
						this.photosLoraInfo = {lora_id:res.data.lora_id,title:res.data.lora_title,content:res.data.lora_content,img_url:res.data.lora_img,value:res.data.lora_weight}
						this.photosLoraInfoShow = true
					}else{
						this.photosLoraInfoShow = false
					}
					
					//参考图
						
					if(res.data.reference_image){
						this.photosUploadInfo = {url:res.data.reference_image,value:res.data.reference_image_weight,name:'home.jpg'}
						this.photosUploadInfoShow = true
						
					}else{
						this.photosUploadInfoShow = false
					}
					
					//样式
					if(res.data.img_style_id){
							this.photosStyleInfo = {img_style_id:res.data.img_style_id,title:res.data.img_style_title,en_title:res.data.img_style_content,img_url:res.data.img_style_img,}
							this.photosStyleInfoShow = true
					}else{
						this.photosStyleInfoShow = false
					}
					//负面词
					this.photosTextareaNegativeValue = res.data.negative_prompt
					//比例
					this.photosPlotNumber = res.data.img_scale
					//张数
					this.photosSelectNumber  = res.data.batch_size

			}
		},
		onLoad(options){
				// console.log(options.task_id)
				this.photosTaskId = options.task_id
				if(options.task_id){
						this.onshowDate(options.task_id)
				}else{
					this.onshowPopup()
				}
				this.onshowPlot()
				this.onshowList()
				this.onshowTask()
		
				}
	}
</script>

<style lang="scss" scoped>
.phogos-tontent{
	width: 100%;
	background: #000000;
	.u-cell-group{
			background: #434343;
		}
	.photos-centont{
		width: 90%;
		margin: auto;
		overflow: hidden;
		.phogos-group{
			// width: 100%;
			height: 86rpx;
			background: #fff;
			display: flex;
			align-items: center;
			border: 1px solid #606060;
			border-radius: 50rpx;
			font-size: 28rpx;
			background: #34363F;
				color: #909193;
			margin-top: 40rpx;
			.phogos-group-item{
				height: 100%;
				flex: 1;
				text-align: center;
				line-height: 86rpx;
			}
			.item{
				height: 100%;
				border-left: 1px solid #606060;
				border-right: 1px solid #606060;
				// line-height: 100rpx;
			}
		}
		.photos-controinet{
					margin-top: 40rpx;
				.photos-controinet-text{
							margin-bottom: 20rpx;
				}
				.photos-controinet-but{
					color: #FFFFFF;
				background: #23242C;
				border-radius: 15rpx;
				border:none ;
				}
				.photos-controinet-row{
					width: 100%;
					height: 160rpx;
					background: #23242C;
					margin-bottom: 20rpx;
					.row-col-item{
						display: flex;
						margin-top: 10rpx;
						margin-bottom: 10rpx;
					}
					// .row-col-list{
					// 	display: flex;
					// 	.col-slider{
					// 		flex: 1;
					// 		margin-right: 50rpx;
					// 	}
					// }
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
				background: #23242C;
				margin-bottom: 20rpx;
				.row-col-item{
					display: flex;
					margin-top: 10rpx;
					margin-bottom: 10rpx;
				}
				// .row-col-list{
				// 	display: flex;
				// 	.col-slider{
				// 		flex: 1;
				// 		margin-right: 50rpx;
				// 	}
				// }
			}
			.photos-lora-but{
			background: #23242C;
			color: #FFFFFF;
			border-radius: 15rpx;
			border: none;
			}
		}
		.u-subsection{
					// margin-top: 40rpx;
				}
		.photos-textarea{
				height: 360rpx;
				margin-top: 40rpx;
				.photos-textarea-text{
					margin-bottom: 20rpx;
					// color: #FFFFFF;
				}
				.textarea-list{
					width: 100%;
					height: 260rpx;
					position: relative;
					
					.list-input{
						height: 100%;
						background: #23242C;
					}
					.list-but{
						position: absolute;
						right: 0;
						bottom: -10px;
						display: flex;
						color: #909193;
						font-size: 24rpx;
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
				background: #23242C;
				.model-list{
					color: #FFFFFF;
					opacity: 0.5;
					font-size: 24rpx;
					margin-top: 10rpx;
					// font-size: 28rpx;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					 overflow: hidden;
					 -webkit-line-clamp: 2;
					   -webkit-box-orient: vertical; 
				}
			}
		}
		
		
	.photos-style{
		margin-top: 40rpx;
		// background: saddlebrown;
		.photos-style-text{
			margin-bottom: 20rpx;
		}
		.photos-style-row{
		            background: #23242C;
		            .row-col-item{
		                display: flex;
		                // justify-content: space-betweenl;
		            }
		        }
		.photos-style-but{
			background: #23242C;
			color: #FFFFFF;
			border: none;
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
			background: #23242C;
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
		background: #23242C;
		margin-top: 20rpx;
		.row-col-item{
		                    display: flex;
		                    margin-top: 10rpx;
		                    margin-bottom: 10rpx;
							justify-content: space-between;
		                }
		                // .row-col-list{
		                //     display: flex;
		                //     .col-slider{
		                //         flex: 1;
		                //         margin-right: 50rpx;
		                //     }
		                // }
		.photos-upload-space{
			width: 200rpx;
			white-space: nowrap; 
			overflow: hidden;
			text-overflow: ellipsis; 
			line-height: 60rpx;
			
		}
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
			margin-bottom: 10rpx;
		}
	 .photos{
	 		width: 100%;
	 		height: 500rpx;
	 		display: flex;
	 		flex-wrap: wrap;
	 		justify-content: space-between; 
	 		align-items: center;
			font-size: 25rpx;
			color: #d5d5d6;
			font-size: 28rpx;
	 	.photos-proportion:nth-child(1){
	 		width: 200rpx;
	 		height: 200rpx;
	 		background: #23242C;
	 		margin-bottom: 20rpx;
	 		/* text-align: center; */
	 		.proportion-num{
	 			width: 100rpx;
	 			height: 100rpx;
	 			background: #575A69;
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
	 			width: 200rpx;
	 			height: 200rpx;
	 			background: #23242C;
	 			margin-bottom: 20rpx;
	 			.proportion-num{
	 				width: 120rpx;
	 				height: 100rpx;
	 				background:#575A69;
	 				margin: auto;
	 				text-align: center;
	 				line-height: 100rpx;
	 				margin-top: 20rpx;
	 				// margin-bottom: 10rpx;

	 			}
	 			.proportion-list{
	 				width: 100%;
	 				height: 78rpx;
	 				text-align: center;
	 				line-height: 78rpx;
				
	 				
	 			}
	 			}
	 		.photos-proportion:nth-child(3){
	 		width: 200rpx;
	 		height: 200rpx;
	 			background: #23242C;
	 			margin-bottom: 20rpx;
	 			.proportion-num{
	 				width: 120rpx;
	 				height: 80rpx;
	 				background: #575A69;
	 				margin: auto;
	 				text-align: center;
	 				line-height: 80rpx;
	 				margin-top: 30rpx;
					// margin-bottom: 10rpx;
	 			}
	 			.proportion-list{
	 				width: 100%;
	 				height: 78rpx;
	 				text-align: center;
	 				line-height: 78rpx;
	 			}
	 			}
	 			.photos-proportion:nth-child(4){
	 				width: 200rpx;
	 				height: 200rpx;
	 				background: #23242C;
	 				margin-bottom: 20rpx;
	 				.proportion-num{
	 					width: 80rpx;
	 					height: 100rpx;
	 					background:#575A69;
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
	 				width: 200rpx;
	 				height: 200rpx;
	 				background: #23242C;
	 				margin-bottom: 20rpx;
	 				.proportion-num{
	 					width: 120rpx;
	 					height: 60rpx;
	 					background: #575A69;
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
	 					width: 200rpx;
	 					height: 200rpx;
	 					background: #23242C;
	 					margin-bottom: 20rpx;
	 					.proportion-num{
	 						width: 65rpx;
	 						height: 100rpx;
	 						background: #575A69;
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
        height: 198rpx;
        // margin-top: 10rpx;
        background: #323232;
		.generate{
			width: 90%;
			height: 100%;
			margin: auto;
			display: flex;
			align-items: center;
		}
        .generate-but{
            width: 130rpx;
            background: #494B59;
            color: #fff;
			margin-right: 20rpx;
			border: none;
			font-size: 28rpx;
			
        }
        .generate-buts{
            // width: 530rpx;
            background: #FF0000;
			border: none;
            color: #fff;
            .butts{
                width: 74%;
				
				// but{
				// 	width:100rpx;
				// }
            }
        }
        
    }
	}

 .plot-list-active{
	background: #3A3C46;
	outline: #FF0000 2rpx solid;
	color: #FFFFFF;

}
.plot-lists-active{
	background: #777B8D;
}
.plot-active{
	background: #909193;
}
 /* 修改Popup组件的内部滚动区域的高度 */
  ::v-deep .u-drawer__scroll-view {
    height: auto !important;
  }
// ::v-deep .u-textarea--radius[data-v-09988a29] {
//     border-radius: 4px;
//     border: #e5e5e5 1px solid;
// 	background: #f7f7f7;
// }
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
::v-deep .u-textarea--radius[data-v-09988a29]{
	border: none;
}
::v-deep .u-textarea--radius[data-v-09988a29]:hover{
	border: 1px solid #FF0000;
}
::v-deep .uni-textarea-placeholder {
	opacity: 0.5;
}
::v-deep .uni-textarea-textarea {
	color: #FFFFFF;
}
.photos-textarea-active{
	color: red;
}
::v-deep .u-cell__body[data-v-1c4434ae]{
	padding: 5px 20px;
	
}
::v-deep .u-cell__value{
	color: #FFFFFF;
}
.phogos-group-active{
	background: #FF0000;
	border-top-left-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	color: #FFFFFF;
}
.phogos-group-actives{
	background: #FF0000;
	color: #FFFFFF;
}
.phogos-group-activeis{
	background: #FF0000;
	border-top-right-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
	color: #FFFFFF;
}
</style>
