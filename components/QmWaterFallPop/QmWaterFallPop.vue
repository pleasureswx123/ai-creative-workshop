<template>
  <QmPopup
      :show="show"
      @close="$emit('update:show', false)"
      @confirm="handleConfirm"
      :title="title">
    <template #tips>
      <slot name="tips"></slot>
    </template>
    <view style="height: 100%; margin: 0 -30rpx;">
      <QmWaterfall
          :selectId="selectId"
          :selectStatus="true"
          :getList="getList"
          :paramsInfo="paramsInfo"
          :proxyList="proxyList"
          @select="handleSelect" />
      <u-gap height="300rpx" />
    </view>
  </QmPopup>
</template>

<script>
export default {
  props: {
    componentName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标题'
    },
    show: {
      type: Boolean,
      default: false
    },
    currentInfo: {
      type: Object,
      default: () => (null)
    },
    paramsInfo: {
      type: Object,
      default: () => ({})
    },
    getList: {
      type: Function,
    },
    proxyList: { // 保证必须有id
      type: Function,
    },
  },
  data() {
    return {
      selectedInfo: null
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(status) {
        if(status) {
          if(this.currentInfo) {
            this.selectedInfo = this.currentInfo;
          }
        }
      }
    }
  },
  computed: {
    selectId() {
      return this.selectedInfo?.id || ''
    }
  },
  methods: {
    handleSelect(info) {
      this.selectedInfo = info;
    },
    handleConfirm() {
      this.$emit('update:currentInfo', this.selectedInfo);
      this.$emit('update:show', false);
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/ {
  .u-popup__content {
    background-color: transparent;
  }
}
</style>