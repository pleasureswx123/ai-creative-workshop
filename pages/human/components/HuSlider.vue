<template>
  <view class="slider-container">
    <view>{{tipsInfo.label}}</view>
    <view class="slider-box">
      <u-slider
          v-model="currentValue"
          step="1" min="0" max="4"
          activeColor="var(--red-color1)"
          inactiveColor="var(--txt-color5)"
          block-size="20"
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
      default: 0
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
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    },
    tipsInfo() {
      const res = {
        volume: {
          txt: '音量',
          tips: ['低', '略低', '正常', '略高', '高']
        },
        speed: {
          txt: '语速',
          tips: ['很慢', '稍慢', '正常', '稍快', '快']
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
  width: 90%;
  color: var(--txt-color1);
  margin: 0 auto;
  .slider-box {
    flex: 1;
    min-width: 0;
  }
  .tips {
    width: 60rpx;
    color: #BABABA;
    text-align: right;
  }
  /deep/ {
    uni-slider {
      margin: 10rpx 20rpx 10rpx;
    }
    uni-slider .uni-slider-handle-wrapper {
      height: 3px!important;
    }
  }
}
</style>