<template>
	<view class="upload-box-container">
	  <view class="upload-box" v-if="uploadShow" @tap="handleUpload">
	    <view class="icon-box">
	      <i class="iconfont icon-shangchuan_huaban icon-upload"></i>
	    </view>
	    <view class="title">点击上传音频</view>
	  </view>
	  <view class="upload-box" v-else>
	    <uni-icons type="icon-qm-close" custom-prefix="iconfont-qm" color="var(--txt-color2)" size="20" @tap="del" />
	    <view class="container">
	      <view class="date"></view>
	      <view class="content"></view>
	      <view class="voice-container">
	    	<uni-icons custom-prefix="iconfont-qm" type="icon-qm-speaker1" color="var(--txt-color2)" size="20" />
	    	<view class="wave-box">
	    	  <uni-icons custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="20" />
	    	  <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="18" />
	    	  <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="20" />
	    	</view>
	    	<view class="duration"></view>
	    	<uni-icons @tap="playAudio()" class="pointer" custom-prefix="iconfont-qm" type="icon-qm-play1" color="var(--txt-color1)" size="22" />
	      </view>
	    </view>
	  </view>
	  <view class="tips">建议5-20秒</view>
	  <view class="play-reprod" @click='handReproduction'>
	  	<i class="iconfont icon-luzhi1 icon-luzhi2"></i><view>复刻</view>
	  </view>
	</view>
</template>

<script>
	import {soundApi} from '@/api'
	export default{
		data(){
			return{
				uploadShow:true,
				dub_url:''
			}
		},
		methods:{
			handleUpload(){
				var that = this
				uni.chooseFile({
					count: 1,   //选取的文件个数限制
					extension: [".mp3"],  //可定义允许哪些后缀的文件可被选择
					success: function (res) {
					  let tempFilePaths = res.tempFilePaths;
					  uni.showLoading({
						title: "上传中...",
					  });
					  uni.uploadFile({
						name: 'audio',    //文件上传的name值
						url: 'https://192.168.31.168:8099/web.php/upload/audio',    //接口地址
						header:{},    //头信息
						formData:{},   //上传额外携带的参数
						filePath: tempFilePaths[0],//临时路径
						fileType: "audio",   //文件类型
						success: (uploadFileRes) => {
						  uni.hideLoading();
						  that.uploadShow = false
						  const ret = JSON.parse(uploadFileRes.data);
						  that.dub_url = ret.data.path
						},
					  });
					},
				});
			},
			handReproduction(){
				uni.showLoading({
					title: "音频复刻中",
				});
				soundApi.CreateReproduction({
					dub_url:this.dub_url
				}).then(res => {
					uni.hideLoading();
					uni.$u.toast('音频复刻完成');
					this.$emit('close')
				}).catch(res =>{
					uni.hideLoading();
				})
			},
			del(){
				this.uploadShow = true
				if(this.audioContext){
					this.audioContext.destroy()
					// this.dub_id = '';
				}
			},
			destroyAudio() {
			  if(this.audioContext) {
			    this.audioContext.pause();
			    this.audioContext.destroy();
			    this.audioContext = null;
			  }
			},
			playAudio() {
			  this.destroyAudio();
			  this.audioContext = uni.createInnerAudioContext();
			  this.audioContext.src = this.dub_url;
			  // 设置音量（范围：0 到 1）
			  this.audioContext.volume = 0.5;
			  this.audioContext.play();
			},
		}
	}
</script>

<style lang="scss" scoped>
.upload-box{
	width:60%;
	border-radius: 3px;
	margin: 10px auto;
	position: relative;
	overflow: hidden;
	border: 1px solid #494c55;
	background: #1f2937;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 200rpx;
	cursor: pointer;
}
.icon-upload::before{
	font-size: 30px;
}
.play-reprod{
	cursor: pointer;
}
.tips{
	margin: 20rpx 0 30rpx ;
	font-size: 28rpx;
}
.icon-luzhi2:before{
	color: #73B06F!important;
}
.container {
  background: var(--bg-color2);
  width: 100%;
  height: 100%;
  padding: 30rpx 30rpx 30rpx;
  border-radius: 20rpx;
  &.active {
    background-color: #F60652;
	.content{
		color: var(--txt-color1);
	}
  }
}
.icon-qm-close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
.date {
  color: var(--txt-color1);
  font-size: 28rpx;
  padding-bottom: 20rpx;
}
.content {
  color: var(--txt-color2);
  font-size: 28rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 20rpx;
}
.voice-container {
  height: 60rpx;
  border-radius: 100rpx;
  border: 2rpx solid rgba(255,255,255,.1);
  background: var(--txt-color7);
  display: flex;
  align-items: center;
  padding: 0 40rpx;
  gap: 20rpx;
  .wave-box {
    display: flex;
    align-items: center;
    transform: translate3d(-20rpx, 0, 0);
    .ml-5 {
      margin-left: -5rpx;
    }
  }
  .duration {
    margin-right: auto;
    color: var(--txt-color2);
    font-size: 24rpx;
  }
}
</style>