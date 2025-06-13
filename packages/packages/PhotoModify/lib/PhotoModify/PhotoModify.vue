<template>
  <view class="upload-modify-canvas-box">
    <PhotoGenerate v-if="loading"></PhotoGenerate>
    <view class="photo-modify-wrapper">
      <SelectUploadPhoto v-if="!(imgSrc && !!imgInfo)" :src.sync="imgSrc"></SelectUploadPhoto>
      <template v-else>
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
  </view>
</template>

<script>
import PhotoGenerate from './PhotoGenerate.vue';
import SelectUploadPhoto from './SelectUploadPhoto.vue';
import PhotoCanvas from './PhotoCanvas.vue';
import PhotoModifyTool from './PhotoModifyTool.vue';

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ''
    }
  },
  components: {
    PhotoGenerate,
    SelectUploadPhoto,
    PhotoCanvas,
    PhotoModifyTool,
  },
  data() {
    return {
      actionType: '',
      brushSize: 30,
      imgInfo: null,
    }
  },
  computed: {
    imgSrc: {
      get() {
        return this.src
      },
      set(url) {
        this.$emit('update:src', url || '')
      }
    }
  },
  mounted() {
    this.imgSrc && this.setImgInfo(this.imgSrc);
  },
  watch: {
    imgSrc(src) {
      if(src) {
        this.setImgInfo(src);
      } else {
        this.imgInfo = null
      }
    }
  },
  methods: {
    setImgInfo(src) {
      uni.getImageInfo({
        src, success: res => {
          if (res.errMsg === 'getImageInfo:ok') {
            this.imgInfo = res;
          }
        }
      })
    },
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
.upload-modify-canvas-box {
  user-select: none;
}
</style>