<template>
  <BoxLayout title="参考图片">
    <template #HdRight>
      <view class="from-history" @tap="$emit('showPopFunc')">
        <text>创作历史选择</text>
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-arrow-right" color="rgba(255,255,255,.5)" size="14" />
      </view>
    </template>
    <CardInfo v-if="!!info" @cb="$emit('update:info', null)" :info="info">
      <SliderBox :value.sync="currentValue"></SliderBox>
    </CardInfo>
    <UploadBtnBox v-else @cb="url => {$emit('setReferenceImgInfo', {img_url: url})}"></UploadBtnBox>
  </BoxLayout>
</template>

<script>
import BoxLayout from "./BoxLayout.vue";
import CardInfo from "./CardInfo.vue";
import SliderBox from "./SliderBox.vue";
import UploadBtnBox from "./UploadBtnBox.vue";
export default {
  props: {
    info: {
      type: Object,
      default: () => (null)
    }
  },
  components: {BoxLayout, CardInfo, SliderBox, UploadBtnBox},
  computed: {
    currentValue: {
      get() {
        return this.info?.value || 0
      },
      set(value) {
        this.$emit('update:info', Object.assign({}, this.info, {
          value
        }))
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.from-history {
  color: rgba(255,255,255,.5);
  font-size: 24rpx;
  display: flex;
  align-items: center;
  gap: 4rpx;
  cursor: pointer;
}
</style>
