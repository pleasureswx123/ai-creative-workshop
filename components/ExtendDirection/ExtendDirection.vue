<template>
  <view class="direction-box">
    <view
        class="item"
        v-for="item in options"
        :key="item.value"
        :class="{active: currentValue.includes(item.value)}"
        @tap="change(item.value)">
      <view class="checkbox-box">
        <uni-icons class="checked" custom-prefix="iconfont-qm" type="icon-qm-checked" color="#fff" size="14" />
        <uni-icons class="unchecked" custom-prefix="iconfont-qm" type="icon-qm-check" color="rgba(255,255,255,.8)" size="14" />
      </view>
      <view class="name">{{item.name}}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
  },
  data() {
    return {
      options: [
        {name: '向左扩展',value: 'left'},
        {name: '向右扩展',value: 'right'},
        {name: '向上扩展',value: 'up'},
        {name: '向下扩展',value: 'down'},
      ]
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
    }
  },
  methods: {
    change(value) {
      const index = this.currentValue.indexOf(value);
      if(~index) {
        const temp = [...this.currentValue];
        temp.splice(index, 1);
        this.currentValue = temp;
      } else {
        this.currentValue = [...this.currentValue, value]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.direction-box {
  display: flex;
  align-items: center;
  padding: 10rpx;
  gap: 10rpx;
  border-radius: 10rpx;
  background: #25262B;
  box-sizing: border-box;
  border: 2rpx solid #373A40;
  margin-bottom: 10rpx;
  .item {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    padding: 10rpx;
    gap: 4rpx;
    border-radius: 10rpx;
    background: #233549;
    font-size: 24rpx;
    cursor: pointer;
    .checked {
      display: none;
    }
    .unchecked {
      display: block;
    }
    &.active {
      background: var(--red-color1);
      .checked {
        display: block;
      }
      .unchecked {
        display: none;
      }
    }
    .checkbox-box {
      font-size: 0;
      line-height: 24rpx;
    }
    .name {
      flex: 1;
      min-width: 0;
      text-align: center;
    }
  }
}
</style>