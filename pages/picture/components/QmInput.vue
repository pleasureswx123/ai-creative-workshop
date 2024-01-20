<template>
  <view>
    <u--input
        :clearable="true"
        class="input-el"
        :placeholder="placeholder"
        border="surround"
        v-model="currentVal"
    ></u--input>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  computed: {
    currentVal: {
      get() {
        return this.value || ''
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-el {
  /deep/ {
    .u-input__content__field-wrapper__field {
      font-size: 24rpx!important;
    }
    .uni-input-placeholder {
      //font-size: 24rpx;
    }
  }
}
</style>