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
	<QmTimbre ref="QmTimbre"></QmTimbre>
	<GenerateBtn :loading="generating" @cb="handleGenerate" :btnInfo="btnInfo"></GenerateBtn>
  </view>
</template>

<script>
import {soundApi} from '@/api'
import {mapState, mapActions} from 'vuex';
import PicHeader from './components/PicHeader.vue';
import TitleCell from './components/TitleCell.vue';
import QmTextarea from './components/QmTextarea.vue';
import QmTimbre from './components/QmTimbre.vue';

export default {
	provide() {
	  return {
		toastTipsErrorTxt: this.toastTipsErrorTxt
	  }
	},
  components: { PicHeader, TitleCell, QmTextarea, QmTimbre },
  data() {
    return {
      describe: '',
	  generating: false,
	  task_id:'',
	  timer: null,
	  dub_id:''
    }
  },
  onLoad() {
    this.taskType = 19;
  },
  computed:{
    btnInfo() {
      return {btnTxt: '开始生成', loadingBtnTxt: '正在生成...', tipTxt: this.integralTips};
    }
  },
  methods: {
	  jumpHistory() {
	    uni.$u.route({url: 'pages/sound/history'})
	  },
	  toastTipsErrorTxt() {
	  },
	  clearTimer() {
	    if(this.timer) {
	      clearInterval(this.timer);
	      this.timer = null;
	    }
	  },
	  handleGenerate(){
		  this.activeIndex = this.$refs.QmTimbre.$refs.Timbre.asActive
		  this.isActive = this.$refs.QmTimbre.$refs.Timbre.isActive
		  if(this.isActive == 0){
			  this.type = 2
			  this.dub_id = this.$refs.QmTimbre.$refs.Timbre.audioList[this.activeIndex].dub_id
		  }else{
			  this.type = 1
			  this.audioActive = this.$refs.QmTimbre.$refs.Timbre.$refs.QmRecom.isActive
			  this.dub_id = this.$refs.QmTimbre.$refs.Timbre.$refs.QmRecom.audioList[this.audioActive].id
		  }
		  soundApi.createTask({
			  content: this.describe || '',
			  dub_volume: ['0.2', '0.3', '1', '2', '3'][this.$refs.QmTimbre.$refs.QmConfig.volume],
			  dub_speed: ['0.7', '0.8', '1', '1.3', '1.6'][this.$refs.QmTimbre.$refs.QmConfig.speed],
			  type:this.type,
			  dub_id:this.dub_id
		  }).then(res => {
				this.generating = true;
				this.task_id = res.task_id
				this.getTaskstate()
				this.timer = setInterval(() => {
				    setTimeout(this.getTaskstate, 0)
				}, 3000);
		  })
	  },
	  getTaskstate(){
		  soundApi.getTaskstate({
			  task_id:this.task_id
		  }).then(res => {
		    if(res.state == 2) {
		      this.generating = false;
			  this.clearTimer();
		      uni.$u.toast('生成任务失败');
		      return
		    }
		    if(res.state == 1) {
		      this.generating = false;
			  this.clearTimer();
		      uni.$u.route({
		        url: `pages/sound/history`
		      });
		      return;
		    }
		  }).catch(() => {
		    this.generating = false;
			this.clearTimer();
		  })
	  }
  },
  onHide() {
  	this.clearTimer()
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  font-size: 24rpx;
  padding: 0 30rpx 300rpx;
}
</style>