<template>
  <view class="title-box" @click="$emit('onLayout',`${onEmit}`)">
	<view class="title">
		<i :class="account"></i>{{title}}
	</view>
	<view class="title choose">
		{{choose}}<i class="iconfont icon-arrow-right-copy-copy-copy"></i></u-icon>
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
  padding: 15rpx 0;
  gap: 20rpx;
  justify-content: space-between;
  border-bottom:1px solid rgb(54,56,73);
  cursor: pointer;
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
	.iconfont{
		margin-right:10rpx;
	}
  }
  .choose{
	   color: var(--txt-color1);
	   opacity: 0.7;
	   cursor: pointer;
	   .iconfont{
	   	margin-right:0;
	   }
  }
}
.title-box:last-child{
	  border:none;
  }
@media screen and (min-width: 960px){
	.title{
		font-size: 32rpx!important;
	}
}
</style>