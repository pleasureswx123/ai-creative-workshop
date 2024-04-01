<template>
  <view class="swiper-card-box">
    <view class="card-hd">
      <view class="title">{{info.title}}</view>
      <view class="rt" @tap="handleJumpType">
        <view>全部</view>
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-arr-rt" color="#666" size="10" />
      </view>
    </view>
    <view class="card-content">
      <scroll-view class="scroll-view_H" scroll-x="true" :show-scrollbar="false">
        <view class="first-box" @tap="jumpToDetail(firstImgInfo)">
          <image class="img-el" :src="firstImgInfo.img_url" :lazy-load="true" mode="aspectFill"></image>
          <view class="play-btn" v-if="firstImgInfo.video_url">
            <uni-icons custom-prefix="iconfont-qm" type="icon-qm-play" color="rgba(255,255,255,.5)" size="40" />
          </view>
        </view>
        <view class="item-container">
          <view class="item-box">
            <view class="item" v-for="(item, index) in recommendList" :key="index" @tap="jumpToDetail(item)">
              <image class="img-el" :src="item.img_url" :lazy-load="true" mode="aspectFill"></image>
              <view class="play-btn" v-if="firstImgInfo.video_url">
                <uni-icons custom-prefix="iconfont-qm" type="icon-qm-play" color="rgba(255,255,255,.5)" size="20" />
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: () => ({
        title: '本周上新',
        path: '',
        recommend_list: [
          {
            "task_type": 2,
            "class_type": 2,
            "task_id": 256,
            "cover_img_url": "https://aigc.chaojiyuyan.cn/upload/image/65ba0f8cb91d6.png",
            "video_url": "https://aigc.chaojiyuyan.cn/upload/user_task/video/08/8/8_256_1706694566_16204.mp4"
          },
          {
            image: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/03ddf10f-906a-42c8-b1ef-e152756cf426/original=true/00052-29933022.jpeg',
            title: '昨夜星辰昨夜风，画楼西畔桂堂东',
          },
        ]
      })
    }
  },
  computed: {
    firstImgInfo() {
      return this.info?.recommend_list?.[0] || {};
    },
    recommendList() {
      return this.info?.recommend_list?.slice(1) || []
    }
  },
  methods: {
    handleJumpType() {
      const type = this.info?.type;
      type && uni.navigateTo({
        url: `/pages/index/type-list?type=${type}`
      })
    },
    jumpToDetail(info) {
      this.$emit('select', info);
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-card-box {
  margin-bottom: 30rpx;
  .card-hd {
    display: flex;
    gap: 20rpx;
    margin-bottom: 10rpx;
    .title {
      flex: 1;
      min-width: 0;
      font-size: 32rpx;
      font-weight: bold;
      color: #000;
    }
    .rt {
      display: flex;
      align-items: center;
      font-size: 26rpx;
      color: #333;
      gap: 4rpx;
    }
  }
}
.card-content {
  height: 200px;
  margin: 0 -30rpx;
  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .img-el {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 30rpx;
  }
  .first-box, .item-container {
    display: inline-block;
    height: 100%;
    vertical-align: top;
  }
  .first-box {
    width: 320rpx;
    margin: 0 10rpx 0 30rpx;
    position: relative;
  }
  .item-container {
    width: 115%;
    margin-right: 30rpx;
    .item-box {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 1fr 1fr;
      gap: 10rpx;
      .item {
        min-width: 0;
        position: relative;
      }
    }
  }
}
.play-btn {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.3);
  border-radius: 0 20rpx 0 30rpx;
}

</style>