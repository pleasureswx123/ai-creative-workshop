<template>
	<HumanPop :show="show"  @close="$emit('update:show', false)" :title="title" @confirm="handConfirm" :height="72+'vh'">
		<!-- <scroll-view scroll-y="true" style="height: 300px"> -->
		  <view class="item-wrapper">
			  <view class="item-box" v-for="(item,index) in screenList" :key="index" @click="onSelected(index)">
				<view class="pic-box" :class="{active: activeIndex === index}">
				  <image mode="aspectFill" :src="item.url" v-if="item.url"></image>
				</view>
				<view class="title" :class="{active: activeIndex === index}">{{item.title}}</view>
			  </view>
		  </view>
		  <!-- <view class="noMore" v-if="noMore == false "></view> -->
		  <u-gap height="150rpx" />
		<!-- </scroll-view> -->
	</HumanPop>
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
		active: {
		  type: Boolean,
		  default: false
		}
	},
	data() {
	  return {
		activeIndex: 0,
		screenList:[],
		page:1,
		pagesize:20,
	  }
	},
	mounted() {
		this.getScreenStyle()
	},
	methods: {
		getScreenStyle() {
			NovelApi.getScreen({
				data:{
				page:this.page,
	        	pagesize:this.pagesize}
			}).then(res => {
				this.screenList = res.list
			})
		},
		onSelected(index){
			this.activeIndex = index
		},
		handConfirm(){
			 this.$emit('setNovelData',this.screenList[this.activeIndex])
		}
	},
}
</script>

<style lang="scss" scoped>
.item-wrapper{
	display: grid;
	grid-template-columns: repeat(3,1fr);
	gap: 10px;
	.item-box {
	  position: relative;
	  overflow: hidden;
	  cursor: pointer;
	  .pic-box {
		height: 140rpx;
	    overflow: hidden;
	    position: relative;
	    margin-bottom: 10rpx;
	    border-radius: 10rpx;
		background-color: #ccc;
		border:1px solid var(--bg-color1);
	  &.active {
		border:1px solid #F60652;
	  }
	    uni-image {
	      width: 100%;
	      height: 100%;
	    }
	  }
	  .title {
	    color: #fff;
	    font-size: 24rpx;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	    text-align: center;
		  &.active {
			color:#F60652;
		  }
	  }
	}
}
@media screen and (min-width: 960px){
	.item-wrapper .item-box .pic-box{
		height:  400rpx;
	}
	// scroll-view{
	// 	height: 75vh!important;
	// }
}
</style>