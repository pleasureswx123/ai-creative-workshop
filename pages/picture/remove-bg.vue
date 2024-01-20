<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="去除背景" />
    
    <TitleCell title="选择图片" />
    <UploadImg :value.sync="sourceImg"></UploadImg>
  
    <TipsTxt></TipsTxt>
    
    <view class="tips-img">
      <image src="/static/images/imgTool/3.png"></image>
    </view>
    
    <StartBtn @start="handleStart"></StartBtn>
  
  </view>
</template>

<script>
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import UploadImg from './components/UploadImg.vue';
import TipsTxt from './components/TipsTxt.vue';
import StartBtn from './components/StartBtn.vue';

export default {
  components: { PicHeader, TitleCell, UploadImg, TipsTxt, StartBtn },
  data() {
    return {
      sourceImg: '',
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
.tips-img {
  margin: 20rpx 0;
  width: 60%;
  aspect-ratio: 4 / 3;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>