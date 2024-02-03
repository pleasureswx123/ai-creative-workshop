<template>
  <view class="upload-box" @tap="chooseImage">
    <view class="icon-box">
      <uni-icons custom-prefix="iconfont-qm" type="icon-qm-upload" color="var(--txt-color2)" size="30" />
    </view>
    <view class="info">
      <view class="title">点击上传</view>
      <view class="tips">支持jpg/png/gif格式的图片，不超过20M</view>
    </view>
  </view>
</template>

<script>
import {userApi} from "@/api";

export default {
  methods: {
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        success: async (res) => {
          const {path: filePath} = res.tempFiles?.[0] || {};
          userApi.uploadImg({filePath}).then((res) => {
            const url = res.path || '';
            this.$emit('cb', url);
          }).finally(() => {
          });
        },
        fail(...args) {
          console.log(args)
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.upload-box {
  background-color: #23242C;
  color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
  .icon-box {
    height: 100%;
    width: 100rpx;
    display: grid;
    place-items: center;
  }
  .info {
    flex: 1;
    min-width: 0;
    color: #fff;
    font-size: 28rpx;
    line-height: 1.5;
    .tips {
      font-size: 24rpx;
      color: rgba(255,255,255,.5);
    }
  }
}
</style>