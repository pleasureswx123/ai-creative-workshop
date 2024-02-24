<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="videoPop" v-for="(item,index) in musicList" :class="{active: activeIndex === index}" @click="onSelected(index)">
		  <!-- {{item.title}} -->
		  <view class="audio">
			  <view class="flex">
				  <view>{{item.title}}</view>
				  <u-count-down
				          ref="countDown"
				          :time="time"
				          format="mm:ss"
				          :autoStart="false"
				      >
					</u-count-down>
			  </view>
			  <view class="bar"></view>
			  <view class="iconPlay">
				  <i class="iconfont icon-zanting" v-if="musicId ==item.id" @click="pause(item,index)"></i>
				  <i class="iconfont icon-bofang2" v-else @click="play(item,index)"></i>
			  </view>
		  </view>
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
export default {
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
		time:0
	  }
	},
	mounted() {
		this.getMusicList()
	},
	methods: {
		getMusicList() {
			NovelApi.getMusic({
				data:{
					page:this.page,
        			pagesize:this.pagesize,
				},
				no_sign: 1,
				sourceCode:"100001",
				sign:"52d89ffef49b65edaf5d232104d42fac",
				timestamp:"1545454552",
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
			uni.$emit('setMusic',this.musicList[this.activeIndex])
			uni.navigateTo({
			   url: './novel' // 要跳转到的页面路径
			})
			this.innerAudioContext.destroy()
		},
		pause(item,index){
			this.musicId = ''
			this.innerAudioContext.destroy()
			this.$refs.countDown[index].pause();
		},
		play(item,index){
			this.musicId = item.id
			if (this.innerAudioContext != null) {
				this.innerAudioContext.destroy()
			}
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = true;
			this.innerAudioContext.src = item.url
			this.innerAudioContext.onPlay(() => {
				
			});
			this.innerAudioContext.onCanplay(() => {
				 const time = this.innerAudioContext.duration.toFixed(0)
				 const min = Math.floor(time/60)
				 const second = time%60
				 this.musicTime = (min>10?min:'0'+min)+':'+(second>10?second:'0'+second)
			});
			this.innerAudioContext.onTimeUpdate(() => {
				const time = this.innerAudioContext.currentTime.toFixed(0)
				const min = Math.floor(time/60)
				const second = time%60
				this.currentTime = (min>10?min:'0'+min)+':'+(second>10?second:'0'+second)
			});
			this.innerAudioContext.onEnded(() => {
				this.musicId = ''
				this.innerAudioContext.destroy()
			});
			this.$nextTick(()=>{
				this.$refs.countDown[index].start()
			})
		},
		close(){
			uni.navigateTo({
			   url: './novel' // 要跳转到的页面路径
			})
			this.innerAudioContext.destroy()
		}
	},
}
</script>

<style lang="scss" scoped>
	.page-container {
		background: var(--bg-color1);
		font-size: 24rpx;
		padding: 0 30rpx 40rpx;
		margin-top: 40rpx;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx 30rpx;
		margin-bottom:30rpx;
		color:var(--txt-color1);
		position: relative;
		&.active {
			border:1px solid #fff;
		}
		.audio{
			padding: 0 100rpx 0 0;
			position: relative;
			.flex{
				display:flex;
				justify-content: space-between;
			}
			.bar{
				height: 4px;
				line-height:4px;
				background:#999;
				margin-top: 14rpx;
				border-radius: 10rpx;
			}
			.iconPlay{
				position: absolute;
				right: 0;
				top: 0;
			}
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
		 width: 100%;
		 gap:10px;
		 color:var(--txt-color1);
	  .btn-box {
		  width: 50%;
	    background: #6978fd;
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
</style>