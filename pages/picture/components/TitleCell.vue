<template>
  <view class="cell-box">
    <view class="label" v-html="title"></view>
    <view class="rt" v-if="isShowRight">
      <text>从创作历史选择</text>
      <u-icon name="arrow-right" size="24rpx" color="#0B5EFF"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    isShowRight: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-box {
  font-size: 28rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  .label {
    /deep/ em {
      font-style: normal;
      color: red;
      font-weight: bold;
    }
  }
  .rt {
    font-size: 24rpx;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #0B5EFF;
  }
}
</style>