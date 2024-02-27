<template>
  <view class="photo-modify-wrapper">
    <SelectUploadPhoto v-if="!imgSrc" :src.sync="imgSrc"></SelectUploadPhoto>
    <template v-if="imgSrc && !!imgInfo">
      <PhotoCanvas ref="photoCanvas" :src.sync="imgSrc" :imgInfo="imgInfo" :actionType="actionType" :brushSize="brushSize" />
    </template>
    <BrushSize v-if="actionType === 'brush'" :value.sync="brushSize"></BrushSize>
    <PhotoModifyTool
        :value.sync="actionType"
        @undo="undo"
        @reset="reset"
        @eraser="eraser"
    ></PhotoModifyTool>
  </view>
</template>

<script>
export default {
  data() {
    return {
      actionType: 'brush',
      brushSize: 10,
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
  },
  methods: {
    undo() {
      this.$refs.photoCanvas.undo();
    },
    reset() {
      this.$refs.photoCanvas.reset();
    },
    eraser() {
    
    },
  }
}
</script>

<style lang="scss" scoped>
</style>