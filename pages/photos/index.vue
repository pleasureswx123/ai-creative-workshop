<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <TaskTips />
    <view class="page-body" v-if="modeId">
      <QmTabs
          :value.sync="modeId"
          :options="modeClassInfo" />
      <view class="page-grid-con">
        <view>
          <ModelSelectCard
              @showPopFunc="showModelSelectPop = true"
              :info="currentModeInfo" />
          <Describe
              title="画面描述词"
              :maxlength="maxlength"
              placeholder="请输入描述文字以短句、短语为佳，支持中、英文输入"
              :value.sync="description" />
          <ControlNetCard
              v-if="modeId === 1"
              @showPopFunc="showControlNetPop"
              :info.sync="controlNetInfo" />
          <LoraCardStyle
              v-if="[1, 2].includes(modeId)"
              @showPopFunc="showLoraPop = true"
              :info.sync="loraInfo" />
  
          <TemplateImageStyle
              title="图片风格 Style（可不选）"
              :params="{}"
              componentName="ImgStyleItem"
              :getList="getImgStyleList"
              :proxyList="item => ({ ...item, id: item.img_style_id, value: 0.8 })"
              :currentInfo.sync="photoStyleInfo"></TemplateImageStyle>
        </view>
        <view>
        <ReferenceImgCard
            v-if="[1, 2].includes(modeId)"
            @showPopFunc="showHistoryPop = true"
            @setReferenceImgInfo="setReferenceImgInfo"
            :info.sync="referenceImgInfo" />
        <Describe
            title="负面描述词"
            :maxlength="maxlength"
            placeholder="输入不希望在画面中看见的内容，越靠前作用越明显"
            :value.sync="badDescription" />
        <QmRatio
            :value.sync="ratioId"
            :list="ImgRatioInfo" />
        </view>
      </view>
    
      <QmPop
          v-if="showModelSelectPop"
          :title="`选择模型${currentModelInfo.title}`"
          componentName="ModelStyleItem"
          :paramsInfo="{class_id: modeId}"
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
      
      <QmPop
          v-if="showLoraPop"
          title="选择Lora模型"
          componentName="LoraItem"
          :paramsInfo="{class_id: modeId}"
          :getList="getLoraList"
          :proxyList="item => ({ ...item, id: item.lora_id, value: 0.8 })"
          :show.sync="showLoraPop"
          :currentInfo.sync="loraInfo" />
  
  
      <QmPop
          v-if="showHistoryPop"
          :show.sync="showHistoryPop"
          :currentInfo.sync="referenceImgInfo"
          title="选择要处理的图片"
          componentName="HistoryItem"
          :getList="getHistoryList"
          :proxyList="item => {
          const {img_height: h, img_url, img_width: w, task_id} = item || {};
          const url = img_url || '';
          const titles = url.split('/').slice(-1);
          return {
            ...item,
            allowEdit: false,
            image: url,
            w, h,
            url,
            title: titles[0] || url,
            id: task_id,
            value: 0.8
          }
        }" />
      
<!--      <QmWaterFallPop
          v-if="showHistoryPop"
          :show.sync="showHistoryPop"
          :currentInfo.sync="referenceImgInfo"
          title="选择要处理的图片"
          :getList="getHistoryList"
          :proxyList="item => {
            const {img_height: h, img_url, img_width: w, task_id} = item || {};
            const url = img_url || '';
            const titles = url.split('/').slice(-1);
            return {
              ...item,
              allowEdit: false,
              image: url,
              w, h,
              url,
              title: titles[0] || url,
              id: task_id,
              value: 0.8
            }
          }" />-->
      
      <ControinetPop
          v-if="showControinetPop"
          :showStatus.sync="showControinetPop"
          ref="ControinetPopRef"
          @controninetlist="setControlNetInfo" />
    
      <u-gap height="30" />
      <ProduceBtn
          :isShowPieces="[1,2].includes(modeId)"
          taskType="1"
          :value.sync="picNums"
          :loading="generateStatus"
          @cb="startGenerate"></ProduceBtn>

    </view>
  </view>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import LoraCardStyle from '@/components/LoraCard/LoraCardStyle.vue';
import TaskTips from './components/TaskTips.vue';

import ControlNetCard from './components/ControlNet.vue';
import ReferenceImgCard from './components/ReferenceImg.vue';

import ControinetPop from './controinet/controinet.vue'

export default {
  components: { LoraCardStyle, TaskTips,
    ControlNetCard,
    ReferenceImgCard,
    ControinetPop, },
  data() {
    return {
      generateStatus: false,
      showControinetPop: false,
      showModelSelectPop: false,
      showLoraPop: false,
      showHistoryPop: false,
      maxlength: 1000,
      taskId: '',
      taskInfo: null,
      modeId: '',
      description: '',
      controlNetInfo: null,
      loraInfo: null,
      photoStyleInfo: null,
      referenceImgInfo: null,
      badDescription: '',
      ratioId: 5, // 默认出图比例为 头像
      picNums: 1,
    }
  },
  computed: {
    ...mapState('PhotoInfo', ['modeClassInfo', 'currentModeInfo', 'ImgRatioInfo']),
    photosModelList() {
      return this.modeClassInfo.find(item => item.id === this.modeId);
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
    }
  },
  methods: {
    ...mapMutations('PhotoInfo', ['setCurrentModeInfo', ]),
    ...mapActions('PhotoInfo', ['getModelClass', 'getModelStyleList', 'getModelList', 'getLoraList',
      'getImgStyleList', 'getHistoryList', 'getImgScale', 'getSameModel', 'createTask']),
    showControlNetPop(){
      this.showControinetPop = true;
      this.$nextTick(() => {
        this.$refs.ControinetPopRef.open();
      })
    },
    setControlNetInfo(info) {
      this.showControinetPop = false;
      this.controlNetInfo = info;
    },
    setReferenceImgInfo({img_url: url}) {
      this.referenceImgInfo = {
        url, value: 0.8,
        title: url?.split?.('/')?.slice(-1)?.[0] || url
      };
    },
    startGenerate() {
      if(this.generateStatus) {
        return;
      }
      this.generateStatus = true;
      this.checkLoginStatus().then(() => {
        const params = {
          task_type: 1,
          model_parentclass_id: this.modeId,
          model_style_id: this.currentModeInfo?.model_style_id || '',
          prompt: this.description || '',
          controlnet_type_id: this.controlNetInfo?.id || '',
          controlnet_img: this.controlNetInfo?.img || '',
          controlnet_img_detect: this.controlNetInfo?.url || '',
          controlnet_weight: this.controlNetInfo?.value || '',
          lora_id: this.loraInfo?.lora_id || '',
          lora_weight: this.loraInfo?.value || '',
          img_style_id: this.photoStyleInfo?.img_style_id || '',
          reference_image: this.referenceImgInfo?.url || '',
          reference_image_weight: this.referenceImgInfo?.value || '',
          negative_prompt: this.badDescription || '',
          img_scale: this.ratioId || 5,
          batch_size: this.picNums || 1,
        };
        try {
          this.createTask(params).then(res => {
            if(res.task_id !== '') {
              this.onTrack();
              setTimeout(() => {
                uni.$u.route({
                  url: 'pages/picture/index'
                });
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
            this.generateStatus = false;
          })
        } catch (e) {
          this.generateStatus = false;
          console.log(e)
        }
      }).catch(() => {
        this.generateStatus = false;
      });
    },
    setTaskInfo () {
      const {
        model_parentclass_id, model_style_img, model_style_content, model_style_id, model_style_title,
        prompt, controlnet_type_id, controlnet_img_detect, controlnet_img, controlnet_weight,
        lora_id, lora_title, lora_content, lora_img, lora_weight,
        img_style_id, img_style_title, img_style_content, img_style_img,
        reference_image, reference_image_weight,
        negative_prompt, img_scale, batch_size
      } = this.taskInfo || {};
      this.setCurrentModeInfo({
        img_url: model_style_img,
        content: model_style_content,
        model_style_id: model_style_id,
        title: model_style_title
      });
      this.description = (prompt || '')?.slice(0, this.maxlength);
      if (controlnet_type_id) {
        this.controlNetInfo = {
          id: controlnet_type_id,
          title: controlnet_type_id,
          url: controlnet_img_detect,
          img: controlnet_img,
          value: controlnet_weight || 0.8
        }
      }
      if (lora_id) {
        this.loraInfo = {
          lora_id: lora_id,
          title: lora_title,
          content: lora_content,
          img_url: lora_img,
          value: lora_weight || 0.8,
        }
      }
      if (img_style_id) {
        this.photoStyleInfo = {
          img_style_id: img_style_id,
          title: img_style_title,
          img_url: img_style_img,
          en_title: img_style_title,
          id: img_style_id,
          value: 0.8
        }
      }
      if (reference_image) {
        this.referenceImgInfo = {
          url: reference_image,
          title: reference_image?.split?.('/')?.slice(-1)?.[0] || reference_image,
          value: reference_image_weight || 0.8
        }
      }
      if (negative_prompt) {
        this.badDescription = (negative_prompt || '')?.slice(0, this.maxlength);
      }
      this.ratioId = img_scale || 5
      this.picNums = batch_size || 1;
    },
    getTaskInfo(id) {
      id && this.getSameModel({task_id: id}).then(res => {
        this.taskInfo = res || null;
        const modeId = res?.model_parentclass_id;
        if(!this.modeId || (!!this.modeId && this.modeId !== modeId)) {
          this.modeId = modeId;
        }
      });
    },
    resetData() {
      this.controlNetInfo = null;
      this.loraInfo = null;
      this.photoStyleInfo = null;
      // this.referenceImgInfo = null;
      // this.badDescription = '';
      // this.description = '';
      this.ratioId = 5;
      this.picNums = 1;
    },
    initData(id) {
      Promise.all([this.getModelStyleList({page: 1, pagesize: 10, class_id: id}), this.getImgScale({class_id: id})]).then(res => {
        this.resetData();
        if(this.taskId && this.taskInfo && this.taskInfo.model_parentclass_id === id) {
          this.setTaskInfo();
        }
      })
    }
  },
  watch: {
    modeId: {
      handler(id) {
        id && this.initData(id);
      }
    }
  },
  onLoad(options) {
    this.taskId = options.task_id || '';
    this.checkLoginStatus();
    this.getModelClass().then(list => {
      if(this.taskId) {
        this.getTaskInfo(this.taskId);
        return;
      }
      if(!this.modeId) {
        this.modeId = list?.[0]?.id;
      } else {
        this.initData(this.modeId);
      }
    });
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
  .page-body {
    padding: 0 20rpx;
  }
}


.page-main-con {
  column-gap: 20rpx;
  column-count: 1;
  column-fill: balance;
  .page-item {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    
    display: inline-block;
    margin: 0 0 20rpx;
    page-break-inside: avoid;
    -moz-column-break-inside: avoid;
    break-inside: avoid;
  }
}

@media screen and (min-width: 750px) and (max-width: 960px){
  .page-main-con {
    -moz-column-count: 2;
    column-count: 2;
  }
}

@media screen and (min-width: 960px) {
  .page-main-con {
    -moz-column-count: 2;
    column-count: 2;
  }
}

@media screen and (min-width: 750px) {
  .page-grid-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30rpx;
  }
}
</style>