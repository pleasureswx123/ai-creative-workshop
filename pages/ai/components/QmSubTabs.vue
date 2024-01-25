<template>
  <view class="tabs-container" v-if="list.length">
    <u-tabs :current="currentValue" :list="list" @change="handleChange"
            lineWidth="30rpx"
            lineHeight="8rpx"
            :activeStyle="{ color: '#303133', fontSize: '30rpx', fontWeight: 'bold' }"
            :inactiveStyle="{ color: '#606266', fontSize: '30rpx' }"
    ></u-tabs>
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
  background: #fff;
  border-bottom: 1rpx solid #dadada;
  margin: 0 0 10rpx;
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