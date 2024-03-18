<template>
  <Layout :info="info" @cb="clickRightBtnEvent">
    <view class="video-wrapper" :style="boxStyle">
      <video @loadedmetadata="loadedmetadata" class="video-box" :src="info.video_url" :poster="info.video_cover_img" object-fit="contain"></video>
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
  data() {
    return {
      boxStyle: {}
    }
  },
  methods: {
    loadedmetadata(res) {
      const {width, height} = res.detail || {};
      console.log(res.detail)
      this.boxStyle = {
        'aspect-ratio': `${width} / ${height}`
      }
    },
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
.video-wrapper {
  background-color: var(--txt-color5);
  aspect-ratio: 16 / 9;
  .video-box {
    display: block;
    width: 100%;
    height: 100%;
  }
}
@supports not(aspect-ratio: 16 / 9){
  .video-wrapper {
    height: 300px!important;
  }
}
</style>