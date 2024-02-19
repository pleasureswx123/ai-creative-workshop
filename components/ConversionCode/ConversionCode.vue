<template>
  <view>
    <u-popup
        v-if="showPop"
        class="integral-pop"
        :show="showPop"
        mode="center"
        @close="showPop = false"
        closeIconPos="top-right">
      <view class="integral-inner">
        <view class="title">兑换积分</view>
        <view class="desc">可以使用兑换码来获取平台积分，若您已拥有兑换码，可直接进行兑换。若尚未获得兑换码，可联系我们客服进行购买。</view>
        <u--input placeholder="输入或粘贴兑换码" border="surround" v-model="code" placeholderStyle="fontSize:14px"></u--input>
        <view class="operateBtn">
          <view class="btn" @click="showPop = false">取消</view>
          <view class="btn confirm" @click="handleConfirm">确认兑换</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {mapActions} from 'vuex';
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
      code: ''
    }
  },
  computed: {
    showPop: {
      get() {
        return this.show
      },
      set(status) {
        this.$emit('update:show', status);
      }
    }
  },
  methods: {
    ...mapActions('UserInfo', ['getUserInfo']),
    handleConfirm() {
      const code = `${this.code}`.trim();
      if(!code) {
        return
      }
      userApi.bindCard({code}).then(res => {
        uni.showToast({
          title: res.message,
          duration: 2000
        });
        this.showPop = false;
        this.getUserInfo();
      })
    },
  }
}
</script>

<style lang="scss" scoped>
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
</style>