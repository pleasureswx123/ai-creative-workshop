<template>
  <view class="result-wrapper" :style="styleInfo">
    
    <view class="item" v-for="(src, index) in imgs" :key="index">
      <image :src="src" mode="aspectFill"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
          'https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/26514-387039005.png',
          'https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/26514-387039005.png',
          'https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/26514-387039005.png',
          'https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/26514-387039005.png',
      ]
    }
  },
  computed: {
    imgNums() {
      return this.imgs.length;
    },
    styleInfo() {
      const {windowWidth} = uni.getSystemInfoSync();
      let columnCount = 1;
      if(750 < windowWidth) {
        columnCount = this.imgNums;
      } else {
        columnCount = this.imgNums > 1 ? 2 : 1;
      }
      return {
        'grid-template-columns': `repeat(${columnCount}, 1fr)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result-wrapper {
  border-radius: 20rpx;
  background: #1F2937;
  box-sizing: border-box;
  border: 2rpx solid #494C55;
  padding: 4rpx;
  height: 500px;
  margin-bottom: 30rpx;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10rpx;
  .item {
    min-width: 0;
    image {
      width: 100%;
      height: 100%;
    }
  }
}

//@media screen and (min-width: 750px) {
//  .branner-imgs-box {
//    grid-template-columns: repeat(2, 1fr);
//  }
//}
//
//@media screen and (min-width: 960px) {
//  .branner-imgs-box {
//    grid-template-columns: repeat(4, 1fr);
//  }
//}
</style>