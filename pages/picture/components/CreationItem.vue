<template>
  <view class="container">
    <view class="hd">
      <view class="title" @tap="showVideo = true">{{info.task_type_title}}</view>
<!--      <view class="btn disabled">图像处理 &gt;</view>-->
      <view class="btn">
        <u-button type="info" size="small" @tap="show = true" text="图像处理"></u-button>
      </view>
    </view>
    <view class="pictrue-box">
      
      <view class="progress-box">
        <view class="progress-bar">
          <u-line-progress :showText="false" :percentage="30"></u-line-progress>
        </view>
      </view>
    </view>
    <view class="ft">
      <view class="title">{{info.prompt}}</view>
      <view class="info">{{info.model_style_name}}</view>
      <view class="info">{{info.lora_name}}</view>
      <view class="info">{{info.controlnet_type}}</view>
      <view class="info">消耗200积分</view>
      <view class="info">768 * 1024</view>
      <view class="info">生成时间2024.1.12 -15:30</view>
      <view class="info">opacity: 0.5;</view>
    </view>
    
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
import VideoDetails from './VideoDetails.vue'

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    VideoDetails
  },
  data() {
    return {
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
.hd {
  display: flex;
  align-items: center;
  height: 80rpx;
  padding: 0 30rpx;
  .title {
    color: #000;
    font-size: torpx(16);
    flex: 1;
    min-width: 0;
  }
  .btn {
    font-size: 60rpx;
    //font-size: torpx(14);
    //border: 1px solid rgba(0,0,0,1);
    //color: rgba(0,0,0,1);
    //border-radius: torpx(4);
    //padding: 3rpx 15rpx;
  }
}
.pictrue-box {
  background-color: #FEEDEE;
  .progress-box {
    height: 300rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .progress-bar {
      width: 30%;
    }
  }
}
.ft {
  padding: 0 30rpx 10rpx;
  .title {
    font-size: 24rpx;
    padding: 20rpx 0;
    line-height: 1.8;
    border-bottom: 1rpx solid rgba(0,0,0,.2);
    margin-bottom: 30rpx;
  }
  .info {
    display: inline-block;
    margin: 0 15rpx 15rpx 0;
    color: rgba(0,0,0,.5);
  }
}
</style>