<template>
  <view class="btn-container">
    <view class="btn-box" :class="{disabled: disabled}" @tap="$u.debounce(handleStart, 500)">
      <text v-if="!loading">{{btnInfo.btnTxt}}</text>
      <template v-else>
        <view class="rotate-box">
          <uni-icons class="rotate" custom-prefix="iconfont-qm" type="icon-qm-hourglass1" color="#fff" size="14" />
        </view>
        <view>{{btnInfo.loadingBtnTxt}}</view>
      </template>
      <text class="tips-txt">{{btnInfo.tipTxt}}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    btnInfo: {
      type: Object,
      default: () => ({
        btnTxt: '立即合成',
        loadingBtnTxt: '正在合成...',
        tipTxt: ''
      })
    },
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
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
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
  .tips-txt {
    font-size: 24rpx;
    position: absolute;
    right: 30rpx;
    top: 50%;
    transform: translate3d(0, -50%, 0);
  }
  .rotate-box {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .rotate {
    animation: rotate 3s linear infinite;
  }
}
</style>