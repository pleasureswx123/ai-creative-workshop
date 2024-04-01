<template>
  <view>
    <view class="nav-inner-box">
      <view v-if="showStatusBar" :style="{background: '#000', height: statusBarHeightStr}"></view>
      <view class="top-con">
        <view class="lf pointer" @tap="goHome">
          <image src="@/static/images/index/logo.png" mode="aspectFit" />
        </view>
        <view class="menu-icon" @tap="showUserInfoPop = !showUserInfoPop">
          <u-icon name="list" color="rgba(255,255,255,.7)" size="40"></u-icon>
        </view>
      </view>
      <UserInfoBox :show.sync="showUserInfoPop"></UserInfoBox>
    </view>
<!--    <view v-if="showStatusBar" :style="{background: '#000', height: statusBarHeightStr}"></view>
    <view class="top-placeholder"></view>-->
  </view>
</template>

<script>
import UserInfoBox from '@/components/QmNavTop/UserInfoBox.vue';
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  components: { UserInfoBox },
  data() {
    return {
      showUserInfoPop: false,
    }
  },
  methods: {
    goHome() {
      uni.reLaunch({
        url: `/pages/index/${this.type === 'new' ? 'index-new' : 'index'}`
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.nav-inner-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.top-con, .top-placeholder {
  padding: 0 30rpx;
  height: 44px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  gap: 30rpx;
  margin: 0 auto;
}
.top-con {
  .lf {
    display: flex;
    align-items: center;
    gap: 10rpx;
    image {
      display: block;
      width: 40px;
      height: 40px;
    }
    .title {
      color: rgba(255,255,255,.7);
      font-size: 28rpx;
    }
  }
  .menu-icon {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: rgba(0,0,0,.1);
    border-radius: 50%;
  }
  ///deep/.u-icon__icon{
  //  font-size: 28px!important;
  //  line-height: 28px!important;
  //  color: rgba(255,255,255,.7)!important;
  //}
}
</style>