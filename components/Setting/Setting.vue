<template>
  <view class="setting-box">
    <view class="btn-box" @tap="status = !status">
      <view class="checkbox-box">
        <uni-icons v-if="status" custom-prefix="iconfont-qm" type="icon-qm-checked" color="#1971C2" size="20" />
        <uni-icons v-else custom-prefix="iconfont-qm" type="icon-qm-check" color="#494B59" size="20" />
      </view>
      <view class="btn">高级设置</view>
    </view>
    <view class="tips">扩图，整体风格选择，人物细节修复 </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: ''
    },
  },
  computed: {
    status: {
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
.setting-box {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  gap: 20rpx;
  .btn-box {
    padding: 10rpx;
    border-radius: 5px;
    background: #494B59;
    box-sizing: border-box;
    border: 1px solid #1A1B1E;
    display: flex;
    align-items: center;
    gap: 10rpx;
    cursor: pointer;
    .checkbox-box {
      font-size: 0;
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,.9);
      border-radius: 5px;
    }
    .btn {
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 10rpx;
      background: #1971C2;
      padding: 0 20rpx;
    }
  }
  .tips {
    flex: 1;
    min-width: 0;
    font-size: 24rpx;
  }
}
</style>