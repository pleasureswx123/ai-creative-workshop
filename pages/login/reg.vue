<template>
	<view class="page">
    <view class="page-content">
		<view class="title">{{ '注册账号' | lang }}</view>

		<view class="container">

			<view class="form">
				<view class="form-item">
					<image class="icon" src="/static/images/login/ic_phone.png"></image>
					<input type="text" @input="inputChange" data-name="phone" maxlength="11" class="input" :placeholder="'手机号' | lang" :value="phone" />
				</view>
				<view class="form-item">
					<image class="icon" src="/static/images/login/ic_code.png"></image>
					<input type="text" @input="inputChange" data-name="code" maxlength="6" class="input" :placeholder="'短信验证码' | lang" />
					<view type="text" class="sendcode" size="small" @click="doSendSms" :disabled="sendSmsCountdown > 0">{{ sendSmsCountdown > 0 ? `${sendSmsCountdown}s ` + $lang('后可重发') : $lang('发送验证码') }}</view>
				</view>
				<view class="form-item">
					<image class="icon" src="/static/images/login/ic_pwd.png"></image>
					<input v-if="pwdShow" type="text" @input="inputChange" maxlength="20" data-name="password"
						class="input" :placeholder="'设置登录密码' | lang" :value="password" />
					<input v-else type="password" @input="inputChange" maxlength="20" data-name="password" class="input" :placeholder="'设置登录密码' | lang" :value="password" />
					<image v-if="pwdShow" class="eye" @tap="hidePwd" src="/static/images/login/ic_eye.png">
					</image>
					<image v-else class="eye" @tap="showPwd" src="/static/images/login/ic_eye_open.png"></image>
				</view>

				<view class="form-item">
					<button class="btn btn-submit" @tap="doReg">{{ '立即注册' | lang }}</button>
				</view>
<!--				<view class="form-item"
					style="justify-content: center; color: #04babe; padding:0 36rpx; font-size: 30rpx;">
					<text @tap="toBack">{{ '返回登录' | lang }}</text>
				</view>-->
			</view>
		</view>

		<view class="agree">
			{{ '注册即表示同意' | lang }}<text @tap="toDoc('service')">{{ '《服务协议》' | lang }}</text>{{ '和' | lang }}<text @tap="toDoc('privacy')">{{ '《隐私政策》' | lang }}</text>
		</view>

		<sendsms v-if="sendSmsShow" :phone="phone" type="reg" :sitecode="sitecode" @success="sendSmsSuccess" @close="sendSmsClose">
		</sendsms>
	  </view>
	</view>
</template>

<script>
	import sendsms from '@/components/sendsms/index';
	const app = getApp();
	export default {
		components: {
			sendsms
		},
		data() {
			return {
				sitecode: '',
				phone: '',
				password: '',
				code: '',
				pwdShow: false,
				sendSmsShow: false,
				sendSmsCountdown: 0
			}
		},
		onLoad(options) {
			let phone = uni.getStorageSync('phone');
			if (phone) {
				this.setData({
					phone: phone
				})
			}
			if (options.url) {
				this.backurl = options.url
			}
			const sitecode = uni.getStorageSync('sitecode')
			this.setData({
				sitecode: sitecode ? sitecode : ''
			})
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$lang('注册')
			})
		},
		methods: {
			switchLoginType(type) {
				this.loginType = type
			},
			doSendSms() {
				const phone = this.phone
				if (!phone || (window.$lang === 'zh-cn' && phone.length !== 11)) {
					app.globalData.util.message('请输入正确的手机号')
					return
				}
				this.sendSmsShow = true
			},
			sendSmsClose() {
				this.sendSmsShow = false
			},
			sendSmsSuccess() {
				this.sendSmsClose()
				this.sendSmsCountdown = 60
				this.doCountdown()
			},
			doCountdown() {
				if (this.sendSmsCountdown > 0) {
					this.sendSmsCountdown -= 1
					setTimeout(() => {
						this.doCountdown()
					}, 1000)
				}
			},
			doReg() {
				const sitecode = this.sitecode
				const phone = this.phone
				const code = this.code
				const password = this.password
				const tuid = uni.getStorageSync('tuid')
				if (!phone) {
					app.globalData.util.message('请输入手机号')
					return
				}
				if (window.$lang === 'zh-cn' && phone.length !== 11) {
					app.globalData.util.message('手机号码格式不正确')
					return
				}
				if (!code) {
					app.globalData.util.message('请输入短信验证码')
					return
				}
				if (!password) {
					app.globalData.util.message('请输入登录密码')
					return
				}
				app.globalData.util.request({
					url: '/Login/reg',
					data: {
						phone: phone,
						password: password,
						code: code,
						sitecode: sitecode,
						tuid: tuid ? tuid : 0
					},
				}).then((res) => {
					app.globalData.util.message(res.message, 'success')
          
          uni.navigateBack({
            fail: function() {
              uni.reLaunch({
                url: '/pages/index/index'
              })
            }
          })
				})
			},
			toBack() {
        uni.navigateTo({
          url: '/pages/login/index'
        })
			},
			toDoc(type) {
				uni.navigateTo({
					url: '/pages/service/article?type=' + type
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
			}
		}
	};
</script>
<style lang="scss" scoped>
	page{
		background: #0d0d0d;
	}
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
		font-size: 56rpx;
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
		height: 100rpx;
		font-size: 32rpx;
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
	}

	.btn-submit {
		height: 88rpx;
		margin-top: 40rpx;
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
		background: #0d0d0d;
		padding: 20rpx 0 50rpx 0;
	}

	.agree text {
		/* color: #000; */
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

	.form .form-item .sendcode {
		position: absolute;
		right: 24rpx;
		top: 18rpx;
		font-size: 24rpx;
		color: #889aa4;
		user-select: none;
		background: #fff;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
	}

	.form .form-item .sendcode:active {
		background: #f8f8f8;
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
	.form .form-item text{
		color: #F60652;
	}
  
  .page-content {
    width: 100%;
  }
  
  @media screen and (min-width: 750px) {
    .page-content {
      width: 500px;
      margin: 0 auto;
    }
  }
</style>