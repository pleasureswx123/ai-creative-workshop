<template>
  <view class="tabs-container" v-if="feedsTabs.length">
    <scroll-view class="tabs-inner-box" scroll-x="true">
      <view
          v-for="item in feedsTabs"
          :key="item.id"
          class="item"
          :class="{active: currentValue === item.id, highlight: item.highlight}"
          @tap="currentValue = item.id"
      >
        <text>{{item.name}}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  props: {
    value: {
      type: String,
      required: true,
      default: '100'
    }
  },
  created() {
    this.getFeedsTab();
  },
  computed: {
    ...mapState('HomeInfo', ['feedsTabs']),
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value);
      }
    }
  },
  methods: {
    ...mapActions('HomeInfo', ['getFeedsTab']),
  }
}
</script>

<style lang="scss" scoped>
.tabs-container {
  padding: 10rpx 0 0;
  /deep/ {
    .u-tabs__wrapper__nav__item {
      height: 35px!important;
    }
    .u-tabs__wrapper__nav__line {
      bottom: 0;
    }
  }
}
.tabs-inner-box {
  white-space: nowrap;
  width: 100%;
  height: 66rpx;
  .item {
    display: inline-block;
    padding: 0 14rpx;
    margin: 0 6rpx;
    height: 50rpx;
    line-height: 50rpx;
    color: #606266;
    font-size: 28rpx;
    position: relative;
    cursor: pointer;
    &.active {
      font-size: 28rpx;
      color: var(--red-color1);
      font-weight: bold;
      transform: scale(1.05);
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: 20%;
        height: 2rpx;
        background: var(--red-color1);
        bottom: 0;
        left: 50%;
        transform: translate3d(-50%, 14rpx, 0);
      }
    }
    &.highlight {
      background: var(--red-color1);
      color: #fff;
      border-radius: 0 30rpx 0 30rpx;
    }
    .flag {
      display: none;
      position: absolute;
      top: 8rpx;
      right: 0;
      background: var(--red-color1);
      font-size: 16rpx;
      line-height: 16rpx;
      padding: 4rpx 8rpx;
      color: #fff;
      border-radius: 20rpx;
      &.show {
        display: block;
      }
    }
  }
}
</style>