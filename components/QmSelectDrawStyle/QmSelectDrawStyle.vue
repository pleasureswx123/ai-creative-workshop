<template>
  <view>
    <view class="slide-container" @tap.stop="show = true">
      <view class="img-box">
        <image mode="aspectFit" :src="cardInfo.url"></image>
      </view>
      <view class="info-box">
        <view class="info-hd">
          <view class="title">{{cardInfo.title}}</view>
        </view>
      </view>
    </view>
    <QmSelectDrawStylePopup
        :show.sync="show"
        :selectedInfo.sync="selectedInfo" />
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => (null)
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    selectedInfo: {
      get() {
        return this.value || null
      },
      set(info) {
        this.$emit('update:value', info)
      }
    },
    cardInfo() {
      const {img_url, title} = this.selectedInfo || {};
      return {
        url: img_url, title
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.slide-container {
  margin-bottom: 20rpx;
  background-color: #23242C;
  display: flex;
  height: 160rpx;
  align-items: center;
  padding: 20rpx;
  box-sizing: border-box;
  border-radius: 10rpx;
  gap: 30rpx;
  .img-box {
    height: 120rpx;
    width: 120rpx;
    image {
      background-color: #000;
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 10rpx;
    }
  }
  .info-box {
    flex: 1;
    min-width: 0;
  }
  .info-hd {
    display: flex;
    align-items: center;
    gap: 20rpx;
    font-size: 28rpx;
    color: #fff;
    .title {
      flex: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>