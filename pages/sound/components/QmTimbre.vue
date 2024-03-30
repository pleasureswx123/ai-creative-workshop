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
			<QmConfig></QmConfig>
		</view>
	</view>
</template>

<script>
import Timbre from './Timbre.vue';
import QmConfig from './QmConfig.vue';
export default{
	components: {Timbre,QmConfig},
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
		},
		onReachBottom(data){
			// this.$emit('onReachBottom',data)
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
</style>