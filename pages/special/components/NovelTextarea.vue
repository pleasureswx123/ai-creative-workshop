<template>
	<view class="textarea-container">
		<u--input
			class="qm-textarea"
			placeholder="请输入标题"
			border="bottom"
			v-model="novelValue"
		  ></u--input>
		  <u--textarea 
		  class="qm-textarea"
		  placeholder="请输入文字内容"
		  :confirmType="null" v-model="current"
		  :maxlength="maxlength" height="240" border="none"></u--textarea>
		  <view class="textarea-tips-box">
			<view class="count-tips">{{current.length}}/{{maxlength}}</view>
			<view class="clear" @tap="clear">清空</view>
		  </view>
	</view>
</template>

<script>
export default {
  props: {
	value: {
	  type: String,
	  default: ''
	},
	maxlength: {
	  type: Number,
	  default: 3000
	}
  },
  data() {
	return {
		novelValue: '',
		current:''
	}
  },
  methods: {
	clear(){
		this.current= ''
	}
  }
}
</script>

<style lang="scss" scoped>
	.textarea-container {
	  position: relative;
	  background: var(--bg-color2);
	  padding: 20rpx;
	  border-radius:10rpx;
	  margin-bottom: 20rpx;
	  .textarea-tips-box {
	    position: absolute;
	    right: 5px;
	    bottom: 5px;
	    display: flex;
	    align-items: center;
	    gap: 10rpx;
	    .count-tips,.clear {
	      font-size: 12px;
	      padding: 1px 4px;
	      color: var(--txt-color2)!important;
	    }
		.clear{
			border:1px solid var(--txt-color2);
			border-radius:20rpx;
			padding:0 12rpx;
		}
	  }
	}
	.qm-textarea {
	  background: var(--bg-color2);
	  padding:16rpx 0!important;
	  border-color: var(--txt-color3)!important;
	  /deep/ {
	    .u-textarea__field {
	      font-size: 24rpx;
	    }
	    .uni-textarea-placeholder,.uni-input-placeholder {
	      color: var(--txt-color2)!important;
	    }
	    .uni-textarea-wrapper,.uni-input-input {
	      color: var(--txt-color1)!important;
	    }
	    .u-textarea__count {
	      color: var(--txt-color2)!important;
	      background: var(--bg-color1)!important;
	    }
	  }
	}
</style>
