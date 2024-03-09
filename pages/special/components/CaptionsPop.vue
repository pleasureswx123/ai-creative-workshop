<template>
	<NovelPop :show="show"
      @close="$emit('update:show', false)"
      :title="title" :setShow="false" :titleShow="false">
	  <view class="flex">
		  <view class="videoPop" v-for="(item,index) in capList" @tap="capConfirm(index)">{{item.title}}</view>
	  </view>
		  <view class="videoPop noPop" @click="$emit('update:show', false)">不需要字幕</view>
	</NovelPop>
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
		capList:[]
	  }
	},
	mounted() {
		this.getCapList()
	},
	methods: {
		getCapList() {
			NovelApi.getTypeface({
				data:{page:1,
        			pagesize:10,}
			}).then(res => {
				this.capList = res.list
			})
		},
		capConfirm(index){
			this.$emit('setCapData',this.capList[index])
		}
	},
}
</script>

<style lang="scss" scoped>
	.flex{
		display: grid;
		grid-template-columns: repeat(2,1fr);
		gap: 10px;
	}
	.videoPop{
		background-color:var(--bg-color2);
		border:1px solid #fff;
		border-radius:20rpx;
		padding:20rpx 30rpx;
		text-align: center;
		cursor: pointer;
	}
	.noPop{
		margin:30rpx 0 0 0
	}
</style>