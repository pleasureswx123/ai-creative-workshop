<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
	</view>
</template>

<script>

export default {
  data() {
    return {
		
    }
  },
  
}
</script>

<style lang="scss" scoped>
.page-container {
  background: var(--bg-color1);
  padding-bottom: calc(100rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
  font-size: 24rpx;
  .page-content {
    padding: 0 40rpx;
  }
}
</style>