<template>
	<NovelPop :show="show"
      @close="$emit('update:show', false)"
      :title="title" :setShow="false">
	  <view class="flex">
		  <view class="videoPop" v-for="(item,index) in inverList" @tap="handConfirm(index)">
		  	{{item.scale}}
		  </view>
	  </view>
	  
	</NovelPop>
</template>

<script>
import {NovelApi} from '@/api'
export default {
	props: {
		title: {
		  type: String,
		  default: '标题' 
		},
		show: {
		  type: Boolean,
		  default: false
		},
	},
	data() {
	  return {
		inverList:[]
	  }
	},
	mounted() {
		this.getInverScale()
	},
	methods: {
		getInverScale() {
			NovelApi.getVideoScale({
				data:{page:1,
        			pagesize:10,},
				no_sign: 1,
				sourceCode:"100001",
				sign:"52d89ffef49b65edaf5d232104d42fac",
				timestamp:"1545454552",
			}).then(res => {
				this.inverList = res.list
			})
		},
		handConfirm(index){
			this.$emit('setInverData',this.inverList[index])
		}
	},
}
</script>

<style lang="scss" scoped>
	.flex{
		display: grid;
		grid-template-columns: repeat(5,1fr);
		gap: 15px;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:50rpx 30rpx;
		margin-bottom:30rpx;
		text-align: center;
	}
</style>