<template>
	<view class="textarea">
		<view class="title">配音文案</view>
		<u--textarea v-model="current" placeholder="输入或者复制您要制作数字人的文案" height="140" :maxlength="maxlength"></u--textarea>
		<view class="textarea-tips-box">
			<view class="count-tips">{{current.length}}/{{maxlength}}</view>
			<view class="paste" @tap="handlePaste">黏贴</view>
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
		async handlePaste() {
		  let pastedText;
		  // 根据平台判断，使用不同的方式获取粘贴的内容
		  // #ifdef H5
		  try {
		    pastedText = await navigator.clipboard.readText();
		  } catch (error) {
		    console.error('无法读取剪贴板内容:', error);
		  }
		  // #endif
		  // #ifdef MP-WEIXIN
		  wx.getClipboardData({
		    success: res => {
		      pastedText = res.data;
		    },
		  });
		  console.log(pastedText)
		  // #endif
		  // #ifdef APP-PLUS
		  // 在 APP 中处理粘贴操作，使用平台特定的 API
		  // 例如，如果是 Android 平台，可以使用 plus.android.invoke() 等方法
		  // #endif
		  this.current = pastedText.slice(0, this.maxlength);
		}
	}
}
</script>

<style lang="scss" scoped>
.textarea{
	position: relative;
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
		.paste{
			color: var(--txt-color1);
			border: 1px solid var(--txt-color1);
			border-radius: 30rpx;
			padding: 0 10rpx;
			cursor: pointer;
		}
	}
}
</style>