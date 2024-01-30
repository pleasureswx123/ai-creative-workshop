<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
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
      wantTxt: '',
      replaceTxt: '',
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
        reference_image: this.sourceImg,
        prompt: (this.wantTxt || '').trim(),
        prompt_extend: (this.replaceTxt || '').trim(),
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