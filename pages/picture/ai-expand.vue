<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="智能扩图" />
  
<!--    <ImgInfo src="https://aigc.chaojiyuyan.com/upload/image/65ae1eb2a6807.png"
        :generating="true" :isShowClose="false"></ImgInfo>-->
    
    <TitleCell title="选择图片" />
    <UploadImg :generating="generating" :value.sync="sourceImg"></UploadImg>
    
    <TitleCell title="选择扩图方向" :isShowRight="false" />
    <QmRadio :value.sync="direction"></QmRadio>
  
    <TipsHelp>
      <image src="/static/images/imgTool/5.png"></image>
    </TipsHelp>
    
    <StartBtn :disabled="disabled" @start="handleStart"></StartBtn>
  </view>
</template>

<script>
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import UploadImg from './components/UploadImg.vue';
import QmRadio from './components/QmRadio.vue';
import TipsHelp from './components/TipsHelp.vue';
import StartBtn from './components/StartBtn.vue';
export default {
  components: { PicHeader, TitleCell, UploadImg, QmRadio, TipsHelp, StartBtn },
  data() {
    return {
      sourceImg: '',
      direction: '',
      generating: false,
    }
  },
  computed: {
    disabled() {
      return !(this.sourceImg && this.direction)
    }
  },
  methods: {
    handleStart() {
      if (!this.generating) {
        this.generating = true
        // to do ...
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 0 30rpx 160rpx;
}
</style>