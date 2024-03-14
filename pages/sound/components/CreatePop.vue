<template>
	<u-popup :show="show" mode="bottom" @close="$emit('close')" overlayStyle="background: rgba(0,0,0,.7)" bgColor="#0d0d0d">
	  <view class="navTitle">
	  	<view v-for="(item,index) in tabList" :key="index" class="item" :class="{'active':isActive == index}" @tap="checked(index)">
	  		{{item.name}}
	  	</view>
	  </view>
	  <view class="pop-container">
		  <view class="nav-item" v-if="isActive==0">
			  <AudioPlay></AudioPlay>
		  </view>
		  <view class="nav-item" v-if="isActive==1">
			  
		  </view>
	  </view>
	</u-popup>
</template>

<script>
import AudioPlay from './AudioPlay.vue';
export default{
	components:{AudioPlay},
	props: {
	    show: {
	      type: Boolean,
	      default: false
	    }
	},
	data(){
		return{
			tabList:[{
				name:'录制'
			},{
				name:'音频'
			}],
			isActive:0,
			playtext:'点击录制',
			playShow:true
		}
	},
	methods:{
		checked(index){
			this.isActive = index
		},
		start(){
			if(this.playtext){
				this.playtext = '停止录制'
				this.playShow = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@keyframes load {
	0% {
		height: 10%;
	}
	50% {
		height: 100%;
	}
	100% {
		height: 10%;
	}
}
.navTitle{
	display: flex;
	font-size: 30rpx;
	margin: 20rpx 0 20rpx 30rpx;
	.item{
		margin-right: 20rpx;
		cursor: pointer;
	}
	.active {
		color: #F60652;
	}
}
.nav-item{
	text-align: center;
	padding: 30rpx 0;
}
</style>