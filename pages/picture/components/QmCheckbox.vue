<template>
  <checkbox-group @change="checkboxChange" class="group-box">
    <label class="label-row" :class="{active: !!item.checked}" v-for="item in items" :key="item.value">
      <view class="check-box">
        <checkbox class="check" :value="item.value" :checked="item.checked" />
        <uni-icons v-if="item.checked" custom-prefix="iconfont-qm" type="icon-qm-checked" color="var(--txt-color1)" size="18" />
        <uni-icons v-else custom-prefix="iconfont-qm" type="icon-qm-check" color="var(--txt-color2)" size="18" />
      </view>
      <view>{{item.name}}</view>
    </label>
  </checkbox-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      items: [
        {
          value: 'left',
          name: '向左'
        },
        {
          value: 'right',
          name: '向右'
        },
        {
          value: 'top',
          name: '向上'
        },
        {
          value: 'down',
          name: '向下'
        },
      ],
    }
  },
  computed: {
    checkboxValue() {
      return this.items.filter(item => !!item.checked).map(item => item.value);
    }
  },
  watch: {
    checkboxValue(val) {
      this.$emit('update:value', val)
    }
  },
  methods: {
    checkboxChange(e) {
      const items = this.items, values = e.detail.value;
      for (let i = 0, lenI = items.length; i < lenI; ++i) {
        const item = items[i]
        if(values.includes(item.value)){
          this.$set(item,'checked',true)
        }else{
          this.$set(item,'checked',false)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.group-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}
.label-row {
  min-width: 0;
  display: flex;
  align-items: center;
  height: 80rpx;
  padding: 0 20rpx;
  border: 1rpx dashed var(--txt-color3);
  background: var(--bg-color2);
  color: var(--txt-color2);
  border-radius: 10rpx;
  font-size: 28rpx;
  gap: 10rpx;
  &.active {
    background: var(--bg-color1);
    color: var(--txt-color1);
  }
}
.check-box {
  position: relative;
  .check {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }
}
</style>