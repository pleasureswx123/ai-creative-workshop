<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="局部重绘(语义检测)" />
    
    <TitleCell title="选择图片" />
    <UploadImg :value.sync="sourceImg"></UploadImg>
    
    <TitleCell title="描述你想要更换的元素" :isShowRight="false" />
    <QmInput :value.sync="sourceElementText" placeholder="例如：红色的鸭舌帽"></QmInput>
    
    <TitleCell title="你想把它换成什么" :isShowRight="false" />
    <QmInput :value.sync="targetElementText" placeholder="例如：黑色的毛线帽"></QmInput>
    
    <StartBtn :disabled="false" @start="handleStart"></StartBtn>
  </view>
</template>

<script>
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import UploadImg from './components/UploadImg.vue';
import QmInput from './components/QmInput.vue';
import StartBtn from './components/StartBtn.vue';
export default {
  components: { PicHeader, TitleCell, UploadImg, QmInput, StartBtn },
  data() {
    return {
      sourceImg: '',
      sourceElementText: '',
      targetElementText: '',
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