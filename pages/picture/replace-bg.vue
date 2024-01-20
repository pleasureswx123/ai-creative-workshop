<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="更换背景" />
    
    <TitleCell title="选择图片" />
    <UploadImg :value.sync="sourceImg"></UploadImg>
    
    <TitleCell title="把背景更换为" :isShowRight="false" />
    <QmTextarea :value.sync="describe"></QmTextarea>
    
    <StartBtn @start="handleStart"></StartBtn>
  
  </view>
</template>

<script>
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import UploadImg from './components/UploadImg.vue';
import QmTextarea from './components/QmTextarea.vue';
import StartBtn from './components/StartBtn.vue';
export default {
  components: { PicHeader, TitleCell, UploadImg, QmTextarea, StartBtn },
  data() {
    return {
      sourceImg: '',
      describe: '',
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