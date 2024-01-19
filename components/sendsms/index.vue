<template>
    <view class="modal">
		<view class="mask" @click="doCancel"></view>
		<view class="main">
			<!-- <view class="header">
				<text>图片验证码</text>
				<image class="close" src="/static/images/ic_close.png"></image>
			</view> -->
			<view class="body">
				<view class="title">{{ '输入验证码' | lang }}</view>
				<view class="form-item">
					<input type="text" id="input" maxlength="6" data-name="code" @input="inputChange" class="input" :placeholder="'验证码' | lang" />
					<image class="captcha" :src="captcha" @tap="getCaptcha"></image>
				</view>
			</view>
			<view class="footer">
				<button class="btn btn-cancel" @tap="doCancel">{{ '取消' | lang }}</button>
				<button class="btn btn-submit" @tap="doSubmit">{{ '确定' | lang }}</button>
			</view>
		</view>
    </view>
</template>

<script>
const app = getApp()
export default {
    data() {
        return {
			captcha: '',
			token: '',
			code: ''
        };
    },
    props: {
        type: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
			default: ''
        },
        sitecode: {
            type: String,
			default: ''
        }
    },
    created() {
		this.getCaptcha()
	},
    methods: {
		inputChange(e) {
			let name = e.currentTarget.dataset.name;
			let value = e.detail.value;
			this.setData({
				[name]: value
			});
		},
		getCaptcha() {
			app.globalData.util.request({
				url: '/login/getCaptcha',
				loading: false
			}).then(res => {
				this.captcha = res.data.image
				this.token = res.data.token
				document.getElementById('input').focus()
			})
		},
		doSubmit() {
			if (!this.code) {
				app.globalData.util.message('请输入图片验证码')
				return
			}
			app.globalData.util.request({
				url: '/login/sendSms',
				data: {
					type: this.type,
					phone: this.phone,
					code: this.code,
					token: this.token,
					sitecode: this.sitecode
				}
			}).then(res => {
				app.globalData.util.message(res.message)
				this.$emit('success')
			})
		},
		doCancel() {
			this.$emit('close')
		}
        
    }
};
</script>
<style>
.modal {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
}
.modal .mask {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	background: rgba(0,0,0,0.3);
}
.modal .main {
	width: 630rpx;
	height: 400rpx;
	background-color: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -315rpx;
	margin-top: -180rpx;
	border-radius: 20rpx;
	overflow: hidden;
	z-index: 2;
}

/* .header {
	width: 100%;
	height: 100rpx;
	padding: 0 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	font-size: 32rpx;
	color: #666;
	background: #f8f8f8;
}
.header .close {
	width: 48rpx;
	height: 48rpx;
} */
.title {
	width: 100%;
	font-size: 40rpx;
	text-align: center;
	margin-top: 30rpx;
	color: #999;
}
.body {
	padding: 20rpx 30rpx;
	box-sizing: border-box;
}

.form-item {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 50rpx;
}
.form-item .input {
	width: 220rpx;
	height: 88rpx;
	line-height: 88rpx;
	padding: 0 10rpx;
	border: 1px solid #ddd;
	box-sizing: border-box;
	border-radius: 10rpx;
	text-align: center;
	font-size: 32rpx;
}

.form-item .captcha {
    width: 144px;
    height: 88rpx;
    background: #f8f8f8;
    display: inline-block;
    cursor: pointer;
	border-radius: 10rpx;
	overflow: hidden;
}
.form-item .captcha image {
	height: 72rpx;
}

.footer {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 120rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	box-sizing: border-box;
}

.footer .btn {
	background: #04babe;
	border-radius: 10rpx;
	width: 240rpx;
	height: 72rpx;
	font-size: 36rpx;
	margin: 0 auto;
	letter-spacing: 2rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
}
.footer .btn:active {
	opacity: 0.8;
}

.footer .btn-cancel {
	color: #04babe;
	background: #fff;
	border: 2rpx solid #04babe;
}
</style>
