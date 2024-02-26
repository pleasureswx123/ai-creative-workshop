<template>
  <view class="photo-modify-wrapper">
    <view style="height: 200px;">{{actionType}}-{{brushSize}}-{{imgSrc}}</view>
    
    <SelectUploadPhoto v-if="!imgSrc" :src.sync="imgSrc"></SelectUploadPhoto>
    <PhotoCanvas v-else :src.sync="imgSrc" :actionType="actionType" :brushSize="brushSize"></PhotoCanvas>
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>