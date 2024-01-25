<template>
  <page-meta page-style="background: #f6f8fe" />
  <view class="page-container">
    <u-list @scrolltolower="scrolltolower">
      <u-list-item v-for="(item, index) in list" :key="index">
        <CreationItem :info="item" :type="index" />
      </u-list-item>
    </u-list>
  </view>
</template>

<script>
import {mapState} from 'vuex'
import CreationItem from './components/CreationItem.vue'
import {userApi} from '@/api'

export default {
  data() {
    return {
      list: [],
      // pageNo: 1,
      // pageSize: 2,
    }
  },
  computed: {
    ...mapState('UserInfo', ['name']),
  },
  components: {
    CreationItem
  },
  onShow () {
    this.initParams();
    this.loadMore();
  },
  onPullDownRefresh() {
    this.initParams();
    this.loadMore().then(() => {
      uni.stopPullDownRefresh();
    });
  },
  methods: {
    initParams() {
      this.list = [];
      // this.pageNo = 1;
      // this.pageSize = 10;
    },
    scrolltolower() {
      // this.pageNo += 1;
      this.loadMore()
    },
    loadMore() {
      // return userApi.getMyCreation({pageNo: this.pageNo, pageSize: this.pageSize}).then(res => {
      return userApi.getMyCreation().then(res => {
        this.list = res?.list || []
      }).catch(err => {
      });
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