<template>
    <view class="page">
        <view class="bg-user">
            <view class="userinfo">
                <view class="avatar" @tap="toSetting">
                    <image :src="userinfo.avatar || '/static/images/avatar.jpg'"></image>
                </view>
                <view class="info" @tap="toSetting">
                    <view class="nickname">{{ userinfo.nickname || $lang('未设置昵称') }}</view>
                    <view class="mid" style="padding-left: 2rpx">MID: {{ userinfo.user_id }}</view>
                </view>
            </view>
			<view class="btn-setting" @tap="toSetting">
				<!-- <image src="/static/images/user/ic_setting.png"></image> -->
				编辑
			</view>
        </view>
		<view class="wallet" v-if="drawIsOpen">
			<view class="inteNum">
				积分余额
				<text>{{userinfo.balance}}</text>
			</view>
			<view class="inteBtn" @click="blChange">兑换</view>
		</view>
        <view class="menus">
            <view class="item" data-url="/pages/article/list?type=help" @tap="linkto">
                <text class="text-grey">{{ '图片创作' | lang }}</text>
				<view class="arrow">21</view>
            </view>
            <view class="item" data-url="/pages/user/feedback" @tap="linkto">
                <text class="text-grey">{{ '视频创作' | lang }}</text>
				<view class="arrow">5</view>
            </view>
			<view class="item" data-url="/pages/user/integral" @tap="linkto">
			    <text class="text-grey">{{ '积分明细' | lang }}</text>
				<view class="arrow">查看详情</view>
			</view>
            <view class="item">
                <text class="text-grey">{{ '手机号' | lang }}</text>
				<view class="arrow">13252147859</view>
            </view>
        </view>
		<!-- 兑换积分弹窗 -->
		<view class="popup">
			<u-popup :show="integralShow" mode="center" @close="close" @open="open" closeIconPos="top-right">
				<text class="title">兑换积分</text>
				<text class="text">可以使用兑换码来获取平台积分，若您已拥有兑换码，可直接进行兑换。若尚未获得兑换码，可联系我们客服进行购买。</text>
				<u--input
				    placeholder="输入或粘贴兑换码"
				    border="surround"
				    v-model="value"
				    @change="change"
					placeholderStyle="fontSize:14px"
				  ></u--input>
				  <view class="operateBtn">
					  <view class="btn cancel" @click="integralShow = false">取消</view>
					  <view class="btn sure" @click="exchange">确认兑换</view>
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
			isLogin: false,
			userinfo: {
				user_id: 0,
				balance: 0,
				balance_draw: 0
			},
			drawIsOpen: false,
			integralShow:false,
			value: '',
			code:'',
        };
    },
    onShow() {
		uni.setNavigationBarTitle({
			title: this.$lang('个人中心')
		})
		setTimeout(() => {
			let tabbar = app.globalData.tabbar;
			this.setData({
				drawIsOpen: tabbar[3]
			})
		}, 300)
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            app.globalData.util
                .request({
                    url: '/user/info'
                })
                .then((res) => {
                    this.setData({
                        userinfo: res.data,
						isLogin: true,
						// balance:res.data.balance
                    });
                }).catch(res => {
					if(res.errno == 403) {
						app.globalData.util.toLogin('请登录')
					}
				})
        },

        getUserProfile() {
			window.location.href = app.globalData.siteroot + '/h5/getProfile'
            
        },

        getUserPhone(e) {
            if (e.detail.errMsg != 'getPhoneNumber:ok') {
                var message = e.detail.errMsg;
                if (message.indexOf('user deny') !== -1) {
                    message = '已取消授权';
                }
                app.globalData.util.message(message, 'error');
                return;
            }
            app.globalData.util
                .request({
                    url: '/user/setUserPhone',
                    data: {
                        encryptedData: e.detail.encryptedData,
                        iv: e.detail.iv
                    }
                })
                .then((res) => {
                    this.getUserInfo();  
                });
        },

        linkto(e) {
			// console.log(e)
			if (!this.isLogin) {
				app.globalData.util.toLogin('请登录')
				return
			}
            const url = e.currentTarget.dataset.url;
            uni.navigateTo({
                url: url
            });
        },

        toPay(type) {
			if (!this.isLogin) {
				app.globalData.util.toLogin('请登录')
				return
			}
			app.globalData.util.toPay(type)
        },

        toTask() {
			if (!this.isLogin) {
				app.globalData.util.toLogin('请登录')
				return
			}
            uni.navigateTo({
                url: '/pages/task/index'
            });
        },

        toSetting() {
			if (!this.isLogin) {
				app.globalData.util.toLogin('请登录')
				return
			}
            uni.navigateTo({
                url: '/pages/user/setting/index'
            });
        },
		open() {
			this.integralShow = true
		  },
		close() {
			this.integralShow = false
		},
		change(e) {
			this.code = e
		},
		blChange(){
			if (!this.isLogin) {
				app.globalData.util.toLogin('请登录')
				return
			}
			this.integralShow = true
			this.value = '';
		},
		exchange(){
			app.globalData.util.request({
				url: '/user/bindCard',
				data:{
					code:this.code
				}
			})
			.then((res) => {
				app.globalData.util.message(res.message)
				this.integralShow = false
				this.getUserInfo();
			});
		}
    }
};
</script>
<style lang="scss">
page {
    box-sizing: border-box;
    background: #0D0D0D;
}

.page {
    position: relative;
}

.bg-user {
    position: relative;
    width: 100%;
    left: 0;
    top: 0px;
    height: 200rpx;
    box-sizing: content-box;
    z-index: 1;
}

.userinfo {
    display: flex;
    align-items: center;
    padding: 50rpx 0 0 60rpx;
}

.userinfo .avatar {
    width: 108rpx;
    height: 108rpx;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f8f8f8;
}

.userinfo .avatar image {
    width: 100%;
    height: 100%;
}

.userinfo .info {
    display: flex;
    flex-direction: column;
    margin-left: 30rpx;
}

.userinfo .info .nickname {
    font-size: 28rpx;
    font-weight: bold;
    color: #fff;
}

.userinfo .info .mid {
    font-size: 24rpx;
    color: #868686;
    // line-height: 52rpx;
}

.userinfo .info .phone {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 4rpx 8rpx 4rpx 4rpx;
    height: 36rpx;
    border-radius: 6rpx;
    display: flex;
    align-items: center;
}

.userinfo .info .phone image {
    width: 28rpx;
    height: 28rpx;
}

.userinfo .info .phone text {
    font-size: 22rpx;
}

.bg-user .btn-setting {
	position: absolute;
	right: 40rpx;
	top: 70rpx;
	// width: 56rpx;
	// height: 56rpx;
	padding: 10rpx;
	border-radius: 20rpx;
	color: #F60652;
	font-size: 28rpx;
}
.bg-user .btn-setting image {
	width: 100%;
	height: 100%;
}
.bg-user .btn-setting:active {
	background: rgba(0,0,0,0.2);
}

.nologin {
    display: flex;
    align-items: center;
    padding: 20rpx 0 60rpx 30rpx;
}

.nologin .avatar {
    width: 92rpx;
    height: 92rpx;
}

.nologin .avatar image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.nologin .info {
    display: flex;
    flex-direction: column;
    margin-left: 20rpx;
    align-items: center;
}

.nologin .info .nickname {
    font-size: 30rpx;
    font-weight: bold;
    color: #fff;
}

.box-vip {
    width: 690rpx;
    height: 94rpx;
    margin: -86rpx auto 0 auto;
    border-style: none;
    border-width: 0;
    border: none;
    position: relative;
}

.box-vip .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.box-vip .body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    font-size: 24rpx;
    color: #eed196;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.box-vip .body .icon {
    width: 88rpx;
    height: 88rpx;
}

.box-vip .body .line {
    margin: 0 20rpx;
    vertical-align: middle;
    display: inline-block;
    width: 1rpx;
    height: 32rpx;
    background: rgba(238, 209, 150, 0.5);
}

.box-vip .body .btn-vip {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 144rpx;
    height: 40rpx;
    background: linear-gradient(-90deg, #f1ce80, #ffe8b5);
    border-radius: 20rpx;
    font-size: 24rpx;
    padding: 0;
    margin-right: 20rpx;
}

.wallet {
	display: flex;
	justify-content: space-between;
	align-items: center;
	overflow: hidden;
	margin: 30rpx;
	background-color: #1D1E23;
	border-radius:20rpx;
	display: flex;
	display: -webkit-flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
	box-sizing: border-box;
	padding: 30rpx 20rpx 30rpx 50rpx;
	.inteNum{
		font-size: 28rpx;
		color: #B2B2B2;
		text{
			font-weight: 700;
			margin-left: 10rpx;
		}
	}
	.inteBtn{
		background-color: #F60652;
		border-radius: 8rpx;
		padding: 10rpx 40rpx;
		font-size: 24rpx;
		color: #fff;
	}
}

.wallet .item {
    text-align: center;
    line-height: 48rpx;
	color: #666;
	font-size: 28rpx;
    padding: 18rpx 0;
    border-radius: 10rpx;
	background: #fff;
	border-radius: 20rpx;
	width: 334rpx;
	box-sizing: border-box;
}

.wallet .item:active {
    background: #f3f6f9;
}

.wallet .item .num {
	font-size: 40rpx;
	color: #04babe;
	font-weight: bold;
	margin-right: 10rpx;
	letter-spacing: 1px;
}
.wallet .item .unit {
	font-size: 28rpx;
	color: #999;
}
.wallet .item .label {
	color: #666;
	font-size: 28rpx;
	letter-spacing: 1px;
	margin-top: 4rpx;
}

.menus {
    // background: #fff;
    border-radius: 20rpx;
    padding:0 20rpx;
    margin: 30rpx;
}

.menus .item {
    width: 100%;
    padding: 24rpx 20rpx 24rpx 30rpx;
    border-bottom: 1px solid #555555;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #444;
    box-sizing: border-box;
}

.menus .item .value {
    font-size: 32rpx;
    margin-right: 20rpx;
    color: #04BABE;
}

.menus .item .arrow {
	color: #F60652;
}

.menus .item.button {
    background: #fff;
    border: none;
    outline: none;
    margin: 0;
    font-size: 32rpx;
    color: #444;
    line-height: 1em;
}

.menus .item.button::after {
    display: none;
}

.menus .item:active {
    background: #fafafa;
}


.text-grey {
    color: #fff;
}
.popup{
	width: 80%;
	.title{
		font-size: 32rpx;
		text-align: center;
		font-weight: 700;
	}
	.text{
		font-size: 28rpx;
		text-align: center;
		margin: 20rpx 0;
	}
	/deep/.u-popup__content{
		width: 80%;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 80rpx 40rpx;
	}
	/deep/.u-input{
		border: 1px solid #f5f5f5;
		background-color: #f5f5f5;
		margin: 30rpx 0;
	}
	.operateBtn{
		display: flex;
		display: -webkit-flex;
		justify-content: right;
		flex-wrap: wrap;
		align-items: center;
		.btn{
			width: 200rpx;
			height: 50rpx;
			line-height: 50rpx;
			border: 1px solid #F60652;
			border-radius: 8rpx;
			display: inline-block;
			text-align: center;
			font-size: 28rpx;
		}
		.sure{
			margin-left: 20rpx;
			background-color: #F60652;
			color: #fff;
		}
	}
}
</style>
