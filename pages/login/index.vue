<template>
	<view class="page" v-if="pageIsLoad">
		<view class="title">{{ '欢迎登录' | lang }}</view>
<!--		<view class="btn-group" v-if="loginType === 'wechat'">
			<button class="btn" @tap="wxLogin" :style="'margin-top:' + (login_wechat && !login_phone ? '300rpx;' : '160rpx;')">
				<image class="icon" src="/static/images/login/ic_wechat.png"></image>
				<text>{{ '微信授权登录' | lang }}</text>
			</button>
			<button class="btn btn-phone" @tap="switchToPhone" v-if="login_phone">
				<text>{{ '手机号登录' | lang }}</text>
			</button>
		</view>-->
		
<!--		<view class="container" v-if="loginType === 'phone'">-->
		<view class="container">
		
			<view class="form">
				<view class="form-item">
					<image class="icon" src="/static/images/login/ic_phone.png"></image>
					<input type="text" @input="inputChange" data-name="phone" maxlength="11" class="input" :placeholder="'手机号' | lang" :value="phone" />
				</view>
				<view class="form-item">
					<image class="icon" src="/static/images/login/ic_pwd.png"></image>
					<input v-if="pwdShow" type="text" @input="inputChange" maxlength="20" data-name="password" class="input" :placeholder="'登录密码' | lang" :value="password" />
					<input v-else type="password" @input="inputChange" maxlength="20" data-name="password" class="input" :placeholder="'登录密码' | lang" :value="password" />
					<image v-if="pwdShow" class="eye" @tap="hidePwd" src="/static/images/login/ic_eye.png">
					</image>
					<image v-else class="eye" @tap="showPwd" src="/static/images/login/ic_eye_open.png"></image>
				</view>
				
				<view class="form-item">
					<button class="btn btn-submit" @tap="doLogin">{{ '确定登录' | lang }}</button>
				</view>
				<view class="form-item" style="justify-content: space-between; color: #555555; font-size: 28rpx;">
					<text @tap="toReg">{{ '注册账号' | lang }}</text>
					<text @tap="toReset">{{ '忘记密码' | lang }}</text>
				</view>
			</view>
		</view>
		
		<view class="agree">
			{{ '登录即表示同意' | lang }}<text @tap="toDoc('service')">{{ '《服务协议》' | lang }}</text>{{ '和' | lang }}<text @tap="toDoc('privacy')">{{ '《隐私政策》' | lang }}</text>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				pageIsLoad: false,
				sitecode: '',
				login_phone: 1,
				login_wechat: 0,
				loginType: 'wechat',
				phone: '',
				password: '',
				is_agree: false,
				pwdShow: false,
				backurl: 'pages/index/index'
			}
		},
		onLoad(options) {
			let phone = uni.getStorageSync('phone');
			if (phone) {
				this.setData({
					phone: phone
				})
			}
			if (options.backurl) {
				this.backurl = decodeURIComponent(options.backurl)
			}
			const sitecode = uni.getStorageSync('sitecode')
			this.setData({
				sitecode: sitecode ? sitecode : ''
			})
			setTimeout(() => {
				let login_phone = app.globalData.login_phone;
				let login_wechat = app.globalData.login_wechat;
				this.setData({
					login_phone: login_phone,
					login_wechat: login_wechat,
					loginType: login_wechat ? 'wechat' : 'phone',
					pageIsLoad: true
				})
			}, 200)
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$lang('登录')
			})
		},
		methods: {
			switchToPhone() {
				this.loginType = 'phone'
			},
			doLogin() {
				let sitecode = this.sitecode;
				let phone = this.phone;
				let password = this.password;
				if (!phone) {
					app.globalData.util.message('请输入手机号')
					return
				}
				if (!password) {
					app.globalData.util.message('请输入登录密码')
					return
				}
				app.globalData.util.request({
					url: '/Login/login',
					data: {
						phone: phone,
						password: password,
						sitecode: sitecode
					},
				}).then((res) => {
					uni.setStorageSync('phone', phone);
					uni.setStorageSync('token', res.data.token);
					uni.setStorageSync('userInfo', res.data.userinfo);
					app.globalData.util.message(res.message, 'success')
					
					uni.redirectTo({
						url: this.backurl,
						fail: function() {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					})
				})
			},
			wxLogin() {
				var sitecode = this.sitecode
				var tuid = uni.getStorageSync('tuid')
				var url = '/web.php/login/h5?sitecode=' + sitecode + '&tuid=' + tuid + '&from=' + encodeURIComponent(this.backurl)
				window.location.href = url
			},
			
			toReg() {
				uni.navigateTo({
					url: '/pages/login/reg'
				})
			},
			
			toReset() {
				uni.navigateTo({
					url: '/pages/login/reset'
				})
			},

			toDoc(type) {
				uni.navigateTo({
					url: '/pages/article/article?type=' + type
				})
			},

			inputChange(e) {
				let name = e.currentTarget.dataset.name;
				let value = e.detail.value;
				this.setData({
					[name]: value
				});
			},

			showPwd() {
				this.setData({
					pwdShow: true
				})
			},

			hidePwd() {
				this.setData({
					pwdShow: false
				})
			},

			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	};
</script>
<style>
	.page {
		padding: 40rpx 100rpx;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		right: 0;
		bottom: 0;
		box-sizing: border-box;
	}
	.title {
		font-size: 48rpx;
		text-align: center;
		margin-top: 100rpx;
		letter-spacing: 4rpx;
		color: #333;
	}
	.btn-group {
		margin-top: 200rpx;
	}
	.btn {
		background: #F60652;
		border-radius: 10rpx;
		width: 100%;
		height: 98rpx;
		font-size: 36rpx;
		margin: 0 auto;
		letter-spacing: 2rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
	.btn:active {
		opacity: 0.8;
	}
	.btn image {
		width: 64rpx;
		height: 64rpx;
		margin-right: 20rpx;
	}
	
	.btn-phone {
		color: #F60652;
		background: #fff;
		border: 2rpx solid #F60652;
		margin-top: 50rpx;
		box-sizing: border-box;
		height: 92rpx;
	}
	
	.btn-submit {
		height: 88rpx;
		margin-top: 40rpx;
		font-size: 32rpx;
	}
	
	.agree {
		width: 100%;
		font-size: 28rpx;
		color: #999;
		position: absolute;
		left: 0;
		bottom: 0;
		text-align: center;
		cursor: pointer;
		background: #fff;
		padding: 20rpx 0 50rpx 0;
	}
	.agree text {
		color: #000;
	}
	
	.container {
		width: 750rpx;
		height: 400px;
		position: relative;
		top: -20px;
		transition: left 0.15s ease-in-out;
	}

	.title-container {
		font-size: 20px;
		text-align: center;
		height: 48px;
		line-height: 48px;
		margin-bottom: 20px;
		letter-spacing: 2px;
	}

	.container {
		width: 100%;
		padding-top: 50px;
	}

	.form .form-item {
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 40rpx;
	}

	.form .form-item .input {
		width: 100%;
		border: none;
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 88rpx;
		background: #ebebeb;
		border-radius: 8rpx;
	}

	.form .form-item .icon {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		left: 30rpx;
		top: 26rpx;
	}

	.form .form-item .eye {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		right: 30rpx;
		top: 26rpx;
		z-index: 10;
	}

</style>