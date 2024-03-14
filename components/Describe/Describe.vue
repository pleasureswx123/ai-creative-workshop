<template>
  <view class="describe-box">
    <view class="describe-hd">
      <view class="title">{{title}}</view>
<!--      <view v-if="isShowLanguageBtn" class="btn">中英文转换</view>-->
    </view>
    <view class="textarea-container">
      <u--textarea
          class="qm-textarea"
          :confirmType="null" v-model="content"
          placeholderStyle="color: red;"
          :placeholder="placeholder" :autoHeight="true"
          :maxlength="maxlength"></u--textarea>
      <view class="textarea-tips-box">
        <view class="count-tips">{{content.length}}/{{maxlength}}</view>
        <uni-icons @tap="content = ''" custom-prefix="iconfont-qm" type="icon-qm-del" color="var(--txt-color2)" size="20" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '画面描述词'
    },
    isShowLanguageBtn: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 1000
    },
    placeholder: {
      type: String,
      default: '描述文字以短句、短语为佳，支持中、英文输入'
    },
  },
  computed: {
    content: {
      get() {
        return this.value || ''
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.describe-box {
  background: #25262B;
  box-sizing: border-box;
  border: 2rpx solid #373A40;
  padding: 0 30rpx 30rpx;
  border-radius: 10rpx;
  margin-bottom: 30rpx;
  color: #fff;
  font-size: 28rpx;
  .describe-hd {
    display: flex;
    align-items: center;
    height: 80rpx;
    .title {
      flex: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn {
      font-size: 24rpx;
      line-height: 1;
      border-radius: 16rpx;
      background: var(--red-color1);
      padding: 6rpx 15rpx;
      cursor: pointer;
    }
  }
}
.textarea-container {
  position: relative;
  .textarea-tips-box {
    position: absolute;
    right: 10rpx;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 10rpx;
    .count-tips {
      font-size: 24rpx;
      padding: 2rpx 8rpx;
      color: var(--txt-color2)!important;
      background: var(--bg-color1)!important;
    }
    .iconfont-qm {
      cursor: pointer;
    }
  }
}
.qm-textarea {
  min-height: 140rpx;
  background: var(--bg-color2);
  border-color: var(--txt-color3)!important;
  /deep/ {
    .uni-textarea-textarea, .uni-textarea-placeholder {
      font-size: 24rpx!important;
    }
    .u-textarea__field {
      font-size: 24rpx;
    }
    .uni-textarea-placeholder {
      color: var(--txt-color2)!important;
    }
    .uni-textarea-wrapper {
      min-height: 100%!important;
      color: var(--txt-color1)!important;
    }
    .u-textarea__count {
      color: var(--txt-color2)!important;
      background: var(--bg-color1)!important;
    }
  }
}
</style>