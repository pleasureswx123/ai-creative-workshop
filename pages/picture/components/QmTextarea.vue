<template>
  <u--textarea
      class="qm-textarea"
      :confirmType="null" v-model="current"
      placeholderStyle="color: red;"
      placeholder="描述文字以短句、短语为佳，支持中、英文输入" count
      maxlength="300" height="140"></u--textarea>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      placeholderStyle: {
        fontSize: '12rpx',
        color: 'red'
      }
    }
  },
  computed: {
    current: {
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
.qm-textarea {
  background: #fafbfc;
  border-color: #e3e3e3!important;
  /deep/ {
    .u-textarea__field {
      font-size: 24rpx;
    }
  }
}
</style>