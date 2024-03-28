<template>
  <Layout>
    <PicHeader title="视频转绘" />
    <view class="description-tips">
      上传一段视频，再选择一个风格， <br />
      你将得到一段令人耳目一新的视频。
    </view>
    
    <TitleCell
        title="上传原视频"
        :isShowRight="false" />
    <VideoInfo
        v-if="generateState === 3"
        :showDownload="true"
        :src="finalUrl" />
    <UploadImg
        v-else
        type="video"
        :generating="generating"
        :value.sync="sourceImg" />
  
    <template v-if="generateState === 1">
      <TitleCell
          title="选择转绘风格"
          :isShowRight="false" />
      <QmCardDrawStyle
          @showPop="showPop = true"
          :info="currentDrawStyle" />
      <QmPop
          title="选择转绘风格"
          componentName="StyleItem"
          :paramsInfo="{task_type: 11}"
          :getList="getTemplate"
          :show.sync="showPop"
          :initStatus="true"
          :currentInfo.sync="currentDrawStyle">
<!--        <template #tips>
          <view class="tips-txt">
            基于SD1.5训练或微调的各种大模型，对各种画风Lora的兼容表现更好，兼顾出图质量和速度。
          </view>
        </template>-->
      </QmPop>
  
      <TitleCell
          title="生成时长"
          :isShowRight="false" />
      <QmRadio
          :value.sync="generation_duration"
          :options="radioOptions" />
    </template>
    
    <template #footer>
      <AuiGenerateBtn :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
    </template>
  </Layout>
</template>

<script>
import {mapActions} from 'vuex';
import PicMixins from './mixin';
import VideoInfo from './components/VideoInfo.vue'

export default {
  mixins: [PicMixins],
  components: { VideoInfo },
  data() {
    return {
      showPop: false,
      sourceImg: '',
      generation_duration: '',
      currentDrawStyle: null,
      toastTips: {
        reference_video: {
          txt: '请上传视频'
        },
        template_id: {
          txt: '请选择模板'
        },
        generation_duration: {
          txt: '请选择时长'
        },
      },
    }
  },
  methods: {
    ...mapActions('PictureInfo', ['getTemplate']),
  },
  computed: {
    btnInfo() {
      let result = '';
      const temp = this.userIntegral?.[`${this.taskType}`] || {};
      const {is_show, consume} = temp;
      if(+is_show) {
        const {A_show, B_show} = consume || {};
        const mp = {
          5: A_show,
          10: B_show
        }
        result = mp[`${this.generation_duration}`];
      }
      const res = {btnTxt: '开始生成', loadingBtnTxt: '正在生成...', tipTxt: result};
      // const temp = {btnTxt: '开始生成', loadingBtnTxt: '正在生成...', tipTxt: ''};
      return this.generateState === 3 ? {btnTxt: '重新生成'} : res;
    },
    radioOptions() {
      return (this.taskDetail?.expand_model?.generation_duration || []).map(item => {
        const { val, val_name } = item || {};
        return { label: val_name, value: val}
      })
    },
    templateId() {
      return this.currentDrawStyle?.id || ''
    },
    disabled() {
      return !(this.sourceImg && this.templateId && this.generation_duration)
    },
    params() {
      return {
        // 任务类型 2图生视频 3智能换脸 4去除背景 5更换背景 6智能扩图 7高清重绘 8局部重绘
        task_type: 11,
        generation_duration: this.generation_duration || '',
        template_id: this.templateId || '',
        reference_video: this.sourceImg || ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.description-tips {
  color: var(--txt-color2);
  text-align: center;
  font-size: 24rpx;
  padding: 30rpx 0 20rpx;
  line-height: 1.5;
}
</style>