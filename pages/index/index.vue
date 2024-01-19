<template>
	<view class="content">
		<view class="banner-cont">
			<view class="banner">
				<image :src="bannerImg" mode="widthFix" class="bannerBg"></image>
				<view class="logo">
					<image src="../../static/images/index/logo2.png" mode="widthFix"></image>
				</view>
				<view class="nav">
					<u-icon name="list" color="#fff" size="24" @click="navShow = true"></u-icon>
				</view>
			</view>
			<text>让创作变的轻松独特</text>
		</view>
		<view class="aiType">
			<view class="item" v-for="(item,index) in makeList" :key="index">
				<image :src="item.img" mode="widthFix"></image>
				<view class="">{{item.title}}</view>
			</view>
		</view>
		<!-- 导航弹出 -->
		<view class="popup">
			<u-popup :show="navShow" mode="right"  @close="close" @open="open" closeIconPos="top-right">
				<view class="user">
					<view class="userAvater">
						<image src="" mode="aspectFit"></image>
					</view>
					<view class="Infor">
						<view class="userName">用户昵称1</view>
						<view class="userId">yyyddoe</view>
					</view>
				</view>
				<view class="integral">
					<view class="inteNum">
						积分：
						<text>555</text>
					</view>
					<view class="inteBtn">兑换</view>
				</view>
				<view class="navList">
					<view class="item">
						<u-icon name="account" size="22"></u-icon>个人中心
					</view>
					<view class="item">
						<u-icon name="grid" size="22"></u-icon>我的创作
					</view>
					<view class="navSelmg"></view>
					<view class="item">
						<u-icon name="chat" size="22"></u-icon>智能对话
					</view>
					<view class="item">
						<u-icon name="camera" size="22"></u-icon>生成图片
					</view>
					<view class="item">
						<u-icon name="photo" size="22"></u-icon>图片处理
					</view>
					<view class="item">
						<u-icon name="play-right" size="22"></u-icon>生成视频
					</view>
					<view class="navSelmg"></view>
					<view class="item">
						<u-icon name="file-text" size="22"></u-icon>使用教程
					</view>
					<view class="item">
						<u-icon name="kefu-ermai" size="22"></u-icon>联系我们
					</view>
					<view class="item">
						<u-icon name="info-circle" size="20"></u-icon>服务和隐私条款
					</view>
					<view class="navSelmg"></view>
					<view class="item">
						<u-icon name="minus-square-fill" size="22"></u-icon>退出登录
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				bannerImg:'',
				navShow:false,
				makeList:[]
			}
		},
		onLoad() {
			this.getmakeList()
		},
		methods: {
			open() {
				// console.log('open');
			  },
			close() {
				this.navShow = false
			},
			getmakeList() {
			   app.globalData.util
			   	.request({
			   		url: '/Home/Index',
			   	})
			   	.then((res) => {
					this.setData({
					    makeList:res.data.channel,
						bannerImg:res.data.slogan_img				
					});
			   		
			   	}); 
			}
		}
	}
</script>

<style lang="scss">
	.banner-cont{
		width: 100%;
		padding:30rpx 40rpx 0;
		box-sizing: border-box;
		text-align: center;
		position: relative;
		height: 390rpx; /* 高度可以根据需求进行调整 */
		.bannerBg{
			width: 100%;
			height: 100%!important;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
		}
		
		.banner{
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			.logo{
				width: 250rpx;
				image{
					width: 100%;
				}
			}
		}
		text{
			font-size: 50rpx;
			color: #fff;
			padding-top: 100rpx;
			display: inline-block;
			width: 100%;
		}
		
	}
	.popup {
		width: 100%;
		/deep/.u-popup__wrapper {
		    width: 70% !important;
		}
		::v-deep .u-popup__content{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			// height: ;
		}
		.user{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			.userAvater{
				height: 68rpx;
				width: 68rpx;
				background-color: #f0f0f0;
				border-radius: 50%;
				margin-right: 20rpx;
				image{
					height: 100%;
					width: 100%;
				}
			}
			.Infor{
				.userName{
					font-size: 24rpx;
					color: #000;
					font-weight: 700;
				}
				.userId{
					font-size: 24rpx;
					margin-top: 6rpx;
				}
			}
		}
		.integral{
			width: 100%;
			padding: 20rpx 20rpx 20rpx 28rpx;
			background-color: #edf2f6;
			border-radius: 10rpx;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			margin: 40rpx 0;
			box-sizing: border-box;
			.inteNum{
				font-size: 24rpx;
				text{
					font-weight: 700;
					
				}
			}
			.inteBtn{
				background-color: #4b5d77;
				border-radius: 8rpx;
				padding: 8rpx 16rpx;
				font-size: 24rpx;
				color: #fff;
			}
		}
		.navList{
			.item{
				width: 100%;
				padding: 0 20rpx;
				margin: 0 0 30rpx;
				font-size: 28rpx;
				display: flex;
				.u-icon{
					display: inline-block;
					margin-right: 12rpx;
				}
			}
			.navSelmg{
				width: 100%;
				height: 1px;
				background-color: #f0f0f0;
				margin: 40rpx 0;
			}
		}
	}
	.aiType{
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		.item{
			width: 48%;
			height: 200rpx;
			background-color: #333;
		}
	}
</style>
