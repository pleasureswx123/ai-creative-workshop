<template>
  <view>
    <view class="select-photo-wrapper" @tap="handleUpload">
      <view @tap.stop>
        <view class="history-select-btn" @tap="showHistoryPop = true">从创作历史选择 ></view>
      </view>
      <view class="select-photo-inner">
        <template v-if="loading">
          <view class="icon-box">
            <uni-icons custom-prefix="iconfont-qm" type="icon-qm-loading-1" color="#fff" size="80" />
          </view>
          <view>正在上传中</view>
        </template>
        <template v-else>
          <uni-icons custom-prefix="iconfont-qm" type="icon-qm-upload" color="#fff" size="80" />
          <view>点击上传图片</view>
        </template>
        <view>支持jpg/png/gif格式的图片，不超过10M</view>
      </view>
    </view>
    <QmWaterFallPop
        v-if="showHistoryPop"
        :show.sync="showHistoryPop"
        :currentInfo.sync="historyInfo"
        title="选择要处理的图片"
        :getList="getHistoryList"
        :proxyList="item => {
          const {img_height: h, img_url, img_width: w, task_id} = item || {};
          const url = img_url || '';
          const titles = url.split('/').slice(-1);
          return {
            ...item,
            allowEdit: false,
            image: url,
            w, h,
            url,
            title: titles[0] || url,
            id: task_id,
            value: 0.8
          }
        }" />
  </view>
</template>

<script>
import { mapActions } from 'vuex';
import { userApi } from '@/api';

export default {
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      showHistoryPop: false,
      historyInfo: null,
    }
  },
  watch: {
    historyInfo(info) {
      const {img_url: imgSrc} = info || {};
      imgSrc && (this.imgSrc = imgSrc);
    }
  },
  computed: {
    imgSrc: {
      get() {
        return this.src
      },
      set(src) {
        this.$emit('update:src', src)
      }
    }
  },
  methods: {
    ...mapActions('PhotoInfo', ['getHistoryList']),
    handleUpload() {
      if(this.loading) {
        return
      }
      uni.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        success: res => {
          const {path: filePath} = res.tempFiles?.[0] || {};
          this.loading = true;
          userApi.uploadImg({filePath}).then(res => {
            this.imgSrc = res.path || '';
          }).finally(() => {
            this.loading = false;
          });
        },
        fail(...args) {
          console.log(args)
        }
      });
    }
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
.select-photo-wrapper {
  border-radius: 20rpx;
  background: #1F2937;
  box-sizing: border-box;
  border: 2rpx solid #494C55;
  height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .history-select-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 60rpx;
    line-height: 60rpx;
    padding: 0 20rpx;
  }
  .select-photo-inner {
    font-size: 30rpx;
    line-height: 1.8;
    text-align: center;
    color: #fff;
    .icon-qm-upload, .icon-qm-loading-1 {
      line-height: 1.2;
    }
    .icon-qm-loading-1 {
      animation: rotate 1s linear infinite;
    }
  }
}

.icon-box {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>