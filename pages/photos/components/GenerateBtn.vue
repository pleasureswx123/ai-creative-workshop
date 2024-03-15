<template>
  <view class="footer-box">
    <view class="generate-box">
      <SelectNums
          v-if="[1,2].includes(modeId)"
          :value.sync="currentVal" />
      <view class="btn-box" @tap="$emit('cb')">
        <view class="btn-txt">
          <view class="rotate-box" v-if="generateStatus">
            <uni-icons class="rotate" custom-prefix="iconfont-qm" type="icon-qm-hourglass1" color="var(--txt-color4)" size="14" />
          </view>
          <text>开始生成</text>
        </view>
        <view class="tips-txt" v-if="integralTips">
          <text v-if="[1,2].includes(modeId)">消耗{{integralTips}}万</text>
          <text v-else>消耗1万</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import SelectNums from './SelectNums.vue';

export default {
  props: {
    generateStatus: {
      type: Boolean,
      default:  false
    },
    value: {
      type: Number,
      default:  1
    },
    modeId: {
      type: Number,
      default:  1
    }
  },
  components: { SelectNums },
  computed: {
    integralTips() {
      let result = '';
      const temp = this.userIntegral?.['1'] || {};
      const {is_show, consume} = temp;
      console.log(JSON.stringify(temp))
      if(+is_show) {
        const {A_num} = consume || {};
        result = (A_num * this.value) / 10000;
      }
      return result;
    },
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
      padding: 0 20rpx;
      flex: 1;
      min-width: 0;
      background-color: var(--red-color1);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .btn-txt {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rpx;
        text {
          color: #fff;
          font-size: 30rpx;
          font-weight: bold;
        }
      }
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

@media screen and (min-width: 750px) and (max-width: 960px){
  .footer-box {
    width: 50%;
    margin: 0 auto;
  }
}

@media screen and (min-width: 960px) {
  .footer-box {
    width: 50%;
    margin: 0 auto;
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
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rotate {
  animation: rotate 3s linear infinite;
}
</style>