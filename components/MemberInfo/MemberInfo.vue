<template>
  <view class="member-box" v-if="isVip">
    <UserAvatarInfo :isShowBalance="false"></UserAvatarInfo>
    <view>
      <view class="row-item" v-for="(item, index) in infos" :key="index">
        <view class="title">{{item.title}}</view>
        <view :class="`${item.className || ''}`">{{item.value}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import { memberInfo } from '@/config';

export default {
  created() {
    this.getUserInfo();
  },
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
    isVip() {
      return !!(+this.userInfoState.is_vip)
    },
    vipLevel() {
      return this.userInfoState.vip_level
    },
    infos() {
      const {vip_expire_time, permanent_balance, balance, computing_reset_time} = this.userInfoState || {};
      const levelTxt = memberInfo[`${this.vipLevel}`] || '';
      return [
        {title: '当前状态', value: levelTxt, className: 'cl-wrapper'},
        {title: '会员期限', value: vip_expire_time},
        {title: '永久算力余额', value: permanent_balance},
        {title: '月度算力余额', value: balance},
        {title: '月度算力重置日期', value: computing_reset_time},
      ]
    }
  },
  methods: {
    ...mapActions('UserInfo', ['getUserInfo']),
  }
}
</script>

<style lang="scss" scoped>
.member-box {
  margin: 30rpx;
  border-radius: 16rpx;
  background: #303138;
  padding: 0 30rpx 30rpx;
}
.row-item {
  height: 60rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
  font-size: 28rpx;
  color: #fff;
  .title {
    color: rgba(255,255,255,.8);
    flex: 1;
    min-width: 0;
  }
}
.cl-wrapper {
  background: linear-gradient(95deg, #F1CDAD 7%, #EEA25C 102%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
</style>