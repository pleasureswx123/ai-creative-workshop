<template>
  <page-meta page-style="background: #fff" />
  <div class="page-container">
    <PicHeader title="欢迎使用文字转语音功能，你的智能配音助手！" />
    <TitleCell title="配音文案">
      <template #right>
        <text>历史配音</text>
      </template>
    </TitleCell>
    <QmTextarea :value.sync.trim="describe"></QmTextarea>
    <TitleCell title="选择音色">
      <template #right>
        <TryListen></TryListen>
      </template>
    </TitleCell>
    <QmRadioPlain :value.sync="timbre"></QmRadioPlain>
    <view>1313</view>
  </div>
</template>

<script>
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import TryListen from './components/TryListen.vue';
import QmRadioPlain from './components/QmRadioPlain.vue';
import QmTextarea from './components/QmTextarea.vue';

export default {
  components: { PicHeader, TitleCell, TryListen, QmRadioPlain, QmTextarea },
  data() {
    return {
      describe: '',
      timbre: '',
    }
  },
  computed: {
  },
  methods: {
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