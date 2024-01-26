<template>
  <page-meta page-style="background: #f6f8fe" />
  <view class="page-container">
    <u-list @scrolltolower="scrolltolower">
      <u-list-item v-for="(item, index) in list" :key="index">
        <CreationItem :info="item" :type="index" />
      </u-list-item>
    </u-list>
  </view>
</template>

<script>
import {mapState} from 'vuex'
import CreationItem from './components/CreationItem.vue'
import {userApi} from '@/api'

export default {
  data() {
    return {
      list: [],
      // pageNo: 1,
      // pageSize: 2,
    }
  },
  computed: {
    ...mapState('UserInfo', ['name']),
  },
  components: {
    CreationItem
  },
  onShow () {
    this.initParams();
    this.loadMore();
  },
  onPullDownRefresh() {
    this.initParams();
    this.loadMore().then(() => {
      uni.stopPullDownRefresh();
    });
  },
  methods: {
    initParams() {
      this.list = [];
      // this.pageNo = 1;
      // this.pageSize = 10;
    },
    scrolltolower() {
      // this.pageNo += 1;
      this.loadMore()
    },
    loadMore() {
      // return userApi.getMyCreation({pageNo: this.pageNo, pageSize: this.pageSize}).then(res => {
      return userApi.getMyCreation().then(res => {
        this.list = res?.list || []
      }).catch(err => {
        this.list = [
          {
            "task_type": "1",
            "task_type_title": "任务:文生图-4张",
            "task_id": 1,
            "queue_num": 1,
            "state": 0,
            "img_urls": [],
            "prompt": "瓶水乳，产品摄影，专业布光，背景充满粉色花瓣背景商品海报，高质量，专业布光，背景充满粉色花瓣背景，商品海报，高质量，专业布光，背景充满粉色花瓣背景。",
            "model_style_name": "底膜名称",
            "lora_name": "Lora模型名称",
            "controlnet_type": "ControlNet类型",
            "img_style_name": "图片样式style",
            "img_scale": "1024*768",
            "video_url": "",
            "create_time": "2024/01/17 15:59"
          },
          {
            "task_type": "1",
            "task_type_title": "任务:文生图-4张",
            "task_id": 1,
            "queue_num": 0,
            "state": 1,
            "img_urls": [
              "https://api.chaojiyuyan.com/upload/task/82/9082/3027/images/9082_3027_1702544478_36167.png",
              "https://api.chaojiyuyan.com/upload/task/100/9100/3030/images/9100_3030_1702557737_44863.png"
            ],
            "prompt": "瓶水乳，产品摄影，专业布光，背景充满粉色花瓣背景商品海报，高质量，专业布光，背景充满粉色花瓣背景，商品海报，高质量，专业布光，背景充满粉色花瓣背景。",
            "model_style_name": "底膜名称",
            "lora_name": "Lora模型名称",
            "controlnet_type": "ControlNet类型",
            "img_style_name": "图片样式style",
            "img_scale": "1024*768",
            "video_url": "",
            "create_time": "2024/01/17 15:59"
          },
          {
            "task_type": "1",
            "task_type_title": "任务:文生图-4张",
            "task_id": 1,
            "queue_num": 0,
            "state": 2,
            "img_urls": [
              "https://api.chaojiyuyan.com/upload/task/82/9082/3027/images/9082_3027_1702544478_36167.png",
              "https://api.chaojiyuyan.com/upload/task/100/9100/3030/images/9100_3030_1702557737_44863.png"
            ],
            "prompt": "瓶水乳，产品摄影，专业布光，背景充满粉色花瓣背景商品海报，高质量，专业布光，背景充满粉色花瓣背景，商品海报，高质量，专业布光，背景充满粉色花瓣背景。",
            "model_style_name": "底膜名称",
            "lora_name": "Lora模型名称",
            "controlnet_type": "ControlNet类型",
            "img_style_name": "图片样式style",
            "img_scale": "1024*768",
            "video_url": "",
            "create_time": "2024/01/17 15:59"
          },
          {
            "task_type": "1",
            "task_type_title": "任务:文生图-4张",
            "task_id": 1,
            "queue_num": 0,
            "state": 3,
            "img_urls": [],
            "prompt": "瓶水乳，产品摄影，专业布光，背景充满粉色花瓣背景商品海报，高质量，专业布光，背景充满粉色花瓣背景，商品海报，高质量，专业布光，背景充满粉色花瓣背景。",
            "model_style_name": "底膜名称",
            "lora_name": "Lora模型名称",
            "controlnet_type": "ControlNet类型",
            "img_style_name": "图片样式style",
            "img_scale": "1024*768",
            "video_url": "",
            "create_time": "2024/01/17 15:59"
          },
          {
            "task_type": "1",
            "task_type_title": "任务:图生图-1张",
            "task_id": 1,
            "queue_num": 0,
            "state": 1,
            "img_urls": [
              "https://api.chaojiyuyan.com/upload/task/100/9100/3030/images/9100_3030_1702557737_44863.png"
            ],
            "prompt": "瓶水乳，产品摄影，专业布光，背景充满粉色花瓣背景商品海报，高质量，专业布光，背景充满粉色花瓣背景，商品海报，高质量，专业布光，背景充满粉色花瓣背景。",
            "model_style_name": "底膜名称",
            "lora_name": "Lora模型名称",
            "controlnet_type": "ControlNet类型",
            "img_style_name": "图片样式style",
            "img_scale": "1024*768",
            "video_url": "",
            "create_time": "2024/01/17 15:59"
          },
          {
            "task_type": "1",
            "task_type_title": "任务:图生视频",
            "task_id": 1,
            "queue_num": 0,
            "state": 1,
            "img_urls": [
              "http://api.chaojiyuyan.com/upload/task/176/9176/3054/images/9176_3054_1702617430_43347.png"
            ],
            "video_url": "https://api.chaojiyuyan.com/upload/task/176/9176/3054/video/9176_3054_1702617687_25378.mp4",
            "create_time": "2024/01/17 15:59"
          }
        ];
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
}
</style>