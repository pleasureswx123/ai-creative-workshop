<template>
	<view class="tab">
		<u-tabs :list="list" :activeStyle="{color: 'var(--txt-color2)'}" :inactiveStyle="{color: '#606266'}" @click="handTab" :current="current"></u-tabs>
	</view>
</template>

<script>
export default{
	props: {
	  list: {
	    type: Array,
	    default: []
	  },
	  current:{
		  type: [String , Number],
		  default: 0
	  }
	},
	data(){
		return{
			
		}
	},
	methods:{
		handTab(item) {
			this.$emit('handTab',item)
		}
	}
}
</script>

<style lang="scss" scoped>
.tab{
	color: var(--txt-color2);
	font-size: 28rpx;
	background: #1A1B1E;
	margin: 30rpx 0;
	padding: 20rpx 0 20rpx 10rpx;
	/deep/{
		.u-tabs__wrapper__nav__item__text{
			font-size: 28rpx;
		}
		.u-tabs__wrapper__nav__item{
			height: auto!important;
		}
		.u-tabs__wrapper__nav__line{
			bottom: 0px;
			background: var(--txt-color2)!important;
		}
	}
}
</style>