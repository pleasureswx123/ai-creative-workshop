<template>
  <view>
    <template v-if="currentSrc">
      <ImgInfo v-if="type === 'image'" :src="currentSrc" :generating="generating" @del="setUrl"></ImgInfo>
      <VideoInfo v-if="type === 'video'" :src="currentSrc" :generating="generating" @del="setUrl"></VideoInfo>
    </template>
    <UploadArea v-else @cb="setUrl" :type="type"></UploadArea>
  </view>
</template>

<script>
import UploadArea from './UploadArea.vue'
import ImgInfo from './ImgInfo.vue'
import VideoInfo from './VideoInfo.vue'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    generating: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'image' // image || video
    }
  },
  components: { UploadArea, ImgInfo, VideoInfo },
  computed: {
    currentSrc: {
      get() {
        return this.value || ''
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
  methods: {
    setUrl(url) {
      this.currentSrc = url || '';
    },
  }
}
</script>

<style lang="scss" scoped>
</style>