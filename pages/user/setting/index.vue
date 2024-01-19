<template>
	<view class="container">
		<view class="form">
			<view class="a-item" @tap="uploadAvatar">
				<view class="label">{{ '头像' | lang }}</view>
				<view class="value">
					<image class="avatar" :src="avatar"></image>
					<image class="arrow" src="/static/images/ic_arrow_r.png"></image>
				</view>
			</view>
			<view class="a-item" @tap="toEditNickname">
				<view class="label">{{ '昵称' | lang }}</view>
				<view class="value">
					<text>{{ nickname || '无昵称' }}</text>
					<image class="arrow" src="/static/images/ic_arrow_r.png"></image>
				</view>
			</view>
			<view class="a-item" @tap="toBindPhone">
				<view class="label">{{ '手机账号' | lang }}</view>
				<view class="value">
					<text class="text-primary" v-if="phone">{{ phone.substr(0,3) + "****" + phone.substr(7) }}</text>
					<text class="text-danger" v-else>{{ '未绑定' | lang }}</text>
					<image class="arrow" src="/static/images/ic_arrow_r.png"></image>
				</view>
			</view>
			<!-- <view class="a-item" @tap="toBindWechat">
				<view class="label">{{ '微信账号' | lang }}</view>
				<view class="value">
					<text class="text-primary" v-if="openid">{{ '已绑定' | lang }}</text>
					<text class="text-danger" v-else>{{ '未绑定' | lang }}</text>
					<image class="arrow" src="/static/images/ic_arrow_r.png"></image>
				</view>
			</view> -->
		</view>
		<view class="logout">
			<button class="btn-logout text-danger" @tap="doLogout">{{ '退出登录' | lang }}</button>
		</view>

	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				avatar: '',
				nickname: '',
				phone: '',
				openid: ''
			};
		},
		onShow(options) {
			uni.setNavigationBarTitle({
				title: this.$lang('设置')
			})
			this.getUserInfo()
			this.getAccounts()
		},
		methods: {
			getUserInfo() {
				app.globalData.util.request({
					url: '/user/info'
				}).then(res => {
					this.avatar = res.data.avatar;
					this.nickname = res.data.nickname
				})
			},

			getAccounts() {
				app.globalData.util.request({
					url: '/user/getAccounts'
				}).then(res => {
					this.phone = res.data.phone
					this.openid = res.data.openid
				})
			},
			
			uploadAvatar() {
				const _this = this;
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: '正在上传'
						});
						app.globalData.util.upload({
							url: '/upload/image',
							filePath: res.tempFilePaths[0]
						}).then((res) => {
							var avatar = res.data.path;
							uni.hideLoading();
							_this.setData({
								avatar: avatar
							})
							_this.setAvatar()
						})
					}
				})
			},

			setAvatar() {
				app.globalData.util.request({
					url: '/user/setUserAvatar',
					data: {
						avatar: this.avatar
					}
				}).then((res) => {
					app.globalData.util.message('设置成功')
					this.getUserInfo()
				})
			},
			
			toEditNickname() {
				uni.navigateTo({
					url: '/pages/user/setting/nickname?nickname=' + this.nickname
				})
			},
			
			toBindPhone() {
				uni.navigateTo({
					url: '/pages/user/setting/bindphone?phone=' + this.phone
				})
			},
			
			toBindWechat() {
				uni.navigateTo({
					url: '/pages/user/setting/bindwechat'
				})
			},
			
			doLogout() {
				app.globalData.util.request({
					url: '/user/logout'
				}).then((res) => {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				})
			}
		}
	};
</script>
<style>
	page {
		min-height: 100%;
		background-color: #f7f7f8;
	}

	.container {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
	}

	.logout {
		position: absolute;
		width: 100%;
		height: 100rpx;
		left: 0;
		bottom: 60rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logout .btn-logout {
		width: 240rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 10rpx;
		font-size: 32rpx;
	}

	.form {
		background: #fff;
	}

	.form .a-item {
		border-top: 1rpx solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
		height: 72rpx;
	}

	.form .a-item:active {
		background: #f7f7f8;
	}

	.form .a-item .label {
		width: 260rpx;
		font-size: 32rpx;
		color: #999;
	}

	.form .a-item .value {
		width: 400rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 32rpx;
		color: #333;
	}

	.form .a-item .arrow {
		width: 24rpx;
		height: 24rpx;
		opacity: 0.8;
		margin-left: 20rpx;
	}

	.form .a-item .icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.form .a-item .avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
		background: #f7f7f8;
	}

	.text-primary {
		color: #04BABE;
	}

	.text-danger {
		color: #F56C6C;
	}
</style>