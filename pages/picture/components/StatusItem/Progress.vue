<template>
  <Layout :info="info" :disabled="true">
    <view class="pictrue-box">
      <view class="progress-box">
        <view class="progress-bar">
          <u-line-progress :showText="false" :percentage="percentage" />
        </view>
      </view>
    </view>
  </Layout>
</template>

<script>
import Layout from './Layout.vue';

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    percentage: {
      type: Number,
      default: 50
    }
  },
  components: { Layout },
}
</script>

<style lang="scss" scoped>
.pictrue-box {
  background-color: #FEEDEE;
  .progress-box {
    height: 300rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .progress-bar {
      width: 30%;
    }
  }
}
</style>