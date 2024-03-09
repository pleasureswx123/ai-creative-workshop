<template>
	<view class="audio">
		<view class="title">配音音频</view>
		<view class="upload-container" v-if="uploadShow">
			<view class="create" @tap="onCreatPop()">历史配音 ></view>
			<view class="loading-box" v-if="loading"></view>
			<view v-else class="upload-box-container pointer" @tap="handleUpload">
			  <view class="upload-box">
			    <view class="icon-box">
			      <i class="iconfont icon-shangchuan_huaban"></i>
			    </view>
			    <view class="title">点击上传音频</view>
			  </view>
			</view>
		</view>
		<view class="upload-container audio-container" v-else>
			<uni-icons type="icon-qm-close" custom-prefix="iconfont-qm" color="var(--txt-color2)" size="20" @tap="del" />
			<view class="container">
			  <view class="date">{{audioCont.create_time}}</view>
			  <view class="content">{{audioCont.content}}</view>
			  <view class="voice-container">
				<uni-icons custom-prefix="iconfont-qm" type="icon-qm-speaker1" color="var(--txt-color2)" size="20" />
				<view class="wave-box">
				  <uni-icons custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="20" />
				  <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="18" />
				  <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="20" />
				</view>
				<view class="duration">{{audioCont.dub_duration}}</view>
				<uni-icons @tap="playAudio(audioCont)" class="pointer" custom-prefix="iconfont-qm" type="icon-qm-play1" color="var(--txt-color1)" size="22" />
			  </view>
			</view>
		</view>
		<HuHistory title="选择历史配音" :show="historyPop" :show.sync="historyPop" @select="onSelect"></HuHistory>
	</view>
</template>

<script>
	import HuHistory from './HuHistory.vue'
	import {userApi} from '@/api'
	export default{
		components:{HuHistory},
		data(){
			return{
				loading:false,
				historyPop:false,
				audioCont:{},
				uploadShow:true
			}
		},
		mounted() {
			this.destroyAudio();
		},
		beforeDestroy() {
		  this.destroyAudio();
		},
		methods:{
			handleUpload(){
				uni.chooseFile({
					count: 1,   //选取的文件个数限制
					extension: [".mp3"],  //可定义允许哪些后缀的文件可被选择
					success: function (res) {
					  let tempFilePaths = res.tempFilePaths;
					  console.log(res)
					  uni.showLoading({
						title: "上传中...",
					  });
					  uni.uploadFile({
						name: 'audio',    //文件上传的name值
						url: 'https://aigc.chaojiyuyan.cn/web.php/upload/audio',    //接口地址
						header:{},    //头信息
						formData:{},   //上传额外携带的参数
						filePath: tempFilePaths[0],//临时路径
						fileType: "audio",   //文件类型
						success: (uploadFileRes) => {
						  uni.hideLoading();
						  this.uploadShow = false
						  const ret = JSON.parse(uploadFileRes.data);
						  console.log(ret); 
						},
					  });
					},
				});
			},
			onCreatPop(){
				this.historyPop = true
			},
			onSelect(item){
				this.audioCont = item
				this.uploadShow = false
			},
			destroyAudio() {
			  if(this.audioContext) {
			    this.audioContext.pause();
			    this.audioContext.destroy();
			    this.audioContext = null;
			  }
			},
			playAudio(item) {
			  this.destroyAudio();
			  this.audioContext = uni.createInnerAudioContext();
			  this.audioContext.src = item.dub_url;
			  // 设置音量（范围：0 到 1）
			  this.audioContext.volume = 0.5;
			  this.audioContext.play();
			},
			del(){
				this.audioCont = ''
				this.uploadShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
.audio{
	.title{
		color: var(--txt-color1);
		font-size: 28rpx;
		margin-bottom: 5rpx;
	}
	.upload-container{
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
		height: 350rpx;
		.create{
		  position: absolute;
		  color: var(--txt-color1);
		  top: 20rpx;
		  right: 30rpx;
		  font-size: 28rpx;
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
	}
	.audio-container{
		position: relative;
		background-color: var(--bg-color2);
		/deep/.uniui-icon-qm-close{
			position: absolute;
			top: 20rpx;
			right: 40rpx;
			cursor: pointer;
		}
	}
	
}
.container {
  background: var(--bg-color2);
  width: 100%;
  padding: 20rpx 30rpx 30rpx;
  border-radius: 20rpx;
  &.active {
    background-color: #F60652;
	.content{
		color: var(--txt-color1);
	}
  }
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
  height: 85rpx;
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