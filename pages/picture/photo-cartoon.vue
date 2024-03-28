<template>
  <Layout>
    <PicHeader title="漫画人物" />
    <TitleCell title="选择图片" :generateState="generateState" />
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
    
    <template v-if="generateState === 1">
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
      toastTips: {
        reference_image: {
          txt: '请上传图片'
        },
      },
    }
  },
  computed: {
    disabled() {
      return !this.sourceImg
    },
    params() {
      return {
        task_type: 17,
        reference_image: this.sourceImg || '',
      }
    }
  },
}
</script>