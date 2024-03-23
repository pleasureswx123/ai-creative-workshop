<template>
	<view class="timbre">
		<view class="tab" :show="show" v-if="show">
			<u-tabs :list="tabList" :activeStyle="{color: 'var(--txt-color2)'}" class="item" @click="checked" :inactiveStyle="{color: '#606266'}"></u-tabs>
		</view>
		<view class="nav_item" v-if="isActive==0">
			<view class="box-create" @tap="handCreate">
				<i class="iconfont icon-a-chuangjian_huaban1"></i>创建我的声音
			</view>
			<view class="audioList">
				<view v-for="(item,index) in audioList">
					<view class="profile" @tap="play(item.id,index)">
						<image :src="item.image" mode="aspectFit"></image>
						<view class="iconPlay">
						  <i class="iconfont icon-zanting1" v-show='status'></i>
						  <i class="iconfont icon-bofang" v-show='!status'></i>
						</view>
					</view>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
			<CreatePop :show="CreateShow" @close="close"></CreatePop>
		</view>
		<view class="nav_item" v-if="isActive==1">
			<QmRecom></QmRecom>
		</view>
	</view>
</template>

<script>
import CreatePop from './CreatePop.vue';
import QmRecom from './QmRecom.vue';
export default{
	components:{CreatePop,QmRecom},
	props: {
	  show: {
	    type: Boolean,
	    default: true
	  },
	},
	data() {
		return{
			tabList:[{
				name:'复刻'
			},{
				name:'官方推荐'
			}],
			isActive:0,
			CreateShow:false,
			audioList:[{
				image:'https://aigc.chaojiyuyan.cn/upload/user_task/novel/178/178/178_1711008733_29106.png',
				name:'老爸',
				id:1,
				tips:'短视频平台最火',
				title:'专业'
			},{
				image:'https://api.chaojiyuyan.com/upload/images/00291-872786304.png',
				name:'儿子',
				id:2,
				tips:'短视频平台最火',
				title:'专业'
			}],
			status: false,
		}
	},
	methods:{
		checked(data){
			this.isActive = data.index
		},
		handCreate(){
			this.CreateShow = true
			this.recorder = false
		},
		close(){
			this.CreateShow = false
		},
		play(id){
			this.isActive = index
			let audioId = id;
			if(this.status) {
				this.status = !this.status;
			}else {
				this.status = !this.status;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.tab{
	color: var(--txt-color2);
	font-size: 28rpx;
	padding: 20rpx 0 0 10rpx;
	/deep/{
		.u-tabs__wrapper__nav__item__text{
			font-size: 28rpx;
		}
		.u-tabs__wrapper__nav__item{
			height: auto!important;
			cursor: pointer;
		}
		.u-tabs__wrapper__nav__line{
			bottom: 0px;
			background: var(--txt-color2)!important;
		}
	}
}
.nav_item{
	margin: 40rpx 0;
	padding:0 30rpx ;
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
.audioList{
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	row-gap: 20rpx;
	text-align: center;
	margin-top: 30rpx;
	.profile{
		width: 100rpx;
		height: 100rpx;
		background: #000;
		border-radius: 50%;
		position: relative;
		margin: auto;
		cursor: pointer;
		&.active{
			border: 4rpx solid #F60652;
		}
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.iconPlay{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
	}
	.name{
		margin-top: 10rpx;
	}
}
@media screen and (min-width: 960px){
	.audioList{
		grid-template-columns: repeat(8, 1fr);
		row-gap: 40rpx;
		.profile{
			width: 200rpx;
			height: 200rpx;
		}
	}
	
}
</style>