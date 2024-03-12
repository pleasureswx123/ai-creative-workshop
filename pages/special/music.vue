<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="videoPop" v-for="(item,index) in musicList" :class="{active: activeIndex === index}" @click="onSelected(index)">
		  <free-audio audioId='item.id' :url='item.url' :title="item.title"></free-audio>
		</view>
		<u-gap height="100" />
		<view class="footer-bar">
		  <view class="btn-box cancle" @tap="close">取 消</view>
		  <view class="btn-box pointer" @tap="confirm">确 定</view>
		</view>
	</view>
</template>

<script>
import {NovelApi} from '@/api'
import freeAudio from '@/components/chengpeng-audio/free-audio.vue'
export default {
	components: {freeAudio},
	props: {
		title: {
		  type: String,
		  default: '标题' 
		}
	},
	data() {
	  return {
		musicList:[],
		activeIndex:0,
		page:1,
		pagesize:10,
		audioAction: {
			method: 'pause'
		},
		innerAudioContext:null,
		musicId:'',
		time:0,
	  }
	},
	mounted() {
		this.getMusicList()
	},
	onUnload() { //普通页面在 onUnload 生命周期中执行
	  uni.$emit('stop')
	},
	onHide() { //tabBar页面在onHide生命周期中执行
	  uni.$emit('stop')
	},
	methods: {
		getMusicList() {
			NovelApi.getMusic({
				data:{
					page:this.page,
        			pagesize:this.pagesize,
				}
			}).then(res => {
				// this.musicList = [...this.musicList, ...res.list]
				if (res.list && res.list.length){
					this.musicList = [...this.musicList, ...res.list]
				}
			})
		},
		onSelected(index){
			this.activeIndex = index
		},
		onReachBottom(){
			this.page+=1
			this.getMusicList()
		},
		confirm(){
			let pages = getCurrentPages();  //获取所有页面栈实例列表
			let nowPage = pages[ pages.length - 1];  //当前页页面实例
			let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
			prevPage.$vm.getMusic(this.musicList[this.activeIndex])
			uni.navigateBack({
			   delta: 1,// 要跳转到的页面路径
			})
		},
		close(){
			uni.navigateBack({
			   delta:1 // 要跳转到的页面路径
			})
			if(this.innerAudioContext){
				this.innerAudioContext.destroy()
			}
		}
	},
}
</script>

<style lang="scss" scoped>
	.page-container {
		background: var(--bg-color1);
		padding: 0 30rpx 40rpx;
		margin-top: 40rpx;
		position: relative;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx 30rpx;
		margin-bottom:30rpx;
		color:var(--txt-color1);
		position: relative;
		font-size: 28rpx;
		cursor: pointer;
		&.active {
			border:1px solid #fff;
		}
		
	}
	.footer-bar {
	   position: fixed;
	   bottom: 0;
	   left: 0;
	   right: 0;
	   padding: 0 30rpx;
	   height: 150rpx;
	   box-sizing: border-box;
	   place-items: center;
	   z-index: 100;
	   background:var(--bg-color1);
	   display: flex;
	   // width: 100%;
	   gap:10px;
	   color:var(--txt-color1);
	  .btn-box {
		  width: 50%;
	    background: #F60652;
	    height: 80rpx;
	    border-radius: 10rpx;
	    text-align: center;
	    line-height: 80rpx;
	    position: relative;
	    font-size: 28rpx;
	    font-weight: bold;
	  }
		.cancle{
			background: #3b3f57;
		}
	}
	@media screen and (min-width: 960px) {
		.footer-bar{
			max-width: 1200px;
			margin: 0 auto;
		}
		.videoPop{
			padding: 50rpx 40rpx;
			font-size: 32rpx;
		}
	}
	
</style>