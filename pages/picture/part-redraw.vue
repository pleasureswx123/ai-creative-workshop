<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
    <PicHeader title="局部重绘(语义检测)" />
    
    <TitleCell title="选择图片" :generateState="generateState" />
    <ImgInfo v-if="generateState === 3" :showDownload="true" :src="finalUrl" />
    <UploadImg v-else :generating="generating" :value.sync="sourceImg"></UploadImg>
  
    <template v-if="generateState === 1">
      <TitleCell title="描述你想要<em>更换</em>的元素" :isShowRight="false" />
      <QmInput :value.sync="sourceElementText" placeholder="例如：红色的鸭舌帽"></QmInput>
      
      <TitleCell title="你想把它换成什么" :isShowRight="false" />
      <QmInput :value.sync="targetElementText" placeholder="例如：黑色的毛线帽"></QmInput>
    
      <TipsHelp :info="taskDetail" />
    </template>
    
    <GenerateBtn :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
  </view>
</template>

<script>
import PicMixins from './mixin';

export default {
  mixins: [PicMixins],
  data() {
    return {
      sourceImg: '',
      sourceElementText: '',
      targetElementText: '',
    }
  },
  computed: {
    disabled() {
      const isSourceTxt = !!((this.sourceElementText || '').trim().length);
      const isTargetTxt = !!((this.targetElementText || '').trim().length);
      return !(this.sourceImg && isSourceTxt && isTargetTxt)
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 8,
        reference_image: this.sourceImg,
        prompt: (this.sourceElementText || '').trim(),
        prompt_extend: (this.targetElementText || '').trim(),
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding: 0 30rpx 160rpx;
}
</style>