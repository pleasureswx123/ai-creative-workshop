<template>
  <Layout>
    <PicHeader title="视频转绘" />
<!--    <view class="description-tips">
      上传一段视频，再选择一个风格， <br />
      你将得到一段令人耳目一新的视频。
    </view>-->
    
    <TitleCell
        title="上传原视频"
        :isShowRight="false" />
    <VideoInfo
        v-if="generateState === 3"
        :showDownload="true"
        :src="finalUrl" />
    <UploadImg
        v-else
        type="video"
        :generating="generating"
        :value.sync="sourceImg" />
  
    <template v-if="generateState === 1">
      <TitleCell title="选择转绘风格" :isShowRight="false" />
      <view style="color: #fff;">12121</view>
      <TipsHelp :info="taskDetail" />
    </template>
    
    <template #footer>
      <GenerateBtn :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
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
      template_id: '',
      generation_duration: 0,
      toastTips: {
        reference_image: {
          txt: '请上传图片'
        },
        template_id: {
          txt: '请选择模板'
        },
        generation_duration: {
          txt: '请选择时长'
        },
      },
    }
  },
  computed: {
    disabled() {
      return !(this.sourceImg && this.template_id && this.generation_duration)
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 11,
        generation_duration: this.generation_duration || '',
        template_id: this.template_id || '',
        reference_image: this.sourceImg || ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.description-tips {
  color: var(--txt-color2);
  text-align: center;
  font-size: 28rpx;
  padding: 30rpx 0;
  line-height: 1.6;
}
</style>