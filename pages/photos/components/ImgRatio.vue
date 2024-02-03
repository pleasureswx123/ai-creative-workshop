<template>
  <BoxLayout title="出图比例">
    <view class="ratio-box">
      <view class="items-box" :class="{active: currentVal === item.id}" v-for="item in ratios" :key="item.id" @tap="change(item)">
        <view class="items-con">
          <view class="ratio-val" :style="{'aspect-ratio': getRatio(item.scale)}">{{item.scale}}</view>
        </view>
        <view class="title">{{item.title}}</view>
      </view>
    </view>
  </BoxLayout>
</template>

<script>
import BoxLayout from "./BoxLayout.vue";
export default {
  props: {
    value: {
      type: [String, Number],
      default: 5
    },
    ratios: {
      type: Array,
      default: () => ([
        // {"id": 5, "title": "头像", "scale": "1:1", "width": "512", "height": "512"}
      ])
    }
  },
  computed: {
    currentVal: {
      get() {
        return this.value || 5
      },
      set(id) {
        this.$emit('update:value', id)
      }
    }
  },
  components: {BoxLayout},
  methods: {
    change({id}) {
      this.currentVal = id;
    },
    getRatio(scale) {
      const [w, h] = scale.split(':');
      return `${w} / ${h}`
    }
  },
}
</script>

<style lang="scss" scoped>
.ratio-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
  .items-box {
    background-color: #23242C;
    min-width: 0;
    padding: 20rpx;
    border: 2rpx solid #23242C;
    &.active {
      border-color: #ff0000;
    }
    .items-con {
      aspect-ratio: 16 / 16;
      position: relative;
      //overflow: hidden;
      margin-bottom: 15rpx;
      //background: rgba(0,0,0,.5);
      .ratio-val {
        width: 55%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        background-color: #575A69;
        font-size: 20rpx;
        color: #fff;
        display: grid;
        place-items: center;
      }
    }
    .title {
      color: #fff;
      font-size: 28rpx;
      text-align: center;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>