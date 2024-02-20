<template>
  <BoxLayout :title="title">
    <view class="desc-box">
      <u--textarea
          class="qm-textarea"
          :confirmType="null" v-model="current"
          placeholderStyle="color: red;"
          :placeholder="placeholder" count
          :maxlength="maxlength" height="300"></u--textarea>
    </view>
  </BoxLayout>
</template>

<script>
import BoxLayout from "./BoxLayout.vue";
export default {
  props: {
    maxlength: {
      type: Number,
      default: 1000
    },
    title: {
      type: String,
      default: '标题'
    },
    placeholder: {
      type: String,
      default: '暂位符'
    },
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
  },
  components: {BoxLayout},
}
</script>

<style lang="scss" scoped>
.qm-textarea {
  color: red;
  background: var(--bg-color2);
  border-color: var(--txt-color3)!important;
  /deep/ {
    .u-textarea__field {
      font-size: 24rpx;
    }
    .uni-textarea-placeholder {
      color: var(--txt-color2)!important;
    }
    .uni-textarea-wrapper {
      color: var(--txt-color1)!important;
    }
    .u-textarea__count {
      color: var(--txt-color2)!important;
      background: var(--bg-color1)!important;
    }
  }
}
</style>