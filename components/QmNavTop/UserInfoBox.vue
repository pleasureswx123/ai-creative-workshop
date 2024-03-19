<template>
  <view class="userinfo-box">
    <view class="mask-userinfo-pop" v-if="showNavListPop" @tap="showNavListPop = false"></view>
    <view class="userinfo-inner-box" v-show="showNavListPop">
      <scroll-view scroll-y="true" class="scroll-Y">
        <UserAvatarInfo></UserAvatarInfo>
        <UserVipStatus></UserVipStatus>
        <view class="nav-list">
          <template v-for="item in navList">
            <view v-if="item.type === 'line'" :key="item.id" class="line" :class="item.className || ''"></view>
            <view v-else class="item" :class="item.className || ''" :key="item.id" @tap="jump(item)">
              <uni-icons custom-prefix="iconfont-qm" :type="item.icon" color="rgba(255,255,255,.5)" size="18" />
              <view class="name">
                <text>{{item.name}}</text>
                <view v-if="item.tag" class="tag">{{item.tagTxt}}</view>
              </view>
            </view>
          </template>
        </view>
      </scroll-view>
    </view>
    <ConversionCode :show.sync="showIntegralPop" />
  </view>
</template>

<script>
import {mapState} from 'vuex';
import {userApi} from '@/api';

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showIntegralPop: false,
    }
  },
  computed: {
    ...mapState('HomeInfo', ['aiTypeList']),
    navList() {
      return [
        {id: 100, icon: 'icon-qm-account', name: '个人中心', url: '/pages/user/index'},
        {id: 101, icon: 'icon-qm-listbox', name: '我的创作', url: '/pages/picture/index', className: 'mobile' },
        {type: 'line', id: 'line1', className: 'mobile' },
        {id: 200, icon: 'icon-qm-flash1', name: '兑换会员' },
        ...(((this.aiTypeList || []).filter(item => (!item.is_expectation && item.short_title))).map(item => {
          return {...item, icon: item.iconName, name: item.short_title, className: 'mobile'}
        }).slice(0, 10)),
        {type: 'line', id: 'line2' },
        {id: 102, icon: 'icon-qm-text1', name: '使用教程', tag: true, tagTxt: '推荐', url: '/pages/service/tutorial'},
        {id: 103, icon: 'icon-qm-call', name: '联系我们', url: '/pages/service/contact'},
        {id: 104, icon: 'icon-qm-txt', name: '服务条款', url: '/pages/service/article?type=service'},
        {id: 105, icon: 'icon-qm-privacy', name: '隐私协议', url: '/pages/service/article?type=privacy'},
        {type: 'line', id: 'line3' },
        {id: 1000, icon: 'icon-qm-exit', name: '退出登录'},
      ]
    },
    showNavListPop: {
      get() {
        return this.show
      },
      set(status) {
        this.$emit('update:show', status);
      }
    }
  },
  watch: {
    showNavListPop: {
      immediate: true,
      handler(status) {
        this.toggleBodyPositionStatus(status)
      }
    }
  },
  beforeDestroy() {
    this.toggleBodyPositionStatus(false)
  },
  methods: {
    jump({id, url, params}) {
      if(id === 200) {
        return this.checkLoginStatus().then(() => {
          this.showNavListPop = false;
          this.showIntegralPop = true;
        })
      }
      if(id === 1000) {
        return userApi.logout().then(res => {
          uni.clearStorage();
          uni.reLaunch({
            url: '/pages/index/index'
          })
        });
      }
      url && uni.$u.route({url: url, params});
    }
  }
}
</script>

<style lang="scss" scoped>
.userinfo-box {
  position: relative;
  height: 2rpx;
  z-index: 100;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  .userinfo-inner-box {
    padding: 0 20rpx 10rpx;
    z-index: 100;
    position: absolute;
    top: -80rpx;
    right: 0;
    background-color: #000;
    width: 400rpx;
    box-sizing: border-box;
    
  }
  .mask-userinfo-pop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 10;
    cursor: pointer;
  }
}
.nav-list {
  color: #f5f5f5;
  font-size: 28rpx;
  .item {
    height: 80rpx;
    display: flex;
    align-items: center;
    gap: 20rpx;
    cursor: pointer;
    .name {
      flex: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      
      display: flex;
      align-items: center;
      gap: 10rpx;
    }
  }
  .line {
    height: 2rpx;
    background-color: rgba(0,0,0,.2);
    border-bottom: 2rpx solid rgba(255,255,255,.1);
  }
}
.scroll-Y {
  max-height: 100vh;
}
.tag {
  font-size: 20rpx;
  height: 28rpx;
  line-height: 28rpx;
  width: 60rpx;
  text-align: center;
  color: #fff;
  background-color: var(--red-color1);
  border-radius: 14rpx;
}

@media screen and (min-width: 960px) {
  .nav-list .mobile {
    display: none;
  }
}
</style>