<template>
  <Layout>
    <PicHeader title="更换背景" />
    <TitleCell title="选择图片" :generateState="generateState" />
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
  
    <template v-if="generateState === 1">
      <TitleCell title="把背景更换为" :isShowRight="false" />
      <QmTextarea :value.sync.trim="describe"></QmTextarea>
      <TipsHelp :info="taskDetail" />
    </template>
    <template #footer>
      <AuiGenerateBtn :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
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
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 5,
        reference_image: this.sourceImg || '',
        prompt: (this.describe || '').trim() || ''
      }
    }
  },
}
</script>