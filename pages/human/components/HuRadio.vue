<template>
	<view class="radio-container">
		<view class="title-box">
			<view class="title">选择音色</view>
			<view class="try-listen" @tap="play()">
				<uni-icons custom-prefix="iconfont-qm" type="icon-qm-volume" color="var(--txt-color1)" size="20" />试听
			</view>
		</view>
		<view class="radio-box">
			<view class="item" v-for="(item, index) in dubList" :key="index" :class="{active: activeIndex == item.dub_id}" @tap="onSelected(item)">{{item.dub_name}}</view>
		</view>
	</view>
</template>

<script>
import {HumanApi} from '@/api'
export default{
	data(){
		return{
			dubList:[],
			page:1,
			pagesize:20,
			activeIndex:0,
			audioContext: null,
			radioUrl:''
		}
	},
	mounted() {
		this.getDubList()
		this.destroyAudio();
	},
	beforeDestroy() {
	  this.destroyAudio();
	},
	methods: {
		onSelected(item){
			this.activeIndex = item.dub_id
			this.radioUrl = item.url
			this.$emit('onSelected',item)
		},
		getDubList() {
			HumanApi.dubList({
				page:this.page,
				pagesize:this.pagesize,
			}).then(res => {
				this.dubList = res.list
			})
		},
		destroyAudio() {
		  if(this.audioContext) {
		    this.audioContext.pause();
		    this.audioContext.destroy();
		    this.audioContext = null;
		  }
		},
		play() {
		  this.destroyAudio();
		  if (!this.radioUrl) {
		    uni.$u.toast('请选择音色')
		    return
		  }
		  this.audioContext = uni.createInnerAudioContext();
		  this.audioContext.src = this.radioUrl;
		  // 设置音量（范围：0 到 1）
		  this.audioContext.volume = 0.5;
		  this.audioContext.play();
		}
	}
}
</script>

<style lang="scss" scpoed>
.radio-container{
	color: var(--txt-color1);
	font-size: 28rpx;
	.title-box{
		display: flex;
		justify-content: space-between;
	}
	.try-listen{
		display: flex;
		align-items: center;
		gap: 2px;
		cursor: pointer;
	}
}
.radio-box{
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 5px;
	margin: 20rpx 0;
	.item{
		cursor: pointer;
		min-width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 36px;
		border-radius: 8px;
		background: var(--bg-color2);
		color: var(--txt-color1);
		&.active {
		  background-color: #F60652;
		  color: var(--txt-color1);
		}
	}
}
</style>