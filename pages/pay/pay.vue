<template>
	<view class="wrap">
		<!-- <view class="mod-title">
			<image src="/static/images/ic_wxpay.png"></image>
			<text>{{ '微信支付' | lang }}</text>
		</view> -->

		<view class="wave1">
			<image src="/static/images/wave.png"></image>
		</view>
		<view class="mod-ct">
			<view class="amount">
				<text class="unit">{{ '￥' | lang }}</text>
				<text>{{ total_fee }}</text>
			</view>
			<view class="qr-image">
				<vue-qr v-if="pay_url" :text="pay_url" :size="200" style="width: 400rpx; height: 400rpx;" />
			</view>
			<view class="tips">
				<view class="ic_scan">
					<image src="/static/images/ic_wxpay.png"></image>
				</view>
				<view class="text">
					<view>{{ '请使用微信扫一扫' | lang }}</view>
					<view>{{ '扫描二维码完成支付' | lang }}</view>
				</view>
			</view>
		</view>
		<view class="wave">
			<image src="/static/images/wave.png"></image>
		</view>
		<canvas canvas-id="qrcode1" style="width: 400rpx; height: 400rpx;" />
	</view>

</template>

<script>
	// import vueQr from 'vue-qr'
	const app = getApp();
	export default {
		components: {
			vueQr
		},
		data() {
			return {
				checkPaySi: 0,
				pay_url: '',
				total_fee: 0,
				order_id: 0
			};
		},
		onLoad: function(options) {
			if (!options.pay_url || !options.order_id || !options.total_fee) {
				app.globalData.util.message('参数错误', 'error', function() {
					uni.navigateBack();
				})
				return;
			}
			this.setData({
				total_fee: options.total_fee / 100,
				pay_url: decodeURIComponent(options.pay_url),
				order_id: options.order_id
			})

			setTimeout(() => {
				this.checkPaySi = setInterval(() => {
					this.checkPay()
				}, 3000)
			}, 5000)
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$lang('收银台')
			})
		},
		onUnload() {
			if (this.checkPaySi) {
				clearInterval(this.checkPaySi);
			}
		},
		methods: {
			checkPay() {
				app.globalData.util.request({
					url: '/order/checkPay',
					data: {
						order_id: this.order_id
					},
					loading: false
				}).then(res => {
					if (res.data.ispay) {
						clearInterval(this.checkPaySi);
						this.checkPaySi = 0;
						app.globalData.util.message('支付成功', 'error', function() {
							uni.reLaunch({
								url: '/pages/user/index'
							});
						})
					}
				}).catch(res => {
					if (res.errno === 403) {
						clearInterval(this.checkPaySi);
						this.checkPaySi = 0;
					}
				})
			}
		}
	};
</script>
<style>
	page {
		margin: 0;
		padding: 0;
		background: #f7f7f8;
		font-family: '微软雅黑';
		padding-bottom: 30rpx;
		text-align: center;
	}

	.mod-title {
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mod-title image {
		width: 64rpx;
		height: 64rpx;
		margin-right: 16rpx
	}

	.mod-title text {
		font-size: 40rpx;
		color: #333;
		font-weight: normal;
		vertical-align: middle
	}

	.mod-ct {
		width: 750rpx;
		margin: 0 auto;
		text-align: center;
		color: #333;
		background: #fff;
	}

	.mod-ct .amount {
		font-size: 88rpx;
		padding-top: 60rpx;
	}

	.mod-ct .amount .unit {
		font-size: 64rpx;
	}

	.mod-ct .qr-image {
		width: 400rpx;
		height: 400rpx;
		background: #f7f7f8;
		overflow: hidden;
		margin: 60rpx auto 0 auto;
		border-radius: 20rpx;
	}

	.mod-ct .qr-image image {
		width: 400rpx;
		height: 400rpx;
	}

	.mod-ct .tips {
		margin-top: 40px;
		border-top: 1px dashed #e5e5e5;
		padding: 30px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mod-ct .tips .ic_scan {
		width: 110rpx;
		height: 110rpx;
	}

	.mod-ct .tips .ic_scan image {
		width: 100%;
		height: 100%;
	}

	.mod-ct .tips .text {
		text-align: left;
		font-size: 32rpx;
		line-height: 56rpx;
		color: #666;
		margin-left: 30rpx;
	}

	.wave1 {
		width: 100%;
		height: 38rpx;
		position: relative;
		top: 4rpx;
		margin-top: 30rpx;
	}

	.wave1 image {
		width: 100%;
		height: 30rpx;
	}

	.wave {
		width: 100%;
		height: 38rpx;
		position: relative;
		top: -4rpx;
	}

	.wave image {
		width: 100%;
		height: 30rpx;
		transform: rotate(180deg);
	}
</style>