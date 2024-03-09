<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="videoPop">图片配置支持AI绘图或者上传素材(2选1)，若选择AI绘图，每张图片会根据图片配置小号对应的积分(修改会重新消耗积分)。</view>
		<view class="videoPop" v-for="(item,index) in configList" :key="index">
			<view class="title">{{item.original}}</view>
			<u--textarea v-model="item.value" placeholder="可以修改描述(选填)" class="qm-textarea" height="34" confirmType="done" ></u--textarea>
			<view class="generate">
				<view class="info" v-if="item.img_url!=''">
					<image :src="item.img_url" mode="aspectFill" v-if="item.img_url" @tap="viewImage(item.img_url)"></image>
					<i class="iconfont icon-guanbi" @tap="close(index)"></i>
				</view>
				<view class="info" @tap="generate(item,index)" v-if="item.img_url==''">
					<i class="iconfont icon-AI"></i>
					<view class="">AI生成</view>
				</view>
				<!-- <view class="info">
					<view class="add">+</view>
					<view class="">上传图片</view>
				</view> -->
			</view>
		</view>
		<view class="nextBtn" @tap="nextTop">合成视频</view>
	</view>
</template>

<script>
	import {NovelApi} from '@/api'
	export default {
		data() {
			return {
				configList:[],
			}
		},
		mounted() {
			this.getTaskInfo()
		},
		methods: {
			getTaskInfo(){
				let row = JSON.parse(uni.getStorageSync('task'))
				NovelApi.getTaskInfo({
					data:{
						task_id:row
					}
				}).then(res => {
					this.configList = res.describe_image
				}).catch(() => {
					
				})
			},
			viewImage(img_url){
				let imgsArray = [];
				imgsArray[0] = img_url
				uni.previewImage({
					urls:imgsArray,
					current:0
				});
			},
			close(index){
				this.configList[index].img_url = ''
			},
			generate(item,index){
				let row = JSON.parse(uni.getStorageSync('task'))
				uni.showLoading({
					title: '生成中'
				});
				NovelApi.getGeneration({
					data:{
						task_id:row,
						process_id:item.process_id,
						prompt:item.value
					}
				}).then(res => {
					uni.hideLoading()
					this.configList[index].img_url = res.img_url
				}).catch(() => {
					uni.hideLoading()
				})
			},
			nextTop(){
				let row = JSON.parse(uni.getStorageSync('task'))
				NovelApi.updateTaskState({
					data:{
						task_id:row,
						type:2
					}
				}).then(res => {
					uni.navigateTo({
					   url: './storyboard'
					})
				}).catch(() => {
					
				})
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page-container{
		background: var(--bg-color1);
		padding: 0 30rpx 150rpx;
		position: relative;
		font-size: 28rpx;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx;
		margin-top:30rpx;
		color:var(--txt-color2);
		position: relative;
		font-size:24rpx;
		.title{
			// border-bottom:1px solid var(--txt-color3);
			padding-bottom:10rpx;
		}
	}
	.generate{
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20rpx;
		margin-top: 30rpx;
		.info{
			 background-color: #31344a;
			 height: 140rpx;
			 text-align: center;
			 border-radius:30rpx;
			 // overflow: hidden;
			 position: relative;
			 image{
				 width: 100%;
				 height: 100%;
				 border-radius:30rpx;
			 }
			 .icon-guanbi{
				 width: 32rpx;
				 border-radius: 50%;
				 height: 32rpx;
				 background: #363636;
				 position: absolute;
				 top: -10rpx;
				 right: -6rpx;
				 z-index: 2;
			 }
			 .icon-AI{
				 display:block;
				 margin: 20rpx 0 0;
			 }
			 .add{
				 width: 50rpx;
				 height: 50rpx;
				 border:1px dashed var(--txt-color2);
				 margin: 30rpx auto 14rpx;
				 font-size:40rpx;
				 border-radius:6rpx;
			 }
		}
	}
	.nextBtn{
		position: fixed;
		bottom: 0;
		left: 0;
		background: #2877ff;
		text-align:center;
		width: 100%;
		padding:30rpx 0;
		color:var(--txt-color1);
		border-radius:20rpx 20rpx 0 0;
		font-size:28rpx;
		font-weight:700;
		z-index: 3;
	}
	.qm-textarea {
	  background: var(--bg-color2);
	  padding:20rpx!important;
	  border-color: var(--txt-color3)!important;
	  /deep/ {
	    .u-textarea__field {
	      font-size: 24rpx;
	    }
	    .uni-textarea-placeholder{
	      color: var(--txt-color2)!important;
		  font-size: 24rpx!important;
	    }
	    .uni-textarea-wrapper {
	      color: var(--txt-color1)!important;
	    }
	    .u-textarea__count {
	      color: var(--txt-color2)!important;
	      background: var(--bg-color1)!important;
	    }
	  }
	}
</style>