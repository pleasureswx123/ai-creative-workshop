<template>
  <view class="textarea-container">
    <u--textarea
        class="qm-textarea"
        :confirmType="null" v-model="current"
        placeholderStyle="color: red;"
        placeholder="描述文字以短句、短语为佳，支持中、英文输入"
        :maxlength="maxlength" height="140"></u--textarea>
    <view class="textarea-tips-box">
      <view class="count-tips">{{current.length}}/{{maxlength}}</view>
      <uni-icons @tap="handlePaste" custom-prefix="iconfont-qm" type="icon-qm-copy5" color="var(--txt-color2)" size="20" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      placeholderStyle: {
        fontSize: '12rpx',
        color: 'red'
      }
    }
  },
  computed: {
    current: {
      get() {
        return this.value || ''
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
  methods: {
    async handlePaste() {
      let pastedText;
      // 根据平台判断，使用不同的方式获取粘贴的内容
      // #ifdef H5
      try {
        pastedText = await navigator.clipboard.readText();
      } catch (error) {
        console.error('无法读取剪贴板内容:', error);
      }
      // #endif
      // #ifdef MP-WEIXIN
      wx.getClipboardData({
        success: res => {
          pastedText = res.data;
        },
      });
      // #endif
      // #ifdef APP-PLUS
      // 在 APP 中处理粘贴操作，使用平台特定的 API
      // 例如，如果是 Android 平台，可以使用 plus.android.invoke() 等方法
      // #endif
      this.current = pastedText.slice(0, this.maxlength);
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea-container {
  position: relative;
  .textarea-tips-box {
    position: absolute;
    right: 5px;
    bottom: 2px;
    display: flex;
    align-items: center;
    gap: 10rpx;
    .count-tips {
      font-size: 12px;
      padding: 1px 4px;
      color: var(--txt-color2)!important;
      background: var(--bg-color1)!important;
    }
  }
}
.qm-textarea {
  background: var(--bg-color2);
  border-color: var(--txt-color3)!important;
  /deep/ {
    .u-textarea__field {
      font-size: 24rpx;
    }
    .uni-textarea-placeholder {
      color: var(--txt-color2)!important;
    }
    .uni-textarea-wrapper {
      color: var(--txt-color1)!important;
    }
    .u-textarea__count {
      color: var(--txt-color2)!important;
      background: var(--bg-color1)!important;
    }
  }
}
</style>