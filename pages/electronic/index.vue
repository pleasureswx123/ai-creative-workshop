<template>
  <LayoutPage>
    <TabsBox :value.sync="task_type" :options="tabsList"></TabsBox>
    <template v-if="task_type === 28">
      <PhotoGenerateResult v-if="finalUrl" :imgs="finalUrl"></PhotoGenerateResult>
      <AuiPhotoModify :loading="loading" ref="photoTool" :src.sync="reference_image"></AuiPhotoModify>
      <AuiDescribe :value.sync="prompt"></AuiDescribe>
      <AuiProduceBtn
          :pieces="pieces"
          :taskType="task_type"
          :value.sync="batch_size"
          :loading="loading"
          @cb="handle28Comfirm"></AuiProduceBtn>
      <Setting :value.sync="setting"></Setting>
      <template v-if="setting">
<!--        <ExtendDirection :value.sync="directions"></ExtendDirection>
        <PersonEnhance :value.sync="enhanceType"></PersonEnhance>-->
        <AuiTemplateImageStyle
            :key="task_type"
            title="图片风格 Style（可不选）"
            :params="{task_type}"
            componentName="ImgStyleItem"
            :getList="getImgStyleList"
            :proxyList="item => ({ ...item, id: item.img_style_id, value: 0.8 })"
            :currentInfo.sync="photoStyleInfo"></AuiTemplateImageStyle>
        <LoraCard
            title="使用专属商业定制模型"
            :params="{class_id: modeId, is_commercial: 1}"
            componentName="LoraItem"
            :getList="getLoraList"
            :proxyList="item => ({ ...item, id: item.lora_id, value: 1 })"
            :currentInfo.sync="loraInfo"></LoraCard>
      </template>
    </template>
    <template v-if="task_type === 29">
      <ModelSelectCard
          @showPopFunc="showModelSelectPop = true"
          :info="currentModeInfo" />
      <AuiDescribe :value.sync="prompt"></AuiDescribe>
      <LoraCard
          title="使用专属商业定制模型"
          :params="{class_id: modeId, is_commercial: 1}"
          componentName="LoraItem"
          :getList="getLoraList"
          :proxyList="item => ({ ...item, id: item.lora_id, value: 1 })"
          :currentInfo.sync="loraInfo"></LoraCard>
      <AuiTemplateImageStyle
          :key="task_type"
          title="图片风格 Style（可不选）"
          :params="{task_type}"
          componentName="ImgStyleItem"
          :getList="getImgStyleList"
          :proxyList="item => ({ ...item, id: item.img_style_id, value: 0.8 })"
          :currentInfo.sync="photoStyleInfo"></AuiTemplateImageStyle>
      <AuiDescribe
          title="负面描述词"
          :maxlength="1000"
          placeholder="输入不希望在画面中看见的内容，越靠前作用越明显"
          :value.sync="negative_prompt" />
      <AuiQmRatio
          :value.sync="img_scale"
          :list="ImgRatioInfo" />
      <AuiProduceBtn
          :pieces="pieces"
          :taskType="task_type"
          :value.sync="batch_size"
          :loading="loading29"
          @cb="handle29Comfirm"></AuiProduceBtn>
  
      <QmPop
          v-if="showModelSelectPop"
          :title="`选择模型${currentModelInfo.title}`"
          componentName="ModelStyleItem"
          :paramsInfo="{class_id: modeId, task_type: 29}"
          :getList="getModelList"
          :proxyList="item => ({ ...item, id: item.model_style_id })"
          :show.sync="showModelSelectPop"
          :currentInfo.sync="currentModeInfoData">
        <template #tips>
          <view class="tips-txt">
            {{currentModelInfo.content}}
          </view>
        </template>
      </QmPop>
    </template>
    <template v-if="task_type === 30">
    
    </template>
  </LayoutPage>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import {pictureApi} from '@/api';
import Setting from './components/Setting.vue';

export default {
  components: {
    Setting
  },
  onLoad(options) {
    const {id, src} = options || {};
    this.task_type = +id || 29;
    this.reference_image = src || '';
    this.initData();
  },
  data() {
    return {
      pieces: 2,
      generateState: 1,  // 1:初始化状态 2:开始生成状态 3:生成成功状态
      finalUrl: '',
      timer: null,
      task_type: '',
      tabsList: [
        {name: '商业出图', value: 29},
        {name: '专业修图', value: 28},
        // {name: '人物修图', value: 30},
      ],
      reference_image: '',
      reference_image_extend: '',
      prompt: '',
      batch_size: 1,
      setting: true,
      directions: [],
      // enhanceType: '',
      photoStyleInfo: null,
      loading: false,
      // 商业出图
      loading29: false,
      modeId: 2,
      showModelSelectPop: false,
      loraInfo: null,
      negative_prompt: '',
      img_scale: 5,
    }
  },
  watch: {
    task_type(id) {
      this.photoStyleInfo = null;
      if(id === 29) { // 商业出图
        this.initData();
      }
    }
  },
  destroyed() {
    this.clearTimer();
  },
  computed: {
    ...mapState('PhotoInfo', ['modeClassInfo', 'currentModeInfo', 'ImgRatioInfo']),
    model_style_id() {
      return this.currentModeInfo?.model_style_id || ''
    },
    currentModeInfoData: {
      get() {
        return this.currentModeInfo
      },
      set(info) {
        this.setCurrentModeInfo(info)
      }
    },
    currentModelInfo() {
      return this.modeClassInfo.find(item => item.id === this.modeId);
    },
    img_style_id() {
      return this.photoStyleInfo?.id || this.photoStyleInfo?.img_style_id || ''
    },
    lora_id() {
      return this.loraInfo?.lora_id || ''
    },
    lora_weight() {
      return this.loraInfo?.value || ''
    },
    params29() {
      return {
        task_type: this.task_type,
        model_parentclass_id: this.modeId,
        model_style_id: this.model_style_id,
        prompt: this.prompt || '',
        negative_prompt: this.negative_prompt || '',
        lora_id: this.lora_id || '',
        lora_weight: this.lora_weight || '',
        img_style_id: this.img_style_id || '',
        img_scale: this.img_scale || 5,
        batch_size: this.batch_size || 1,
      }
    },
    params28() {
      return {
        task_type: this.task_type,
        reference_image: this.reference_image || '',
        reference_image_extend: this.reference_image_extend || '',
        prompt: this.prompt || '',
        batch_size: this.batch_size || 1,
        ...(this.setting ? {
          // upper: this.directions.includes('up') ? 1 : 0,
          // below: this.directions.includes('down') ? 1 : 0,
          // left: this.directions.includes('left') ? 1 : 0,
          // right: this.directions.includes('right') ? 1 : 0,
          img_style_id: this.img_style_id,
          lora_id: this.lora_id || '',
          lora_weight: this.lora_weight || '',
        } : {
          // upper: 0, below: 0, left: 0, right: 0,
          img_style_id: '', lora_id: '', lora_weight: '', }),
      }
    }
  },
  methods: {
    ...mapActions('PictureInfo', ['createTask']),
    ...mapActions('PhotoInfo', {
      createPhotoTask: 'createTask'
    }),
    ...mapMutations('PhotoInfo', ['setCurrentModeInfo', ]),
    ...mapActions('PhotoInfo', ['getModelClass', 'getImgStyleList', 'getModelStyleList', 'getModelList', 'getImgScale', 'getLoraList']),
    showTips(msg) {
      uni.showModal({
        title: '提示',
        content: msg,
        confirmText: '确定',
        showCancel: false,
      })
    },
    initData() { // 商业出图 29
      this.getModelClass().then(() => {
        Promise.all([
          this.getModelStyleList({page: 1, pagesize: 10, class_id: this.modeId, task_type: 29}),
          this.getImgScale({class_id: this.modeId})
        ]).then(res => {
        })
      })
    },
    clearTimer() {
      if(this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    handle29Comfirm() {
      if(!this.prompt) {
        return this.showTips('请输入画面描述词');
      }
      if(!this.lora_id) {
        return this.showTips('请选择专属商业定制模型');
      }
      if (this.loading29) {
        return
      }
      this.loading29 = true;
      this.createPhotoTask(this.params29).then(({task_id}) => {
        if(!!task_id) {
          this.onTrack();
          setTimeout(() => {
            uni.reLaunch({
              url: '/pages/picture/index'
            })
          }, 100)
        } else {
          uni.showModal({
            title: '提示',
            content: '生成失败，请重新生成！',
            confirmText: '确定',
            showCancel: false,
            success: function () {}
          })
        }
      }).finally(() => {
        this.loading29 = false;
      })
    },
    handle28Comfirm() {
      if(this.finalUrl) {
        this.finalUrl = '';
      }
      if(!this.reference_image) {
        return this.showTips('请上传图片');
      }
      if(!this.prompt) {
        return this.showTips('请输入画面描述词');
      }
      if (this.loading) {
        return
      }
      this.loading = true;
      this.$refs.photoTool.getMaskImgSrc().then(path => {
        this.reference_image_extend = path;
        this.createTask(this.params28).then(({task_id}) => {
          this.onTrack();
          const func = () => {
            pictureApi.getTaskstate({task_id}).then((res) => {
              const {state, url} = res || {};
              if (state === 2) { // 生成失败
                this.loading = false;
                this.clearTimer();
                uni.$u.toast('生成任务失败');
                return
              }
              if (state === 1) { // 生成成功
                this.loading = false;
                this.clearTimer();
                if(Object.prototype.toString.call(url) === '[object String]') {
                  if(url.includes(',')) {
                    this.finalUrl = url.split(',');
                  } else {
                    this.finalUrl = [url];
                  }
                }
                if(Object.prototype.toString.call(url) === '[object Array]') {
                  this.finalUrl = url
                }
                // uni.reLaunch({
                //   url: '/pages/picture/index'
                // })
                return;
              }
            }).catch(() => {
              this.loading = false;
              this.clearTimer();
            })
          }
          this.timer = setInterval(() => {
            func();
          }, 3000);
        }).catch(() => {
          this.loading = false;
        })
      }).catch(() => {
        this.loading = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>