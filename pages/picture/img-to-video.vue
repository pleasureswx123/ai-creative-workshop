<template>
  <Layout>
    <PicHeader title="图生视频" />
    
    <TitleCell
        :isShowRight="generateState === 1"
        title="上传照片" />
    <VideoInfo
        v-if="generateState === 3"
        :showDownload="true"
        :src="finalUrl" />
    <UploadImg
        v-else
        :generating="generating"
        :value.sync="sourceImg" />
  
<!--    <template v-if="generateState === 1">
      <TipsHelp :info="taskDetail" />
    </template>-->
    
    <template #footer>
      <AuiGenerateBtn
          :disabled="disabled"
          @cb="handleGenerate"
          :loading="generating"
          :btnInfo="btnInfo" />
    </template>
  </Layout>
</template>

<script>
import PicMixins from './mixin';
import VideoInfo from './components/VideoInfo.vue'

export default {
  mixins: [PicMixins],
  components: { VideoInfo },
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
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 2,
        reference_image: this.sourceImg || ''
      }
    }
  },
}
</script>