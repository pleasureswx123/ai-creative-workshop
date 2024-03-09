<template>
	<scroll-view scroll-y="true" style="height: 300px">
		<view class="videoList">
			<view class="videoPop" v-for="(item,index) in videoList" @click="play(item,index)" :class="{active: activeIndex === index}">
				<view class="videoBg">
					<i class="iconfont icon-jiqiren"></i>
					<!-- <i class="iconfont icon-bofang"></i> -->
					<view class="iconPlay">
					  <i class="iconfont icon-zanting1" v-if="musicId ==item.id"></i>
					  <i class="iconfont icon-bofang" v-else></i>
					</view>
				</view>
				<view class="word">
					<view class="title">{{item.title}}</view>
					<view class="name">{{item.title}}</view>
				</view>
			</view>
		</view>
		<u-gap height="120rpx" />
	</scroll-view>
</template>

<script>
import {NovelApi} from '@/api'
export default {
	data() {
		return {
			videoList: [],
			activeIndex:0,
			musicId:'',
			innerAudioContext:null
		}
	},
	mounted() {
		this.getVideoTask()
	},
	beforeDestroy() {
	  this.destroyAudio();
	},
	methods: {
		getVideoTask() {
			NovelApi.getDub({
				data:{page:1,
        			pagesize:10,}
			}).then(res => {
				this.videoList = res.list
			})
		},
		destroyAudio() {
		  if(this.innerAudioContext) {
		    this.innerAudioContext.pause();
		    this.innerAudioContext.destroy();
		    this.innerAudioContext = null;
		  }
		},
		play(item,index){
			this.activeIndex = index
			this.destroyAudio();
			this.musicId = item.id;
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = true;
			this.innerAudioContext.src = item.url;
		}
	},
}
</script>

<style lang="scss" scoped>
	.videoList {
		.videoPop {
			display: flex;
			align-items: center;
			background-color: #3b3f57;
			border-radius: 10px;
			padding: 10px 15px;
			margin-bottom: 10px;
			cursor: pointer;
			&.active{
				background-color: #2877ff;
			}
			.videoBg {
				width: 90rpx;
				height: 90rpx;
				list-height: 80rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, .6);
				margin-right: 40rpx;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				.icon-jiqiren {
					position: absolute;
				}
			}
			.word {
				.title {
					color: var(--txt-color1);
				}

				.name {
					color: var(--txt-color2);
				}
			}
		}
	}
</style>