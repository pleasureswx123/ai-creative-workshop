<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="page-main">
      <PicHeader title="选择视频工具" />
      <view class="grid-box">
        <view class="card-box pointer" v-for="(item, index) in videoToolsList" :data-type="item.type" :key="`${index}-${item.id}`" @tap="handleClick(item)">
          <view class="img-box">
            <image :src="item.url"></image>
          </view>
          <view class="title">{{item.title}}</view>
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
    ...mapState('PictureInfo', ['videoToolsList']),
  },
  components: { PicHeader },
  onShow() {
    this.getVideoToolsList({page:1, pagesize: 20, class_id: 2});
  },
  methods: {
    ...mapActions('PictureInfo', ['getVideoToolsList']),
    handleClick(item) {
      const {type, id} = item || {};
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
    min-width: 0;
    border-radius: 20rpx;
    background-color: var(--bg-color2);
    overflow: hidden;
    box-shadow: 0 0 20rpx rgba(0,0,0,.1);
    .title {
      font-size: 24rpx;
      color: var(--txt-color1);
      text-align: center;
      line-height: 80rpx;
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