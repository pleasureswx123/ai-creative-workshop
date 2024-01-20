<template>
  <view class="btn-upload">
    <template v-if="imgVal">
      <image :src="imgVal" class="icon img-el" mode="aspectFit" />
      <u-icon class="close-btn" name="close-circle" color="#b3b3b3" size="32rpx" @tap="handleDel"></u-icon>
    </template>
    <image v-else src="/static/images/commission/ic_upload_add.png" class="icon" mode="aspectFit" @tap="chooseImage" />
  </view>
</template>

<script>
import {userApi} from '@/api'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      test: false
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
        success: (res) => {
          const tempFiles = res.tempFiles;
          console.log('res', res);
          uni.showLoading({
            title: '正在上传'
          });
          userApi.uploadImg({filePath: tempFiles[0]['path']}).then((res) => {
            this.imgVal = res.path || '';
          }).finally(() => {
            uni.hideLoading();
          })
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
.btn-upload {
  width: 100%;
  height: 300rpx;
  border-radius: 6rpx;
  margin-bottom: 16rpx;
  position: relative;
  overflow: hidden;
  border: 1px dashed #ccc;
  background: #fafbfc;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
    &.img-el {
      background: #000;
    }
  }
  .close-btn {
    position: absolute;
    top: 50%;
    right: 20rpx;
    transform: translate3d(0, -50%, 0);
  }
}
</style>