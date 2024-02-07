<template>
    <view class="panel">
      <QmNavTop></QmNavTop>
        <view class="content">
			<view class="title">{{title}}</view>
            <!-- <view v-if="content" v-html="content"></view> -->
			<u-parse v-if="content" :content="content"></u-parse>
            <view v-else style="text-align: center; text-indent: 0; margin-top: 100rpx; color: #ccc">{{ '暂无内容' | lang }}</view>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            content: '',
			title:''
        };
    },
    onLoad(options) {
		var type = options.type
		var title = '文章内容'
		switch(options.type) {
			case 'about':
				title = '关于我们';
				break;
			case 'kefu':
				title = '联系客服';
				break;
			case 'privacy':
				title = '隐私政策';
				break;
			case 'service':
				title = '服务协议';
				break;
			case 'notice':
				title = '通知公告';
				break;
			case 'legal':
				title = '免责声明';
				break;
			case 'commission':
				title = '推广协议';
				break;
		}
		uni.setNavigationBarTitle({
			title: this.$lang(title)
		})
		var data = {
		  type: type
		}
		if(type == 'help' && options.id) {
			data.id = options.id
		}
        app.globalData.util
            .request({
                url: '/article/getArticle',
				data: data
            })
            .then((res) => {
				if(res.data.title) {
					uni.setNavigationBarTitle({
						title: res.data.title
					})
				}
                this.setData({
                    content: res.data.content,
					title:res.data.title
                });
            });
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
page {
    box-sizing: border-box;
    background: #f7f7f8;
}
.panel {
    
}
.content {
    color: #666;
	margin: 30rpx;
	padding: 30rpx;
	background: #fff;
	border-radius: 20rpx;
	.title{
		font-weight: 700;
		color: #333;
		font-size: 28rpx;
		margin-bottom: 30rpx;
	}
	// img{
	// 	width: 100%;
	// 	min-width: 100%;
	// 	max-width: 100%;
	// }
}
.content view {
    margin-bottom: 20rpx;
}
</style>
