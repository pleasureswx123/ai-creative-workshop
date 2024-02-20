<template>
  <view class="goods-type-box">
    <view
        class="item"
        :class="{active: currentType === item.num}"
        v-for="item in list"
        :key="item.num"
        @tap="currentType = item.num">
      <text>{{item.title}}</text>
      <view class="discount" v-if="item.discount">{{item.discount}}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: [String, Number],
      default: ''
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    currentType: {
      get() {
        return this.type
      },
      set(value) {
        this.$emit('update:type', value);
      }
    }
  },
  watch: {
    list() {
      this.initType();
    }
  },
  methods: {
    initType() {
      const temp = this.list.find(item => item.is_default === '1');
      this.currentType = temp ? temp.num : (this.list?.[0]?.num || '1');
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-type-box {
  padding: 30rpx 40rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30rpx;
  .item {
    text-align: center;
    color: #fff;
    font-size: 28rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 16rpx;
    background: #303138;
    border: 2rpx solid #303138;
    position: relative;
    cursor: pointer;
    &.active {
      border: 2rpx solid #F0BB8B;
      background: rgba(240, 187, 139, 0.1);
      font-size: 28rpx;
      color: #F0BB8B;
    }
    .discount {
      position: absolute;
      right: -14rpx;
      top: -14rpx;
      white-space: nowrap;
      height: 34rpx;
      line-height: 34rpx;
      padding: 0 14rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: #9C511B;
      background: linear-gradient(90deg, #F0BB8B 0%, #E6A23D 100%);
      border-radius: 6rpx;
    }
  }
}
</style>