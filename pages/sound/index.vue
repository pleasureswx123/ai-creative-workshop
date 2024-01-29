<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
    <PicHeader title="欢迎使用文字转语音功能，你的智能配音助手！" />
    <TitleCell title="配音文案">
      <template #right>
        <text @tap="jumpHistory">历史配音</text>
      </template>
    </TitleCell>
    <QmTextarea :value.sync.trim="describe"></QmTextarea>
    <TitleCell title="选择音色">
      <template #right>
        <TryListen ref="listen" :url="dubUrl"></TryListen>
      </template>
    </TitleCell>
    <QmRadioPlain :list="dubList" :value.sync="timbre"></QmRadioPlain>
    <QmSlider :value.sync="volume" type="volume"></QmSlider>
    <QmSlider :value.sync="speed" type="speed"></QmSlider>
    <GenerateBtn :disabled="disabled" @cb="handleGenerate"></GenerateBtn>
  </view>
</template>

<script>
import {soundApi} from '@/api'
import {mapState, mapActions} from 'vuex';
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import TryListen from './components/TryListen.vue';
import QmRadioPlain from './components/QmRadioPlain.vue';
import QmSlider from './components/QmSlider.vue';
import QmTextarea from './components/QmTextarea.vue';

export default {
  components: { PicHeader, TitleCell, TryListen, QmRadioPlain, QmSlider, QmTextarea },
  data() {
    return {
      describe: '',
      timbre: '',
      volume: 2,
      speed: 2,
      timer: null,
    }
  },
  computed: {
    ...mapState('SoundInfo', ['dubList']),
    dubUrl() {
      const {url} = this.dubList.find(item => item.id === this.timbre) || {};
      return url || ''
    },
    disabled() {
      return !(this.describe && this.timbre && !!this.speed && !!this.volume)
    },
    params() {
      return {
        content: this.describe || '',
        dub_id: this.timbre || '',
        dub_volume: ['0.2', '0.3', '1', '2', '3'][this.volume - 1],
        dub_speed: ['0.7', '0.8', '1', '1.3', '1.6'][this.speed - 1],
      }
    }
  },
  mounted() {
    this.getDubList({page: 1, pagesize: 20})
  },
  onHide() {
    this.clearTimer();
    this.$refs?.listen?.destroyAudio?.()
  },
  methods: {
    ...mapActions('SoundInfo', ['getDubList', 'createTask']),
    jumpHistory() {
      uni.$u.route({url: 'pages/sound/history'})
    },
    clearTimer() {
      if(this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handleGenerate(cb) {
      this.createTask(this.params).then(({task_id}) => {
        const func = () => {
          soundApi.getTaskstate({task_id}).then(({state}) => {
            if(state === 2) {
              cb && cb();
              this.clearTimer();
              uni.$u.toast('生成任务失败');
              return
            }
            if(state === 1) {
              this.clearTimer();
              cb && cb();
              uni.$u.route({
                url: `pages/sound/history`
              });
              return;
            }
          })
        }
        this.timer = setInterval(() => {
          func();
        }, 1000);
      }).catch(err => {
        cb && cb();
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
  padding: 0 30rpx 160rpx;
}
</style>