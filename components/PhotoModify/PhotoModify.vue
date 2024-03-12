<template>
  <view class="photo-modify-wrapper">
    <SelectUploadPhoto v-if="!imgSrc" :src.sync="imgSrc"></SelectUploadPhoto>
    <template v-if="imgSrc && !!imgInfo">
      <PhotoCanvas ref="photoCanvas" :src.sync="imgSrc" :imgInfo="imgInfo" :actionType="actionType" :brushSize="brushSize" />
    </template>
    <BrushSize ref="brushSize" v-if="actionType === 'brush' && showBrushSize" :value.sync="brushSize"></BrushSize>
    <PhotoModifyTool
        v-if="imgSrc && !!imgInfo"
        ref="tool"
        :value.sync="actionType"
        @undo="undo"
        @reset="reset"
        @eraser="eraser"
    ></PhotoModifyTool>
    <u-gap height="30"></u-gap>
  </view>
</template>

<script>
export default {
  data() {
    return {
      actionType: 'brush',
      brushSize: 10,
      imgSrc: '',
      imgInfo: null,
      showBrushSize: false,
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
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    getMaskImgSrc() {
      return this.$refs.photoCanvas.getMaskImgSrc();
    },
    handleClickOutside(event) {
      if(this.$refs?.brushSize?.$refs?.brushSizeBox?.$el?.contains?.(event.target) || this.$refs?.tool?.$refs?.brush?.[0]?.$el?.contains?.(event.target)) {
        this.showBrushSize = true
      }
      if(!this.$refs?.brushSize?.$refs?.brushSizeBox?.$el?.contains?.(event.target) && !this.$refs?.tool?.$refs?.brush?.[0]?.$el?.contains?.(event.target)) {
        this.showBrushSize = false
      }
    },
    undo() {
      this.$refs?.photoCanvas?.undo?.();
    },
    reset() {
      this.$refs?.photoCanvas?.reset?.();
    },
    eraser() {
    
    },
  }
}
</script>

<style lang="scss" scoped>
</style>