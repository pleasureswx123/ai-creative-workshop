<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="history-container">
      <HistoryItem v-for="item in list" :info="item" :key="item.task_id" @playAudio="handlePlayAudio"></HistoryItem>
    </view>
    <QmLoadMore :status="loadStatus"></QmLoadMore>
    <view class="btn-container">
      <view class="btn-box" @tap="jump">新的合成</view>
    </view>
  </view>
</template>

<script>
import {mapActions} from 'vuex';
import HistoryItem from './components/HistoryItem.vue';

export default {
  components: {
    HistoryItem
  },
  data() {
    return {
      audioContext: null,
      list: [],
      page: 1,
      pagesize: 20,
      loadStatus: '', // more/loading/noMore
    }
  },
  onShow() {
    this.initParams();
    this.loadMore();
  },
  onPullDownRefresh() {
    this.initParams();
    this.loadMore().then(() => {
      uni.stopPullDownRefresh();
    });
  },
  onReachBottom() {
    this.page += 1;
    this.loadMore();
  },
  beforeDestroy() {
    this.destroyAudio();
  },
  onHide() {
    this.destroyAudio();
  },
  methods: {
    ...mapActions('SoundInfo', ['getTaskList']),
    initParams() {
      this.list = [];
      this.page = 1;
      this.loadStatus = '';
    },
    loadMore() {
      if(this.loadStatus === 'noMore') {
        return;
      }
      this.loadStatus = 'loading';
      return this.getTaskList({page: this.page, pagesize: this.pagesize}).then(res => {
        const {list = []} = res || {};
        this.list = [...this.list, ...(list || [])];
        this.loadStatus = list.length < this.pagesize ? 'noMore' : 'more';
      })
    },
    jump() {
      uni.$u.route({
        url: 'pages/sound/home'
      })
    },
    handlePlayAudio(info) {
      this.destroyAudio();
      this.audioContext = uni.createInnerAudioContext();
      this.audioContext.src = info.dub_url;
      this.playAudio();
    },
    playAudio() {
      if (this.audioContext) {
        this.audioContext.play();
      }
    },
    pauseAudio() {
      if (this.audioContext) {
        this.audioContext.pause();
      }
    },
    stopAudio() {
      if (this.audioContext) {
        this.audioContext.stop();
      }
    },
    destroyAudio() {
      this.pauseAudio();
      this.stopAudio();
      if (this.audioContext) {
        this.audioContext.destroy();
      }
    },
    updateTime() {
      if (this.audioContext) {
        this.audioContext.onTimeUpdate(() => {
          this.currentTime = this.audioContext.currentTime.toFixed(2);
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding-bottom: calc(200rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(200rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
}
.btn-container {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 140rpx;
  padding-top: 20rpx;
  //background: var(--txt-color2);
}
.btn-box {
  width: 50%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  position: relative;
  background: var(--red-color1);
  color: var(--txt-color4);
  gap: 4rpx;
  cursor: pointer;
}

.history-container {
  padding: 30rpx;
  display: grid;
  gap: 30rpx;
  grid-template-columns: repeat(1, 1fr);
  margin-bottom: 50rpx;
}

@media screen and (min-width: 750px) {
  .history-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>