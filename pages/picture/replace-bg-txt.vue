<template>
  <Layout>
    <PicHeader title="更换背景(语义)" />
    <TitleCell title="选择图片" :generateState="generateState" />
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
  
    <template v-if="generateState === 1">
      <TitleCell title="你想要<em>固定</em>的画面元素是？" :isShowRight="false" />
      <QmInput :value.sync="wantTxt" placeholder="例如：红酒瓶"></QmInput>
      <TitleCell title="你想把它的背景换成什么？" :isShowRight="false" />
      <QmInput :value.sync="replaceTxt" placeholder="例如：热带海边沙滩"></QmInput>
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
      wantTxt: '',
      replaceTxt: '',
      toastTips: {
        reference_image: {
          txt: '请上传图片'
        },
        prompt: {
          txt: '请输入你想要的画面元素'
        },
        prompt_extend: {
          txt: '请输入你想把背景换成什么'
        },
      },
    }
  },
  computed: {
    disabled() {
      const txt1 = !!((this.wantTxt || '').trim().length);
      const txt2 = !!((this.replaceTxt || '').trim().length);
      return !(this.sourceImg && txt1 && txt2)
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 9,
        reference_image: this.sourceImg || '',
        prompt: (this.wantTxt || '').trim() || '',
        prompt_extend: (this.replaceTxt || '').trim() || '',
      }
    }
  },
}
</script>