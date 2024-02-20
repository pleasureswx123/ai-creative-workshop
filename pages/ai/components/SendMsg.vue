<template>
  <view class="input-container">
    <view class="input-box">
      <textarea
          type="text"
          v-model="message"
          confirm-type="send"
          @confirm="sendConfirm"
          @focus="inputFocus"
          :auto-height="true"
          :placeholder="hint || '输入你的问题'"
          maxlength="3000"
          cursor-spacing="0"></textarea>
      <view class="btn-send" @tap="handleSend">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-send" color="#8e8fa1" size="25" />
      </view>
    </view>
  </view>
</template>

<script>
const app = getApp();
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    isLogin: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ''
    }
  },
  computed: {
    message: {
      get() {
        return this.value || ''
      },
      set(msg) {
        this.$emit('update:value', msg)
      }
    }
  },
  methods: {
    inputFocus() {
      if (!this.isLogin) {
        uni.showModal({
          title: '提示',
          content: '请登录',
          confirmText: '去登录',
          cancelText: '取消',
          success: function (res) {
            if (res.confirm) {
              uni.$u.route({
                url: 'pages/login/index'
              })
            }
          }
        })
      }
    },
    sendConfirm() {
      setTimeout(() => {
        this.handleSend();
      }, 50)
    },
    handleSend() {
      this.$emit('sendText')
    }
  }
}
</script>

<style lang="scss" scoped>
.input-container {
  width: 100vw;
  padding: 40rpx 30rpx;
  border-top: 1px solid #d8d8e2;
  background: #f6f9fc;
  box-sizing: border-box;
  .input-box {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0 0 12rpx rgba(0, 0, 0, 0.1);
    background: #fefefe;
    display: flex;
    gap: 10rpx;
    align-items: center;
    height: 80rpx;
    padding-left: 20rpx;
    textarea {
      flex: 1;
      min-width: 0;
      line-height: 40rpx;
      max-height: 800rpx;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .btn-send {
      width: 100rpx;
      height: 100%;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>