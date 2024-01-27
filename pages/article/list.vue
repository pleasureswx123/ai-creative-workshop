<template>
    <view>
        <view class="list">
            <!-- <view class="item" v-for="(item, index) in list" @tap="toArticle" :data-id="item.id">{{ index + 1}}、{{ item.title }}</view> -->
            <view class="item" v-for="(item, index) in list" :key="index" @tap="toArticle" :data-id="item.id">
				<view class="text-cut">{{item.title}}</view>
				<view class="flex">
					<image :src="item.icon" v-if="item.icon" mode=""></image>
					<text>{{item.content_introduce}}</text>
				</view>
			</view>
        </view>
    </view>

</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            type: 'help',
			list: []
        };
    },
    onLoad(options) {
		const type = options.type
		this.setData({
			type: type
		})
		if(type == 'help') {
			uni.setNavigationBarTitle({
			  title: this.$lang('使用教程')
			})
		}
		app.globalData.util.request({
			url: '/article/getList',
			data: {
				type: type
			}
		}).then(res => {
			this.setData({
				list: res.data.list
			})
		})
    },
    methods: {
		toArticle(e) {
			const id = e.currentTarget.dataset.id
			wx.navigateTo({
			  url: '/pages/article/article?type=' + this.type + '&id=' + id
			})
		}
	}
};
</script>
<style lang="scss" scoped>
page {
    background: #f7f7f8;
}
.list {
    margin: 30rpx;
    border-radius: 20rpx;
    overflow: hidden;
}
.item {
    padding: 30rpx;
    font-size: 32rpx;
	background-color: #fff;
    color: #333;
    border-radius: 10rpx;
	margin-bottom: 30rpx;
	.text-cut{
		font-size: 28rpx;
		font-weight: 700;
		margin-bottom: 20rpx;
	}
	.flex{
		display: flex;
		display: -webkit-flex;
		justify-content: normal;
		flex-wrap: wrap;
		align-items: normal;
		image{
			width: 240rpx;
			height: 180rpx;
		}
		text{
			margin-left: 20rpx;
			color: #888;
			font-size: 28rpx;
		}
	}
}
.item:active {
    background: #f3f3f4;
}
.item:last-child {
    border-bottom: none;
}

</style>
