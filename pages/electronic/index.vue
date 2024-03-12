<template>
  <LayoutPage>
    <TabsBox :value.sync="type" :options="tabsList"></TabsBox>
    <PhotoGenerate v-if="loading"></PhotoGenerate>
<!--    <PhotoGenerateResult></PhotoGenerateResult>-->
    <PhotoModify ref="photoTool"></PhotoModify>
    <Describe :value.sync="description"></Describe>
    <ProduceBtn :value.sync="pages" :loading="loading" @cb="handleComfirm"></ProduceBtn>
    <Setting :value.sync="setting"></Setting>
    <template v-if="setting">
      <ExtendDirection :value.sync="directions"></ExtendDirection>
      <PersonEnhance :value.sync="enhanceType"></PersonEnhance>
      <TemplateImageStyle
          title="图片风格 Style（可不选）"
          :params="{}"
          componentName="ImgStyleItem"
          :getList="getImgStyleList"
          :proxyList="item => ({ ...item, id: item.img_style_id, value: 0.8 })"
          :currentInfo.sync="photoStyleInfo"></TemplateImageStyle>
    </template>
<!--    <view>{{type}}</view>
    <view>{{description}}</view>
    <view>{{pages}}</view>
    <view>{{setting}}</view>
    <view>{{directions}}</view>
    <view>{{enhanceType}}</view>
    <view>{{photoStyleInfo}}</view>-->
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
      description: '',
      pages: 1,
      loading: false,
      setting: true,
      directions: [],
      enhanceType: '',
      photoStyleInfo: null
    }
  },
  watch: {
    setting(status) {
      if(!status) {
        // this.photoStyleInfo = null
      }
    }
  },
  methods: {
    ...mapActions('PhotoInfo', ['getImgStyleList']),
    getMaskImgSrc() {
      return this.$refs.photoTool.getMaskImgSrc()
    },
    handleComfirm() {
      if (this.loading) {
        return
      }
      this.loading = true;
      this.getMaskImgSrc().then(path => {
        console.log('mask img:', path)
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>