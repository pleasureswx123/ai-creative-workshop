<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="智能扩图" />
    
    <TitleCell title="选择图片" />
    
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
  
    <template v-if="generateState === 1">
      <TitleCell title="选择扩图方向" :isShowRight="false" />
      <QmRadio :value.sync="direction"></QmRadio>
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
      direction: '',
    }
  },
  computed: {
    disabled() {
      return !(this.sourceImg && this.direction)
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 6,
        reference_image: this.sourceImg,
        upper: this.direction === 'top' ? 1 : 0,
        below: this.direction === 'down' ? 1 : 0,
        left: this.direction === 'left' ? 1 : 0,
        right: this.direction === 'right' ? 1 : 0,
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 0 30rpx 160rpx;
}
</style>