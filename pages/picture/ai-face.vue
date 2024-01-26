<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="智能换脸" />
  
    <TitleCell title="换脸源图片" />
    <UploadImg :generating="generating" :value.sync="sourceImg"></UploadImg>
    
    <template v-if="!generating">
      <TitleCell title="换脸目标图片" />
      <UploadImg :value.sync="targetImg"></UploadImg>
  
      <TipsHelp :info="taskDetail" />
    </template>
  
    <GenerateBtn :disabled="disabled" @cb="handleGenerate"
        :btnInfo="{btnTxt: '开始生成', loadingBtnTxt: '正在生成...', tipTxt: '消耗10'}" />
  </view>
</template>

<script>
import PicMixins from './mixin';
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import UploadImg from './components/UploadImg.vue';
import TipsHelp from './components/TipsHelp.vue';

export default {
  mixins: [PicMixins],
  components: { PicHeader, TitleCell, UploadImg, TipsHelp },
  data() {
    return {
      sourceImg: '',
      targetImg: '',
    }
  },
  computed: {
    disabled() {
      return !(this.sourceImg && this.targetImg)
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 3,
        reference_image: this.sourceImg,
        reference_image_extend: this.targetImg,
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