<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="更换背景(语义)" />
    
    <TitleCell title="选择图片" />
    <UploadImg :value.sync="sourceImg"></UploadImg>
  
    <TitleCell title="你想要<em>固定</em>的画面元素是？" :isShowRight="false" />
    <QmInput :value.sync="wantTxt" placeholder="例如：红酒瓶"></QmInput>
  
    <TitleCell title="你想把它的背景换成什么？" :isShowRight="false" />
    <QmInput :value.sync="replaceTxt" placeholder="例如：热带海边沙滩"></QmInput>
  
    <TipsHelp>
      <image src="/static/images/imgTool/7.png"></image>
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
import QmInput from './components/QmInput.vue';

export default {
  components: { PicHeader, TitleCell, UploadImg,TipsHelp, QmInput, StartBtn },
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