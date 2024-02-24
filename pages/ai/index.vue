<template>
  <page-meta page-style="background: #000000" />
  <view class="page-container">
    <view class="page-header" ref="header">
      <QmNavTop></QmNavTop>
      <QmNavTabs :value.sync="navType"></QmNavTabs>
      <QmSubTabs v-if="navType === 'assistant'" :list="topicList" :value.sync="topicId"></QmSubTabs>
      <QmSubTabs v-if="navType === 'chat'" :list="modelList" :value.sync="modelId"></QmSubTabs>
    </view>
    <view class="page-main" :style="mainStyle">
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
import {userApi} from '@/api'

export default {
  mixins: [loaderAssistantDataMixin],
  components: { QmNavTabs, QmSubTabs, QmAssistant, QmRoles, QmChat },
  data() {
    return {
      topicId: 'all',
      navType: 'chat', // chat || assistant || digit
      modelId: '',
      mainStyle: {}
    }
  },
  computed: {
    ...mapState('UserInfo', ['modelList', 'topicList', 'rolesList'])
  },
  onShow() {
    this.checkLogin();
    Promise.all([this.getTopicList(), this.getModelList()]).then(res => {
      this.getHt().then(res => {
        this.mainStyle = res;
        debugger
      });
    })
  },
  watch: {
    navType(type) {
      if(type === 'digit') {
        this.getRolesList();
      }
      this.getHt().then(res => {
        this.mainStyle = res;
      });
    }
  },
  methods: {
    ...mapActions('UserInfo', ['getModelList', 'getTopicList', 'getRolesList', 'getUserInfo']),
    async getHt() {
      let headerHt = 0;
      await this.$nextTick(() => {
        headerHt = this.$refs.header.$el.getBoundingClientRect().height;
      });
      const res = {
        position: 'fixed',
        top: `${headerHt}px`,
        left: 0,
        right: 0,
        bottom: 0
      };
      return res;
    },
    checkLogin() {
      userApi.checkLogin().then(() => {
        this.getUserInfo();
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  font-size: 24rpx;
  background: #fff;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .page-header {
    overflow: hidden;
  }
  .page-main {
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