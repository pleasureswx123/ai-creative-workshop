<template>
  <view class="btn-container">
    <view class="btn-box" :class="{disabled: disabled}" @tap="$u.debounce(handleStart, 500)">
      <text v-if="!loading">立即合成</text>
      <template v-else>
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-hourglass1" color="#fff" size="14" />
        <view class="txt">正在合成...</view>
      </template>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleStart() {
      if (!this.disabled && !this.loading) {
        this.loading = true;
        this.$emit('cb', () => {
          this.loading = false;
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-container {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 140rpx;
  padding-top: 20rpx;
  background: #fff;
  box-shadow: 0 0 6rpx rgba(0,0,0,.1);
}
.btn-box {
  width: 80%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  background: #0030DA;
  color: #fff;
  gap: 4rpx;
  &.disabled {
    background: #EBEBEB;
    color: #A0A0A0;
  }
}
</style>