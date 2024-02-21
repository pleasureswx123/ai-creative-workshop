<template>
	<NovelPop :show="show"
      @close="$emit('update:show', false)"
      :title="title" :setShow="false">
	  <view class="flex">
		  <view class="videoPop" v-for="(item,index) in bgmList">
		  	{{item.title}}
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
		bgmList:[
			{title:'4:3'},
			{title:'3:4'},
			{title:'16:9'},
			{title:'16:9'},
			{title:'16:9'}
		]
	  }
	},
}
</script>

<style lang="scss" scoped>
	.flex{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.videoPop{
		background-color:var(--bg-color2);
		border-radius:20rpx;
		padding:50rpx 30rpx;
		margin-bottom:30rpx;
		text-align: center;
	}
</style>