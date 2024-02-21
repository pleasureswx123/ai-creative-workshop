<template>
	<view class="">
		<view class="novel">
			 <novelLayout v-for="(item,index) in burList" :onEmit="item.onEmit" :account="item.account"  :title="item.title" :choose="item.choose"
			  @onLayout="onLayout"></novelLayout>
		</view>
		<view class="novel">
			<novelLayout v-for="(item,index) in tabList" :onEmit="item.onEmit" :account="item.account"  :title="item.title" :choose="item.choose"
			 @onLayout="onLayout"></novelLayout>
		</view>
	</view>
	

</template>

<script>
	import novelLayout from "./novelLayout.vue";
	export default {
		components: {
			novelLayout
		},
		methods: {
			onLayout(name) {
				this.$emit('onLayout',name)
			}
		},
		data() {
			return {
				videoPop: false,
				tabList: [{
					title: '选择配音',
					choose: '前往选择',
					onEmit: 'videoPop',
					account: 'account'
				}, {
					title: '背景音乐',
					choose: '前往选择（选填）',
					onEmit: 'bgmPop',
					account: 'account'
				}, {
					title: '视频字幕',
					choose: '前往选择（选填）',
					onEmit: 'captionsPop',
					account: 'account'
				}, {
					title: '视频比例',
					choose: '前往选择',
					onEmit: 'inverPop',
					account: 'account'
				}],
				burList:[{
					title: '画面风格',
					choose: '前往选择',
					onEmit: 'videoPop',
					account: 'account'
				}, {
					title: '年代风格',
					choose: '选填',
					onEmit: 'bgmPop',
					account: 'account'
				}]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.novel {
		border-radius: 10rpx;
		position: relative;
		background: var(--bg-color2);
		padding: 0 30rpx 30rpx;
		margin-bottom:20rpx ;
		.btn {
			width: 100%;
			text-align: center;
			background: rgba(73, 69, 69, .5);
			border-radius: 10rpx;
			color: rgb(192, 198, 225);
			height: 100rpx;
			line-height: 100rpx;
			margin-top: 30rpx;
			font-size: 28rpx;
		}
	}
</style>