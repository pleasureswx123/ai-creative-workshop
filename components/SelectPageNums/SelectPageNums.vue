<template>
  <view>
    <view class="select-box" @tap="showNumsSheet = true">
      <text>{{nums}} 张</text>
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-arrowdown1" color="var(--txt-color2)" size="16" />
    </view>
    <u-action-sheet
        description="最多只可选择4张" round="16" class="sheet-box"
        :actions="numsList" title="请选择数量" cancelText="取消"
        :closeOnClickOverlay="true" :closeOnClickAction="true"
        :show="showNumsSheet" @select="selectNums" @close="showNumsSheet = false" />
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: 1
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
    selectNums({value}) {
      this.nums = value;
    },
  }
}
</script>

<style lang="scss" scoped>
.select-box {
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 20rpx;
  background: #494B59;
  border-radius: 10rpx;
  gap: 6rpx;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.sheet-box {
  /deep/ .u-action-sheet__header__icon-wrap {
    display: none!important;
  }
}
</style>