<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="智能换脸" />
  
    <TitleCell title="换脸源图片" />
    <UploadImg :value.sync="sourceImg"></UploadImg>
    
    <TitleCell title="换脸目标图片" />
    <UploadImg :value.sync="targetImg"></UploadImg>
    
    <view class="tips">
      <text>将"源图片"中的脸部特征识别出来，替换到"目标图片"的人物脸上，达到换脸的效果。</text>
    </view>
    
    <view class="tips-img">
      <image src="/static/images/imgTool/1.png"></image>
    </view>
  
    <StartBtn @start="handleStart"></StartBtn>
    
  </view>
</template>

<script>
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import UploadImg from './components/UploadImg.vue';
import StartBtn from './components/StartBtn.vue';
export default {
  components: { PicHeader, TitleCell, UploadImg, StartBtn },
  data() {
    return {
      sourceImg: '',
      targetImg: '',
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
.tips {
  padding: 10rpx 0;
  color: #000;
  font-size: 24rpx;
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