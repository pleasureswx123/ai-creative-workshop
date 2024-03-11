<template>
	<NovelPop :show="show"
      @close="$emit('update:show', false)"
      :title="title" @confirm="setEraData">
	  <scroll-view scroll-y="true" style="height: 200px">
		  <view class="flex">
			  <view class="videoPop"
			   v-for="(item,index) in eraList"
				:class="{active: activeIndex === index}"
				@tap="choose(index)"
				
				>{{item.title}}</view>
		  </view>
		  <u-gap height="120rpx" />
	  </scroll-view>
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
		eraList:[],
		activeIndex:0
	  }
	},
	mounted() {
		this.getTimeStyle()
	},
	methods: {
		getTimeStyle() {
			NovelApi.getTimeStyle({
				data:{page:1,
        		pagesize:20,}
			}).then(res => {
				this.eraList = res.list
			})
		},
		choose(index){
			this.activeIndex = index
		},
		setEraData(){
			this.$emit('setEraData',this.eraList[this.activeIndex])
		}
	},
}
</script>

<style lang="scss" scoped>
	.flex{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 10px;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:10rpx;
		padding:20rpx 0;
		margin-bottom:10rpx;
		text-align: center;
		cursor: pointer;
		&.active{
			background-color:#6978fd;
		}
	}
</style>