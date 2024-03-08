<template>
  <Layout>
    <PicHeader title="视频转绘" />
    <view class="prompt-tips">
      视频生成会有一定概率失败，需要抽卡，画面主体越清晰，越容易成功，当然也会根您的描述是否清晰有关。
    </view>
  
    <VideoInfo
        v-if="generateState === 3"
        :showDownload="true"
        :src="finalUrl" />
    <QmGenerating v-if="generating"></QmGenerating>
  
    <template v-if="generateState === 1">
      <Describe :value.sync="prompt"></Describe>
      <Describe
          title="输入不希望出现的内容描述（可不填）"
          :isShowLanguageBtn="false"
          placeholder="可以不填写"
          :value.sync="prompt_extend"></Describe>
      <QmRatio :value.sync="ratioId"></QmRatio>
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
      prompt: '',
      prompt_extend: '',
      ratioId: 5,
      
      toastTips: {
        prompt: {
          txt: '请输入画面描述'
        },
        ratio_id: {
          txt: '请选择出图比例'
        },
      },
    }
  },
  computed: {
    radioOptions() {
      return (this.taskDetail?.expand_model?.generation_duration || []).map(item => {
        const { val, val_name } = item || {};
        return { label: val_name, value: val}
      })
    },
    disabled() {
      return !(this.prompt && this.ratioId)
    },
    params() {
      return {
        task_type: this.taskType,
        prompt: this.prompt || '',
        prompt_extend: this.prompt_extend || '',
        ratio_id: this.ratioId || ''
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