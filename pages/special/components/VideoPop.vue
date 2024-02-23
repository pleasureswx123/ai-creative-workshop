<template>
	<NovelPop :show="show"
      @close="$emit('update:show', false)"
      :title="title">
	  <view class="videoPop">
		  <NovelSlider :value.sync="volume" type="volume" :min="speedMin" :max="soundMax" :step="soundStep"></NovelSlider>
		  <NovelSlider :value.sync="speed" type="speed" :min="speedMin" :max="speedMax" :step="speedStep"></NovelSlider>
	  </view>
	  <VideoTask></VideoTask>
	</NovelPop>
</template>

<script>
import NovelSlider from './NovelSlider.vue';
import VideoTask from './VideoTask.vue';
export default {
	components: {
		NovelSlider,VideoTask
	},
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
	    volume: 8,
	    speed: 2,
		speedMin:0,
		speedMax:5,
		soundMax:18,
		soundStep:1,
		speedStep:1,
	  }
	},
}
</script>

<style lang="scss" scoped>
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx 30rpx;
		margin-bottom:20rpx;
	}
</style>