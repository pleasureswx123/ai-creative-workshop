<template>
  <BoxLayout title="图片样式Style">
    <CardInfo v-if="!!info" @cb="$emit('update:info', null)" :info="info">
      <view class="en-title">{{info.en_title}}</view>
    </CardInfo>
    <BtnBox v-else txt="添加样式" @cb="$emit('showPopFunc')"></BtnBox>
  </BoxLayout>
</template>

<script>
import BoxLayout from "./BoxLayout.vue";
import BtnBox from "./BtnBox.vue";
import CardInfo from "./CardInfo.vue";
export default {
  props: {
    info: {
      type: Object,
      default: () => (null)
    }
  },
  components: {BoxLayout, BtnBox, CardInfo},
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
.en-title {
  color: #909193;
  font-size: 24rpx;
  padding-top: 10px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>