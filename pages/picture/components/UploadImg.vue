<template>
  <view>
    <template v-if="imgVal">
      <ImgInfo :src="imgVal" :generating="generating" :size="size" @del="handleDel"></ImgInfo>
    </template>
    <view class="upload-container" v-else>
      <view class="loading-box" v-if="loading">
        <view class="title">图片正在上传中</view>
        <view class="icon-box">
          <uni-icons custom-prefix="iconfont-qm" type="icon-qm-loading-1" color="#878787" size="40" />
        </view>
        <view class="tips">支持png, jpg, jpeg格式，不超过20M</view>
      </view>
      <view v-else class="upload-box" @tap="chooseImage">
        <view class="title">点击上传</view>
        <view class="icon-box">
          <uni-icons custom-prefix="iconfont-qm" type="icon-qm-upload" color="#878787" size="50" />
        </view>
        <view class="tips">支持png, jpg, jpeg格式，不超过20M</view>
      </view>
    </view>
  </view>
</template>

<script>
import {userApi} from '@/api'
import ImgInfo from './ImgInfo.vue'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    generating: {
      type: Boolean,
      default: false
    }
  },
  components: { ImgInfo },
  data() {
    return {
      loading: false,
      size: 0,
    }
  },
  computed: {
    imgVal: {
      get() {
        return this.value || ''
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
  methods: {
    handleDel() {
      this.imgVal = '';
    },
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        success: async (res) => {
          // image/png
          const {path: filePath, size} = res.tempFiles?.[0] || {};
          this.size = size;
          this.loading = true;
          // uni.showLoading({
          //   title: '正在上传'
          // });
          this.imgVal = await userApi.uploadImg({filePath}).then((res) => {
            return res.path || '';
          }).finally(() => {
            this.loading = false;
            // uni.hideLoading();
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
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.upload-container {
  width: 100%;
  border-radius: 6rpx;
  margin-bottom: 16rpx;
  position: relative;
  overflow: hidden;
  border: 1px dashed #ccc;
  background: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300rpx;
  .upload-box, .loading-box {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    .title {
      color: #939393;
      font-size: 28rpx;
    }
    .tips {
      color: #acacac;
      font-size: 20rpx;
    }
    .icon-box {
      width: 100rpx;
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .loading-box {
    .icon-qm-loading-1 {
      animation: rotate 1s linear infinite;
    }
  }
}
</style>