<template>
  <view class="tabs-container" v-if="list.length">
<!--    <view class="tabs-box">
      <u-tabs :current="currentValue" :list="list" @change="handleChange"
              lineWidth="30rpx"
              lineHeight="8rpx"
              :activeStyle="{ color: '#303133', fontSize: '28rpx', fontWeight: 'bold' }"
              :inactiveStyle="{ color: '#606266', fontSize: '28rpx' }"
      ></u-tabs>
    </view>-->
    <scroll-view class="tabs-inner-box" scroll-x="true">
      <view
          v-for="(item, index) in list"
          :key="item.type"
          :data-id="item.type"
          class="item" :class="{active: currentValue === index}"
          @tap="currentValue = index"
      >
        <text>{{item.name}}</text>
        <view class="flag" :class="{show: ['cjyy3'].includes(item.type)}">免算力</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
  mounted() {
  },
  computed: {
    currentValue: {
      get() {
        if(this.value) {
          return this.list.findIndex(item => item.type === this.value)
        } else {
          this.currentValue = 0;
          return 0
        }
      },
      set(sn) {
        const type = this.list?.[sn]?.type || '';
        type && this.$emit('update:value', type);
      }
    }
  },
  methods: {
    handleChange(item) {
      const {index} = item || {};
      this.currentValue = index;
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-container {
  height: 70rpx;
  overflow: hidden;
  background: #fff;
  border-bottom: 1rpx solid #efefef;
  display: flex;
  align-items: center;
  .tabs-inner-box {
    white-space: nowrap;
    width: 100%;
    .item {
      display: inline-block;
      padding: 0 20px;
      height: 70rpx;
      line-height: 70rpx;
      color: #606266;
      font-size: 24rpx;
      position: relative;
      cursor: pointer;
      &.active {
        font-size: 28rpx;
        color: #303133;
        font-weight: bold;
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
  .tabs-box {
    width: 100%;
  }
  /deep/ {
    .u-tabs__wrapper__nav__item {
      height: 35px!important;
    }
    .u-tabs__wrapper__nav__line {
      bottom: 0;
    }
  }
}
</style>