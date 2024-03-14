<template>
  <view class="photo-modify-wrapper">
    <SelectUploadPhoto v-if="!imgSrc" :src.sync="imgSrc"></SelectUploadPhoto>
    <template v-if="imgSrc && !!imgInfo">
      <PhotoCanvas ref="photoCanvas" :src.sync="imgSrc" :imgInfo="imgInfo" :actionType="actionType" :brushSize="brushSize" />
    </template>
    <PhotoModifyTool
        v-if="imgSrc && !!imgInfo"
        ref="tool"
        :value.sync="actionType"
        :size.sync="brushSize"
        @undo="undo"
        @reset="reset"
    ></PhotoModifyTool>
    <u-gap height="30"></u-gap>
  </view>
</template>

<script>
export default {
  data() {
    return {
      actionType: '',
      brushSize: 30,
      imgSrc: '',
      imgInfo: null,
    }
  },
  watch: {
    imgSrc(src) {
      if(src) {
        this.$emit('setUrl', src);
        uni.getImageInfo({
          src, success: res => {
            if (res.errMsg === 'getImageInfo:ok') {
              this.imgInfo = res;
            }
          }
        })
      } else {
        this.$emit('setUrl');
        this.imgInfo = null
      }
    }
  },
  methods: {
    getMaskImgSrc() {
      return this.$refs.photoCanvas.getMaskImgSrc();
    },
    undo() {
      this.$refs?.photoCanvas?.undo?.();
    },
    reset() {
      this.$refs?.photoCanvas?.reset?.();
    },
  }
}
</script>

<style lang="scss" scoped>
</style>