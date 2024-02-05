<template>
	<view class="navList">
		<view class="menu">
			<view class="gohome" @click="goHome">
				<view class="head">
					<image src="../../static/images/index/logo.png" mode="aspectFit"></image>
				</view>
				<text>首页</text>
			</view>
			<view class="nav" @click="open">
				<u-icon name="list" color="#fff" size="24"></u-icon>
			</view>
		</view>
		
		<!-- 导航弹出 -->
		<view class="popup">
			<u-popup :show="navShow" mode="right" @close="close" @open="open" closeIconPos="top-right">
				<view class="user" @click="goUser">
					<view class="userAvater">
						<image :src="userinfo.avatar" v-if="userinfo.avatar" mode="aspectFit"></image>
					</view>
					<view class="Infor">
						<view class="userName">{{userinfo.nickname || $lang('未设置昵称') }}</view>
						<view class="userId">MID:{{userinfo.user_id}}</view>
					</view>
				</view>
				<view class="integral">
					<view class="inteNum">
						积分
						<text>{{userinfo.balance}}</text>
					</view>
					<view class="inteBtn" @click="blChange">兑换</view>
				</view>
				<view class="headList">
					<view class="item" @click="goHome">
						<u-icon name="home" size="22" color="#f5f5f5"></u-icon>首页
					</view>
					<view class="item" @click="goUser">
						<u-icon name="account" size="22" color="#f5f5f5"></u-icon>个人中心
					</view>
					<view class="item" @click="goMyCreate">
						<u-icon name="grid" size="22" color="#f5f5f5"></u-icon>我的创作
					</view>
					<view class="navSelmg"></view>
					<view class="item" @click="goAi">
						<u-icon name="chat" size="22" color="#f5f5f5"></u-icon>智能对话
					</view>
					<view class="item" @click="goGenerateImg">
						<u-icon name="camera" size="22" color="#f5f5f5"></u-icon>生成图片
					</view>
					<view class="item" @click="goImgTool">
						<u-icon name="photo" size="22" color="#f5f5f5"></u-icon>图片处理
					</view>
					<view class="item" @click="goDub">
						<u-icon name="mic" size="22" color="#f5f5f5"></u-icon>智能配音
					</view>
					<view class="item" @click="goImgToVideo">
						<u-icon name="play-right" size="22" color="#f5f5f5"></u-icon>生成视频
					</view>
					<view class="navSelmg"></view>
					<view class="item" data-url="/pages/article/list?type=help" @click="goUse">
						<u-icon name="file-text" size="22" color="#f5f5f5"></u-icon>使用教程
					</view>
					<view class="item" @click="goContact">
						<u-icon name="kefu-ermai" size="22" color="#f5f5f5"></u-icon>联系我们
					</view>
					<view class="item" @click="toDoc('service')">
						<u-icon name="order" size="20" color="#f5f5f5"></u-icon>服务条款
					</view>
					<view class="item" @click="toDoc('privacy')">
						<u-icon name="info-circle" size="20" color="#f5f5f5"></u-icon>隐私协议
					</view>
					<view class="navSelmg"></view>
					<view class="item" @click="doLogout">
						<u-icon name="minus-square-fill" size="22" color="#f5f5f5"></u-icon>退出登录
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 兑换积分弹窗 -->
		<view class="inpopup">
			<u-popup :show="integralShow" mode="center" @close="inClose" @open="inOpen" closeIconPos="top-right">
				<text class="title">兑换积分</text>
				<text class="text">可以使用兑换码来获取平台积分，若您已拥有兑换码，可直接进行兑换。若尚未获得兑换码，可联系我们客服进行购买。</text>
				<u--input placeholder="输入或粘贴兑换码" border="surround" v-model="value" @change="inChange" placeholderStyle="fontSize:14px"></u--input>
				<view class="operateBtn">
					<view class="btn cancel" @click="inClose()">取消</view>
					<view class="btn sure" @click="exchange">确认兑换</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				navShow: false,
				integralShow: false,
				value: '',
				userinfo: {
					user_id: 0,
					balance: 0,
				},
				isLogin: false,
			}
		},
		mounted() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				app.globalData.util.request({
					url: '/user/info'
				}).then((res) => {
					this.userinfo = res.data
					this.isLogin =  true
				})
			},
			null() {
				document.body.style.position = null
			},
			fixed(){
				document.body.style.position = 'fixed'
			},
			open() {
				this.navShow = true
				this.fixed()
			},
			close() {
				this.navShow = false
				this.null()
			},
			blChange() {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				this.navShow = false
				this.integralShow = true
				this.value = '';
			},
			inOpen() {
				// console.log('open');
				this.fixed()
			},
			inClose() {
				this.integralShow = false
				this.null()
			},
			inChange(e) {
				// console.log('change', e);
			},
			exchange() {
				app.globalData.util.request({
					url: '/user/bindCard',
					data: {
						code: this.value,
					}
				})
				.then((res) => {
					app.globalData.util.message(res.message)
					this.integralShow = false
					this.getUserInfo();
				});
			},
			goHome() {
				this.null()
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			goUser() {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				this.null()
				uni.reLaunch({
					url: '/pages/user/index'
				})
			},
			goMyCreate() {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				this.null()
				uni.navigateTo({
				  url: '/pages/picture/index'
				})
			},
			goAi() {
				this.null()
				uni.navigateTo({
				  url: '/pages/ai/index'
				})
			},
			goGenerateImg() {
				this.null()
				uni.navigateTo({
				  url: '/pages/photos/index'
				})
			},
			goImgTool() {
				this.null()
				uni.navigateTo({
				  url: '/pages/picture/tool'
				})
			},
			goDub() {
				this.null()
				uni.navigateTo({
				  url: '/pages/sound/index'
				})
			},
			goImgToVideo() {
				this.null()
				uni.navigateTo({
				  url: '/pages/picture/img-to-video'
				})
			},
			goUse(e) {
				this.null()
				const url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: url
				});
			},
			goContact(){
				this.null()
				uni.navigateTo({
				  url: '/pages/article/code'
				})
			},
			toDoc(type) {
				this.null()
				uni.navigateTo({
					url: '/pages/article/article?type=' + type
				})
			},
			doLogout() {
				this.null()
				app.globalData.util.request({
					url: '/user/logout'
				}).then((res) => {
          uni.clearStorage();
					uni.reLaunch({
						url: '/pages/index/index'
					})
				})
			},
		}
	}

</script>

<style lang="scss" scoped>
	.navList {
		margin-bottom: 120rpx;
		.menu{
			width: 100%;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			padding: 30rpx 40rpx;
			box-sizing: border-box;
			position: fixed;
			top: 0;
			left:0;
			background-color: #0D0D0D;
			z-index: 11;
			.gohome{
				display: flex;
				align-items: center;
				text{
					color: #fff;
					font-size: 14px;
					opacity: .7;
					margin-left: 8rpx;
				}
			}
			/deep/.u-icon__icon{
				font-size: 28px!important;
				line-height: 28px!important;
				color: rgba(255,255,255,.7)!important;
			}
			.head {
				width: 60rpx;
				height: 58rpx;
				overflow: hidden;
				border-radius: 50%;
				image {
					width: 100%;
					height: 100%;
					
				}
			}
		}
	}
	.popup {
		width: 100%;
	
		::v-deep .u-popup__content {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			background-color: #0D0D0D;
			overflow-y: auto;
			overflow-x: hidden;
		}
	
		.user {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
	
			.userAvater {
				height: 68rpx;
				width: 68rpx;
				background-color: #ffad08;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20rpx;
	
				image {
					height: 100%;
					width: 100%;
				}
			}
	
			.Infor {
				.userName {
					font-size: 24rpx;
					color: rgba(255,255,255,.7);
					font-weight: 700;
				}
	
				.userId {
					font-size: 24rpx;
					margin-top: 6rpx;
					color: #818181;
				}
			}
		}
	
		.integral {
			width: 420rpx;
			padding: 20rpx 20rpx 20rpx 28rpx;
			background-color: #1D1E23;
			border-radius: 10rpx;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			margin: 40rpx 0;
			box-sizing: border-box;
	
			.inteNum {
				font-size: 24rpx;
				color: #B2B2B2;
	
				text {
					margin-left: 10rpx;
				}
			}
	
			.inteBtn {
				background-color: #F60652;
				border-radius: 8rpx;
				padding: 8rpx 16rpx;
				font-size: 24rpx;
				color: #fff;
			}
		}
	
		.headList {
			.item {
				width: 100%;
				padding: 0 20rpx;
				margin: 0 0 30rpx;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				color: rgba(255,255,255,.7);
				.u-icon {
					display: inline-block;
					margin-right: 12rpx;
				}
				/deep/.u-icon__icon{
					font-size: 22px!important;
					line-height: 22px!important;
				}
			}
	
			.navSelmg {
				width: 100%;
				height: 1px;
				background-color: rgba(255,255,255,.2);
				margin: 40rpx 0;
			}
		}
	}
	.inpopup {
		width: 80%;
	
		.title {
			font-size: 32rpx;
			text-align: center;
			font-weight: 700;
		}
	
		.text {
			font-size: 28rpx;
			text-align: center;
			margin: 20rpx 0;
		}
	
		/deep/.u-popup__content {
			width: 80%;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 80rpx 40rpx;
		}
		/deep/.u-input {
			border: 1px solid #f5f5f5;
			background-color: #f5f5f5;
			margin: 30rpx 0;
		}
		.operateBtn {
			display: flex;
			display: -webkit-flex;
			justify-content: right;
			flex-wrap: wrap;
			align-items: center;
	
			.btn {
				width: 200rpx;
				height: 50rpx;
				line-height: 50rpx;
				border: 1px solid #F60652;
				border-radius: 8rpx;
				display: inline-block;
				text-align: center;
				font-size: 28rpx;
			}
	
			.sure {
				margin-left: 20rpx;
				background-color: #F60652;
				color: #fff;
			}
		}
	}
</style>