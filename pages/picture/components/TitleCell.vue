<template>
  <view>
    <view class="cell-box">
      <view class="label" v-html="title"></view>
      <view class="rt" v-if="isShowRight" @tap="handleToHistory">
        <text>从创作历史选择</text>
        <u-icon name="arrow-right" size="24rpx" color="var(--txt-color2)"></u-icon>
      </view>
    </view>
    <create ref="secludcreate" @createlist="getResult"/>
  </view>
</template>

<script>
import create from '@/pages/photos/create/create.vue';
export default {
  inject: ['setSourceImg'],
  props: {
    title: {
      type: String,
      default: '标题'
    },
    isShowRight: {
      type: Boolean,
      default: true
    }
  },
  components: { create },
  methods: {
    getResult(info) {
      const url = info.img_url;
      url && this.setSourceImg(url)
    },
    handleToHistory() {
      this.$refs.secludcreate.open();
      // uni.$u.route({
      //   url: 'pages/photos/create/create'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-box {
  font-size: 28rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  .label {
    color: var(--txt-color1);
    /deep/ em {
      font-style: normal;
      color: red;
      font-weight: bold;
    }
  }
  .rt {
    font-size: 24rpx;
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--txt-color2);
  }
}
</style>