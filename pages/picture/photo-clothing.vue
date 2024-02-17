<template>
  <Layout>
    <PicHeader title="秒变职业装" />
    <TitleCell title="选择图片" :generateState="generateState" />
    <!--    <ImgInfo :showDownload="true" src="/imgPath/upload/video/48/48_1706329981_92815.png" />-->
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
    
    <template v-if="generateState === 1">
      <TitleCell
          title="选择性别"
          :isShowRight="false" />
      <QmRadio
          :value.sync="sex"
          :options="sexOptions" />
      <TipsHelp :info="taskDetail" />
    </template>
    <template #footer>
      <GenerateBtn
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
      sex: '',
      toastTips: {
        reference_image: {
          txt: '请上传图片'
        },
        sex: {
          txt: '请选择性别'
        },
      },
    }
  },
  computed: {
    sexOptions() {
      return (this.taskDetail?.expand_model?.sex_list || []).map(item => {
        const { val, val_name } = item || {};
        return { label: val_name, value: val}
      })
    },
    disabled() {
      return !(this.sourceImg && this.sex)
    },
    params() {
      return {
        task_type: 12,
        sex: this.sex || '',
        reference_image: this.sourceImg || '',
      }
    }
  },
}
</script>