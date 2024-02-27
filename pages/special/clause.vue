<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="videoPop">如分句不合理，可将光标放到文字中央点击"回车键"换行，也可通过合并按钮取消分段。</view>
		<view class="videoPop">
			<view class="title">场景</view>
			<u--textarea
			class="qm-textarea"
			placeholder=""
			:confirmType="null" v-model="current"
			:maxlength="maxlength" autoHeight border="none"></u--textarea>
			<view class="textarea-tips-box">
				<view class="count-tips">{{current.length}}/{{maxlength}}</view>
			</view>
		</view>
		<view class="nextBtn" @tap="nextTop">下一步</view>
		<ModePop :show="show" @close="close" @nextStep="nextStep"></ModePop>
	</view>
</template>

<script>
import ModePop from "./components/ModePop.vue"
export default {
	components: {
		ModePop
	},
	data() {
		return {
			current:'',
			maxlength:100,
			show:false
		}
	},
	methods: {
		nextTop(){
			this.show = true
		},
		close(){
			this.show = false
		},
		nextStep(data){
			if(data == '自动生成模式'){
				uni.navigateTo({
				   url: './finish'
				})
			}
			if(data == '手动生成模式'){
				uni.navigateTo({
				   url: './storyboard'
				})
			}
		}
	},
}
</script>

<style lang="scss" scoped>
	.page-container {
		padding: 0 30rpx;
		position: relative;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx;
		margin-top:30rpx;
		color:var(--txt-color1);
		position: relative;
		font-size:24rpx;
		.title{
			color:#ccc;
			font-size:24rpx;
		}
	}
	.qm-textarea {
	  background: transparent;
	  padding:16rpx 0!important;
	  border-color: var(--txt-color3)!important;
	  /deep/ {
	    .u-textarea__field,.uni-textarea-textarea {
	      font-size: 24rpx!important;
	    }
	    .uni-textarea-placeholder{
	      color: var(--txt-color2)!important;
	    }
	    .uni-textarea-wrapper{
	      color: var(--txt-color1)!important;
	    }
	    .u-textarea__count {
	      color: var(--txt-color2)!important;
	      background: var(--bg-color1)!important;
	    }
	  }
	}
	.count-tips{
		color: var(--txt-color2)!important;
	}
	.nextBtn{
		position: fixed;
		bottom: 0;
		left: 0;
		background: #2877ff;
		text-align:center;
		width: 100%;
		padding:30rpx 0;
		color:var(--txt-color1);
		border-radius:20rpx 20rpx 0 0;
		font-size:28rpx;
		font-weight:700;
	}
</style>