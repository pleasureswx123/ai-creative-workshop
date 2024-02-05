<template>
  <Layout>
    <PicHeader title="一张照片来跳舞" />
  
    <template v-if="generateState === 1">
      <TitleCell
          title="选择舞蹈模板"
          :isShowRight="false" />
      <QmSelect :value.sync="template_id"></QmSelect>
    </template>
  
    <TitleCell
        :isShowRight="generateState === 1"
        title="上传全身照片" />
    <VideoInfo
        v-if="generateState === 3"
        :showDownload="true"
        :src="finalUrl" />
    <UploadImg
        v-else
        :generating="generating"
        :value.sync="sourceImg" />
  
    <template v-if="generateState === 1">
      <TipsHelp :info="taskDetail" />
    </template>
    
    <template #footer>
      <GenerateBtn :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
    </template>
    
    
  </Layout>
</template>

<script>
import {pictureApi} from '@/api'
import PicMixins from './mixin';
import VideoInfo from './components/VideoInfo.vue'

export default {
  mixins: [PicMixins],
  components: { VideoInfo },
  data() {
    return {
      sourceImg: '',
      template_id: '',
      toastTips: {
        template_id: {
          txt: '请选择模板'
        },
        reference_image: {
          txt: '请上传图片'
        },
      },
    }
  },
  methods: {
    getTemplateList() {
      pictureApi.getTemplateList({page: 1, pageSize: 10, task_type: 10})
    }
  },
  computed: {
    disabled() {
      return !(this.sourceImg && this.template_id)
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 10,
        template_id: this.template_id || '',
        reference_image: this.sourceImg || ''
      }
    }
  },
}
</script>