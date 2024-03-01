<template>
  <BoxLayout title="使用Lora(可不选)">
    <CardInfo v-if="!!info" @cb="$emit('update:info', null)" :info="info">
      <SliderBox :value.sync="currentValue"></SliderBox>
    </CardInfo>
    <BtnBox v-else txt="画风和主题控制" @cb="$emit('showPopFunc')"></BtnBox>
  </BoxLayout>
</template>

<script>
import BoxLayout from "./BoxLayout.vue";
import BtnBox from "./BtnBox.vue";
import CardInfo from "./CardInfo.vue";
import SliderBox from "./SliderBox.vue";
export default {
  props: {
    info: {
      type: Object,
      default: () => (null)
    }
  },
  components: {BoxLayout, BtnBox, CardInfo, SliderBox},
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
</style>