<template>
  <page-meta page-style="background: #ffffff" />
  <view class="page-container">
    <PicHeader title="选择图片工具" />
    <view class="grid-box">
      <view class="card-box" v-for="item in list" :key="item.id" @tap="handleClick(item)">
        <view class="img-box">
          <image :src="`/static/images/imgTool/${item.imgName}`"></image>
        </view>
        <view class="title">{{item.title}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import PicHeader from './components/PicHeader.vue';

export default {
  data() {
    return {
      list: [
        {title: '智能换脸', imgName: '1.png', id: 1},
        {title: '高清重绘', imgName: '2.png', id: 2},
        {title: '去除背景', imgName: '3.png', id: 3},
        {title: '更换背景', imgName: '4.png', id: 4},
        {title: '智能扩图', imgName: '5.png', id: 5},
        {title: '局部重绘', imgName: '6.jpg', id: 6},
      ]
    }
  },
  components: { PicHeader },
  methods: {
    handleClick({id}) {
      const routeName = ['ai-face', 'hd-redraw', 'remove-bg', 'replace-bg', 'ai-expand', 'part-redraw'];
      const name = routeName[id - 1] || '';
      name && uni.$u.route({
        url: `pages/picture/${name}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 0 40rpx;
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