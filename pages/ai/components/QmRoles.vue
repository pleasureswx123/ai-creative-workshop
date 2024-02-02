<template>
  <view class="roles-group">
    <view class="roles-card" v-for="item in list" :key="item.id">
      <view class="card-title">{{item.title}}</view>
      <view class="card-roles">
        <view class="roles-item" v-for="roles in item.roles" :id="roles.id" @tap="toCosplayChat(roles)">
          <view class="thumb">
            <image :src="roles.thumb || '/static/images/cosplay/default.png'"></image>
          </view>
          <view class="roles-info">
            <view class="title">{{roles.title}}</view>
            <view class="info-ft">
              <uni-icons custom-prefix="iconfont-qm" type="icon-qm-eye" color="#878787" size="16" />
              <view style="padding-right: 8rpx;">{{roles.views}}</view>
              <uni-icons custom-prefix="iconfont-qm" type="icon-qm-comment" color="#878787" size="14" />
              <view>{{roles.usages}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    toCosplayChat({id}) {
      uni.$u.route({
        url: 'pages/ai/digit-chat',
        params: {
          role_id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.roles-group {
  padding: 30rpx;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.roles-card {
  margin-bottom: 40rpx;
  &:last-child {
    margin-bottom: 200rpx;
  }
  .card-title {
    color: #666;
    font-size: 32rpx;
    font-weight: bold;
    padding-bottom: 20rpx;
  }
  .card-roles {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30rpx;
    .roles-item {
      min-width: 0;
      background: #f7f7f8;
      padding: 20rpx;
      display: flex;
      align-items: center;
      gap: 20rpx;
      border-radius: 14rpx;
      .thumb {
        width: 88rpx;
        height: 88rpx;
        border-radius: 10rpx;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .roles-info {
        flex: 1;
        min-width: 0;
        .title {
          font-size: 28rpx;
          font-weight: bold;
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .info-ft {
          display: flex;
          gap: 4rpx;
          align-items: center;
          color: #8e8ea0;
          font-size: 24rpx;
          margin-top: 14rpx;
        }
      }
    }
  }
}
</style>