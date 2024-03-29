<template>
	<view class="container">
		<humanCropper :show="cropperShow" v-if="cropperShow"></humanCropper>
		<view class="text-box">
			<HumanTextarea :show="typeShow" v-if="typeShow"></HumanTextarea>
			<audioUpload v-else></audioUpload>
			<view class="changeBtn" @tap="change">{{typeShow?'切换音频':'切换文本'}}</view>
		</view>
		<view class="config-box">
			<HumanTab :list="list" :current="current" @handTab="handTab"></HumanTab>
			<view :title="title" v-if="title == '数字人'">
				<humanPeople></humanPeople>
			</view>
			<view :title="title" v-if="title ==  '背景'">
				<humanColor></humanColor>
			</view>
			<view :title="title" v-if="title == '音色'">
				<humanAudio></humanAudio>
			</view>
			<view :title="title" v-if="title == '配置'" class="people-box">
				<QmConfig :configShow="configShow"></QmConfig>
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
import audioUpload from './audioUpload.vue';
import humanCropper from './humanCropper.vue';
import QmConfig from '@/pages/sound/components/QmConfig.vue';
export default {
	components: {
		HumanTextarea,HumanTab,humanPeople,humanColor,humanAudio,QmConfig,audioUpload,humanCropper
	},
	props:{
		list:{
			type:Array,
			default:[{}]
		},
		typeShow:{
			type:Boolean,
			default:true
		},
		title:{
			type:String,
			default:'标题'
		},
		current:{
			type:Number,
			default:0
		},
		configShow:{
			type:Boolean,
			default:true
		},
		cropperShow:{
			type:Boolean,
			default:true
		}
	},
  data() {
	return {
	  
	}
  },
  methods: {
	handTab(data){
		this.$emit('handTab',data)
	},
	change(){
		this.$emit('change')
	}
  },
};
</script>

<style lang="scss" scoped>
.container{
}
.people-box{
	background: #1A1B1E;
}
.text-box{
	display: grid;
	grid-template-columns: 82% 15%;
	gap: 3%;
	.changeBtn{
		height:180rpx;
		box-sizing: border-box;
		padding: 0 10rpx;
		background: #909399;
		color: #EDD75A;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		text-align: center;
		cursor: pointer;
	}
}
</style>