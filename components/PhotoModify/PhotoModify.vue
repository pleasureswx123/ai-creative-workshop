<template>
  <view class="photo-modify-wrapper">
    <SelectUploadPhoto v-if="!imgSrc" :src.sync="imgSrc"></SelectUploadPhoto>
    <template v-if="imgSrc && !!imgInfo">
      <PhotoCanvas :src.sync="imgSrc" :imgInfo="imgInfo" :actionType="actionType" :brushSize="brushSize" />
    </template>
    <BrushSize v-if="actionType === 'brush'" :value.sync="brushSize"></BrushSize>
    <PhotoModifyTool :value.sync="actionType"></PhotoModifyTool>
  </view>
</template>

<script>
export default {
  data() {
    return {
      actionType: 'brush',
      brushSize: 3,
      imgSrc: '',
      imgInfo: null
    }
  },
  watch: {
    imgSrc(src) {
      src ? uni.getImageInfo({
        src, success: res => {
          if (res.errMsg === 'getImageInfo:ok') {
            this.imgInfo = res;
          }
        }
      }) : (this.imgInfo = null);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>