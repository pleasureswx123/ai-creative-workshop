<template>
  <view class="slider-container">
    <view>{{tipsInfo.label}}</view>
    <view class="slider-box">
      <u-slider
          v-model="currentValue"
          :step="step" :min="min" :max="max"
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
    },
	min:{
		type: Number,
		default: 0
	},
	max:{
		type: Number,
		default: 0
	},
	step:{
		type: Number,
		default: 0
	},
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
          tips: ['0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9','1', '1.1','1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9','2']
        },
        speed: {
          txt: '语速',
          tips: ['0.5', '0.8', '1', '1.25', '1.5','2']
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
  font-size: 26rpx;
  color: var(--txt-color1);
  margin:0 0 0;
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
      margin-right: 10px;
    }
    uni-slider .uni-slider-handle-wrapper {
      height: 3px!important;
    }
  }
}
</style>