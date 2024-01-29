<template>
  <view class="slider-container">
    <view>{{tipsInfo.label}}</view>
    <view class="slider-box">
      <u-slider
          v-model="currentValue"
          step="20" min="0" max="100"
          activeColor="var(--txt-color1)"
          inactiveColor="var(--txt-color5)"
          block-size="16"
          block-color="var(--txt-color6)"></u-slider>
    </view>
    <view class="tips">{{tipsInfo.tips}}</view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 2
    },
    type: {
      type: String,
      default: '' // volume || speed
    },
    labelTxt: {
      type: String,
      default: '标题'
    }
  },
  
  computed: {
    currentValue: {
      get() {
        return this.value * (100 / 5)
      },
      set(val) {
        this.$emit('update:value', val / (100 / 5))
      }
    },
    tipsInfo() {
      const res = {
        volume: {
          txt: '音量',
          tips: ['', '低', '略低', '正常', '略高', '高']
        },
        speed: {
          txt: '语速',
          tips: ['', '很慢', '稍慢', '正常', '稍快', '快']
        },
      }
      const {txt, tips} = res?.[this.type] || {};
      return {
        label: txt || this.labelTxt,
        tips: tips?.[this.value] || ''
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-container {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: var(--txt-color1);
  margin: 20rpx 0;
  .slider-box {
    flex: 1;
    min-width: 0;
  }
  .tips {
    color: #BABABA;
  }
}
</style>