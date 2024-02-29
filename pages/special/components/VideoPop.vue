<template>
	<NovelPop :show="show"
      @close="$emit('update:show', false)"
      :title="title" @confirm="handConfirm">
	  <view class="videoPop">
		  <NovelSlider :value.sync="volume" type="volume" :min="speedMin" :max="soundMax" :step="soundStep"></NovelSlider>
		  <NovelSlider :value.sync="speed" type="speed" :min="speedMin" :max="speedMax" :step="speedStep"></NovelSlider>
	  </view>
	  <VideoTask ref="task"></VideoTask>
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
	methods: {
		handConfirm() {
			this.activeIndex = this.$refs.task.activeIndex
			let obj = {
				data:this.$refs.task.videoList[this.activeIndex],
				volume:['0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9','1', '1.1','1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9','2'][this.volume],
				speed:['0.5', '0.8', '1', '1.25', '1.5','2'][this.speed]
			}
			this.$emit('setTaskData',obj)
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