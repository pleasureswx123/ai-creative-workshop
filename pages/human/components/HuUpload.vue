<template>
	<view>
		<view class="upload-container" v-if="uploadShow">
		  <view class="create" @tap="onCreatPop()">从创作历史中选择 ></view>
		  <view class="loading-box" v-if="loading">
		    <view class="title">正在上传中</view>
		    <view class="icon-box">
		      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-loading-1" color="var(--txt-color2)" size="40" />
		    </view>
		    <view class="tips">支持图片格式：JPG,PNG,最大限制：10	M</view>
		  </view>
		  <view v-else class="upload-box-container pointer" @tap="handleUpload">
		    <view class="upload-box">
		      <view class="icon-box">
		        <i class="iconfont icon-shangchuan_huaban"></i>
		      </view>
		      <view class="title">点击上传图片</view>
		      <view class="tips">支持图片格式：JPG,PNG,最大限制：10M</view>
		      <view class="warn">注意：正面图片，且背景干净或纯色为佳</view>
		    </view>
		  </view>
		  <HuCreatePop title="选择要处理的图片" ref="HuCreatePop" :show="creatPop" @select="onSelect" :show.sync="creatPop"></HuCreatePop>
		</view>
	  <view class="upload-img" v-else>
		  <uni-icons type="icon-qm-close" custom-prefix="iconfont-qm" color="var(--txt-color2)" size="20" @tap="del" />
		  <image :src="imgSrc" mode="aspectFit" @tap="previewImage(imgSrc)"></image>
	  </view>
	</view>
	
</template>

<script>
import HuCreatePop from './HuCreatePop.vue'
import {photoApi,userApi} from '@/api'

export default{
	components:{HuCreatePop},
	data() {
		return{
			loading:false,
			creatPop:false,
			fileList1: [],
			imgSrc:'',
			uploadShow:true
		}
	},
	methods:{
		onCreatPop(){
			this.creatPop =  true
			this.$refs.HuCreatePop.getShow()
		},
		onSelect(item){
			this.imgSrc = item.img_url
			this.uploadShow = false
		},
		getHistoryList(){
			photoApi.getHistoryList({
				data:{
					page:this.page,
        			pagesize:this.pagesize,
				}
			}).then(res => {
				this.getList = res.list
			})
		},
		handleUpload(){
			uni.chooseImage({
			  count: 1,
			  sourceType: ['album', 'camera'],
			  sizeType: ['original', 'compressed'],
			  success: res => {
			    const {path: filePath} = res.tempFiles?.[0] || {};
			    this.loading = true;
			    userApi.uploadImg({filePath}).then(res => {
			      this.imgSrc = res.path || '';
				  this.uploadShow = false
			    }).finally(() => {
			      this.loading = false;
			    });
			  },
			  fail(...args) {
			    console.log(args)
			  }
			});
		},
		previewImage(imgSrc){
			let imgsArray = [];
			imgsArray[0] = this.imgSrc
			uni.previewImage({
				urls:imgsArray,
				current:0
			});
		},
		del(){
			this.imgSrc = ''
			this.uploadShow = true
			this.imgShow = false
		},
		
	}
}
</script>

<style lang="scss" scoped>
	@keyframes rotate {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}
	.upload-container {
	  width: 100%;
	  border-radius: 6rpx;
	  margin: 20rpx 0;
	  position: relative;
	  overflow: hidden;
	  border: 1px solid #494C55;
	  background: #1F2937;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 600rpx;
	  .create{
		  position: absolute;
		  color: var(--txt-color1);
		  top: 20rpx;
		  right: 30rpx;
		  font-size: 28rpx;
		  border-bottom: 1px solid var(--txt-color1);
		  cursor: pointer;
	  }
	  .upload-box-container {
	    width: 100%;
	    height: 100%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	  }
	  .upload-box, .loading-box {
	    text-align: center;
	    display: flex;
	    align-items: center;
	    flex-direction: column;
	    color: var(--txt-color2);
	    .title {
	      font-size: 32rpx;
		  margin: 20rpx 0 0;
	    }
	    .tips {
	      font-size: 28rpx;
	    }
		.warn{
			color: #F60652;
			font-size: 24rpx;
			margin-top: 40rpx;
		}
	    .icon-box {
	      width: 100rpx;
	      height: 100rpx;
	      display: flex;
	      align-items: center;
	      justify-content: center;
	    }
	  }
	  .loading-box {
		  width: 100%;
	    .icon-qm-loading-1 {
	      animation: rotate 1s linear infinite;
	    }
	  }
	}
	.upload-img{
		width: 100%;
		height: 600rpx;
		margin: 20rpx 0;
		position: relative;
		overflow: hidden;
		border: 1px solid #494C55;
		/deep/.uni-icons{
			display: block;
			margin: 20rpx 40rpx 15rpx 0;
			text-align: right;
			cursor: pointer;
		}
		uni-image{
			display: block;
			max-width: 100%;
			margin: 0 auto;
			cursor: pointer;
		}
	}
</style>