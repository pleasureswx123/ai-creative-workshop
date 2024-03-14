<template>
	<view class="timbre">
		<view class="navTitle">
			<view v-for="(item,index) in tabList" :key="index" class="item" :class="{'active':isActive == index}" @tap="checked(index)">
				{{item.name}}
			</view>
		</view>
		<view class="nav_item" v-if="isActive==0">
			<view class="box-create" @tap="handCreate">
				<i class="iconfont icon-a-chuangjian_huaban1"></i>创建我的声音
			</view>
			<CreatePop :show="CreateShow"></CreatePop>
		</view>
		<view class="nav_item" v-if="isActive==1">
			345
		</view>
	</view>
</template>

<script>
import CreatePop from './CreatePop.vue';
export default{
	components:{CreatePop},
	data() {
		return{
			tabList:[{
				name:'复刻'
			},{
				name:'官方推荐'
			}],
			isActive:0,
			CreateShow:false
		}
	},
	methods:{
		checked(index){
			this.isActive = index
		},
		handCreate(){
			this.CreateShow = true
		}
	}
}
</script>

<style lang="scss" scoped>
.timbre{
	
}
.navTitle{
	display: flex;
	font-size: 30rpx;
	margin: 20rpx 0;
	.item{
		margin-right: 30rpx;
		cursor: pointer;
	}
	.active {
		border-bottom: 1px solid #9E9E9E;
	}
}
.nav_item{
	margin: 40rpx 0;
}
.box-create{
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: 24rpx;
	.iconfont{
		margin-right: 10rpx;
	}
}
</style>