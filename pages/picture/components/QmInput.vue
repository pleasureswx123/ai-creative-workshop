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
  border: 1px dashed var(--txt-color3)!important;
  background: var(--bg-color2)!important;
  /deep/ {
    .u-input__content__field-wrapper__field {
      font-size: 24rpx!important;
    }
    .uni-input-wrapper {
      color: var(--txt-color1)!important;
    }
    .uni-input-placeholder {
      color: var(--txt-color2)!important;
    }
  }
}
</style>