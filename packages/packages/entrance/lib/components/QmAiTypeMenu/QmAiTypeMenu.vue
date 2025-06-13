<template>
  <view class="aiType">
    <view
        class="item-box"
        data-agl-cvt="1"
        :class="{highlight: !!item.highlight}"
        v-for="item in aiTypeList"
        :data-id="item.id"
        :key="item.id"
        @tap="handleJump(item)">
      <view class="item-con">
        <view class="title">{{item.title}}</view>
        <view class="con">{{item.content}}</view>
      </view>
      <uni-icons v-if="item.iconName" custom-prefix="iconfont-qm" :type="item.iconName" color="#77787B" size="30" />
      <view class="stay abcd89" v-if="!!item.is_expectation">敬请期待</view>
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
    handleJump(item) {
      const {is_expectation, params = {}, url, expectationUrl} = item || {};
      let path = url;
      if(!!is_expectation) {
        path = expectationUrl;
      }
      path && uni.$u.route({url: path, params});
    },
  }
}
</script>

<style lang="scss" scoped>
.aiType {
  padding: 0 20rpx 20rpx;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20rpx;
  .item-box {
    display: flex;
    gap: 30rpx;
    align-items: center;
    background-color: #1D1E23;
    padding: 30rpx;
    border-radius: 10rpx;
    position: relative;
    cursor: pointer;
    &.highlight {
      background-color: var(--red-color1);
      .iconfont-qm {
        color: #fff!important;
      }
    }
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
  }
  .stay{
    position: absolute;
    right: 0;
    top: 0;
    background-color: var(--red-color1);
    color:rgba(255, 255, 255, .9);
    text-align: center;
    width: 136rpx;
    height: 44rpx;
    line-height: 44rpx;
    border-radius: 0 16rpx 0 16rpx;
    font-size: 22rpx;
  }
}

@media screen and (min-width: 750px) and (max-width: 960px){
  .aiType {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 960px) {
  .aiType {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>