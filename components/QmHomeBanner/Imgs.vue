<template>
  <view class="branner-imgs-box">
    <view class="item" v-for="(src, index) in imgs" :key="index">
      <image class="img" :src="src" mode="aspectFill"></image>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array,
      default: () => ([])
    }
  }
}

</script>

<style lang="scss" scoped>
.branner-imgs-box {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  .item {
    min-width: 0;
    .img {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}

@media screen and (min-width: 750px) {
  .branner-imgs-box {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>