<template>
  <Layout>
    <PicHeader title="一张照片来跳舞" />
  
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
      <TitleCell
          title="选择舞蹈模板"
          :isShowRight="false" />
      <QmSelectBox
          @showPop="showPop = true"
          :info="currentTemplateInfo" />
      <QmPop
          title="选择舞蹈模板"
          componentName="TemplateItem"
          :paramsInfo="{task_type: 10}"
          :getList="getTemplate"
          :show.sync="showPop"
          :initStatus="true"
          :currentInfo.sync="currentTemplateInfo">
      </QmPop>
      <TipsHelp :info="taskDetail" />
    </template>
    
    <template #footer>
      <GenerateBtn :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
    </template>
  
    <QmPreviewVideo
        :showPreview.sync="showPreviewVideo"
        :info="previewVideoInfo" />
    
  </Layout>
</template>

<script>
import {mapActions} from 'vuex';
import PicMixins from './mixin';
import VideoInfo from './components/VideoInfo.vue'

export default {
  provide() {
    return {
      previewVideo: this.previewVideo
    }
  },
  mixins: [PicMixins],
  components: { VideoInfo },
  data() {
    return {
      showPreviewVideo: false,
      previewVideoInfo: null,
      showPop: false,
      sourceImg: '',
      currentTemplateInfo: null,
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
    ...mapActions('PictureInfo', ['getTemplate']),
    previewVideo(videoInfo) {
      this.previewVideoInfo = videoInfo;
      this.showPreviewVideo = true;
    },
  },
  computed: {
    templateId() {
      return this.currentTemplateInfo?.id || ''
    },
    disabled() {
      return !(this.sourceImg && this.templateId)
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 10,
        template_id: this.templateId || '',
        reference_image: this.sourceImg || ''
      }
    }
  },
}
</script>