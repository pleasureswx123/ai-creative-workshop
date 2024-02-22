<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="content">
      <view v-if="info.title" class="title">{{ info.title }}</view>
      <u-gap v-else height="30" />
      <template v-if="info.content">
        <u-parse :content="info.content"></u-parse>
      </template>
      <view v-else class="empty-box">暂无内容</view>
    </view>
  </view>
</template>

<script>
import { articleApi } from '@/api';

export default {
  data() {
    return {
      info: {},
      params: {},
    };
  },
  onLoad(options) {
    const {type, id = ''} = options || {};
    const temp = {
      about: '关于我们',
      kefu: '联系客服',
      privacy: '隐私政策',
      service: '服务协议',
      notice: '通知公告',
      legal: '免责声明',
      commission: '推广协议',
    };
    const title = temp[`${type}`] || '';
    title && uni.setNavigationBarTitle({title});
    const paramsObj = {type};
    id && (paramsObj.id = id);
    this.params = paramsObj;
  },
  onShow() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      articleApi.getArticle(this.params).then(res => {
        this.info = res;
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  background: #0D0D0D;
  font-size: 24rpx;
  padding: 30rpx 30rpx 300rpx;
}
.content {
  border-radius: 10rpx;
  padding: 0 30rpx 30rpx;
  background-color: #fff;
  color: #666;
  .title {
    color: #333;
    font-size: 28rpx;
    font-weight: 700;
    height: 80rpx;
    line-height: 80rpx;
  }
  .empty-box {
    height: 500rpx;
    display: grid;
    place-content: center;
    color: #ccc;
    margin-bottom: 80rpx;
  }
}
/deep/ uni-video {
  width: 100%!important;
  aspect-ratio: 4 / 3!important;
  height: 100%!important;
}
</style>
