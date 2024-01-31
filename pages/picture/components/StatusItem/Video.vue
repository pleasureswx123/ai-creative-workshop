<template>
  <Layout :info="info" @cb="clickRightBtnEvent" @toDetails="toDetails">
    <view class="content-container">
      <view class="pictrue-box">
        <image class="video-box" :src="info.video_cover_img" mode="aspectFit"></image>
        <!--      <video class="video-box" object-fit="contain"
                     :src="info.video_url" :poster="info.video_cover_img" />-->
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
  },
  components: { Layout },
  methods: {
    clickRightBtnEvent() {
      this.toDetails();
    },
    toDetails() {
      const {class_type, task_id} = this.info || {};
      this.$emit('toDetails', {
        class_type, task_id
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  padding: 0 30rpx;
}
.pictrue-box {
  background-color: var(--txt-color5);
  aspect-ratio: 16 / 9;
  .video-box {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>