<template>
    <view class="page">
        <view v-if="share.textArr && share.textArr.length > 0">
            <view class="title">{{ '分享文案' | lang }}</view>
            <view class="pannel">
                <view class="textarea">
                    <view v-html="currentText + '<br>' + share.h5url"></view>
                </view>
                <view class="btn-group">
                    <view class="btn btn-copy" @tap="copyText">{{ '复制文案' | lang }}</view>
                    <view class="btn btn-next" @tap="nextText" v-if="share.textArr.length > 1">{{ '换一个' | lang }}</view>
                </view>
            </view>
        </view>
        <view v-if="share.haibaoArr && share.haibaoArr.length > 0">
            <view class="title">{{ '我的海报' | lang }}</view>
            <view class="pannel">
                <swiper class="poster-list" @change="swiperChange" :indicator-dots="true" :current="currentHaibao" :circular="true" :autoplay="false" previous-margin="-10rpx" next-margin="-10rpx">
                    <swiper-item class="item" v-for="item in share.haibaoArr">
                        <view class="poster" :style="'width: ' + (item.bg_w * item.scale) + 'rpx; height: ' + (item.bg_h * item.scale) + 'rpx;'">
                            <image :src="item.bg" style="width: 100%; height: 100%;"></image>
                            <image :src="share.qrcode" :style="'left: '+ (item.hole_x * item.scale) + 'rpx; top: ' + (item.hole_y * item.scale) + 'rpx; width: ' + (item.hole_w * item.scale) + 'rpx; height:' + (item.hole_h * item.scale) + 'rpx;'"></image>
                        </view>
                    </swiper-item>
                </swiper>
                <view class="btn-group" style="margin-top: 100rpx;">
                    <view class="btn btn-save" @tap="saveToAlbum">{{ '下载海报图片' | lang }}</view>
                </view>
            </view>
        </view>
        
        <canvas canvasId="poster" style="display:block; height: 4000rpx; width: 4000rpx; position: absolute; left: -4000rpx; top: -4000rpx;"></canvas>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            share: {},
			currentHaibao: 0,
			currentText: '',
			siteroot: ''
        };
    },
    onLoad() {
		this.getShare()
		this.setData({
			system: app.globalData.system,
			siteroot: app.globalData.siteroot.replace('/web.php', '')
		});
    },
    onShow() {
		uni.setNavigationBarTitle({
			title: this.$lang('邀请好友')
		})
    },
    methods: {
        getShare: function() {
			app.globalData.util.request({
				url: '/commission/getShare',
				data: {
					platform: 'h5'
				}
			}).then(res => {
				this.setData({
					share: res.data,
					currentText: res.data.defaultText,
					currentHaibao: res.data.defaultHaibao
				})
			})
		},
		copyText() {
			var text = this.currentText
			if(!text) {
				return false
			}
			text += "<br>" + this.share.h5url
			text = text.replaceAll("<br>", "\n");
			uni.setClipboardData({
				data: text,
				success: function() {
					app.globalData.util.message('复制成功')
				}
			})
		},
		nextText() {
			var currentText = this.currentText
			var textArr = this.share.textArr
			if(!textArr || textArr.length <= 1) {
				app.globalData.util.message('没有更多了')
				return false
			}
			textArr.forEach((item, index) => {
				if(item.content == currentText) {
					// 切换到下一个
					if(index === textArr.length -1) {
						this.setData({
							currentText: textArr[0]['content']
						})
					} else {
						this.setData({
							currentText: textArr[index+1]['content']
						})
					}
				}
			})
		},
		swiperChange: function(e) {
			this.setData({
				currentHaibao: e.detail.current
			})
		},
		saveToAlbum: function() {
			const haibaoArr = this.share.haibaoArr
			const currentHaibao = this.currentHaibao
			const haibao = haibaoArr[currentHaibao]
			const qrcode = this.share.qrcode
			const poster = 'https://' + window.location.host + '/web.php/commission/makePoster?bg=' + encodeURIComponent(haibao.bg) + '&qrcode=' + encodeURIComponent(qrcode) + '&hole_w=' + haibao.hole_w + '&hole_h=' + haibao.hole_h + '&hole_x=' + haibao.hole_x + '&hole_y=' + haibao.hole_y;
			
			app.globalData.util.message('请长按弹出的图片->保存到手机', 'error', function() {
				uni.previewImage({
					urls: [poster]
				})
			})
			
		}
    }
};
</script>
<style>
page {
	background: #f7f7f8;
}
.page {
	width: 100%;
    height: 100%;
    padding-bottom: 30rpx;
    overflow-x: hidden;
}
.title {
    width: 100%;
    padding: 30rpx 30rpx;
    font-size: 28rpx;
    font-weight: bold;
}
.pannel {
    width: 690rpx;
    margin: 0 30rpx;
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    box-sizing: border-box;
    overflow: hidden;
}
.pannel .textarea {
    font-size: 24rpx;
    color: #333;
    line-height: 36rpx;
    background: #f7f7f8;
    border-radius: 20rpx;
    padding: 30rpx;
    min-height: 180rpx;
	box-sizing: border-box;
}
.pannel .btn-group {
    width: 100%;
    height: 64rpx;
    margin: 40rpx 0 20rpx 0;
    text-align: center;
}
.pannel .btn-group view {
    display: inline-block;
}
.btn-group .btn {
    width: 200rpx;
	margin: 0 auto;
	font-size: 28rpx;
	font-weight: 500;
	text-align: center;
	height: 64rpx;
	line-height: 64rpx;
    border-radius: 32rpx;
    background: #04babe;
    color: #fff;
    border: 1px solid #04babe;
    letter-spacing: 1px;
}
.btn-group .btn:active {
    opacity: 0.8;
}

.btn-group .btn-next {
    margin-left: 30rpx;
    background: #fff;
    color: #04babe;
}

.btn-group .btn-save {
    width: 400rpx;
	font-weight: 500;
	color: #ffffff;
	text-align: center;
}

.poster-list {
	width:100%;
    height: 500rpx;
    margin: 20rpx 0;
}
.poster-list .item {
	width: 500rpx;
	height: 750rpx;
}
.poster {
	width: 100%;
	height: 100%;
	position: relative;
    margin: 0 auto;
}
.poster image {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
