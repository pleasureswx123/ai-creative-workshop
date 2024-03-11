<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="page-main">
      
      <view class="video-grid-box" v-if="isVideo">
        <view class="card-box pointer" v-for="(item, index) in toolsList" :data-type="item.type" :key="item.id">
          <view class="video-box">
            <view class="item" v-if="item.video_url">
              <video object-fit="contain" :enable-progress-gesture="false" :src="item.video_url"></video>
            </view>
            <view class="item" v-else-if="item.img_url">
              <image :src="item.img_url" mode="aspectFit"></image>
            </view>
          </view>
          <view class="card-info" @tap="handleClick(item)">
            <view class="title">{{item.title}}</view>
            <view class="tips" v-if="item.tips">{{item.tips}}</view>
            <view class="go-btn">前往创作</view>
          </view>
        </view>
      </view>
      
      <view class="grid-box" v-else>
        <view class="card-box" v-for="(item, index) in toolsList" :data-type="item.type" :key="item.id" @tap="handleClick(item)">
          <view class="img-box">
            <image :src="item.url" mode="aspectFill"></image>
          </view>
          <view class="title">{{item.title}}</view>
          <view class="go-btn">前往创作</view>
        </view>
      </view>
    
    </view>
  </view>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapState('PictureInfo', ['toolsList']),
    isVideo() {
      return +this.classId === 2 // 视频工具
    }
  },
  data() {
    return {
      classId: ''
    }
  },
  onLoad({classId}) {
    this.classId = classId;
  },
  onShow() {
    this.setToolsList();
    this.getToolsList({page:1, pagesize: 20, class_id: this.classId});
  },
  methods: {
    ...mapMutations('PictureInfo', ['setToolsList']),
    ...mapActions('PictureInfo', ['getToolsList']),
    handleClick(item) {
      const {type, id} = item || {}
      uni.$u.route({
        url: `pages/picture/${type}`,
        params: {
          type: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding: 0 0 100rpx;
  .page-main {
    padding: 0 40rpx;
  }
}
.grid-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40rpx;
  margin-top: 30rpx;
  .card-box {
    cursor: pointer;
    padding: 10rpx;
    min-width: 0;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 0 20rpx rgba(0,0,0,.1);
    background: #25262B;
    box-sizing: border-box;
    border: 2rpx solid #373A40;
    .title {
      font-size: 24rpx;
      color: var(--txt-color1);
      text-align: center;
      line-height: 70rpx;
    }
  }
  .img-box {
    aspect-ratio: 4 / 3;
    image {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .go-btn {
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    color: #fff;
    border-radius: 10rpx;
    background: var(--red-color1);
    font-weight: bold;
    font-size: 28rpx;
  }
}

@media screen and (min-width: 750px) and (max-width: 960px){
  .grid-box {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 960px) {
  .grid-box {
    grid-template-columns: repeat(4, 1fr);
  }
}

.video-grid-box {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20rpx;
  margin-top: 30rpx;
  .card-box {
    cursor: pointer;
    min-width: 0;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 0 20rpx rgba(0,0,0,.1);
    padding: 10rpx;
    background: #25262B;
    box-sizing: border-box;
    border: 2rpx solid #373A40;
    display: flex;
    gap: 20rpx;
    .title {
      font-size: 28rpx;
      color: var(--txt-color1);
      text-align: center;
      line-height: 80rpx;
    }
    .tips {
      font-size: 24rpx;
      color: var(--txt-color1);
      text-align: center;
      line-height: 2;
      margin-bottom: 15rpx;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .card-info {
    flex: 1;
    min-width: 0;
    padding-right: 10rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .video-box {
    width: 58%;
    aspect-ratio: 4 / 3;
    display: flex;
    .item {
      flex: 1;
      min-width: 0;
      video, image {
        background-color: rgba(0,0,0,.9);
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .go-btn {
    width: 70%;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    color: #fff;
    border-radius: 10rpx;
    background: var(--red-color1);
    font-weight: bold;
    font-size: 28rpx;
  }
}

@media screen and (min-width: 750px) and (max-width: 960px){
  .video-grid-box {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 960px) {
  .video-grid-box {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>