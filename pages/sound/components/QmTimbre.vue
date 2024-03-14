<template>
	<view class="box-container">
		<view class="navTitle">
			<view v-for="(item,index) in tabList" :key="index" class="item" :class="{'active':isActive == index}" @tap="checked(index)">
				{{item.name}}
			</view>
		</view>
		<view class="nav_item" v-if="isActive==0">
			<Timbre></Timbre>
		</view>
		<view class="nav_item" v-if="isActive==1">
			
		</view>
	</view>
</template>

<script>
import Timbre from './Timbre.vue';
export default{
	components: {Timbre},
	data() {
		return{
			tabList:[{
				name:'音色'
			},{
				name:'配置'
			}],
			isActive:0
		}
	},
	methods:{
		checked(index){
			this.isActive = index
		}
	}
}
</script>

<style lang="scss" scoped>
.box-container{
	background: #25262b;
	border: 1px solid #373a40;
	padding: 5px 10px 10px;
	border-radius: 4px;
	margin: 20rpx 0;
	color: #9E9E9E;
}
.navTitle{
	display: flex;
	font-size: 32rpx;
	margin: 20rpx 0 ;
	.item{
		margin-right: 30rpx;
		cursor: pointer;
	}
	.active {
		border-bottom: 1px solid #9E9E9E;
	}
}
.nav_item{
	padding: 10rpx 0 0 20rpx;
}
</style>