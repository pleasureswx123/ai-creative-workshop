<template>
  <page-meta page-style="background: #000000" />
  <view class="page-container">
    <view class="page-header" :style="`height: ${navType === 'digit' ? '41' : '77'}px`">
      <QmNavTabs :value.sync="navType"></QmNavTabs>
      <QmSubTabs v-if="navType === 'assistant'" :list="topicList" :value.sync="topicId"></QmSubTabs>
      <QmSubTabs v-if="navType === 'chat'" :list="modelList" :value.sync="modelId"></QmSubTabs>
    </view>
    <view class="page-main" :style="`height: calc(100% - ${navType === 'digit' ? '41' : '77'}px)`">
      <template v-if="navType === 'chat'">
        <QmChat :modelId="modelId"></QmChat>
      </template>
  
      <view class="assistant-box" v-if="navType === 'assistant'">
        <QmAssistant :list="list"></QmAssistant>
      </view>
  
      <template v-if="navType === 'digit'">
        <QmRoles :list="rolesList"></QmRoles>
      </template>
    </view>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import QmNavTabs from './components/QmNavTabs.vue';
import QmSubTabs from './components/QmSubTabs.vue';
import QmAssistant from './components/QmAssistant.vue';
import QmRoles from './components/QmRoles.vue';
import loaderAssistantDataMixin from '@/common/loaderAssistantDataMixin.js'
import QmChat from './chat.vue'

export default {
  mixins: [loaderAssistantDataMixin],
  components: { QmNavTabs, QmSubTabs, QmAssistant, QmRoles, QmChat },
  data() {
    return {
      topicId: 'all',
      navType: 'chat', // chat || assistant || digit
      modelId: '',
    }
  },
  computed: {
    ...mapState('UserInfo', ['modelList', 'topicList', 'rolesList'])
  },
  onShow() {
    this.getTopicList();
    this.getModelList();
  },
  watch: {
    navType(type) {
      if(type === 'digit') {
        this.getRolesList();
      }
    }
  },
  methods: {
    ...mapActions('UserInfo', ['getModelList', 'getTopicList', 'getRolesList']),
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  //height: 100vh;
  width: 100vw;
  font-size: 24rpx;
  background: #fff;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .page-header {
    height: 77px;
    overflow: hidden;
  }
  .page-main {
    height: calc(100% - 77px);
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
  }
  .assistant-box {
    background: #fff;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>