<template>
  <Layout :info="info" @cb="clickRightBtnEvent" @toDetails="toDetails">
    <view class="pictrue-box">
      <image class="video-box" :src="info.video_cover_img" mode="aspectFit"></image>
      <!--      <video class="video-box" object-fit="contain"
                   :src="info.video_url" :poster="info.video_cover_img" />-->
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