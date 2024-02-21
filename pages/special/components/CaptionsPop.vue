<template>
	<NovelPop :show="show"
      @close="$emit('update:show', false)"
      :title="title" :setShow="false" :titleShow="false">
	  <view class="flex">
		  <view class="videoPop" v-for="(item,index) in capList">
		  		  {{item.title}}
		  </view>
		  <view class="videoPop noPop">
		  	不需要字幕
		  </view>
	  </view>
	</NovelPop>
</template>

<script>
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
		capList:[
			{title:'阿里巴巴'},
			{title:'阿里巴巴'},
			{title:'阿里巴巴'},
			{title:'阿里巴巴'}
		]
	  }
	},
}
</script>

<style lang="scss" scoped>
	.flex{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
	}
	.videoPop{
		// background-color:var(--bg-color2);
		border:1px solid #fff;
		width: 38%;
		border-radius:20rpx;
		padding:20rpx 30rpx;
		margin-bottom:30rpx;
		text-align: center;
	}
	.noPop{
		width: 100%;
	}
</style>