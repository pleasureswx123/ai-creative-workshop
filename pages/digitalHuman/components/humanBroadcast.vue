<template>
	<view class="container">
		<view class="create-box" @tap="handCreate">
			<view class="add">
				<i class="iconfont icon-a-chuangjian_huaban1"></i>
			</view>
			<view class="title">创建项目</view>
		</view>
		<view class="draft-box">
			<view class="title">草稿箱</view>
			<view class="draftList">
				<view class="item" v-for="(item,index) in draftList" :key="index">
					<view class="image">
						<image src="../../../static/images/code.png" mode="aspectFit"></image>
					</view>
					<view class="draft-infor">
						<view class="name">{{item.name}}</view>
						<i class="iconfont icon-caozuo" @tap="cancel"></i>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="delShow" @close="delShow=false" mode="bottom">
			<view class="set-box">
				<view class="set-btn del">删除</view>
				<view class="set-btn" @tap="delShow=false">取消</view>
			</view>
		</u-popup>
		<NovelPop :show="videoShow" @close="videoShow=false" title="选择生成视频尺寸" @confirm="handConfirm" :setShow="false">
			<view class="size">
				<view class="size-box">
					<view class="item" v-for="(item,index) in sizeList" :key="index" :class="{'active':isActive == index}" @tap="handSize(index)">
						<view class="title">{{item.name}}</view>
						<view class="title">{{item.num}}</view>
					</view>
				</view>
				<view class="btn">开始创作</view>
			</view>
		</NovelPop>
	</view>
</template>

<script>
export default{
	data(){
		return{
			draftList:[{
				name:'金鹰门一开'
			},{
				name:'未命名'
			},{
				name:'未命名'
			}],
			delShow:false,
			videoShow:false,
			sizeList:[{
				name:'竖版视频',
				num:'9:16'
			},{
				name:'竖版视频',
				num:'16:9'
			}],
			isActive:0
		}
	},
	methods:{
		cancel(){
			this.delShow = true
		},
		handCreate(){
			this.videoShow = true
		},
		handSize(index){
			this.isActive = index
		}
	}
}
</script>

<style lang="scss" scoped>
.container{
	background: var(--bg-color1);
}
.create-box{
	width: 100%;
	border-radius: 3px;
	margin: 10px 0 40rpx;
	position: relative;
	overflow: hidden;
	border: 1px solid #494c55;
	background: #1f2937;
	text-align: center;
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 280rpx;
	justify-content: center;
	.title{
		color:var(--txt-color2);
		margin-top: 20rpx;
	}
}
.icon-a-chuangjian_huaban1::before{
	font-size: 30px;
}
.draft-box{
	.title{
		color: #9E9E9E;
		margin-bottom: 20rpx;
	}
}
.draftList{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 30rpx;
	.item{
		background: var(--bg-color2);
		border-radius: 10rpx;
		padding: 20rpx;
		.image{
			width: 100%;
			height: 200rpx;
			background: var(--bg-color1);
			image{
				max-width: 100%;
				max-height: 100%;
				width: 100%;
			}
		}
		.draft-infor{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0 0;
		}
		.icon-caozuo{
			cursor:pointer;
		}
		.name{
			color: var(--txt-color2);
			font-size: 24rpx;
		}
	}
}
.container{
	/deep/.u-popup__content{
		background-color: #282828;
		text-align: center;
		color: var(--txt-color1);
		width: 100%;
	}
	.set-btn{
		padding:40rpx 0;
		border-bottom: 1px solid #615c5c;
		cursor:pointer;
	}
	.del{
		color: red;
	}
}
.size{
	.size-box{
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 60rpx;
	}
	.item{
		background:#909399;
		padding:30rpx 0;
		cursor:pointer;
		&.active{
			background:#233549;
		}
	}
	.btn{
		width: 260rpx;
		height:80rpx;
		cursor:pointer;
		line-height:80rpx;
		background:#F60652;
		margin:70rpx auto 30rpx;
		border-radius:10rpx;
	}
}
</style>