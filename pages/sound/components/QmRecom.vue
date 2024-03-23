<template>
	<view class="audioList recomList">
		<view class="item" v-for="(item,index) in audioList">
			<view class="profile" @tap="play(index)" :class="{'active':isActive == index}">
				<image :src="item.image" mode="aspectFit"></image>
				<view v-if="isActive === index">
					<view class="iconPlay">
						<i class="iconfont icon-zanting1" v-show='status'></i>
						<i class="iconfont icon-bofang" v-show='!status'></i>
					</view>
					<view class="bg"></view>
				</view>
			</view>
			<view class="name">{{item.name}}</view>
			<view class="tips">{{item.tips}}</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
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
			isActive:0,
			status:false
		}
	},
	methods:{
		play(index){
			this.isActive = index
			this.playShow = true
		}
	}
}
</script>

<style lang="scss" scoped>
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
		border:2px solid #181818;
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
			z-index: 3;
		}
	}
	.bg{
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .4);
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
	}
	.name{
		margin-top: 10rpx;
	}
}
.recomList{
	background: rgb(24,24,24);
	grid-template-columns: repeat(4, 1fr)!important;
	padding: 20rpx 0;
	.tips{
		font-size: 20rpx;
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