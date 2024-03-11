<template>
  <Layout>
    <PicHeader title="视频转绘" />
    <u-gap height="30"></u-gap>
    <VideoInfo
        v-if="generateState === 3"
        :showDownload="true"
        :src="finalUrl" />
    <QmGenerating v-if="generating"></QmGenerating>
    
    <template v-if="generateState === 1">
      <Describe
          title="描述您的视频场景"
          :isShowLanguageBtn="false"
          placeholder="一个女孩，粉色短发，黑色短袖，黑色短裤，霓虹背景"
          :value.sync="prompt"></Describe>
      
      <TemplateImageStyle
          :params="{type: 1, task_type: taskType}"
          componentName="ImgStyleItem"
          :getList="getTemplate"
          :proxyList="item => ({ ...item })"
          :currentInfo.sync="templateInfo"></TemplateImageStyle>
  
<!--
      <TemplateImageStyle
          title="选择舞蹈模板"
          :params="{type: 2, task_type: taskType}"
          :currentInfo.sync="templateExtendInfo"></TemplateImageStyle>-->
  
      <TitleCell
          title="选择舞蹈模板"
          :isShowRight="false" />
      <QmSelectBox
          @showPop="show = true"
          :info="templateExtendInfo" />
      <QmPop
          title="选择舞蹈模板"
          componentName="TemplateItem"
          :paramsInfo="{type: 2, task_type: taskType}"
          :getList="getTemplate"
          :show.sync="show"
          :initStatus="true"
          :currentInfo.sync="templateExtendInfo"
          :proxyList="item => ({ ...item })" />
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
import VideoInfo from './components/VideoInfo.vue';

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
      prompt: '',
      templateInfo: null,
      templateExtendInfo: null,
      
      show: false,
      showPreviewVideo: false,
      previewVideoInfo: null,
      
      toastTips: {
        prompt: {
          txt: '请输入画面描述'
        },
        template_id: {
          txt: '请选择风格'
        },
        template_id_extend: {
          txt: '请选择舞蹈模板'
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
    template_id() {
      return this.templateInfo?.id || ''
    },
    template_id_extend() {
      return this.templateExtendInfo?.id || ''
    },
    disabled() {
      return !(this.prompt && this.template_id && this.template_id_extend)
    },
    params() {
      return {
        task_type: this.taskType,
        prompt: this.prompt || '',
        template_id: this.template_id || '',
        template_id_extend: this.template_id_extend || '',
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.prompt-tips {
  color: var(--txt-color2);
  text-align: center;
  font-size: 24rpx;
  padding: 30rpx 0 20rpx;
  line-height: 1.5;
}
</style>