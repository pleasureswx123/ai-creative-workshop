<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
<!--    <TipsTxt></TipsTxt>-->
    <view class="page-main-con">
      <CreationItem
          class="page-item"
          v-for="(item, index) in list" :key="index"
          :info="item" @showToolAction="showToolAction" @toDetails="toDetails" />
    </view>
    <QmLoadMore :status="loadStatus"></QmLoadMore>
  
    <u-action-sheet
        round="20"
        :closeOnClickOverlay="true" :closeOnClickAction="true"
        :actions="actionList" cancelText="取消"
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
    actionList() {
      return [{
        id: 28,
        title: '专业修图',
        name: '专业修图',
        type: '28'
      },...this.toolsList]
    }
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
      if(id === 28) {
        const params = {id, src: this.currentInfo?.currentImg};
        uni.reLaunch({
          url: `/pages/electronic/index?${(new URLSearchParams(params)).toString()}`
        })
        return
      }
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
  background: #000;
  padding: 0 20rpx 20rpx;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
}
.page-main-con {
  //display: grid;
  //grid-template-columns: repeat(1, 1fr);
  //grid-template-rows: masonry;
  //gap: 20rpx;
  
  column-gap: 20rpx;
  padding-top: 30rpx;
  column-count: 2;
  column-fill: balance;
  
  //-moz-column-count: 1;
  //column-count: 1;
  //-moz-column-gap: 20px;
  //column-gap: 20px;
  //-moz-column-fill: balance;
  //column-fill: balance;
  .page-item {
    position: relative;
    width: 100%;
    box-sizing: border-box;
  
    margin: 0 0 20rpx;
    page-break-inside: avoid;
    -moz-column-break-inside: avoid;
    break-inside: avoid;
  }
}

@media screen and (min-width: 750px) and (max-width: 960px){
  .page-main-con {
    -moz-column-count: 3;
    column-count: 3;
  }
}

@media screen and (min-width: 960px) {
  .page-main-con {
    -moz-column-count: 4;
    column-count: 4;
  }
}
</style>