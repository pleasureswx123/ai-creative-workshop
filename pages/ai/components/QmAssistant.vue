<template>
  <view class="prompt-list">
    <view class="prompt-item" v-for="item in list" :key="item.id">
      <view class="bd" @tap="toWriteChat(item)">
        <view class="title">{{item.title}}</view>
        <view class="desc">{{item.desc}}</view>
      </view>
      <view class="ft">
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-eye" color="#878787" size="16" />
        <view style="padding-right: 8rpx;">{{item.views}}</view>
        <view class="flex1"></view>
        <uni-icons custom-prefix="iconfont-qm" type="icon-qm-comment" color="#878787" size="14" />
        <view>{{item.usages}}</view>
        <view class="flex1"></view>
        <view @tap="doVote(item)">
          <uni-icons v-if="item.isVote == 1" custom-prefix="iconfont-qm" type="icon-qm-heart" color="red" size="14" />
          <uni-icons v-else custom-prefix="iconfont-qm" type="icon-qm-favorite" color="#878787" size="14" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {userApi} from '@/api'
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    toWriteChat({id}) {
      uni.$u.route({
        url: 'pages/ai/assistant-chat',
        params: {
          prompt_id: id
        }
      })
    },
    doVote(item) {
      const {id, isVote} = item;
      const prompt_id = id;
      userApi.votePrompt({prompt_id: prompt_id}).then((res) => {
        isVote === 1 ? uni.$u.toast('已取消收藏') : uni.$u.toast('收藏成功');
      }).catch(res => {
        if (res.errno == 403) {
          uni.showModal({
            title: '提示',
            content: '请登录',
            confirmText: '去登录',
            cancelText: '取消',
            success: function (res) {
              if (res.confirm) {
                uni.$u.route({
                  url: 'pages/login/index'
                })
              }
            }
          })
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.prompt-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
  background: #fff;
  padding: 30rpx;
}
.prompt-item {
  min-width: 0;
  background: #f7f7f8;
  padding: 20rpx 30rpx;
  border-radius: 14rpx;
  //height: 220rpx;
  overflow: hidden;
  position: relative;
}
.bd {
  .title {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 44rpx;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .desc {
     font-size: 24rpx;
     color: #888;
     margin-top: 10rpx;
     line-height: 36rpx;
     height: 108rpx;
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 3;
     overflow: hidden;
   }
}
.ft {
  display: flex;
  align-items: center;
  gap: 10rpx;
}
</style>