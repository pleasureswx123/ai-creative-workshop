<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="tips">内容由AI生成，仅供参考，作品和素材系统会默认为您云端保存30天，请在30天内下载保存到您本地哦，30天后系统会自动清空，清空后不可找回。</view>
		<view class="list">
			<view class="videoPop" v-for="(item,index) in lationList" :key="index">
				<view class="status" v-if="item.state == 0||item.state == 1||item.state == 2||item.state == 3||item.state == 101" @tap="edit(item.state,item.is_automatic)">{{item.state_info}}</view>
				<view class="video" v-if="item.state == 4">
					<video id="myVideo" :src="item.video_url" object-fit="contain" :poster="item.cover_img_url" :controls="true"></video>
				</view>
				<view class="info">
					<view class="title">{{item.title}}</view>
					<i class="iconfont icon-shanchu" v-if="item.state == 4" @tap="deleteData(index,item.task_id)"></i>
				</view>
			</view>
		</view>
		<view class="noMore" v-if="noMore">没有更多数据了</view>
	</view>
</template>

<script>
	import {NovelApi} from '@/api'
	import {userApi} from '@/api'
	export default{
		data(){
			return{
				lationList:[],
				page:1,
				pagesize:10,
				noMore:false,
				total:1
			}
		},
		mounted() {
			this.myTaskList()
			let timer = setInterval(() => {
			    setTimeout(this.myTaskList(), 0)
			}, 10000);
		},
		methods: {
			myTaskList(){
				let user_id = JSON.parse(uni.getStorageSync('user_id'))
				NovelApi.myTaskList({
					data:{
						page:this.page,
						pagesize:this.pagesize,
						user_id:user_id,
						data_type:1
					},
					no_sign: 1,
					sourceCode:"100001",
					sign:"52d89ffef49b65edaf5d232104d42fac",
					timestamp:"1545454552"
				}).then(res => {
					if (res && res.list.length) {
						  this.lationList = [...this.lationList,...res.list]
						  if (res.list.length < this.pagesize) {
							this.noMore = true
						  }
					} else {
					  this.noMore = false
					}
				})
			},
			 deleteData(index,task_id){
				this.lationList.splice(index, 1);
				let user_id = JSON.parse(uni.getStorageSync('user_id'))
				NovelApi.delTask({
					data:{
						user_id:user_id,
						task_id:task_id
					},
					no_sign: 1,
					sourceCode:"100001",
					sign:"52d89ffef49b65edaf5d232104d42fac",
					timestamp:"1545454552"
				}).then(res => {
					if (res && res.list.length) {
						  this.lationList = [...this.lationList,...this.lationList]
						  if (res.list.length < this.pagesize) {
							this.noMore = true
						  }
					} else {
					  this.noMore = false
					}
				})
			},
			edit(state,is_automatic){
				if(state==2&&is_automatic==2){
					uni.navigateTo({
						url: './config'
					})
				}
			}
		},
		beforeDestroy() {
			clearInterval(timer);
		},
		onReachBottom() {
			this.page+=1
			this.myTaskList()
		}
	}
</script>
	
<style lang="scss" scoped>
.page-container{
	background: var(--bg-color1);
	padding: 0 30rpx 50rpx;
	position: relative;
	font-size: 24rpx;
	.tips{
		color:var(--txt-color2);
		margin: 30rpx 0;
	}
}
.list{
	display: grid;
	grid-template-columns: repeat(2,1fr);
	gap: 10px;
	margin-bottom: 50rpx;
}
.videoPop {
	background-color: #3b3f57; 
	border-radius: 20rpx;
	padding: 70rpx 10rpx 0;
	margin-top: 10rpx;
	color: var(--txt-color1);
	position: relative;
	overflow: hidden;
	.status{
		background: var(--bg-color1);
		font-size:32rpx;
		text-align: center;
		color:var(--txt-color2);
		height:  180rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.video{
		aspect-ratio: 16 / 9;
		background: var(--bg-color1);
		/deep/uni-video {
		  width: 100%;
		  height: 100%;
		  // .uni-video-bar{
		  // 	padding: 0;
		  // }
		  .uni-video-cover-play-button{
			  width: 48rpx;
			  height: 48rpx;
		  }
		  // .uni-video-cover-duration{
			 //  font-size: 24rpx;
		  // }
		  // .uni-video-control-button{
			 //  width: 10px;
		  // }
		}
	}
}
.info{
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
	.title{
		width: 90%;
		overflow: hidden;
		height: 28rpx;
		line-height: 28rpx;
		white-space:nowrap;
		text-overflow: ellipsis;
	}
}
.noMore{
	color: var(--txt-color2);
	text-align: center;
}
@media screen and (min-width: 960px) {
  .status {
    height: 640rpx!important;
	font-size: 60rpx!important;
  }
  .info{
	  padding: 30rpx 0;
	  .title{
		  font-size: 40rpx;
		  height: 40rpx;
		  line-height: 40rpx;
		  
	  }
	  .icon-shanchu{
		  font-size: 40rpx;
		  cursor: pointer;
	  }
  }
  /deep/.uni-video-cover-play-button{
	  width: 80rpx!important;
	  height: 80rpx!important;
  }
}
</style>