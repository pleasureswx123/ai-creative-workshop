<template>
	<view class="textarea">
		<u--textarea v-model="current" placeholder="请输入您的内容" height="140" :maxlength="maxlength"></u--textarea>
		<view class="textarea-tips-box">
			<view class="count-tips">{{current.length}}/{{maxlength}}</view>
			<uni-icons @tap="current = ''" custom-prefix="iconfont-qm" type="icon-qm-del" color="var(--txt-color2)" size="20" />
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return{
			current:'',
			maxlength:300
		}
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
.textarea{
	position: relative;
	width: 100%;
	.title{
		color: var(--txt-color1);
		font-size: 28rpx;
		margin-bottom: 5rpx;
	}
	/deep/.u-textarea{
		background-color:var(--bg-color2);
		border-color: #494C55!important;
		border-width: 1px !important;
		.uni-textarea-placeholder {
		  color: var(--txt-color2)!important;
		  font-size: 24rpx;
		}
		.uni-textarea-wrapper {
		  color: var(--txt-color1)!important;
		}
	}
	.textarea-tips-box{
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		font-size:22rpx;
		display: flex;
		align-items: center;
		.count-tips {
		  font-size: 12px;
		  padding: 1px 4px;
		  color: var(--txt-color2)!important;
		  background: var(--bg-color1)!important;
		  margin-right: 10rpx;
		}
	}
}
</style>