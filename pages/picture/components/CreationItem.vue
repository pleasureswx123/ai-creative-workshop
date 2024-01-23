<template>
  <view class="container">
  
    <CreationHd :info="info" :disabled="disabled" @cb="handleOperation"></CreationHd>
  
    <StatusItemProgress :percentage="50" v-if="type === 0"></StatusItemProgress>
    <StatusItemVideo src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4" v-else-if="type === 1"></StatusItemVideo>
    <StatusItemImg v-else-if="type === 2" :list="[
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png'
    ]" v-else></StatusItemImg>
    <StatusItemError v-else-if="type === 3"></StatusItemError>
    <StatusItemViolate v-else-if="type === 4"></StatusItemViolate>
    <StatusItemImg v-else></StatusItemImg>
  
    <CreationFoot :info="info"></CreationFoot>
    
    <u-action-sheet
        round="20"
        :closeOnClickOverlay="true" :closeOnClickAction="true"
        :actions="list" cancelText="取消"
        @select="selectClick"
        @close="close"
        :show="show" />
    
    <VideoDetails :show.sync="showVideo" :info="info" />
  </view>
</template>

<script>
import CreationHd from './CreationHd.vue'
import StatusItemProgress from './StatusItem/Progress.vue'
import StatusItemVideo from './StatusItem/Video.vue'
import StatusItemImg from './StatusItem/Img.vue'
import StatusItemError from './StatusItem/Error.vue'
import StatusItemViolate from './StatusItem/Violate.vue'
import CreationFoot from './CreationFoot.vue'
import VideoDetails from './VideoDetails.vue'

export default {
  props: {
    type: {
      type: Number // 示例 to do ...
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    CreationHd,
    StatusItemProgress, StatusItemVideo, StatusItemImg, StatusItemError, StatusItemViolate,
    CreationFoot, VideoDetails
  },
  data() {
    return {
      disabled: false,
      show: false,
      showVideo: false,
      title:'标题',
      list: [
        {name: '智能换脸', type: 'ai-face'},
        {name: '高清重绘', type: 'hd-redraw'},
        {name: '去除背景', type: 'remove-bg'},
        {name: '更换背景', type: 'replace-bg'},
        {name: '智能扩图', type: 'ai-expand'},
        {name: '局部重绘', type: 'part-redraw'},
      ],
    }
  },
  methods: {
    handleOperation() {
      if(this.type === 1) { // 视频
        this.showVideo = true
      } if(this.type === 2) { // 图片
        this.showVideo = true
      } else {
        this.show = true;
      }
      
    },
    selectClick({type}){
      uni.$u.route({
        url: `pages/picture/${type}`
      })
    },
    close() {
      this.show = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  margin-bottom: 20rpx;
}
</style>