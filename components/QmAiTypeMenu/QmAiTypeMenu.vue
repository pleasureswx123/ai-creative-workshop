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
      <uni-icons custom-prefix="iconfont-qm" :type="getIconName(item.id)" color="#77787B" size="30" />
<!--      <image v-if="item.img" class="icon-img" :src="item.img" mode="aspectFit" />-->
      <view class="stay" v-if="[7,8,9, 10].includes(+item.id)">敬请期待</view>
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
    getInfo(id) {
      const temp = {
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
          url: 'pages/special/novel'
        },
        8: {
          iconName: 'icon-qm-MaterialSymbolsPhotoLibraryRounded',
          url: 'pages/special/make-diagram'
        },
        9: {
          iconName: 'icon-qm-IcRoundModelTraining',
          url: 'pages/special/train-model'
        },
        10: {
          iconName: 'icon-qm-GgDigitalocean',
          url: 'pages/special/digital-humans'
        },
      };
      return temp[id] || {};
    },
    getIconName(id) {
      const { iconName } = this.getInfo(id);
      return iconName || ''
    },
    handleJump(id) {
      const { url } = this.getInfo(id);
      url && uni.$u.route({url});
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