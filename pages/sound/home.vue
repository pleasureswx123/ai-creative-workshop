<template>
  <page-meta page-style="background: var(--bg-color1)" />
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <PicHeader title="欢迎使用文字转语音功能，你的智能配音助手！" />
    <TitleCell title="配音文案">
      <template #right>
        <text @tap="jumpHistory">历史配音</text>
      </template>
    </TitleCell>
    <QmTextarea :value.sync.trim="describe" :maxlength="300"></QmTextarea>
	<QmTimbre></QmTimbre>
  </view>
</template>

<script>
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import QmTextarea from './components/QmTextarea.vue';
import QmTimbre from './components/QmTimbre.vue';

export default {
  components: { PicHeader, TitleCell, QmTextarea, QmTimbre },
  data() {
    return {
      describe: ''
    }
  },
  methods: {
	  jumpHistory() {
	    uni.$u.route({url: 'pages/sound/history'})
	  },
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  font-size: 24rpx;
  padding: 0 30rpx 300rpx;
}
</style>