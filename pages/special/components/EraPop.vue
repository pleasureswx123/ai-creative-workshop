<template>
	<NovelPop :show="show"
      @close="$emit('update:show', false)"
      :title="title">
	  <scroll-view scroll-y="true" style="height: 200px">
		  <view class="flex">
			  <view class="videoPop" v-for="(item,index) in eraList">{{item.title}}</view>
		  </view>
		  <u-gap height="120rpx" />
	  </scroll-view>
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
		eraList:[]
	  }
	},
	mounted() {
		this.getVideoTask()
	},
	methods: {
		getVideoTask() {
			NovelApi.getDub({
				data:{page:1,
        		pagesize:10,},
				no_sign: 1,
				sourceCode:"100001",
				sign:"52d89ffef49b65edaf5d232104d42fac",
				timestamp:"1545454552",
			}).then(res => {
				this.eraList = res.list
			})
		},
	},
}
</script>

<style lang="scss" scoped>
	.flex{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 10px;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:10rpx;
		padding:30rpx 0;
		margin-bottom:10rpx;
		text-align: center;
	}
</style>