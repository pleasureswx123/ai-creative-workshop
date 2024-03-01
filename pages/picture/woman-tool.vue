<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="page-main">
      <PicHeader title="选择女神风格" />
      <view class="grid-box">
        <view class="card-box" v-for="(item, index) in toolsList" :data-type="item.type" :key="item.id" @tap="handleClick(item)">
          <view class="img-box">
            <image :src="item.url" mode="aspectFill"></image>
          </view>
          <view class="title">{{item.title}}</view>
          <view class="tips">{{item.tips}}</view>
          <view class="go-btn">前往创作</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import PicHeader from './components/PicHeader.vue';

export default {
  computed: {
    ...mapState('PictureInfo', ['toolsList']),
  },
  components: { PicHeader },
  onShow() {
    this.getToolsList({page:1, pagesize: 20, class_id: 4});
  },
  methods: {
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
    .tips {
      flex: 1;
      min-height: 0;
      font-size: 20rpx;
      color: var(--txt-color1);
      text-align: center;
      line-height: 1.5;
      padding: 0 0 15rpx;
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
</style>