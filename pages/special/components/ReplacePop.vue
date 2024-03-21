<template>
	<HumanPop :show="show"
	  @close="$emit('update:show', false)"
	  :title="title" :titleShow="false" @confirm="handConfirm" :height="40+'vh'">
		<view class="replace">
			<u--input
				class="qm-textarea"
				placeholder="请输入文字"
				border="bottom"
				v-model="laceValue"
			  ></u--input>
			  <i class="iconfont icon-tihuan"></i>
			  <u--input
			  	class="qm-textarea"
			  	placeholder="请输入需要替换的文字"
			  	border="bottom"
			  	v-model="repValue"
			    ></u--input>
		</view>
	</HumanPop>
</template>

<script>
	export default{
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			title: {
				type: String,
				default: false,
			},
		},
		data(){
			return{
				laceValue:'',
				repValue:''
			}
		},
		methods:{
			handConfirm(){
				let obj = {
					laceValue:this.laceValue,
					repValue:this.repValue
				}
				this.$emit('handConfirm',obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.replace{
		margin-bottom: 150rpx;
	}
	.qm-textarea {
	  background: var(--bg-color2);
	  padding:16rpx 0 16rpx 20rpx!important;
	  border-color: var(--txt-color3)!important;
	  border-radius: 10rpx;
	  /deep/ {
	    .uni-input-placeholder {
	      color: var(--txt-color2)!important;
	      font-size: 24rpx;
	    }
	    .uni-input-input {
	      color: var(--txt-color1)!important;
	    }
	  }
	}
	.icon-tihuan{
	  display: block;
	  text-align: center;
	  margin: 20rpx 0;
	}
</style>