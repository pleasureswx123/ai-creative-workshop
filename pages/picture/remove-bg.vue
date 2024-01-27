<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="去除背景" />
    
    <TitleCell title="选择图片" />
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
  
    <template v-if="generateState === 1">
      <TipsHelp :info="taskDetail" />
    </template>
  
    <GenerateBtn :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
  </view>
</template>

<script>
import PicMixins from './mixin';

export default {
  mixins: [PicMixins],
  data() {
    return {
      sourceImg: '',
    }
  },
  computed: {
    disabled() {
      return !this.sourceImg
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 4,
        reference_image: this.sourceImg
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 0 30rpx 160rpx;
}
.tips-img {
  margin: 20rpx 0;
  width: 60%;
  aspect-ratio: 4 / 3;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>