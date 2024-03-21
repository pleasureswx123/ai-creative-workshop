<template>
	<HumanPop :show="show" @close="$emit('update:show', false)" :title="title" :setShow="false" :height="40+'vh'">
	  <view class="videoPop" v-for="(item,index) in bgmList" @click="misic(item.id,item.url)">
		  <i :class="item.account"></i>
		  {{item.title}}
	  </view>
	</HumanPop>
</template>

<script>
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
		bgmList:[
			{
				title:'推荐音乐',
				account:'iconfont icon-jia',
				id:1,
				url:'./music'
			},
			// {
			// 	title:'音乐素材库',
			// 	account:'iconfont icon-jia',
			// 	id:2,
			// 	url: './Material'
			// },
			{
				title:'不需要',
				id:3,
				url:''
			}
		],
	  }
	},
	methods: {
		misic(id,url) {
			uni.navigateTo({
			   url: url 
			})
			if(this.id = 3){
				this.$emit('NoNeed', '不需要')
			}
		}
	},
}
</script>

<style lang="scss" scoped>
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx 30rpx;
		margin-bottom:30rpx;
		text-align: center;
		cursor: pointer;
		.iconfont{
			margin-right: 6rpx;
			font-size:16px!important;
		}
	}
</style>