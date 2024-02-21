<template>
  <view class="title-box" @click="$emit('onLayout',`${onEmit}`)">
	<view class="title">
		<u-icon :name="account"></u-icon>{{title}}
	</view>
	<view class="title choose">
		{{choose}}<i class="iconfont">&#xe604;</i></u-icon>
	</view>
  </view>
</template>

<script>
export default {
  props: {
	onEmit: {
      type: String,
      default: '标题'
    },
    title: {
      type: String,
      default: '标题'
    },
	choose: {
      type: String,
      default: '标题'
    },
	account: {
      type: String,
      default: 'account'
    },
  },
}
</script>

<style lang="scss" scoped>
.title-box {
  display: flex;
  align-items: center;
  padding: 10rpx 0;
  gap: 20rpx;
  justify-content: space-between;
  border-bottom:1px solid rgb(54,56,73);
  .title {
    min-width: 0;
    color: var(--txt-color1);
    font-size: 28rpx;
    line-height: 70rpx;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	display: flex;
	align-items: center;
	/deep/.u-icon__icon{
		margin-right:10rpx;
		font-size: 40rpx!important;;
	}
  }
  .choose{
	   color: var(--txt-color2);
	   font-size:24rpx;
	   /deep/.u-icon__icon{
	   	margin-right:0;
	   	font-size: 40rpx!important;;
	   }
  }
}
</style>