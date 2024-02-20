<template>
  <u-tabs
      :list="feedsTabs"
      @change="change"
      :activeStyle="{
            color: '#F60652',
            fontWeight: 'bold',
            transform: 'scale(1.05)',
            fontSize:'28rpx'
          }"
      :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)',
            fontSize:'28rpx'
          }" />
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  props: {
    value: {
      type: String,
      required: true,
      default: '100'
    }
  },
  created() {
    this.getFeedsTab();
  },
  computed: {
    ...mapState('HomeInfo', ['feedsTabs']),
  },
  methods: {
    ...mapActions('HomeInfo', ['getFeedsTab']),
    change({id}) {
      this.$emit('update:value', id);
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .u-tabs__wrapper__nav__line {
  background: #F60652 !important;
}
</style>