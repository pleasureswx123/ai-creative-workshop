<template>
	<NovelPop :show="show"
      @close="$emit('update:show', false)"
      :title="title" :setShow="false">
	  <view class="videoPop" v-for="(item,index) in bgmList">
		  </u-icon>{{item.title}}
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
			{title:'推荐音乐'},
			{title:'音乐素材库'},
			{title:'不需要'}
		]
	  }
	},
}
</script>

<style lang="scss" scoped>
	.videoPop{
		background-color:var(--bg-color2);
		border-radius:20rpx;
		padding:30rpx 30rpx;
		margin-bottom:30rpx;
		text-align: center;
	}
</style>