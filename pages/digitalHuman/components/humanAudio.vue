<template>
	<view class="people-box">
		<Timbre></Timbre>
		<view class="people-type"></view>
	</view>
</template>

<script>
import HumanTab from './HumanTab.vue';
import Timbre from '@/pages/sound/components/Timbre.vue';
export default {
	components: {
		HumanTab,Timbre
	},
  data() {
	return {
	  list:[{
	  	name:'复刻'
	  },{
	  	name:'官方推荐'
	  }],
	  index:0,
	  show:false
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
	background: #090909;
}
.people-type{
	padding:0 40rpx 60rpx;
}
</style>