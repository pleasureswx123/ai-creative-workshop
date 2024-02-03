<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <u-gap height="30rpx"></u-gap>
    <TaskTips />
    <ModelTabs
        :value.sync="modeId"
        :tabs="modeClassInfo" />
    <ModelSelectCard
        @showPopFunc="showModelSelectPop"
        :info="currentModeInfo" />
    <DescriptionTextareaCard
        title="画面描述词"
        placeholder="请输入描述文字以短句、短语为佳，支持中、英文输入"
        :value.sync="description" />
    <ControlNetCard
        v-if="modeId === 1"
        @showPopFunc="showControlNetPop"
        :info.sync="controlNetInfo" />
    <LoraCard
        v-if="[1, 2].includes(modeId)"
        @showPopFunc="showLoraPop"
        :info.sync="loraInfo" />
    <ImgStyleCard
        @showPopFunc="showImgStylePop"
        :info.sync="imgStyleInfo" />
    <ReferenceImgCard
        @showPopFunc="showReferenceImgPop"
        @setReferenceImgInfo="setReferenceImgInfo"
        :info.sync="referenceImgInfo" />
    <DescriptionTextareaCard
        title="负面描述词"
        placeholder="输入不希望在面面中看见的内容，越靠前作用越明显"
        :value.sync="badDescription" />
    <ImgRatioCard
        :value.sync="ratioId"
        :ratios="ImgRatioInfo" />
    
    <ModelSelectPop
        ref="ModelSelectRef"
        @modelist="(info) => {setCurrentModeInfo(info)}"
        :id="modeId" />
    <ControinetPop
        ref="ControinetPopRef"
        @controninetlist="(info) => { controlNetInfo = info }" />
    <LoraPop
        ref="LoraPopRef"
        @loralist="(info) => { loraInfo = info }"
        :id="modeId"
        :isLogin="isLoginStatus" />
    <ImgStylePop
        ref="ImgStyleRef"
        @stylelist="(info) => { imgStyleInfo = info }"
        :id="modeId"
        :isLogin="isLoginStatus" />
    <ReferenceImgPop
        ref="ReferenceImgRef"
        @createlist="setReferenceImgInfo" />
    
    <GeneratePhotoBtn
        :value.sync="picNums"
        :modeId="modeId"
        @cb="startGenerate" />
  </view>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import TaskTips from './components/TaskTips.vue';
import ModelTabs from './components/ModelTabs.vue';

import ModelSelectCard from './components/ModelSelect.vue';
import DescriptionTextareaCard from './components/DescriptionTextarea.vue';
import ControlNetCard from './components/ControlNet.vue';
import LoraCard from './components/Lora.vue';
import ImgStyleCard from './components/ImgStyle.vue';
import ReferenceImgCard from './components/ReferenceImg.vue';
import ImgRatioCard from './components/ImgRatio.vue';
import GeneratePhotoBtn from './components/GenerateBtn.vue';

import ModelSelectPop from './model/model.vue'
import ControinetPop from './controinet/controinet.vue'
import LoraPop from './lora/lora.vue'
import ImgStylePop from './sstyle/sstyle.vue'
import ReferenceImgPop from './create/create.vue'

export default {
  components: { TaskTips, ModelTabs, GeneratePhotoBtn,
    ModelSelectCard, DescriptionTextareaCard, ControlNetCard,
    LoraCard, ImgStyleCard, ReferenceImgCard, ImgRatioCard,
    ModelSelectPop, ControinetPop, LoraPop, ImgStylePop, ReferenceImgPop, },
  data() {
    return {
      modeId: 1,
      description: '',
      controlNetInfo: null,
      loraInfo: null,
      imgStyleInfo: null,
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
    }
  },
  methods: {
    ...mapMutations('PhotoInfo', ['setCurrentModeInfo', ]),
    ...mapActions('PhotoInfo', ['getModelClass', 'getModelStyleList', 'getImgScale', 'getSameModel', 'createTask']),
    showModelSelectPop(){
      this.$refs.ModelSelectRef.open();
    },
    showControlNetPop(){
      this.$refs.ControinetPopRef.open();
    },
    showLoraPop(){
      this.$refs.LoraPopRef.open();
    },
    showImgStylePop() {
      this.$refs.ImgStyleRef.open()
    },
    showReferenceImgPop() {
      this.$refs.ReferenceImgRef.open()
    },
    setReferenceImgInfo({img_url: url}) {
      this.referenceImgInfo = {
        url, value: 0.8,
        title: url?.split?.('/')?.slice(-1)?.[0] || url
      };
    },
    startGenerate() {
      this.checkLoginStatus().then(() => {
        const params = {
          task_type: 1,
          model_parentclass_id: this.modeId,
          model_style_id: this.currentModeInfo.model_style_id,
          prompt: this.description || '',
          controlnet_type_id: this.controlNetInfo.id || '',
          controlnet_img: this.controlNetInfo.img || '',
          controlnet_img_detect: this.controlNetInfo.url || '',
          controlnet_weight: this.controlNetInfo.value || '',
          lora_id: this.loraInfo.lora_id || '',
          lora_weight: this.loraInfo.value || '',
          img_style_id: this.imgStyleInfo.img_style_id || '',
          reference_image: this.referenceImgInfo.url || '',
          reference_image_weight: this.referenceImgInfo.value || '',
          negative_prompt: this.badDescription,
          img_scale: this.ratioId,
          batch_size: this.picNums,
        };
        try {
          this.createTask(params).then(res => {
            if(res.task_id !== '') {
              uni.$u.route({
                url: 'pages/picture/index'
              });
            } else {
              uni.showModal({
                title: '提示',
                content: '生成失败，请从新生成！',
                confirmText: '确定',
                showCancel: false,
                success: function () {}
              })
            }
          })
        } catch (e) {
          console.log(e)
        }
      });
    },
  },
  watch: {
    modeId: {
      immediate: true,
      handler(id) {
        this.getModelStyleList({page: 1, pagesize: 10, class_id: id || 1});
        this.getImgScale({class_id: id}).then(res => {
          this.ratioId = 5;
        });
        this.controlNetInfo = null;
        this.loraInfo = null;
        this.imgStyleInfo = null;
        this.picNums = 1;
      }
    }
  },
  onLoad(options) {
    this.checkLoginStatus();
    this.getModelClass().then(list => {
      this.modeId = list?.[0]?.id || 0;
      setTimeout(() => {
        const taskId = options.task_id;
        if(taskId) {
          this.getSameModel({task_id: taskId}).then(res => {
            const {
              model_parentclass_id, model_style_img, model_style_content, model_style_id, model_style_title,
              prompt, controlnet_type_id, controlnet_img_detect, controlnet_img, controlnet_weight,
              lora_id, lora_title, lora_content, lora_img, lora_weight,
              img_style_id, img_style_title, img_style_content, img_style_img,
              reference_image, reference_image_weight,
              negative_prompt, img_scale, batch_size
            } = res || {};
            this.modeId = model_parentclass_id;
            this.setCurrentModeInfo({
              img_url: model_style_img,
              content: model_style_content,
              model_style_id: model_style_id,
              title: model_style_title
            });
            this.description = (prompt || '')?.slice(0, 500);
            if(controlnet_type_id) {
              this.controlNetInfo = {
                id: controlnet_type_id,
                title: controlnet_type_id,
                url: controlnet_img_detect,
                img: controlnet_img,
                value: controlnet_weight || 0.8
              }
            }
            if(lora_id) {
              this.loraInfo = {
                lora_id: lora_id,
                title: lora_title,
                content: lora_content,
                img_url: lora_img,
                value: lora_weight || 0.8,
              }
            }
            if(img_style_id) {
              this.imgStyleInfo = {
                img_style_id: img_style_id,
                title: img_style_title,
                en_title: img_style_content,
                img_url: img_style_img,
              }
            }
            if(reference_image) {
              this.referenceImgInfo = {
                url: reference_image,
                title: reference_image?.split?.('/')?.slice(-1)?.[0] || reference_image,
                value: reference_image_weight || 0.8
              }
            }
            if(negative_prompt) {
              this.badDescription = (negative_prompt || '')?.slice(0, 500);
            }
            this.ratioId = img_scale || 5
            this.picNums = batch_size || 1
          });
        }
      }, 600)
    });
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
</style>