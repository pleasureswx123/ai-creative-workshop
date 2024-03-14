<template>
  <view class="tool-box">
    <view
        class="item"
        v-for="item in tools"
        :key="item.type"
        :ref="item.type"
        :class="{active: actionType === item.type}"
        @tap="handleActions(item)">
      <uni-icons custom-prefix="iconfont-qm" :type="item.iconName" color="#fff" size="20" />
      <view v-if="item.name">{{item.name}}</view>
    </view>
    <view class="item brush-box-wrapper" key="brush">
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-brush7" color="#fff" size="20" />
      <view class="brush-box">
        <view class="brush-inner">
          <u-slider
              v-model="brushSize"
              step="1" min="1" max="100"
              activeColor="var(--red-color1)"
              inactiveColor="var(--txt-color5)"
              block-size="20"
              block-color="var(--txt-color6)" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 10
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tools: [
        {name: '', type: 'undo', iconName: 'icon-qm-undo'},
        {name: '', type: 'reset', iconName: 'icon-qm-sync'},
        {name: '橡皮擦', type: 'eraser', iconName: 'icon-qm-eraser'},
        // {name: '笔刷', type: 'brush', iconName: 'icon-qm-brush7'},
        // {name: '移动图片', type: 'hand', iconName: 'icon-qm-hand2'},
      ]
    }
  },
  computed: {
    brushSize: {
      get() {
        return this.size
      },
      set(size) {
        this.$emit('update:size', size)
      }
    },
    actionType: {
      get() {
        return this.value
      },
      set(action) {
        this.$emit('update:value', action)
      }
    }
  },
  methods: {
    handleActions({type}) {
      this.actionType = type;
      if(type === 'undo') {
        this.$emit('undo')
      }
      if(type === 'reset') {
        this.$emit('reset')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-box {
  border-radius: 10rpx;
  background: #25262B;
  padding: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  .item {
    border-radius: 5px;
    height: 70rpx;
    background: #1A1B1E;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 19rpx;
    gap: 10rpx;
    cursor: pointer;
    &.active {
      background: var(--red-color1);
    }
  }
}
.brush-box-wrapper {
  flex: 1;
  min-width: 0;
  max-width: 600rpx;
  .brush-box {
    flex: 1;
    min-width: 0;
    .brush-inner {
      width: 100%;
      height: 60rpx;
      /deep/ {
        uni-slider {
          margin: 0;
        }
        uni-slider .uni-slider-handle-wrapper {
          height: 10px!important;
        }
      }
    }
  }
}
</style>