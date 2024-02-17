<template>
  <Layout>
    <PicHeader title="现代风格(随机姿态)" />
    <TitleCell title="选择图片" :generateState="generateState" />
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
    
    <template v-if="generateState === 1">
      <TitleCell title="输入您的要求" :isShowRight="false" />
      <QmTextarea :value.sync.trim="describe" placeholder="如：一个性感美丽的女孩，在夜晚都市街道上"></QmTextarea>
      <TipsHelp :info="taskDetail" />
    </template>
    <template #footer>
      <GenerateBtn :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
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
      describe: '',
      toastTips: {
        reference_image: {
          txt: '请上传图片'
        },
        prompt: {
          txt: '请输入描述文字'
        },
      },
    }
  },
  computed: {
    disabled() {
      return !(this.sourceImg && !!((this.describe || '').trim().length))
    },
    params() {
      return {
        task_type: 16,
        reference_image: this.sourceImg || '',
        prompt: (this.describe || '').trim() || ''
      }
    }
  },
}
</script>