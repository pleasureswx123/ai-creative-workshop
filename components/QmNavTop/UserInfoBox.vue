<template>
  <view class="userinfo-box">
    <view class="mask-userinfo-pop" v-if="showNavListPop" @tap="showNavListPop = false"></view>
    <view class="userinfo-inner-box" v-show="showNavListPop">
      <scroll-view scroll-y="true" class="scroll-Y">
        <UserAvatarInfo></UserAvatarInfo>
        <UserVipStatus></UserVipStatus>
        <view class="nav-list">
          <template v-for="item in navList">
            <view v-if="item.type === 'line'" :key="item.id" :class="`line ${item.className || ''}`"></view>
            <view v-else :class="`item ${item.className || ''}`" :key="item.id" @tap="jump(item)">
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
      navList: [
        {id: 1, icon: 'icon-qm-account', name: '个人中心', url: '/pages/user/index'},
        {id: 2, icon: 'icon-qm-listbox', name: '我的创作', url: '/pages/picture/index', className: 'mobile' },
        {type: 'line', id: 'line1', className: 'mobile' },
        {id: 13, icon: 'icon-qm-flash1', name: '兑换会员' },
        {id: 3, icon: 'icon-qm-chat', name: '智能对话', url: '/pages/ai/index', className: 'mobile' },
        {id: 4, icon: 'icon-qm-MaterialSymbolsLinkedCameraRounded', name: '生成图片', url: '/pages/photos/index', className: 'mobile' },
        {id: 5, icon: 'icon-qm-MdiImageEdit', name: '图片处理', url: '/pages/picture/tool', className: 'mobile' },
        {id: 6, icon: 'icon-qm-MaterialSymbolsAutoDetectVoice', name: '智能配音', url: '/pages/sound/index', className: 'mobile' },
        {id: 7, icon: 'icon-qm-MaterialSymbolsVideoCallRounded', name: '生成视频', url: '/pages/picture/video-tool', className: 'mobile' },
        {id: 12, icon: 'icon-qm-MaterialSymbolsPhotoCameraFront', name: '写真摄影', url: '/pages/picture/personal-photo-tool', className: 'mobile' },
        {type: 'line', id: 'line2' },
        {id: 8, icon: 'icon-qm-text1', name: '使用教程', tag: true, tagTxt: '推荐', url: '/pages/service/tutorial'},
        {id: 9, icon: 'icon-qm-call', name: '联系我们', url: '/pages/article/code'},
        {id: 10, icon: 'icon-qm-txt', name: '服务条款', url: '/pages/article/article?type=service'},
        {id: 11, icon: 'icon-qm-privacy', name: '隐私协议', url: '/pages/article/article?type=privacy'},
        {type: 'line', id: 'line3' },
        {id: 100, icon: 'icon-qm-exit', name: '退出登录'},
      ]
    }
  },
  computed: {
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
    jump({id, url}) {
      if(id === 13) {
        return this.checkLoginStatus().then(() => {
          this.showNavListPop = false;
          this.showIntegralPop = true;
        })
      }
      if(id === 100) {
        return userApi.logout().then(res => {
          uni.clearStorage();
          uni.reLaunch({
            url: '/pages/index/index'
          })
        });
      }
      uni.reLaunch({url});
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
  background-color: #f60652;
  border-radius: 14rpx;
}

@media screen and (min-width: 960px) {
  .nav-list .mobile {
    display: none;
  }
}
</style>