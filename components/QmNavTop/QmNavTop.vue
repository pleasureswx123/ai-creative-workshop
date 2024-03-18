<template>
  <view class="qm-nav-wrapper">
    <view class="nav-inner-box">
      <view class="qm-nav-box">
        <view class="lf pointer" @tap="goHome">
          <image src="@/static/images/index/logo.png" mode="aspectFit" />
          <view class="title">首页</view>
        </view>
        <view class="menu-icon" @tap="showUserInfoPop = !showUserInfoPop">
          <u-icon name="list" color="rgba(255,255,255,.7)" size="40"></u-icon>
        </view>
      </view>
      <view class="pc-nav-box">
        <view class="logo" @tap="goHome">
          <image src="@/static/images/index/logo.png" mode="aspectFit" />
          <text>超级语言</text>
        </view>
        <view class="menu-nav">
          <view class="item" :class="{tag: !!item.tag}" v-for="item in menuList" :key="item.id" @tap="handleJump(item)">
            <text>{{item.name}}</text>
            <view class="tag-inner" v-if="!!item.tag">{{item.tagTxt}}</view>
          </view>
        </view>
        <view class="userinfo" v-if="!userInfoState.user_id">
          <view class="pointer" @tap="handleJump({url: '/pages/login/index'})">登录</view>
          <view>/</view>
          <view class="pointer" @tap="handleJump({url: '/pages/login/reg'})">注册</view>
        </view>
        <view class="userinfo" v-else>
          <view class="pointer" @tap="handleJump({url: '/pages/picture/index'})">我的创作</view>
          <view class="avatar pointer" @tap="showUserInfoPop = !showUserInfoPop">
            <image v-if="userInfoState.avatar" :src="userInfoState.avatar" mode="aspectFit" />
          </view>
        </view>
      </view>
      <UserInfoBox :show.sync="showUserInfoPop"></UserInfoBox>
    </view>
    <view class="qm-nav-box-place"></view>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import UserInfoBox from './UserInfoBox.vue';

export default {
  components: { UserInfoBox },
  data() {
    return {
      showUserInfoPop: false,
    }
  },
  created() {
    this.getUserInfo();
    this.getHomeInfo();
  },
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
    ...mapState('HomeInfo', ['aiTypeList']),
    menuList() {
      const home = {id: 100, name: '首页', url: 'pages/index/index' };
      const tutorial = {id: 200, name: '使用教程', tag: true, tagTxt: '推荐', url: 'pages/service/tutorial' };
      return [
        home,
          ...(((this.aiTypeList || []).filter(item => (!item.is_expectation && item.short_title))).map(item => {
            return {...item, name: item.short_title}
          }).slice(0, 10)),
        tutorial
      ]
    }
  },
  methods: {
    ...mapActions('HomeInfo', ['getHomeInfo']),
    ...mapActions('UserInfo', ['getUserInfo']),
    handleJump({url, params}) {
      url && uni.$u.route({url: url, params});
    },
    goHome() {
      uni.reLaunch({
        url: '/pages/index/index'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.nav-inner-box {
  border-bottom: 1rpx solid rgba(255, 255, 255, .1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg-color1);
  z-index: 99;
}
.qm-nav-box, .pc-nav-box, .qm-nav-box-place {
  padding: 0 0 0 30rpx;
  height: 80rpx;
  position: relative;
  background-color: #0D0D0D;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  gap: 30rpx;
  margin: 0 auto;
}
.qm-nav-box {
  .lf {
    display: flex;
    align-items: center;
    gap: 10rpx;
    image {
      display: block;
      width: 80rpx;
      height: 80rpx;
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
    height: 100%;
    width: 100rpx;
    cursor: pointer;
  }
  ///deep/.u-icon__icon{
  //  font-size: 28px!important;
  //  line-height: 28px!important;
  //  color: rgba(255,255,255,.7)!important;
  //}
}
.pc-nav-box {
  gap: 50rpx;
  padding: 0 30rpx;
  .logo {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: rgba(255,255,255,.9);
    gap: 20rpx;
    margin-right: 30rpx;
    cursor: pointer;
    image {
      display: block;
      width: 80rpx;
      height: 80rpx;
    }
  }
  .menu-nav {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    gap: 40rpx;
    color: var(--txt-color2);
    flex: 1;
    min-width: 0;
    .item {
      cursor: pointer;
      &.active {
        color: red;
      }
      &.tag {
        position: relative;
        .tag-inner {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 20rpx;
          height: 28rpx;
          line-height: 28rpx;
          width: 60rpx;
          text-align: center;
          color: #fff;
          background-color: var(--red-color1);
          border-radius: 14rpx;
          transform: scale(.9) translate3d(50%, -40%, 0);
          transform-origin: right top;
        }
      }
    }
  }
  .userinfo {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: var(--txt-color1);
    gap: 30rpx;
    height: 100%;
    box-sizing: border-box;
    .avatar {
      height: 65rpx;
      width: 65rpx;
      background-color: gray;
      border-radius: 50%;
      overflow: hidden;
      image {
        height: 100%;
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .pc-nav-box {
    display: none;
  }
}
@media screen and (min-width: 960px) {
  .qm-nav-box {
    display: none;
  }
}
</style>