<template>
    <view class="form">
        <view class="form-input">
            <view class="label">{{ '昵称' | lang }}</view>
            <input type="text" class="input" v-model="nickname" :placeholder="'请输入昵称' | lang" />
        </view>
        <view>
            <button class="btn-submit" @tap="doSubmit">{{ '确 定' | lang }}</button>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            nickname: ''
        };
    },
	onLoad(options) {
		if(options.nickname) {
			this.nickname = options.nickname
		}
	},
	onShow(options) {
		uni.setNavigationBarTitle({
			title: this.$lang('修改昵称')
		})
	},
    methods: {
        doSubmit() {
            var nickname = this.nickname;
            if (!nickname) {
                app.globalData.util.message('请输入昵称');
                return;
            }
			app.globalData.util.request({
				url: '/user/setUserNickname',
				data: {
					nickname: nickname
				}
			}).then(res => {
				app.globalData.util.message(res.message);
				uni.navigateBack()
			})
            
        }
    }
};
</script>
<style>
page {
	
	background-color: #f7f7f8;
}
.form {
    margin: 0;
    box-sizing: border-box;
	background: #fff;
}
.form-input {
    width: 100%;
    padding: 20rpx 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
	margin-top: 30rpx;
}
.form-input .label {
    width: 160rpx;
    font-weight: bold;
    padding-left: 60rpx;
}
.form-input .input {
    width: 400rpx;
    height: 80rpx;
    line-height: 80rpx;
}

.btn-submit {
    position: fixed;
	width: 280rpx;
	height: 80rpx;
    left: 50%;
	transform: translate(-50%,0);
    bottom: 60rpx;
    background: #3c9cff;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.05);
	font-size: 28rpx;
}

.btn-submit text {
    letter-spacing: 1px;
    font-size: 36rpx;
}
.btn-submit::after {
    border: none;
}
.btn-submit:active {
    transform: scale(0.95);
}
</style>
