<template>
  <LayoutPage>
    <TabsBox :value.sync="type" :options="tabsList"></TabsBox>
    <PhotoGenerate v-if="loading"></PhotoGenerate>
<!--    <PhotoGenerateResult></PhotoGenerateResult>-->
    <PhotoModify ref="photoTool" @setUrl="url => { reference_image = (url || '') }"></PhotoModify>
    <Describe :value.sync="prompt"></Describe>
    <ProduceBtn :value.sync="batch_size" :loading="loading" @cb="handleComfirm"></ProduceBtn>
    <Setting :value.sync="setting"></Setting>
    <template v-if="setting">
      <ExtendDirection :value.sync="directions"></ExtendDirection>
<!--      <PersonEnhance :value.sync="enhanceType"></PersonEnhance>-->
      <TemplateImageStyle
          title="图片风格 Style（可不选）"
          :params="{}"
          componentName="ImgStyleItem"
          :getList="getImgStyleList"
          :proxyList="item => ({ ...item, id: item.img_style_id, value: 0.8 })"
          :currentInfo.sync="photoStyleInfo"></TemplateImageStyle>
    </template>
    <view style="color: #fff; font-size: 12px; display: none">{{params}}</view>
  </LayoutPage>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      type: 0,
      tabsList: [
        {name: '专业修图', value: 0},
        {name: '商业出图', value: 1},
        {name: '人物修图', value: 2},
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
    }
  },
  computed: {
    img_style_id() {
      return this.photoStyleInfo?.id || this.photoStyleInfo?.img_style_id || ''
    },
    params() {
      return {
        task_type: 26,
        reference_image: this.reference_image || '',
        reference_image_extend: this.reference_image_extend || '',
        prompt: this.prompt || '',
        batch_size: this.batch_size,
        ...(this.setting ? {
          upper: this.directions.includes('up') ? 1 : 0,
          below: this.directions.includes('down') ? 1 : 0,
          left: this.directions.includes('left') ? 1 : 0,
          right: this.directions.includes('right') ? 1 : 0,
          img_style_id: this.img_style_id,
        } : {upper: 0, below: 0, left: 0, right: 0, img_style_id: ''}),
      }
    }
  },
  methods: {
    ...mapActions('PhotoInfo', ['getImgStyleList']),
    showTips(msg) {
      uni.showModal({
        title: '提示',
        content: msg,
        confirmText: '确定',
        showCancel: false,
      })
    },
    handleComfirm() {
      if(!this.reference_image) {
        return this.showTips('请上传图片');
      }
      if(!this.prompt) {
        return this.showTips('请输入画面描述');
      }
      if (this.loading) {
        return
      }
      this.loading = true;
      this.$refs.photoTool.getMaskImgSrc().then(path => {
        this.reference_image_extend = path;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>