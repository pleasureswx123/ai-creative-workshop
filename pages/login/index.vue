<template>
	<view class="page-container">
    <view class="tabs-box">
      <view
          class="item"
          v-for="item in tabs"
          :class="{active: loginStatus === item.value}"
          @tap="loginStatus = item.value"
          :key="item.value">{{item.name}}</view>
    </view>
		<view class="container">
			<view class="form">
          <view class="form-item">
            <image class="icon" src="/static/images/login/ic_phone.png" />
            <input type="text" v-model.trim="phone" maxlength="11" class="input" placeholder="手机号" />
          </view>
          <template v-if="loginStatus === 'sms'">
            <view class="form-item">
              <image class="icon" src="/static/images/login/ic_code.png"></image>
              <input type="text" v-model.trim="code" maxlength="6" class="input" placeholder="短信验证码" />
              <view type="text" class="sendcode" size="small" @click="doSendSms" :disabled="sendSmsCountdown > 0">{{ sendSmsCountdown > 0 ? `${sendSmsCountdown}s 后可重发` : '发送验证码' }}</view>
            </view>
          </template>
          <template v-if="loginStatus === 'psw'">
            <view class="form-item">
              <image class="icon" src="/static/images/login/ic_pwd.png" />
              <input :type="`${pwdShow ? 'text' : 'password'}`" v-model.trim="password" maxlength="20" class="input" placeholder="登录密码" :value="password" />
              <image class="eye" @tap="pwdShow = !pwdShow" :src="`/static/images/login/${pwdShow ? 'ic_eye' : 'ic_eye_open'}.png`" />
            </view>
          </template>
          <view class="form-item">
            <button class="btn btn-submit" @tap="doLogin">{{ '登录 / 注册' | lang }}</button>
          </view>
				<view class="form-item" style="justify-content: space-between; color: #555555; font-size: 28rpx;">
					<text @tap="jumpUrl('/pages/login/reg')">{{ '注册账号' | lang }}</text>
					<text @tap="jumpUrl('/pages/login/reset')">{{ '忘记密码' | lang }}</text>
				</view>
			</view>
		</view>
		
		<view class="page-ft">
      登录即表示同意<text @tap="jumpUrl('/pages/service/article?type=service')">《服务协议》</text>和<text @tap="jumpUrl('/pages/service/article?type=privacy')">《隐私政策》</text>
		</view>
    <sendsms
        v-if="sendSmsShow"
        :phone="phone"
        type="login"
        sitecode=""
        @success="sendSmsSuccess"
        @close="sendSmsShow = false">
    </sendsms>
	</view>
</template>

<script>
import {mapActions} from 'vuex';
import sendsms from '@/components/sendsms/index';

export default {
  components: {
    sendsms
  },
  data() {
    return {
      loginStatus: 'sms', // sms || psw
      pwdShow: false,
      phone: '',
      password: '',
      code: '',
      sendSmsCountdown: 0,
      sendSmsShow: false,
      tabs: [
        {name: '短信登录', value: 'sms'},
        {name: '密码登录', value: 'psw'},
      ]
    }
  },
  methods: {
    ...mapActions('UserInfo', ['login', 'phonelogin']),
    doSendSms() {
      const phone = this.phone
      if (!phone || (phone.length !== 11)) {
        this.msg('请输入正确的手机号');
        return
      }
      this.sendSmsShow = true
    },
    sendSmsSuccess() {
      this.sendSmsShow = false;
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
    jumpUrl(url) {
      uni.navigateTo({url})
    },
    msg(con, type = 'none') {
      uni.showToast({
        title: con,
        icon: type,
        duration: 2000,
        mask: false,
        complete: function () {
        }
      });
    },
    doLogin() {
      debugger
      if(!this.phone) {
        this.msg('请输入手机号');
        return
      }
      if (!/^1\d{10}$/.test(this.phone)) {
        this.msg('请输入正确的手机号');
        return
      }
      if (this.loginStatus === 'sms') {
        const params = {
          phone: this.phone,
          code: this.code
        }
        if (!params.code) {
          this.msg('请输入短信验证码');
          return
        }
        this.phonelogin(params).then((res) => {
          this.msg(res.message, 'success');
          uni.reLaunch({
            url: '/pages/index/index'
          })
        })
      }
      if (this.loginStatus === 'psw') {
        const params = {
          phone: this.phone,
          password: this.password
        }
        if (!params.password) {
          this.msg('请输入登录密码');
          return
        }
        this.login(params).then((res) => {
          this.msg(res.message, 'success');
          uni.reLaunch({
            url: '/pages/index/index'
          })
        })
      }
    },
  }
};
</script>
<style scoped lang="scss">
.page-container {
  background: #0D0D0D;
  padding: 140rpx 100rpx 40rpx;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  .tabs-box {
    display: flex;
    align-items: center;
    gap: 60rpx;
    margin: 0 60rpx 40rpx;
    .item {
      flex: 1;
      min-width: 0;
      text-align: center;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 30rpx;
      font-weight: 500;
      color: rgba(255,255,255,.5);
      letter-spacing: 4rpx;
      transition: transform 300ms ease-in-out;
      &.active {
        color: #fff;
        transform: scale(1.2);
      }
    }
  }
  .container {
    height: 400px;
    position: relative;
    transition: left 0.15s ease-in-out;
    width: 100%;
  }
  .page-ft {
    width: 100%;
    font-size: 28rpx;
    color: #999;
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    cursor: pointer;
    padding: 20rpx 0 50rpx;
  }
}

.form {
  .form-item {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 40rpx;
    .input {
      width: 100%;
      border: none;
      height: 88rpx;
      line-height: 88rpx;
      padding: 0 88rpx;
      background: #ebebeb;
      border-radius: 8rpx;
      margin: 0;
    }
    .eye {
      width: 36rpx;
      height: 36rpx;
      position: absolute;
      right: 30rpx;
      top: 26rpx;
      z-index: 10;
    }
    .icon {
      width: 36rpx;
      height: 36rpx;
      position: absolute;
      left: 30rpx;
      top: 26rpx;
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
      &:active {
        opacity: 0.8;
      }
      &.btn-submit {
        height: 88rpx;
        margin-top: 40rpx;
        font-size: 32rpx;
      }
    }
    text{
      font-size: 32rpx;
    }
    .sendcode {
      position: absolute;
      right: 24rpx;
      top: 18rpx;
      font-size: 24rpx;
      color: #889aa4;
      user-select: none;
      background: #fff;
      padding: 10rpx 20rpx;
      border-radius: 10rpx;
      &:active {
        background: #f8f8f8;
      }
    }
  }
}
</style>