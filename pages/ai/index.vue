<template>
  <view class="page-container">
    <u-sticky style="top: 0!important">
      <QmNavTabs :value.sync="navType"></QmNavTabs>
      <QmSubTabs :list="topicList" :value.sync="topicId"></QmSubTabs>
    </u-sticky>
  
    <QmSubTabs :list="modelList" :value.sync="modelId"></QmSubTabs>
    
    <view>1231111</view>
    
    
  
    
    
    <view>{{topicId}}</view>
    <view>{{modelId}}</view>
    <view>{{navType}}</view>
  </view>
</template>

<script>
import QmNavTabs from './components/QmNavTabs.vue';
import QmSubTabs from './components/QmSubTabs.vue';
import {userApi} from "@/api";

export default {
  components: { QmNavTabs, QmSubTabs },
  data() {
    return {
      topicList: [],
      modelList: [],
      topicId: '',
      navType: '', // chat || assistant || digit
      modelId: '',
    }
  },
  onShow() {
    this.getTopicList();
    this.getModelList();
  },
  methods: {
    getModelList() {
      setTimeout(() => { // 模拟请求接口返回数据
        const temp = [{"name": "wenxin", "alias": "文心一言"},
          {"name": "xunfei", "alias": "讯飞星火"},
          {"name": "tongyi", "alias": "通义千问"},
          {"name": "hunyuan", "alias": "腾讯混元"},
          {"name": "zhipu", "alias": "智普AI"},
          {"name": "minimax", "alias": "MiniMax"},
          {"name": "openai3", "alias": "G35"},
          {"name": "gemini", "alias": "Gemini"},
          {"name": "wenxin4", "alias": "文心4.0"},
          {"name": "openai4", "alias": "高级G4"},
          {"name": "hunyuan4", "alias": "混元4"},
          {"name": "zhipu4", "alias": "智普4"}];
        this.modelList = temp.map(item => {
          const {alias, name} = item;
          return {name: alias, type: name}
        })
      })
    },
    getTopicList() {
      const params = {};
      userApi.getTopicList(params).then(res => {
        const temp = [
          {title: '收藏', id: 'collect'},
          {title: '全部', id: 'all'},
        ];
        this.topicList = [...temp, ...(res || [])].map(item => {
          const {title, id} = item;
          return {name: title, type: `${id}`}
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
}
</style>