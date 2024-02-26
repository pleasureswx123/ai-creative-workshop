<template>
  <LayoutPage>
    <TabsBox :value.sync="type" :options="tabsList"></TabsBox>
    <PhotoModify></PhotoModify>
    <Describe :value.sync="description"></Describe>
    <ProduceBtn :value.sync="pages" :loading="loading" @cb="handleComfirm"></ProduceBtn>
    <Setting :value.sync="setting"></Setting>
    <template v-if="setting">
      <ExtendDirection :value.sync="directions"></ExtendDirection>
      <PersonEnhance :value.sync="enhanceType"></PersonEnhance>
      <PhotoStyle :value.sync="photoStyleId"></PhotoStyle>
    </template>
    <view>{{type}}</view>
    <view>{{description}}</view>
    <view>{{pages}}</view>
    <view>{{setting}}</view>
    <view>{{directions}}</view>
    <view>{{enhanceType}}</view>
    <view>{{photoStyleId}}</view>
  </LayoutPage>
</template>

<script>
export default {
  data() {
    return {
      type: 0,
      tabsList: [
        {name: '专业修图', value: 0},
        {name: '商业出图', value: 1},
        {name: '人物修图', value: 2},
      ],
      description: 'description',
      pages: 1,
      loading: false,
      setting: true,
      directions: [],
      enhanceType: '',
      photoStyleId: ''
    }
  },
  watch: {
    setting(status) {
      if(!status) {
        this.photoStyleId = ''
      }
    }
  },
  methods: {
    handleComfirm() {
      if (this.loading) {
        alert(1)
        return
      }
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>