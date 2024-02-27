<template>
  <view class="produce-box">
    <SelectPageNums :value.sync="nums"></SelectPageNums>
    <view class="btn-box"  @tap="$u.debounce(handleComfirm, 500)">
      <view class="rotate-box" v-if="loading">
        <uni-icons class="rotate" custom-prefix="iconfont-qm" type="icon-qm-hourglass1" color="var(--txt-color4)" size="16" />
      </view>
      <view>立即生成</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    nums: {
      get() {
        return this.value || ''
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
  methods: {
    handleComfirm() {
      this.$emit('cb');
    }
  }
}
</script>

<style lang="scss" scoped>
.produce-box {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 30rpx;
  .btn-box {
    flex: 1;
    min-width: 0;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
    background: var(--red-color1);
    font-size: 30rpx;
    font-weight: bold;
    cursor: pointer;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.rotate-box {
  width: 70rpx;
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .rotate {
    animation: rotate 2s linear infinite;
  }
}
</style>