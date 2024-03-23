<template>
	<view class="container">
		<view class="pictrue-box">
			<image src="../../../static/images/avatar.jpg" class="createBg" mode="aspectFit"></image>
			<view class="scaleImg">
				<movable-area :scale-area="true">
					<movable-view :x="x" :y="y" direction="all" @change="onChange" :scale="true" @scale="onScale" scale-min="0.5" scale-max="1.5" :scale-value="1">
						<image src="https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/26120-2082689743.png?image_process=resize,p_40" mode="aspectFit" class="image"></image>
					</movable-view>
				</movable-area>
			</view>
		</view>
		<view class="text-box">
			<HumanTextarea></HumanTextarea>
			<view class="changeBtn">切换<br>音频</view>
		</view>
		<view class="config-box">
			<HumanTab :list="list" @handTab="handTab"></HumanTab>
			<view v-if="index == 0">
				<humanPeople></humanPeople>
			</view>
			<view v-if="index == 1">
				<humanColor></humanColor>
			</view>
			<view v-if="index == 2">
				<humanAudio></humanAudio>
			</view>
			<view v-if="index == 3">
				<QmConfig></QmConfig>
			</view>
		</view>
	</view>
</template>

<script>
import HumanTextarea from './HumanTextarea.vue';
import HumanTab from './HumanTab.vue';
import humanPeople from './humanPeople.vue';
import humanColor from './humanColor.vue';
import humanAudio from './humanAudio.vue';
import QmConfig from '@/pages/sound/components/Timbre.vue';
export default {
	components: {
		HumanTextarea,HumanTab,humanPeople,humanColor,humanAudio
	},
  data() {
	return {
	  x: 0,
	  y: 0,
	  old: {
		  x: 0,
		  y: 0,
		  num:1
	  },
	  list:[{
	  	name:'数字人'
	  },{
	  	name:'背景'
	  },{
	  	name:'音色'
	  },{
	  	name:'配置'
	  }],
	  index:0
	};
  },
  methods: {
	handTab(data){
	  	this.index = data.index
	},
	onScale(e) {
	  this.num = e.detail.scale;
	},
	onChange: function(e) {
		this.old.x = e.detail.x
		this.old.y = e.detail.y
	},
  },
};
</script>

<style lang="scss" scoped>
.container{
	.pictrue-box{
		width: 500rpx;
		height: 700rpx;
		background: var(--txt-color1);
		margin:50rpx auto;
		position: relative;
		overflow: hidden;
	}
	.createBg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
	}
	.createPer{
		max-width: 100%;
	}
}
.scaleImg{
	width: 100%;
	height: 100%;
	uni-movable-area{
		width: 100%;
		height: 100%;
	}
	uni-movable-view{
		width: 300rpx;
		height: 300rpx;
		.image {
		  width: 100%;
		  height: 100%;
		}
	}
}
.text-box{
	display: grid;
	grid-template-columns: 82% 15%;
	gap: 3%;
	.changeBtn{
		height:180rpx;
		background: #909399;
		color: #EDD75A;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
}
</style>