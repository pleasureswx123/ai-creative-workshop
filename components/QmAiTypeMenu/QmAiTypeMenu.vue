<template>
  <view class="aiType">
    <view
        class="item-box"
        v-for="item in aiTypeList"
        :data-id="item.id"
        :key="item.id"
        @tap="handleJump(item.id)">
      <view class="item-con">
        <view class="title">{{item.title}}</view>
        <view class="con">{{item.content}}</view>
      </view>
      <image v-if="item.img" class="icon-img" :src="item.img" mode="aspectFit" />
<!--      <view class="stay" v-if="[6,7,8,9].includes(+item.id)">敬请期待</view>-->
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('HomeInfo', ['aiTypeList']),
  },
  methods: {
    handleJump(id) {
      const temp = {
        1: 'pages/ai/index',
        2: 'pages/photos/index',
        3: 'pages/picture/tool',
        4: 'pages/picture/video-tool',
        5: 'pages/sound/index',
        6: 'pages/special/personal-photo',
        7: 'pages/special/novel',
        8: 'pages/special/make-diagram',
        9: 'pages/special/train-model',
        10: 'pages/special/digital-humans',
      };
      const url = temp[`${id}`] || '';
      url && uni.$u.route({url});
    },
  }
}
</script>

<style lang="scss" scoped>
.aiType {
  padding: 30rpx 40rpx;
  .item-box {
    display: flex;
    gap: 30rpx;
    align-items: center;
    background-color: #1D1E23;
    margin-bottom: 30rpx;
    padding: 30rpx;
    border-radius: 10rpx;
    position: relative;
    .item-con {
      flex: 1;
      min-width: 0;
      .title {
        color: #fff;
        font-size: 28rpx;
        margin-bottom: 10rpx;
      }
      .con {
        color: #77787B;
        font-size: 26rpx;
      }
    }
    .icon-img {
      width: 48rpx;
      height: 48rpx;
    }
  }
  .stay{
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(246, 6, 82, 1);
    color:rgba(255, 255, 255, .9);
    text-align: center;
    width: 136rpx;
    height: 44rpx;
    line-height: 44rpx;
    border-radius: 0 16rpx 0 16rpx;
    font-size: 22rpx;
  }
}
</style>