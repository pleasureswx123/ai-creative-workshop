<template>
  <view>
    <u-swiper
        height="400"
        bgColor="#ffffff"
        :list="list"
        keyName="url"
        imgMode="aspectFill"
        radius="0"
        :autoplay="true"
        circular
        @change="change"
        @click="click"
    ></u-swiper>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      listTemplate: [{
        url: 'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/03ddf10f-906a-42c8-b1ef-e152756cf426/original=true/00052-29933022.jpeg',
        url_type: 'image',
      }],
    }
  },
  methods: {
    change(...args) {
    },
    click(...args) {
    },
  }
}
</script>

<style lang="scss" scoped>
</style>