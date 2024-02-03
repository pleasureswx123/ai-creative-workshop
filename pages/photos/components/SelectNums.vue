<template>
  <view>
    <view class="select-box" @tap="showNumsSheet = true">
      <text>{{value}} 张</text>
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-arrowdown1" color="var(--txt-color2)" size="16" />
    </view>
    <u-action-sheet
        description="最多只可选择4张" round="16" class="sheet-box"
        :actions="numsList" title="请选择数量" cancelText="取消"
        :closeOnClickOverlay="true" :closeOnClickAction="true"
        :show="showNumsSheet" @select="selectNums" @close="closeSelectNums" />
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default:  1
    },
  },
  data() {
    return {
      showNumsSheet: false,
      numsList: [
        { name: '1', value: 1, fontSize:'28'},
        { name: '2', value: 2, fontSize:'28'},
        { name: '3', value: 3, fontSize:'28'},
        { name: '4', value: 4, fontSize:'28'},
      ],
    }
  },
  methods: {
    closeSelectNums() {
      this.showNumsSheet = false;
    },
    selectNums({value}) {
      this.$emit('update:value', value);
    },
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  border-radius: 10rpx;
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 20rpx;
  color: #fff;
  background-color: #4a4b59;
  gap: 6rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
}
.sheet-box {
  /deep/ .u-action-sheet__header__icon-wrap {
    display: none!important;
  }
}
</style>