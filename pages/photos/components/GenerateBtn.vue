<template>
  <view class="footer-box">
    <view class="generate-box">
      <SelectNums
          v-if="[1,2].includes(modeId)"
          :value.sync="currentVal" />
      <view class="btn-box" @tap="$emit('cb')">
        <text>开始生成</text>
        <view class="tips-txt">
          <text v-if="[1,2].includes(modeId)">消耗{{value}}万</text>
          <text v-else>消耗4万</text>
        </view>
      </view>
    </view>
    <Statement />
  </view>
</template>

<script>
import SelectNums from './SelectNums.vue';
import Statement from './Statement.vue';

export default {
  props: {
    value: {
      type: Number,
      default:  1
    },
    modeId: {
      type: Number,
      default:  1
    }
  },
  components: { SelectNums, Statement },
  computed: {
    currentVal: {
      get() {
        return this.value
      },
      set(num) {
        this.$emit('update:value', num)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.footer-box {
  padding: 50rpx 40rpx 80rpx;
  color: #202020;
  .generate-box {
    display: flex;
    align-items: center;
    gap: 30rpx;
    .btn-box {
      border-radius: 10rpx;
      height: 80rpx;
      line-height: 80rpx;
      padding: 0 20rpx;
      color: #fff;
      flex: 1;
      min-width: 0;
      background-color: #ff0000;
      font-size: 30rpx;
      font-weight: bold;
      text-align: center;
      position: relative;
      .tips-txt {
        position: absolute;
        right: 30rpx;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        font-size: 24rpx;
        color: rgba(255,255,255,.8);
      }
    }
  }
}
</style>