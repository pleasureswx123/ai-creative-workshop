<template>
  <view>
    <view class="select-box" @tap="show = true">
      <view class="con">{{cardInfo.title}}</view>
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-arrowdown2" color="rgba(255,255,255,.3)" size="40" />
    </view>
    <QmSelectDanceTemplatePopup
        :show.sync="show"
        :selectedInfo.sync="selectedInfo" />
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => (null)
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    selectedInfo: {
      get() {
        return this.value || null
      },
      set(info) {
        this.$emit('update:value', info)
      }
    },
    cardInfo() {
      const {title} = this.selectedInfo || {};
      return {
        title: title || '点击选择'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.select-box {
  background: #323232;
  border-radius: 6rpx;
  margin-bottom: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c1c1c1;
  padding: 0 10rpx 0 30rpx;
  height: 80rpx;
  font-size: 28rpx;
  .con {
    flex: 1;
  }
}
</style>