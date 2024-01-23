<template>
  <view class="pictrue-box">
    <u-swiper
        height="300"
        :current="current"
        :list="list"
        :autoplay="false"
        @change="change"
    >
      <template v-if="isShowIndicator">
        <view slot="indicator" class="indicator">
          <view class="indicator__dot" v-for="(item, index) in list" :key="index"
                :class="[index === current && 'indicator__dot--active']">
          </view>
        </view>
      </template>
    </u-swiper>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
      ])
    }
  },
  data() {
    return {
      current: 0
    }
  },
  computed: {
    isShowIndicator() {
      return this.list.length > 1
    }
  },
  methods: {
    change({current}) {
      this.current = current || 0;
      this.$emit('change', this.current);
    }
  }
}
</script>

<style lang="scss" scoped>
.pictrue-box {
  background-color: #E0D4C9;
}

.indicator {
  @include flex(row);
  justify-content: center;
  
  &__dot {
    height: 6px;
    width: 6px;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.35);
    margin: 0 5px;
    transition: background-color 0.3s;
    
    &--active {
      background-color: #ffffff;
    }
  }
}

.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;
  
  &__text {
    color: #FFFFFF;
    font-size: 12px;
  }
}
</style>