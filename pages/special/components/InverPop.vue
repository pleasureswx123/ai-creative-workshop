<template>
	<HumanPop :show="show"
      @close="$emit('update:show', false)"
      :title="title" :setShow="false"  :height="30+'vh'">
	  <view class="flex">
		  <view class="videoPop" v-for="(item,index) in inverList" @tap="handConfirm(index)">
		  	{{item.scale}}
		  </view>
	  </view>
	  
	</HumanPop>
</template>

<script>
import {NovelApi} from '@/api'
export default {
	props: {
		title: {
		  type: String,
		  default: '标题' 
		},
		show: {
		  type: Boolean,
		  default: false
		},
	},
	data() {
	  return {
		inverList:[]
	  }
	},
	mounted() {
		this.getInverScale()
	},
	methods: {
		getInverScale() {
			NovelApi.getVideoScale({
				data:{page:1,
        			pagesize:10,}
			}).then(res => {
				this.inverList = res.list
			})
		},
		handConfirm(index){
			this.$emit('setInverData',this.inverList[index])
		}
	},
}
</script>

<style lang="scss" scoped>
	.flex{
		display: grid;
		grid-template-columns: repeat(5,1fr);
		gap: 5px;
		margin-bottom:30rpx;
		align-items: center;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:10rpx;
		text-align: center;
		cursor: pointer;
		aspect-ratio: 16 / 9;
		max-height: 60px;
		width: 160rpx;
		height: 120rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
	}
	.videoPop:nth-child(2){
		width: 120rpx;
		height: 160rpx;
	}
	.videoPop:nth-child(3){
		width: 160rpx;
		height: 90rpx;
	}
	.videoPop:nth-child(4){
		width: 90rpx;
		height: 160rpx;
	}
	.videoPop:nth-child(5){
		width: 100rpx;
		height: 100rpx;
	}
</style>