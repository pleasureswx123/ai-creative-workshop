<template>
  <view @tap="$emit('toDetails')">
    <ItemHd :info="info" :disabled="disabled" @cb="$emit('cb')"></ItemHd>
    <slot></slot>
    <ItemFt :info="info"></ItemFt>
  </view>
</template>

<script>
import ItemHd from './Hd.vue';
import ItemFt from './Ft.vue';

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
  components: { ItemHd, ItemFt },
}
</script>

<style lang="scss" scoped>
</style>