<template>
	<NovelPop :show="show" @close="close" :title="title" @confirm="handConfirm" :height="100+'vh'" :color="'#F60652'">
	  <view class="history-container">
		<view class="container" v-for="item in list" :key="item.id" :class="{active: activeIndex == item.id}" @tap="onSelected(item)">
		  <view class="date">{{item.create_time}}</view>
		  <view class="content">{{item.content}}</view>
		  <view class="voice-container">
			<uni-icons custom-prefix="iconfont-qm" type="icon-qm-speaker1" color="var(--txt-color2)" size="20" />
			<view class="wave-box">
			  <uni-icons custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="20" />
			  <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="18" />
			  <uni-icons class="ml-5" custom-prefix="iconfont-qm" type="icon-qm-soundwave" color="var(--txt-color2)" size="20" />
			</view>
			<view class="duration">{{item.dub_duration}}</view>
			<uni-icons @tap="playAudio(item)" class="pointer" custom-prefix="iconfont-qm" type="icon-qm-play1" color="var(--txt-color1)" size="22" />
		  </view>
		</view>
		<view class="no-more" v-if="showNoMore">没有更多了</view>
		  <view class="load-more" v-else>
			<view class="more-btn" @tap="loadMore">加载更多</view>
		  </view>
	  </view>
	</NovelPop>
</template>

<script>
	import {guid} from '@/uni_modules/uv-ui-tools/libs/function/index.js'
	import {soundApi} from '@/api'
	export default{
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			title: {
				type: String,
				default: false,
			},
		},
		data(){
			return{
				audioContext: null,
				list: [],
				page: 1,
				pagesize: 10,
				historyPop:false,
				activeIndex:0,
				audioItem:{},
				showNoMore: true,
			}
		},
		mounted() {
			this.getTaskList()
		},
		beforeDestroy() {
		  this.destroyAudio();
		},
		methods:{
			getTaskList() {
				soundApi.getTaskList({
					page:this.page,
					pagesize:this.pagesize,
				}).then(res => {
					if (res.list.length > 0) {
						if (this.list.length == 0) {
							console.log(1)
							this.list = res.list.map(item => {
								const id = item.id || guid();
								return {
									...item,
									id
								}
							})
						} else {
							console.log(2)
							this.list = [...this.list, ...res.list.map(item => {
								const id = item.id || guid();
								return {
									...item,
									id
								}
							})]
						}
					}
					this.showNoMore = res.list.length < this.pagesize;
				})
			},
			loadMore() {
				if (this.showNoMore) {
					return;
				}
				this.page++;
				this.getTaskList();
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
			onSelected(item){
				this.activeIndex = item.id
				this.audioItem = item
			},
			handConfirm(){
				this.$emit('select',this.audioItem)
				this.$emit('update:show', false);
			},
			close(){
				this.$emit('update:show', false);
				if(this.audioContext){
					this.audioContext.destroy();
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.history-container{
	display: grid;
	gap: 15px;
	grid-template-columns: repeat(1, 1fr);
	margin-bottom: 25px;
	padding-bottom: 100rpx;
}
.container {
  background: var(--bg-color2);
  padding: 20rpx 30rpx 30rpx;
  //border-top: 1rpx solid var(--txt-color2);
  //border-bottom: 1rpx solid var(--txt-color2);
  box-shadow: 0 0 5rpx rgba(255,255,255,.2);
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
  -webkit-line-clamp: 5;	
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
.no-more {
	text-align: center;
	margin: 30rpx auto;
}
.load-more {
	width: 400rpx;
	height: 88rpx;
	line-height: 88rpx;
	border-radius: 16rpx;
	background-color: #1D1E23;
	text-align: center;
	margin: 30rpx auto;
	cursor: pointer;
	/deep/.u-loadmore__content__text {
		// line-height: 88rpx !important;
	}
}
</style>