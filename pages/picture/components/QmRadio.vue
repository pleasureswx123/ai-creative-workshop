<template>
  <view>
    <radio-group class="group-box" @change="radioChange">
      <label class="label-row" v-for="(item, index) in items" :key="item.value" :class="{active: index === current}">
        <view>
          <radio style="transform:scale(0.7)" :value="item.value" :checked="index === current" />
        </view>
        <view>{{item.name}}</view>
      </label>
    </radio-group>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: -1,
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
      ]
    }
  },
  computed: {
    currentVal() {
      return this.items?.[this.current]?.value || ''
    }
  },
  watch: {
    currentVal(val) {
      val && this.$emit('update:value', val);
    }
  },
  methods: {
    radioChange: function(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i;
          break;
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
  cursor: pointer;
  &.active {
    background: var(--bg-color1);
    color: var(--txt-color1);
  }
}
</style>