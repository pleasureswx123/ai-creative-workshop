<template>
  <view class="container">
    <StatusItemProgress v-if="[0, 10].includes(state)"
        :info="info" :percentage="50" />
    <StatusItemVideo v-if="state === 1 && taskType === 2" :info="info" @toDetails="toDetails" />
    <StatusItemImg v-if="state === 1 && taskType !== 2" :info="info"
                   @toDetails="toDetails"
                   @showToolAction="showToolAction" />
    <StatusItemError v-if="state === 2" :info="info" />
    <StatusItemViolate v-if="state === 3" :info="info" />
  </view>
</template>

<script>
import StatusItemProgress from './StatusItem/Progress.vue'
import StatusItemVideo from './StatusItem/Video.vue'
import StatusItemImg from './StatusItem/Img.vue'
import StatusItemError from './StatusItem/Error.vue'
import StatusItemViolate from './StatusItem/Violate.vue'

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    state() {
      return this.info.state;
    },
    taskType() {
      return +this.info.task_type
    }
  },
  components: {
    StatusItemProgress, StatusItemVideo, StatusItemImg, StatusItemError, StatusItemViolate,
  },
  methods: {
    showToolAction(currentInfo = {}) {
      this.$emit('showToolAction', currentInfo)
    },
    toDetails(currentInfo = {}) {
      this.$emit('toDetails', currentInfo)
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: var(--bg-color2);
  margin-bottom: 20rpx;
}
</style>