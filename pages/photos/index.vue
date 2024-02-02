<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <!--    v-if="photosTastNumber>0"-->
    <TaskTips :num="photosTastNumber"></TaskTips>

    <view>123</view>
  </view>
</template>

<script>
import TaskTips from './components/TaskTips.vue';
export default {
  data() {
    return {
      photosTastNumber: 10,
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
}
</style>