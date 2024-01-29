<template>
  <view class="page-container" :class="{chat: navType === 'chat'}">
    <u-sticky style="top: 0!important">
      <QmNavTabs :value.sync="navType"></QmNavTabs>
      <QmSubTabs v-if="navType === 'assistant'" :list="topicList" :value.sync="topicId"></QmSubTabs>
      <QmSubTabs v-if="navType === 'chat'" :list="modelList" :value.sync="modelId"></QmSubTabs>
    </u-sticky>
    
    <view class="chat-main" v-if="navType === 'chat'">
      <QmChat :modelId="modelId"></QmChat>
    </view>
    
    <view v-if="navType === 'assistant'">
      <QmAssistant :list="list"></QmAssistant>
      <QmLoadMore :status="loadStatus"></QmLoadMore>
    </view>
    
    <view v-if="navType === 'digit'">
      <QmRoles :list="rolesList"></QmRoles>
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
  padding-bottom: calc(0rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(0rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
  min-height: 100vh;
  box-sizing: border-box;
  background: #fff;
  &.chat {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .chat-main {
      flex: 1;
      min-height: 0;
    }
  }
}
</style>