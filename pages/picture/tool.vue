<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="选择图片工具" />
    <view class="grid-box">
      <view class="card-box" v-for="(item, index) in toolsList" :data-type="item.type" :key="`${index}-${item.id}`" @tap="handleClick(item)">
        <view class="img-box">
          <image :src="item.url"></image>
        </view>
        <view class="title">{{item.title}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import PicHeader from './components/PicHeader.vue';

export default {
  data() {
    return {
      // list: [
      //   {title: '智能换脸', imgName: '1.png', type: 'ai-face'},
      //   {title: '高清重绘', imgName: '2.png', type: 'hd-redraw'},
      //   {title: '去除背景', imgName: '3.png', type: 'remove-bg'},
      //   {title: '更换背景', imgName: '4.png', type: 'replace-bg'},
      //   {title: '智能扩图', imgName: '5.png', type: 'ai-expand'},
      //   {title: '局部重绘', imgName: '6.jpg', type: 'part-redraw'},
      //   {title: '更换背景(语义)', imgName: '7.png', type: 'replace-bg-txt'},
      // ]
    }
  },
  computed: {
    ...mapState('PictureInfo', ['toolsList']),
  },
  components: { PicHeader },
  onShow() {
    this.getToolsList({page:1, pagesize: 20});
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
  padding: 0 40rpx 100rpx;
}
.grid-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40rpx;
  .card-box {
    min-width: 0;
    border-radius: 20rpx;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 0 20rpx rgba(0,0,0,.1);
    .title {
      font-size: 24rpx;
      color: #4A4A4A;
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
</style>