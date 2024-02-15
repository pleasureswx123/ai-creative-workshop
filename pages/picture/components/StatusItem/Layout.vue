<template>
  <view @tap="$emit('toDetails')">
    <ItemHd :info="info" :disabled="disabled" @cb="$emit('cb')"></ItemHd>
    <slot></slot>
    <QmTaskInfo :info="info"></QmTaskInfo>
  </view>
</template>

<script>
import ItemHd from './Hd.vue';

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  components: { ItemHd },
}
</script>

<style lang="scss" scoped>
</style>