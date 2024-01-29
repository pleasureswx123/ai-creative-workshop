<template>
	<view class="content">
		<view class="banner-cont">
			<view class="navList">
				<view class="nav">
					<u-icon name="list" color="#fff" size="24" @click="navShow = true"></u-icon>
				</view>
				<view class="head" @click="goUser">
					<image :src="userinfo.avatar" v-if="userinfo.avatar" mode="aspectFit"></image>
				</view>
			</view>
			<view class="banner">
				<view class="bannerBg">
					<video id="myVideo" :src="banner.url" :autoplay="true" :loop="true" :controls="false" muted="muted" :show-center-play-btn="false" object-fit="cover"></video>
				</view>
				<view class="bannerText">
					<text class="eng">{{banner.slogan_en}}</text>
					<view>
						<text class="cn">{{slogan_cn}}</text>
						<text class="cnmain">{{banner.slogan_mark}}</text>
						<text class="cn">{{slogan_cnEng}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="aiType">
			<view class="item" v-for="(item,index) in makeList" :key="index" @click="goDary">
				<text class="aiTitle">{{item.title}}</text>
				<text class="aiSubtitle">{{item.content}}</text>
				<image :src="item.img" v-if="item.img" mode="aspectFit"></image>
			</view>
		</view>
		<view class="aiList">
			<u-tabs :list="aiList" :current="current" @change="change" :activeStyle="{
				color: '#F60652',
				fontWeight: 'bold',
				transform: 'scale(1.05)',
				fontSize:'14px'
			}" :inactiveStyle="{
				color: '#606266',
				transform: 'scale(1)', 
				fontSize:'14px'
			}"></u-tabs>
			<view class="waterfall">
				<uv-waterfall ref="waterfall" v-model="list" :add-time="10" :left-gap="leftGap" :right-gap="rightGap"
					:column-gap="columnGap" @changeList="changeList">
					<!-- 第一列数据 -->
					<template v-slot:list1>
						<!-- 为了磨平部分平台的BUG，必须套一层view -->
						<view>
							<view v-for="(item, index) in list1" :key="item.id" class="waterfall-item"
								@click="wallInfo(item.task_id)">
								<view class="waterfall-item__image" :style="[imageStyle(item)]">
									<image :src="item.img_url" mode="widthFix"></image>
								</view>
								<view class="waterfall-item__ft">
									<view class="waterfall-item__ft__title">
										<text class="value">{{item.model_info}}</text>
									</view>
								</view>
							</view>
						</view>
					</template>
					<!-- 第二列数据 -->
					<template v-slot:list2>
						<!-- 为了磨平部分平台的BUG，必须套一层view -->
						<view>
							<view v-for="(item, index) in list2" :key="item.id" class="waterfall-item"
								@click="wallInfo(item.task_id)">
								<view class="waterfall-item__image" :style="[imageStyle(item)]">
									<image :src="item.img_url" mode="widthFix"></image>
								</view>
								<view class="waterfall-item__ft">
									<view class="waterfall-item__ft__title">
										<text class="value">{{item.model_info}}</text>
									</view>
								</view>
							</view>
						</view>
					</template>
				</uv-waterfall>
				<view class="load-more" v-show="countShow == true">
					<u-loadmore :status="status" :nomore-text="nomoreText" @loadmore="getList" />
				</view>
				<view class="load-more" v-show="countShow == false">
					没有更多了
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="flex">
				<view class="logo">
					<image src="../../static/images/index/logo.png" mode="aspectFit"></image>
					<text class="primaryColor">超级语言AI</text>
				</view>
				<view class="contact">联系我们</view>
			</view>
			<text>Copyright © 2024 秋米网络技术(北京)有限公司</text>
			<view class="">
				<text>用户协议和</text><text>隐私政策</text>
			</view>
			<text @click="goMiit">京ICP备2023009914号-5</text>
			<view class="">
				<image src="../../static/images/index/semi.png" mode="aspectFit" class="semi"></image>
				<text @click="goMps">京公网安备11011102002471号</text>
			</view>
		</view>
		<!-- 导航弹出 -->
		<view class="popup">
			<u-popup :show="navShow" mode="left" @close="close" @open="open" closeIconPos="top-right">
				<view class="user" @click="goUser">
					<view class="userAvater">
						<image :src="userinfo.avatar" v-if="userinfo.avatar" mode="aspectFit"></image>
					</view>
					<view class="Infor">
						<view class="userName">{{userinfo.nickname || $lang('未设置昵称') }}</view>
						<view class="userId">MID:{{userinfo.user_id}}</view>
					</view>
				</view>
				<view class="integral">
					<view class="inteNum">
						积分
						<text>{{userinfo.balance}}</text>
					</view>
					<view class="inteBtn" @click="blChange">兑换</view>
				</view>
				<view class="navList">
					<view class="item" @click="goUser">
						<u-icon name="account" size="22" color="#f5f5f5" @click="goUser"></u-icon>个人中心
					</view>
					<view class="item">
						<u-icon name="grid" size="22" color="#f5f5f5"></u-icon>我的创作
					</view>
					<view class="navSelmg"></view>
					<view class="item">
						<u-icon name="chat" size="22" color="#f5f5f5"></u-icon>智能对话
					</view>
					<view class="item">
						<u-icon name="camera" size="22" color="#f5f5f5"></u-icon>生成图片
					</view>
					<view class="item">
						<u-icon name="photo" size="22" color="#f5f5f5"></u-icon>图片处理
					</view>
					<view class="item">
						<u-icon name="play-right" size="22" color="#f5f5f5"></u-icon>生成视频
					</view>
					<view class="navSelmg"></view>
					<view class="item" data-url="/pages/article/list?type=help" @click="goUse">
						<u-icon name="file-text" size="22" color="#f5f5f5"></u-icon>使用教程
					</view>
					<view class="item">
						<u-icon name="kefu-ermai" size="22" color="#f5f5f5"></u-icon>联系我们
					</view>
					<view class="item" @click="toDoc('service')">
						<u-icon name="order" size="20" color="#f5f5f5"></u-icon>服务条款
					</view>
					<view class="item" @click="toDoc('privacy')">
						<u-icon name="info-circle" size="20" color="#f5f5f5"></u-icon>隐私协议
					</view>
					<view class="navSelmg"></view>
					<view class="item" @click="doLogout">
						<u-icon name="minus-square-fill" size="22" color="#f5f5f5"></u-icon>退出登录
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 兑换积分弹窗 -->
		<view class="inpopup">
			<u-popup :show="integralShow" mode="center" @close="inClose" @open="inOpen" closeIconPos="top-right">
				<text class="title">兑换积分</text>
				<text class="text">可以使用兑换码来获取平台积分，若您已拥有兑换码，可直接进行兑换。若尚未获得兑换码，可联系我们客服进行购买。</text>
				<u--input placeholder="输入或粘贴兑换码" border="surround" v-model="value" @change="inChange"
					placeholderStyle="fontSize:14px"></u--input>
				<view class="operateBtn">
					<view class="btn cancel" @click="integralShow = false">取消</view>
					<view class="btn sure" @click="exchange">确认兑换</view>
				</view>
			</u-popup>
		</view>
		<!-- 瀑布流弹窗 -->
		<view class="wallPopup">
			<u-popup :show="wallShow" mode="center" @close="wallClose" @open="wallOpen" closeable closeIconPos="top-right">
				<u-swiper height="600" :list="wallList" @change="e => currentNum = e.current" :autoplay="false" imgMode="aspectFit">
					<view slot="indicator" class="indicator-num">
						<text class="indicator-num__text">{{ currentNum + 1 }}/{{ wallList.length }}</text>
					</view>
				</u-swiper>
				<view class="imgCont">
					<view class="tit">{{wallCont.prompt}}</view>
					<view class="imgDetail">
						<text>{{wallCont.task_name}}</text>
						<text>{{wallCont.model_style_name}}</text>
						<text>{{wallCont.lora_name}}</text>
						<text>{{wallCont.controlnet_type}}</text>
						<text>{{wallCont.img_style_name}}</text>
						<text>{{wallCont.img_scale}}</text>
						<text>{{wallCont.jifen_consume}}</text>
						<text>{{wallCont.task_id}}</text>
						<text>{{wallCont.create_time}}</text>
					</view>
					<view class="operateBtn">
						<view class="btn" @click="onload">下载图片</view>
						<view class="btn">一键同款</view>
					</view>
					
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {guid} from '@/uni_modules/uv-ui-tools/libs/function/index.js'
	const app = getApp();
	export default {
		data() {
			return {
				banner: {},
				navShow: false,
				makeList: [],
				aiList: [],
				current: 0,
				feedList: [],
				status: 'loadmore',
				nomoreText: '实在没有了',
				model_subclass_id: 100,
				page: 1,
				pagesize: 10,
				isLogin: false,
				userinfo: {
					user_id: 0,
					balance: 0,
					balance_draw: 0
				},
				integralShow: false,
				value: '',
				code: '',
				slogan_cn: '',
				slogan_cnEng: '',
				list: [], // 瀑布流全部数据
				list1: [], // 瀑布流第一列数据
				list2: [], // 瀑布流第二列数据
				leftGap: 10,
				rightGap: 10,
				columnGap: 10,
				wallShow: false,
				wallList: [],
				currentNum: 0,
				wallCont: {},
				task_id: '',
				roleForm: {},
				countShow:false
			}
		},
		computed: {
			imageStyle(item) {
				return item => {
					const v = uni.upx2px(750 - 20) - this.leftGap - this.rightGap - this.columnGap;
					const w = v / 2;
					const rate = w / item.img_width;
					const h = rate * item.img_height;
					return {
						width: w + 'px',
						height: h + 'px'
					}
				}
			}
		},
		async onLoad() {
			this.getmakeList()
			this.getaiList()
			this.getUserInfo()
			this.getData();
		},
		methods: {
			getaiList() {
				app.globalData.util.request({
						url: '/Home/FeedsTab'
					})
					.then((res) => {
						const aiList = res.data
						this.aiList = aiList.map((item) => ({
							name: item.title,
							current: item.model_subclass_id
						}));
					});
			},
			async change(index) {
				this.model_subclass_id = index.current
				this.list = []
				this.$refs.waterfall.clear()
				this.list1 = []
				this.list2 = []
				this.getData()
			},
			// 这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列
			changeList(e) {
				this[e.name].push(e.value);
			},
			getList() {
				this.page++
				this.getData()
			},
			// 模拟的后端数据
			getData() {
				return new Promise((resolve) => {
					app.globalData.util.request({
							url: '/Home/FeedsList',
							data: {
								page: this.page,
								pagesize: this.pagesize,
								model_subclass_id: this.model_subclass_id
							}
						})
						.then((res) => {
							this.imgs = res.data.list
							const imgs = this.imgs
							if(res.data.list.length<10){
								this.countShow = false
							}else{
								this.countShow = true
							}
							if (this.list.length == 0) {
								this.list = this.imgs.map(item => {
									return {
										...item.task_info
									}
								})
							} else if (this.list.length > 0) {
								this.imgs.map(item => {
									this.list.push({
										...item.task_info
									})
								})
							}

						})
				})
			},
			wallOpen() {

			},
			wallClose() {
				this.wallShow = false
			},
			getDrawInfo() {
				app.globalData.util.request({
						url: '/AiDraw/GetInfo',
						data: {
							task_id: this.task_id
						}
					})
					.then((res) => {
						this.wallList = res.data.img_urls
						this.wallCont = res.data
					});
			},
			wallInfo(task_id) {
				this.task_id = task_id
				this.wallShow = true
				this.getDrawInfo()
			},
			getUserInfo() {
				app.globalData.util.request({
					url: '/user/info'
				}).then((res) => {
					this.setData({
						userinfo: res.data,
						isLogin: true,
					});
				})
			},
			open() {
				// console.log('open');
			},
			close() {
				this.navShow = false
			},
			getmakeList() {
				app.globalData.util.request({
					url: '/Home/Index',
				})
				.then((res) => {
					this.makeList = res.data.channel
					this.banner = res.data.banner
					this.slogan_cn = res.data.banner.slogan_cn.slice(0, -3)
					this.slogan_cnEng = res.data.banner.slogan_cn.slice(-1)
				});
			},
			inOpen() {
				// console.log('open');
			},
			inClose() {
				this.integralShow = false
			},
			blChange() {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				this.navShow = false
				this.integralShow = true
				this.value = '';
			},
			exchange() {
				app.globalData.util.request({
						url: '/user/bindCard',
						data: {
							code: this.code
						}
					})
					.then((res) => {
						app.globalData.util.message(res.message)
						this.integralShow = false
						this.getUserInfo();
					});
			},
			inChange(e) {
				// console.log('change', e);
			},
			doLogout() {
				app.globalData.util.request({
					url: '/user/logout'
				}).then((res) => {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				})
			},
			goMiit() {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				window.open('https://beian.miit.gov.cn/')
			},
			goMps() {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011102002471')
			},
			goDary() {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
			},
			goUser() {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				uni.switchTab({
					url: '/pages/user/index'
				})
			},
			goUse(e) {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				const url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url: url
				});
			},
			toDoc(type) {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				uni.navigateTo({
					url: '/pages/article/article?type=' + type
				})
			},
			onload() {
				uni.downloadFile({
					url: this.wallList, //仅为示例，并非真实的资源
					success: function(res) {
						console.log(res)
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								app.globalData.util.message('已保存到相册');
							},
							fail: function(res) {
								console.log('error', res);
								app.globalData.util.message('保存失败，请检查是否有保存到相册权限', 'error');
							}
						});
					},
					fail: function() {
						app.globalData.util.message('图片下载失败', 'error');
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #0D0D0D;
	}

	uni-video {
		width: 100%;
		height: 100%;
	}

	$show-lines: 1;
	@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';

	.waterfall {
		/deep/.uv-waterfall__gap_left {
			width: 0 !important;
		}

		/deep/.uv-waterfall__gap_right {
			width: 0 !important;
		}

		.load-more {
			width: 400rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 16rpx;
			background-color: #1D1E23;
			text-align: center;
			margin: 50rpx auto;

			/deep/.u-loadmore__content__text {
				line-height: 88rpx !important;
			}
		}
	}
	.waterfall-item {
		overflow: hidden;
		margin-top: 10px;
		border-radius: 6px;
		position: relative;

		.waterfall-item__image {
			image {
				width: 100% !important;
				height: 100% !important;
			}
		}
	}
	.waterfall-item__ft {
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translate(-50%, 0);

		&__title {
			text-align: center;
			font-weight: 700;

			.value {
				font-size: 28rpx;
				color: #fff;
			}
		}

		&__desc .value {
			font-size: 28rpx;
			color: #606266;
		}

		&__btn {
			padding: 10px 0;
		}
	}

	.banner-cont {
		width: 100%;
		padding: 30rpx 40rpx 0;
		box-sizing: border-box;
		position: relative;

		.navList {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			/deep/.u-icon__icon{
				font-size: 24px!important;
			}
			.head {
				width: 60rpx;
				height: 60rpx;
				overflow: hidden;
				border-radius: 50%;
				background-color: rgb(255, 173, 8);

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.banner {
			border-radius: 10rpx;
			height: 344rpx;
			width: 100%;
			overflow: hidden;
			margin: 30rpx 0;
			position: relative;

			.bannerBg {
				width: 100%;
				height: 100% !important;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}

			.bannerText {
				color: #fff;
				position: relative;
				z-index: 2;
				box-sizing: border-box;
				padding: 60rpx 0 0 30rpx;

				text {
					display: inline-block;
				}

				.eng {
					font-size: 28rpx;
				}

				.cn {
					font-size: 60rpx;
				}

				.cnmain {
					color: #F60652;
					font-weight: 700;
					font-size: 60rpx;
				}
			}
		}
	}

	.popup {
		width: 100%;

		::v-deep .u-popup__content {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			background-color: #0D0D0D;
		}

		.user {
			display: flex;
			flex-wrap: wrap;
			align-items: center;

			.userAvater {
				height: 68rpx;
				width: 68rpx;
				background-color: #ffad08;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20rpx;

				image {
					height: 100%;
					width: 100%;
				}
			}

			.Infor {
				.userName {
					font-size: 24rpx;
					color: #fff;
					font-weight: 700;
				}

				.userId {
					font-size: 24rpx;
					margin-top: 6rpx;
					color: #818181;
				}
			}
		}

		.integral {
			width: 420rpx;
			padding: 20rpx 20rpx 20rpx 28rpx;
			background-color: #1D1E23;
			border-radius: 10rpx;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			margin: 40rpx 0;
			box-sizing: border-box;

			.inteNum {
				font-size: 24rpx;
				color: #B2B2B2;

				text {
					margin-left: 10rpx;
				}
			}

			.inteBtn {
				background-color: #F60652;
				border-radius: 8rpx;
				padding: 8rpx 16rpx;
				font-size: 24rpx;
				color: #fff;
			}
		}

		.navList {
			.item {
				width: 100%;
				padding: 0 20rpx;
				margin: 0 0 30rpx;
				font-size: 28rpx;
				display: flex;
				color: #f5f5f5;

				.u-icon {
					display: inline-block;
					margin-right: 12rpx;
				}
			}

			.navSelmg {
				width: 100%;
				height: 1px;
				background-color: #f0f0f0;
				margin: 40rpx 0;
			}
		}
	}

	.aiType {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		padding: 0 40rpx;
		margin: 30rpx 0;

		.item {
			width: 100%;
			overflow: hidden;
			background-color: #1D1E23;
			margin-bottom: 20rpx;
			position: relative;
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			border-radius: 10rpx;

			image {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				width: 48rpx;
				height: 48rpx !important;
			}

			text {
				color: #fff;
				display: block;
			}

			.aiTitle {
				font-size: 28rpx;
				margin-bottom: 6rpx;
			}

			.aiSubtitle {
				color: #77787B;
				font-size: 26rpx;
			}
		}
	}

	.aiList {
		box-sizing: border-box;
		padding: 0 30rpx;

		/deep/.u-tabs__wrapper__nav__line {
			background: #F60652 !important;
		}
	}

	.inpopup {
		width: 80%;

		.title {
			font-size: 32rpx;
			text-align: center;
			font-weight: 700;
		}

		.text {
			font-size: 28rpx;
			text-align: center;
			margin: 20rpx 0;
		}

		/deep/.u-popup__content {
			width: 80%;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 80rpx 40rpx;
		}

		/deep/.u-input {
			border: 1px solid #f5f5f5;
			background-color: #f5f5f5;
			margin: 30rpx 0;
		}

		.operateBtn {
			display: flex;
			display: -webkit-flex;
			justify-content: right;
			flex-wrap: wrap;
			align-items: center;

			.btn {
				width: 200rpx;
				height: 50rpx;
				line-height: 50rpx;
				border: 1px solid #F60652;
				border-radius: 8rpx;
				display: inline-block;
				text-align: center;
				font-size: 28rpx;
			}

			.sure {
				margin-left: 20rpx;
				background-color: #F60652;
				color: #fff;
			}
		}
	}

	.footer {
		border-top: 1px solid #4A4A4A;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;

		.flex {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;

			.logo {
				image {
					width: 46rpx;
					height: 44rpx;
					vertical-align: middle;
					margin-right: 10rpx;
				}

				text {
					font-size: 24rpx;
				}
			}

			.contact {
				color: #C0C0C0;
				font-size: 24rpx;
			}
		}

		.primaryColor {
			color: #F60652;
		}

		text {
			color: #555555;
			font-size: 24rpx;
		}

		.semi {
			width: 18rpx;
			height: 20rpx;
			margin-right: 10rpx;
		}
	}

	.wallPopup {
		position: relative;

		/deep/.u-popup__content {
			width: 100%;
			height: 100%;
			background-color: #2A2A2A;
			.u-swiper{
				background-color: #2A2A2A!important;
			}
		}

		.imgCont {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 40rpx;
			background-color: rgba(0, 0, 0, .2);

			.tit {
				font-size: 28rpx;
				color: #fff;
			}

			.imgDetail {
				margin: 20rpx 0 40rpx;
				font-size: 24rpx;
				color: #9C9C9A;

				text {
					margin-right: 30rpx;
				}
			}

			.operateBtn {
				display: flex;
				display: -webkit-flex;
				justify-content: space-between;
				flex-wrap: wrap;
				align-items: center;

				.btn {
					width: 46%;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 28rpx;
					background-color: #fff;
					text-align: center;
					border-radius: 200rpx;
					margin-bottom: 20rpx;
				}
			}
		}

		/deep/.u-swiper__indicator {
			bottom: 0;
			top: 50rpx;
		}

		.indicator {
			@include flex(row);
			justify-content: center;

			&__dot {
				height: 6px;
				width: 6px;
				border-radius: 100px;
				background-color: rgba(255, 255, 255, 0.35);
				margin: 0 5px;
				transition: background-color 0.3s;

				&--active {
					background-color: #ffffff;
				}
			}
		}

		.indicator-num {
			padding: 2px 0;
			border-radius: 100px;
			width: 35px;
			@include flex;
			justify-content: center;

			&__text {
				color: #FFFFFF;
				font-size: 12px;
			}
		}
	}
</style>