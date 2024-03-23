<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="tab">
			<view v-for="(item,index) in tabList" :key="index" @tap="handChecked(index)" :class="{'active':isActive == index}" class="item">{{item.name}}</view>
		</view>
		<view class="nav_item" v-if="isActive==0">
			<humanBroadcast v-if="creatShow" @starCreate="starCreate"></humanBroadcast>
			<humanCreate v-else></humanCreate>
		</view>
	</view>
</template>

<script>
import humanBroadcast from './components/humanBroadcast.vue'
import humanCreate from './components/humanCreate.vue'
export default{
	components:{humanBroadcast,humanCreate},
	data(){
		return{
			tabList:[{
				name:'数字人播报'
			},{
				name:'照片播报'
			},{
				name:'数字分身'
			}],
			isActive:0,
			creatShow:true
		}
	},
	methods:{
		handChecked(index){
			this.isActive = index
		},
		starCreate(){
			this.creatShow = false
		}
	}
}
</script>

<style lang="scss" scoped>
.page-container{
	background: #1A1B1E;
	padding: 0 30rpx;
}
.tab{
	display: flex;
	align-items: center;
	margin: 20rpx 0;
	.item{
		background: #fff;
		margin-right: 30rpx;
		padding: 10rpx 20rpx;
		font-size: 28rpx;
		&.active{
			background:#F60652;
			color: var(--txt-color1);
		}
	}
}
</style>