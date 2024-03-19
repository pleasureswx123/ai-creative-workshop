<template>
  <BoxLayout title="使用Lora(可不选)">
    <CardInfo v-if="!!info" @cb="$emit('update:info', null)" :info="info">
      <SliderBox :value.sync="currentValue"></SliderBox>
    </CardInfo>
    <BtnBox v-else txt="画风和主题控制" @cb="$emit('showPopFunc')"></BtnBox>
  </BoxLayout>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => (null)
    }
  },
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