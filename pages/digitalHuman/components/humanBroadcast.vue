<template>
	<view class="container">
		<view class="create-box">
			<view class="add">
				<i class="iconfont icon-a-chuangjian_huaban1"></i>
			</view>
			<view class="title">创建项目</view>
		</view>
		<view class="draft-box">
			<view class="title">草稿箱</view>
			<view class="draftList">
				<view class="item" v-for="(item,index) in draftList">
					<view class="image">
						<image src="../../../static/images/code.png" mode="aspectFit"></image>
					</view>
					<view class="draft-infor">
						<view class="name">{{item.name}}</view>
						<i class="iconfont icon-caozuo"></i>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="delShow" @close="delShow=false" mode="bottom">
			<view class="set-box">
				<view>删除</view>
				<view>取消</view>
			</view>
		</u-popup>
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
			delShow:false
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
		.name{
			color: var(--txt-color2);
			font-size: 24rpx;
		}
	}
}
</style>