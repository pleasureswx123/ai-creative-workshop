<template>
  <Layout>
    <PicHeader title="智能换脸" />
    <TitleCell title="换脸源图片" :generateState="generateState" />
    <!--    <ImgInfo :showDownload="true" src="/imgPath/upload/video/48/48_1706329981_92815.png" />-->
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
  
    <template v-if="generateState === 1">
      <TitleCell title="换脸目标图片" name="targetImg" />
      <UploadImg :value.sync="targetImg"></UploadImg>
      <TipsHelp :info="taskDetail" />
    </template>
    <template #footer>
      <AuiGenerateBtn
          :errorTips="toastTipsErrorTxt"
          :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
    </template>
  </Layout>
</template>

<script>
import PicMixins from './mixin';

export default {
  mixins: [PicMixins],
  data() {
    return {
      sourceImg: '',
      targetImg: '',
      toastTips: {
        reference_image: {
          txt: '换脸源图片不能为空'
        },
        reference_image_extend: {
          txt: '换脸目标图片不能为空'
        },
      },
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
        reference_image: this.sourceImg || '',
        reference_image_extend: this.targetImg || '',
      }
    }
  },
}
</script>