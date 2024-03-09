<template>
  <view class="aiType">
    <view
        class="item-box"
        :class="{highlight: !!item.highlight}"
        v-for="item in aiTypeList"
        :data-id="item.id"
        :key="item.id"
        @tap="handleJump(item)">
      <view class="item-con">
        <view class="title">{{item.title}}</view>
        <view class="con">{{item.content}}</view>
      </view>
      <uni-icons v-if="aiTypeListInfo[item.id] && aiTypeListInfo[item.id].iconName" custom-prefix="iconfont-qm" :type="aiTypeListInfo[item.id].iconName" color="#77787B" size="30" />
      <view class="stay" v-if="!!item.is_expectation">敬请期待</view>
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState('HomeInfo', ['aiTypeList']),
    aiTypeListInfo() {
      return {
        1: {
          // iconName: 'icon-qm-MaterialSymbolsChatOutlineRounded',
          iconName: 'icon-qm-chat',
          url: 'pages/ai/index'
        },
        2: {
          iconName: 'icon-qm-MaterialSymbolsLinkedCameraRounded',
          url: 'pages/photos/index'
        },
        3: {
          iconName: 'icon-qm-MdiImageEdit',
          url: 'pages/picture/tool'
        },
        4: {
          iconName: 'icon-qm-MaterialSymbolsVideoCallRounded',
          url: 'pages/picture/video-tool'
        },
        5: {
          iconName: 'icon-qm-MaterialSymbolsAutoDetectVoice',
          url: 'pages/sound/index'
        },
        6: {
          iconName: 'icon-qm-MaterialSymbolsPhotoCameraFront',
          url: 'pages/picture/personal-photo-tool'
        },
        7: {
          iconName: 'icon-qm-MaterialSymbolsMenuBook',
          url: 'pages/special/tweets',
          expectationUrl: 'pages/special/novel'
        },
        8: {
          iconName: 'icon-qm-MaterialSymbolsPhotoLibraryRounded',
          url: 'pages/electronic/index',
          expectationUrl: 'pages/special/make-diagram',
        },
        9: {
          iconName: 'icon-qm-IcRoundModelTraining',
          url: 'pages/special/train-model',
          expectationUrl: 'pages/special/train-model',
        },
        10: {
          iconName: 'icon-qm-GgDigitalocean',
          url: 'pages/human/index',
          expectationUrl: 'pages/special/digital-humans',
          // expectationUrl: 'pages/human/index',
        },
        11: {
          iconName: 'icon-qm-woman',
          url: 'pages/picture/woman-tool',
          expectationUrl: 'pages/picture/woman-tool',
        },
      }
    }
  },
  methods: {
    handleJump(item) {
      const {id, is_expectation} = item || {};
      const {url, expectationUrl} = this.aiTypeListInfo[`${id}`] || {};
      let path = url;
      if(!!is_expectation) {
        path = expectationUrl;
      }
      path && uni.$u.route({url: path});
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