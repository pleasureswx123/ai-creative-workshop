<template>
	<view class="u-page">
		<scroll-view @scrolltolower="lowerBottom" @refresherrefresh="getFresh" scroll-y="true" class="scrollHeight">
		<view class="scroll-list" >
			<u--image style="margin-bottom: 20rpx;" :showLoading="true" :src="src" width="120px" height="100px" v-for="item in pagenumber"></u--image>
			<view class="" v-if="show">没有更多了</view>
		</view>
	
</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				 listData: [], // 列表数据
				    page: 1, // 当前页码
				    pageSize: 10, // 每页数据量
					pagenumber:21,
					show:false,
			}
		},
		onLoad() {
			
		},
		methods: {
		 
		// GetCollectList(){
		// 	this.pagenumber +=21
		// },
		
		//触底加载
		 lowerBottom(){
			 if(this.pagenumber>42)return this.show = true
			// 判断是否还有下一页数据
			// if (person.data.PageIndex * person.data.PageSize >= person.data.total) return person.showMoreData=true
			// 让页码值自增 +1
			// person.data.PageIndex +=1
			// 重新获取列表数据
			this.pagenumber +=21
			// GetCollectList()
		}
		
		},
		
	}
</script>
<style>
.scrollHeight{
	height: 100vh;
}
.scroll-list{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>