<template>
  <u-cell-group class="u-cell-group" v-if="photosTastNumber > 0">
    <u-cell
        :titleStyle="{'color':'#fff'}"
        :rightIconStyle="{'color':'#fff'}"
        :border="false"
        value="去创建历史查看"
        :title="photosTastNumber+'个任务进行中...'" isLink url="/pages/picture/index"></u-cell>
  </u-cell-group>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.u-cell-group{
  background: #434343;
}
</style>