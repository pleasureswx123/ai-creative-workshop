<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="智能换脸" />
  
    <TitleCell title="换脸源图片" />
    <UploadImg :value.sync="sourceImg"></UploadImg>
    
    <TitleCell title="换脸目标图片" />
    <UploadImg :value.sync="targetImg"></UploadImg>
  
    <TipsHelp>
      <image src="/static/images/imgTool/1.png"></image>
    </TipsHelp>
  
    <StartBtn :disabled="disabled" @start="handleStart"></StartBtn>
    
  </view>
</template>

<script>
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import UploadImg from './components/UploadImg.vue';
import TipsHelp from './components/TipsHelp.vue';
import StartBtn from './components/StartBtn.vue';
export default {
  components: { PicHeader, TitleCell, UploadImg, TipsHelp, StartBtn },
  data() {
    return {
      sourceImg: '',
      targetImg: '',
    }
  },
  computed: {
    disabled() {
      return !(this.sourceImg && this.targetImg)
    }
  },
  methods: {
    handleStart() {
      alert('start')
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 0 30rpx 160rpx;
}
</style>