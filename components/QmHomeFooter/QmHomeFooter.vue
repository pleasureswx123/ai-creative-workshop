<template>
  <view class="footer">
    <view class="flex">
      <view class="logo">
        <image @tap="jumpNewIndex" src="@/static/images/index/logo.png" mode="aspectFit"></image>
        <text class="primaryColor">超级语言AI</text>
      </view>
    </view>
    <text>Copyright © 2024 秋米网络技术(北京)有限公司</text>
    <text @tap="goMiit">京ICP备2023009914号-5</text>
    <view class="ft-box">
      <view class="">
        <image src="@/static/images/index/semi.png" mode="aspectFit" class="semi"></image>
        <text @tap="goMps">京公网安备11011102002471号</text>
      </view>
      <view class="link-box">
        <text @tap="goContact">联系我们</text>
      </view>
    </view>
    <view class="ft-box">
      <view>
        <text>增值电信业务许可证 京B2-20240305</text>
      </view>
      <view class="link-box">
        <text @tap="jumpArticle('service')">用户协议和</text><text @tap="jumpArticle('privacy')">隐私政策</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    jumpNewIndex() {
      uni.navigateTo({
        url: '/pages/index/index-new'
      })
    },
    goContact(){
      uni.navigateTo({
        url: '/pages/service/contact'
      })
    },
    jumpArticle(type) {
      uni.navigateTo({
        url: '/pages/service/article?type=' + type
      })
    },
    goMiit() {
      window.open('https://beian.miit.gov.cn/')
    },
    goMps() {
      window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011102002471')
    },
  }
}
</script>

<style lang="scss" scoped>
.footer {
  //border-top: 1px solid #4A4A4A;
  width: 100%;
  box-sizing: border-box;
  padding: 20rpx 30rpx;
  
  .flex {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    
    .logo {
      image {
        width: 46rpx;
        height: 44rpx;
        vertical-align: middle;
        margin-right: 10rpx;
      }
      
      text {
        font-size: 24rpx;
      }
    }
    
    .contact {
      color: #C0C0C0;
      font-size: 24rpx;
    }
  }
  
  .primaryColor {
    color: var(--red-color1);
  }
  
  text {
    color: #555555;
    font-size: 24rpx;
  }
  
  .semi {
    width: 18rpx;
    height: 20rpx;
    margin-right: 10rpx;
  }
}
.ft-box {
  display: flex;
  align-items: center;
  .link-box {
    flex: 1;
    min-width: 0;
    text-align: right;
  }
}
</style>