<template>
  <view class="userinfo-box">
    <view class="mask-userinfo-pop" v-if="showNavListPop" @tap="showNavListPop = false"></view>
    <view class="userinfo-inner-box" v-show="showNavListPop">
      <scroll-view scroll-y="true" class="scroll-Y">
        <view class="user-box">
          <view class="avatar">
            <image v-if="userInfoState.avatar" :src="userInfoState.avatar" mode="aspectFit" />
          </view>
          <view class="info">
            <view class="name">{{userInfoState.nickname || '未设置昵称' }}</view>
            <view class="user-id">MID:{{userInfoState.user_id}}</view>
          </view>
        </view>
        <view class="integral-box">
          <view>积分<text>{{userInfoState.balance}}</text></view>
          <view class="btn" @click="changeIntegral">兑换</view>
        </view>
        <view class="nav-list">
          <template v-for="item in navList">
            <view v-if="item.type === 'line'" :key="item.id" :class="`line ${item.className || ''}`"></view>
            <view v-else :class="`item ${item.className || ''}`" :key="item.id" @tap="jump(item)">
              <u-icon :name="item.iconName" size="40" color="#f5f5f5"></u-icon>
              <view>{{item.name}}</view>
            </view>
          </template>
        </view>
      </scroll-view>
    </view>
    <u-popup
        v-if="showIntegralPop"
        class="integral-pop"
        :show="showIntegralPop"
        mode="center"
        @close="showIntegralPop = false"
        closeIconPos="top-right">
      <view class="integral-inner">
        <view class="title">兑换积分</view>
        <view class="desc">可以使用兑换码来获取平台积分，若您已拥有兑换码，可直接进行兑换。若尚未获得兑换码，可联系我们客服进行购买。</view>
        <u--input placeholder="输入或粘贴兑换码" border="surround" v-model="integral" placeholderStyle="fontSize:14px"></u--input>
        <view class="operateBtn">
          <view class="btn" @click="showIntegralPop = false">取消</view>
          <view class="btn confirm" @click="handleConfirm">确认兑换</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {userApi} from '@/api'
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
      integral: '',
      navList: [
        {id: 1, iconName: 'account', name: '个人中心', url: '/pages/user/index'},
        {id: 2, iconName: 'grid', name: '我的创作', url: '/pages/picture/index', className: 'mobile' },
        {type: 'line', id: 'line1', className: 'mobile' },
        {id: 3, iconName: 'chat', name: '智能对话', url: '/pages/ai/index', className: 'mobile' },
        {id: 4, iconName: 'camera', name: '生成图片', url: '/pages/photos/index', className: 'mobile' },
        {id: 5, iconName: 'photo', name: '图片处理', url: '/pages/picture/tool', className: 'mobile' },
        {id: 6, iconName: 'mic', name: '智能配音', url: '/pages/sound/index', className: 'mobile' },
        {id: 7, iconName: 'play-right', name: '生成视频', url: '/pages/picture/video-tool', className: 'mobile' },
        {type: 'line', id: 'line2' },
        {id: 8, iconName: 'file-text', name: '使用教程', url: '/pages/article/list?type=help'},
        {id: 9, iconName: 'kefu-ermai', name: '联系我们', url: '/pages/article/code'},
        {id: 10, iconName: 'order', name: '服务条款', url: '/pages/article/article?type=service'},
        {id: 11, iconName: 'info-circle', name: '隐私协议', url: '/pages/article/article?type=privacy'},
        {type: 'line', id: 'line3' },
        {id: 100, iconName: 'minus-square-fill', name: '退出登录'},
      ]
    }
  },
  computed: {
    ...mapState('UserInfo', ['userInfoState']),
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
    ...mapActions('UserInfo', ['getUserInfo']),
    handleConfirm() {
      const code = `${this.integral}`.trim();
      if(!code) {
        return
      }
      userApi.bindCard({code}).then(res => {
        uni.showToast({
          title: res.message,
          duration: 2000
        });
        this.showIntegralPop = false;
        this.showNavListPop = false;
        this.getUserInfo();
      })
    },
    changeIntegral() {
      this.checkLoginStatus().then(() => {
        this.showNavListPop = false;
        this.showIntegralPop = true;
      })
    },
    jump({id, url}) {
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
    padding: 0 40rpx 10rpx;
    z-index: 100;
    position: absolute;
    top: -80rpx;
    right: 0;
    background-color: #1D1E23;
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
  }
  .line {
    height: 2rpx;
    background-color: rgba(0,0,0,.2);
    border-bottom: 2rpx solid rgba(255,255,255,.1);
  }
}
.integral-box {
  padding: 30rpx 10rpx;
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #B2B2B2;
  text {
    margin-left: 10rpx;
  }
  .btn {
    margin-left: auto;
    background-color: #F60652;
    border-radius: 8rpx;
    padding: 8rpx 16rpx;
    font-size: 24rpx;
    color: #fff;
    cursor: pointer;
  }
}
.integral-pop {
  .integral-inner {
    text-align: center;
    color: #333;
  }
  .title {
    font-size: 32rpx;
    font-weight: 700;
  }
  .desc {
    font-size: 28rpx;
    margin: 20rpx 0;
  }
  /deep/ .u-popup__content {
    width: 80%;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 80rpx 40rpx;
  }
  /deep/.u-input {
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    margin: 30rpx 0;
  }
  .operateBtn {
    display: flex;
    display: -webkit-flex;
    justify-content: right;
    flex-wrap: wrap;
    align-items: center;
    gap: 20rpx;
    .btn {
      width: 200rpx;
      height: 50rpx;
      line-height: 50rpx;
      border: 1px solid #F60652;
      border-radius: 8rpx;
      display: inline-block;
      text-align: center;
      font-size: 28rpx;
      cursor: pointer;
    }
    .confirm {
      background-color: #F60652;
      color: #fff;
    }
  }
}
.user-box {
  padding: 30rpx 0 10rpx;
  display: flex;
  align-items: center;
  gap: 30rpx;
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
  .info {
    flex: 1;
    min-width: 0;
    .name {
      font-size: 24rpx;
      color: rgba(255,255,255,.7);
      font-weight: 700;
    }
    .user-id {
      font-size: 24rpx;
      margin-top: 6rpx;
      color: #818181;
    }
  }
}
.scroll-Y {
  max-height: 100vh;
}

@media screen and (min-width: 750px) and (max-width: 960px){
  .integral-pop /deep/ .u-popup__content {
    width: 50%;
  }
}

@media screen and (min-width: 960px) {
  .integral-pop /deep/ .u-popup__content {
    width: 30%;
  }
}

@media screen and (min-width: 790px) {
  .nav-list .mobile {
    display: none;
  }
}
</style>