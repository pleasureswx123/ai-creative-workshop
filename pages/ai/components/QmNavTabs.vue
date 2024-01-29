<template>
  <view class="tabs-container">
    <u-tabs :current="currentValue" :list="list" @change="handleChange"
            lineWidth="60rpx"
            lineHeight="8rpx"
            :activeStyle="{ color: '#303133', fontSize: '28rpx', fontWeight: 'bold' }"
            :inactiveStyle="{ color: '#606266', fontSize: '28rpx' }"
    ></u-tabs>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '', // chat || assistant || digit
    }
  },
  data() {
    return {
      list: [
        {name: '聊天', type: 'chat'},
        {name: '创作助手', type: 'assistant'},
        {name: '数字伴侣', type: 'digit'}
      ]
    }
  },
  mounted() {
    if(!this.value) {
      this.currentValue = 0
    }
  },
  computed: {
    
    currentValue: {
      get() {
        return this.list.findIndex(item => item?.type === this.value) || 0;
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
  background: #f7f7f8;
  border-bottom: 1rpx solid #efefef;
  /deep/ {
    .u-tabs__wrapper__nav__item {
      flex: 1;
      height: 40px!important;
    }
    .u-tabs__wrapper__nav__line {
      bottom: 0;
    }
  }
}
</style>