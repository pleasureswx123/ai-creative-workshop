<template>
  <view v-if="num > 0" class="tips-box" @tap="jump">
    <view class="title">{{txt}}</view>
    <view class="value">去创建历史查看</view>
    <uni-icons custom-prefix="iconfont-qm" type="icon-qm-arrow-right" color="var(--txt-color2)" size="14" />
  </view>
</template>

<script>
import {photoApi} from '@/api';

export default {
  computed: {
    txt() {
      return `${this.num}个任务进行中...`
    }
  },
  data() {
    return {
      num: 10
    }
  },
  created() {
    photoApi.getQueue().then(res => {
      this.num = res?.queue_num || 0
    })
  },
  methods: {
    jump() {
      uni.$u.route({
        url: 'pages/picture/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tips-box{
  background: var(--bg-color2);
  height: 90rpx;
  margin: 0 0 20rpx;
  padding: 0 30rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: var(--txt-color1);
  .title {
    flex: 1;
    min-width: 0;
  }
  .value {
    color: var(--txt-color2);
  }
}
</style>