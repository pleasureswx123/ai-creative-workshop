<template>
	<view class="people-box">
		<HumanTab :list="list" @handTab="handTab"></HumanTab>
		<view class="people-type" v-if="index == 0">
			图片
		</view>
		<view class="people-type" v-if="index == 1">
			颜色
		</view>
	</view>
</template>

<script>
import HumanTab from './HumanTab.vue';
export default {
	components: {
		HumanTab
	},
  data() {
	return {
	  list:[{
	  	name:'图片'
	  },{
	  	name:'颜色'
	  }],
	  index:0,
	};
  },
  methods: {
	handTab(data){
		this.index = data.index
	},
  },
};
</script>

<style lang="scss" scoped>
.people-box{
	color: var(--txt-color2);
	font-size: 28rpx;
	background: #1A1B1E;
}
.people-type{
	padding:0 40rpx 60rpx;
}
</style>