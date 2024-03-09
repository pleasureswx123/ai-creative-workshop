<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="upload-container">
			<view class="loading-box" v-if="loading">
				<view class="icon-box">
				  <uni-icons custom-prefix="iconfont-qm" type="icon-qm-loading-1" color="var(--txt-color2)" size="40" />
				</view>
				<view class="title">等待生成...</view>
				<view class="tips">{{tips}}</view>
			</view>
			<view class="loading-box" v-else>
				<video :src="videoUrl"></video>
			</view>
		</view>
		<view class="btn" @tap="Handload">{{loadTips}}</view>
	</view>
</template>

<script>
	import {HumanApi} from '@/api'
	export default{
		props: {
			taskId:{
				type: Number,
				default:0
			}
		},
		data(){
			return{
				tips:'',
				loading:true,
				loadTips:'正在生成',
				videoUrl:'',
				timer:null
			}
		},
		mounted() {
			this.GetMaterial()
			this.$nextTick(() => {
				this.timer = setInterval(() => {
				    setTimeout(this.getTaskstate, 0)
				}, 5000);
			})
		},
		methods:{
			GetMaterial(){
				HumanApi.GetMaterial({
					task_type:24
				}).then(res => {
					this.tips = res.tip
				})
			},
			getTaskstate(){
				HumanApi.getTaskstate({
					task_id:this.taskId
				}).then(res => {
					this.state = res.state
					if(this.state == 1){
						clearInterval(this.timer);
						this.videoUrl = res.video_url
						this.loadTips = '重新生成'
						this.loading = false
					}
				})
			},
			Handload(){
				if(this.loadTips == '重新生成'){
					this.$emit('Handload',this.loadTips)
					return
				}
			}
		},
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
  position: relative;
  overflow: hidden;
  border: 1px solid #494C55;
  background: #3d3c3c;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600rpx;
  margin: 0 auto 200px;
}
.loading-box{
	width: 95%;
	height: 90%;
	margin: auto;
	background-color: #0C0D11;
	text-align: center;
	color: var(--txt-color2);
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	box-sizing: border-box;
	padding: 0 30rpx;
	.icon-box {
	   width: 100%;
	   display: flex;
	   align-items: center;
	   justify-content: center;
	  .icon-qm-loading-1 {
	    animation: rotate 1s linear infinite;
	  }
	}
	.tips{
		margin-top: 30rpx;
		font-size: 28rpx;
	}
}
.btn{
	width: 80%;
	height: 40px;
	line-height: 40px;
	border-radius: 5px;
	font-size: 14px;
	font-weight: 700;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	position: relative;
	background: var(--red-color1);
	color: var(--txt-color4);
	gap: 2px;
	cursor: pointer;
}
.audio-box{
	
}
</style>