<template>
	<view class="audioList recomList">
		<view class="item" v-for="(item,index) in audioList">
			<view class="profile" @tap="play(item,index)" :class="{'active':isActive == index}">
				<i class="iconfont icon-jiqiren"></i>
				<view v-if="isActive == index">
					<view class="iconPlay">
						<i class="iconfont icon-zanting1" v-if="musicId ==item.id"></i>
						<i class="iconfont icon-bofang" v-else></i>
					</view>
				</view>
			</view>
			<view class="name">{{item.title}}</view>
		</view>
	</view>
</template>

<script>
import {NovelApi} from '@/api'
export default{
	data(){
		return{
			audioList:[],
			isActive:0,
			innerAudioContext:null,
			musicId:''
		}
	},
	mounted() {
		this.getVideoTask()
	},
	beforeDestroy() {
	  this.destroyAudio();
	},
	methods:{
		getVideoTask() {
			NovelApi.getDub({
				data:{page:1,
        			pagesize:40,
			}
			}).then(res => {
				this.audioList = res.list
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
			this.isActive = index
			this.destroyAudio();
			this.musicId = item.id;
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = true;
			this.innerAudioContext.src = item.url;
			this.innerAudioContext.onEnded(()=> {
				this.musicId = '';
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.audioList{
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	row-gap: 20rpx;
	text-align: center;
	margin-top: 30rpx;
	.profile{
		width: 100rpx;
		height: 100rpx;
		background: #000;
		border-radius: 50%;
		position: relative;
		margin: auto;
		cursor: pointer;
		border:2px solid #181818;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		&.active{
			border: 4rpx solid #F60652;
		}
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.iconPlay{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			z-index: 3;
		}
		.icon-jiqiren {
			position: absolute;
		}
	}
	.name{
		margin-top: 10rpx;
	}
}
.recomList{
	grid-template-columns: repeat(4, 1fr)!important;
	padding: 20rpx 0;
}
@media screen and (min-width: 960px){
	.audioList{
		grid-template-columns: repeat(8, 1fr)!important;
		row-gap: 40rpx;
		.profile{
			width: 200rpx;
			height: 200rpx;
		}
	}
	
}
</style>