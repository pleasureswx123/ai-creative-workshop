<template>
  <view class="page-container">
    <QmNavTop></QmNavTop>
    <view class="page-main">
      <UserAvatarInfo :isShowEdit="true"></UserAvatarInfo>
      <UserVipStatus></UserVipStatus>
      <view class="menus">
        <view class="item" :class="{pointer: item.type !== 'phone'}" v-for="(item, index) in menuList" :key="index"
              @tap="handleJump(item)">
          <view>{{ item.name }}</view>
          <view class="btn-box" v-if="item.type === 'code'">
            <text>兑换</text>
          </view>
          <view v-else class="value">{{ item.value }}</view>
        </view>
      </view>
      <ConversionCode :show.sync="show" />
    </view>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
    menuList() {
      const {img_task_num = 0, video_task_num = 0, phone = ''} = this.userInfoState || {};
      return [
        {name: '图片创作', value: img_task_num , url: '/pages/picture/index'},
        {name: '视频创作', value: video_task_num, url: '/pages/picture/video-tool'},
        {name: '我的算力', value: '查看详情', url: '/pages/user/integral-detail'},
        {name: '兑换会员', type: 'code'},
        {name: '手机号', value: phone, type: 'phone'},
      ]
    }
  },
  onShow() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions('UserInfo', ['getUserInfo']),
    handleJump(item) {
      const {type, url} = item || {};
      if (type === 'code') {
        this.show = true;
        return;
      }
      url && uni.navigateTo({url});
    }
  }
};
</script>
<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  font-size: 24rpx;
  padding: 30rpx 30rpx 300rpx;
}
.page-main {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30rpx;
}
.menus {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10rpx;
  .item {
    border-radius: 20rpx;
    background-color: #1D1E23;
    width: 100%;
    height: 90rpx;
    padding: 0 20rpx;
    //border-bottom: 2rpx solid rgba(255,255,255,.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: rgba(255,255,255,.9);
    box-sizing: border-box;
    .value {
      color: var(--red-color1);
    }
  }
}

.btn-box {
  padding: 0 16rpx;
  height: 45rpx;
  border-radius: 10rpx;
  background: linear-gradient(95deg, #F1CDAD 8%, #EEA25C 102%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0,0,0,.9);
  cursor: pointer;
}

@media screen and (min-width: 750px) {
  .menus {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
