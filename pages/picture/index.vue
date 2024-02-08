<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
<!--    <TipsTxt></TipsTxt>-->
    <CreationItem
        v-for="(item, index) in list" :key="index"
        :info="item" @showToolAction="showToolAction" @toDetails="toDetails" />
    <QmLoadMore :status="loadStatus"></QmLoadMore>
  
    <u-action-sheet
        round="20"
        :closeOnClickOverlay="true" :closeOnClickAction="true"
        :actions="toolsList" cancelText="取消"
        @select="selectClick"
        @close="showAction = false"
        :show="showAction" />
  
    <MyCreateDetails v-if="showDetails" :show.sync="showDetails" :info="detailsInfo"></MyCreateDetails>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import CreationMixins from './mixin/myCreation.js';
import TipsTxt from './components/TipsTxt.vue'
import CreationItem from './components/CreationItem.vue'

export default {
  mixins: [CreationMixins],
  data() {
    return {
      detailsInfo: null,
      showAction: false,
      showDetails: false,
      currentInfo: null,
    }
  },
  computed: {
    ...mapState('PictureInfo', ['toolsList']),
  },
  components: {
    TipsTxt, CreationItem
  },
  onShow () {
    this.getToolsList({page:1, pagesize: 20});
  },
  methods: {
    ...mapActions('PictureInfo', ['getToolsList']),
    showToolAction(currentInfo) {
      this.currentInfo = currentInfo;
      this.showAction = true;
    },
    toDetails({class_type, task_id}) {
      this.getDetailsInfo({class_type, task_id}).then(res => {
        this.detailsInfo = res || {};
        this.showDetails = true;
      })
    },
    selectClick({type, id}){
      uni.navigateTo({
        url: `/pages/picture/${type}?type=${id}`,
        success: res => {
          res.eventChannel.emit('acceptData', { data: this.currentInfo })
        }
      });
    },
  },
  watch: {
    showAction: {
      immediate: true,
      handler(status) {
        this.toggleBodyPositionStatus(status)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
}
</style>