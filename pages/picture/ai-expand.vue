<template>
  <Layout>
    <PicHeader title="智能扩图" />
    <TitleCell title="选择图片" :generateState="generateState" />
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
  
    <template v-if="generateState === 1">
      <TitleCell title="选择扩图方向" :isShowRight="false" />
      <QmCheckbox :value.sync="directions"></QmCheckbox>
      <!--      <QmRadio :value.sync="direction"></QmRadio>-->
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
      directions: [],
      direction: '',
    }
  },
  methods: {
    toastTipsErrorTxt() {
      let result = '';
      try {
        if(!this.params.reference_image) {
          result = '请上传图片'
        } else {
          const {upper, below, left, right} = this.params;
          const val = upper || below || left || right;
          if(!val) {
            result = '请选择扩图方向'
          }
        }
      } catch (e) {
        console.log(e)
      }
      return result;
    },
  },
  computed: {
    disabled() {
      return !(this.sourceImg && !!this.directions.length)
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 6,
        reference_image: this.sourceImg || '',
        upper: this.directions.includes('top') ? 1 : 0,
        below: this.directions.includes('down') ? 1 : 0,
        left: this.directions.includes('left') ? 1 : 0,
        right: this.directions.includes('right') ? 1 : 0,
      }
    }
  },
}
</script>