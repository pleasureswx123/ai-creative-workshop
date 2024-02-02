<template>
	<view class="content">
		<navMenu></navMenu>
		<view class="banner-cont">
			<view class="banner">
				<view class="bannerBg">
					<video id="myVideo" :src="banner.url" :autoplay="false" :loop="true" :controls="false" :muted="true" :show-center-play-btn="false" object-fit="cover"></video>
				</view>
				<view class="bannerText">
					<text class="eng">{{banner.slogan_en}}</text>
					<view>
						<text class="cn">{{slogan_cn}}</text>
						<!-- <text class="cnmain">{{banner.slogan_mark}}</text> -->
						<!-- <text class="cn">{{slogan_cnEng}}</text> -->
					</view>
				</view>
			</view>
		</view>
		<view class="aiType">
			<view class="item" v-for="(item,index) in makeList" :key="index" @click="goDary(item.channel_id)">
				<text class="aiTitle">{{item.title}}</text>
				<text class="aiSubtitle">{{item.content}}</text>
				<image :src="item.img" v-if="item.img" mode="aspectFit"></image>
				<view class="stay" v-if="item.channel_id==6||item.channel_id==7||item.channel_id==8||item.channel_id==9">敬请期待</view>
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
								<!-- <view class="waterfall-item__ft">
									<view class="waterfall-item__ft__title">
										<text class="value">{{item.model_info}}</text>
									</view>
								</view> -->
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
								<!-- <view class="waterfall-item__ft">
									<view class="waterfall-item__ft__title">
										<text class="value">{{item.model_info}}</text>
									</view>
								</view> -->
							</view>
						</view>
					</template>
				</uv-waterfall>
				<view class="load-more" v-show="countShow == true">
					<u-loadmore :status="status" :nomore-text="nomoreText" @loadmore="getList" />
				</view>
				<view class="load-more" v-show="countShow == false">没有更多了</view>
			</view>
		</view>
		<view class="footer">
			<view class="flex">
				<view class="logo">
					<image src="../../static/images/index/logo.png" mode="aspectFit"></image>
					<text class="primaryColor">超级语言AI</text>
				</view>
				<view class="contact" @click="goContact">联系我们</view>
			</view>
			<text>Copyright © 2024 秋米网络技术(北京)有限公司</text>
			<view class="">
				<text @click="toDoc('service')">用户协议和</text><text @click="toDoc('privacy')">隐私政策</text>
			</view>
			<text @click="goMiit">京ICP备2023009914号-5</text>
			<view>
				<text>增值电信业务许可证 京B2-20240305</text>
			</view>
			<view class="">
				<image src="../../static/images/index/semi.png" mode="aspectFit" class="semi"></image>
				<text @click="goMps">京公网安备11011102002471号</text>
			</view>
		</view>
		<!-- 瀑布流弹窗 -->
		<view class="wallPopup">
			<u-popup :show="wallShow" mode="bottom" @close="wallClose" @open="wallOpen" closeable closeIconPos="top-right">
				<u-swiper height="600px" :list="wallList" @change="e => currentNum = e.current" :autoplay="false" imgMode="aspectFit">
					<view slot="indicator" class="indicator-num">
						<text class="indicator-num__text">{{ currentNum + 1 }}/{{ wallList.length }}</text>
					</view>
				</u-swiper>
				<view class="imgCont">
					<view class="tit">{{wallCont.prompt}}</view>
					<view class="imgDetail">
						<text v-if="wallCont.task_name">{{wallCont.task_name}}</text>
						<text v-if="wallCont.model_style_name">{{wallCont.model_style_name}}</text>
						<text v-if="wallCont.lora_name">{{wallCont.lora_name}}</text>
						<text v-if="wallCont.controlnet_type">{{wallCont.controlnet_type}}</text>
						<text v-if="wallCont.img_style_name">{{wallCont.img_style_name}}</text>
						<text v-if="wallCont.img_scale">{{wallCont.img_scale}}</text>
						<text v-if="wallCont.img_scale">{{wallCont.jifen_consume}}</text>
						<text v-if="wallCont.task_id">任务Id:{{wallCont.task_id}}</text>
						<text v-if="wallCont.create_time">{{wallCont.create_time}}</text>
					</view>
					<view class="operateBtn">
						<view class="btn" @click="onload">下载图片</view>
						<view class="btn" @click="sameModel(wallCont.task_id)">一键同款</view>
					</view>
					
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {guid} from '@/uni_modules/uv-ui-tools/libs/function/index.js'
	import navMenu from '@/components/navMeun/index.vue';
	const app = getApp();
	export default {
		components: {
			navMenu
		},
		data() {
			return {
				banner: {},
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
				countShow:false,
				videoContext:null
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
		onLoad() {
			this.getmakeList()
			this.getaiList()
			this.getUserInfo()
			this.getData();
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo', this);
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
			null() {
				document.body.style.position = null
			},
			fixed(){
				document.body.style.position = 'fixed'
			},
			change(index) {
				this.model_subclass_id = index.current
				this.list = []
				this.$refs.waterfall.clear()
				this.page = 1
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
				this.fixed()
			},
			wallClose() {
				this.wallShow = false
				this.null()
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
					this.task_id = res.data.task_id
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
			getmakeList() {
				app.globalData.util.request({
					url: '/Home/Index',
				})
				.then((res) => {
					this.makeList = res.data.channel
					this.banner = res.data.banner
					this.slogan_cn = res.data.banner.slogan_cn
					this.slogan_cnEng = res.data.banner.slogan_cn.slice(-1)
					this.$nextTick(()=>{
						this.videoContext.play()
					})
				});
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
			goAi() {
				uni.navigateTo({
				  url: '/pages/ai/index'
				})
			},
			goImgTool() {
				uni.navigateTo({
				  url: '/pages/picture/tool'
				})
			},
			goSound() {
				uni.navigateTo({
				  url: '/pages/sound/index'
				})
			},
			goImgToVideo() {
				uni.navigateTo({
				  url: '/pages/picture/img-to-video'
				})
			},
			goGenerateImg() {
				uni.navigateTo({
				  url: '/pages/photos/photos'
				})
			},
			goDary(id) {
				switch (id) {
				  case '1':
					this.goAi();
					break;
				  case '2':
					this.goGenerateImg();
					break;
				  case '3':
					this.goImgTool();
					break;
				  case '4':
					this.goImgToVideo();
					break;
				  case '5':
					this.goSound();
					break;
				  default:
					console.log(id)
				}
			},
			goUser() {
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				uni.navigateTo({
					url: '/pages/user/index'
				})
			},
			toDoc(type) {
				uni.navigateTo({
					url: '/pages/article/article?type=' + type
				})
			},
			goContact(){
				uni.navigateTo({
				  url: '/pages/article/code'
				})
			},
			
			onload() {
				const url = this.wallList[this.currentNum]
				uni.downloadFile({
					url:url, //仅为示例，并非真实的资源
					success: (res) => {
						// console.log(res)
						if (res.statusCode === 200) {
							// #ifdef H5
							const fileName =  url?.split?.('/')?.slice(-1)?.[0] || url;
							const ele = document.createElement('a');
							ele.href = res.tempFilePath;
							ele.setAttribute('download', fileName);
							ele.style.display = 'none';
							document.body.appendChild(ele);
							ele.click();
							document.body.removeChild(ele);
							// #endif
							// #ifndef H5
							uni.saveFile({
							  tempFilePath: res.tempFilePath,
							  success: (res) => {
								console.log(res.savedFilePath);
							  }
							});
							// #endif
						}
					},
					fail: (err) => {
					  console.log('download fail: ', err)
					}
				});
			},
			sameModel(task_id){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				this.null()
				app.globalData.util.request({
					url: '/Home/FeedsTab',
					data:{
						task_id:this.task_id
					}
				})
				.then((res) => {
					uni.navigateTo({
						url: '/pages/photos/photos?task_id=' + task_id
					})
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
			width: 260rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 16rpx;
			background-color: transparent;
			text-align: center;
			margin: 50rpx auto;
			border: 1px solid #fff;
			color:#fff;
			font-size: 28rpx;
			opacity: .8;
			/deep/.u-loadmore{
				margin: 0!important;
				.u-loadmore__content{
					width: 100%;
					.u-loadmore__content__text {
						line-height: 88rpx !important;
						font-size: 28rpx!important;
						width: 100%;
						color: #fff!important;
					}
				}
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
		width: 100%;
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		// background-color: rgba(0,0,0,.3);
		background: linear-gradient(to top, rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0));
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
		&__title {
			.value {
				width: 100%;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: rgba(255,255,255,.7);
				display: inline-block;
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
		padding: 0 40rpx 0;
		box-sizing: border-box;
		position: relative;
		margin:0 0 30rpx 0;
		.banner {
			border-radius: 10rpx;
			height: 344rpx;
			width: 100%;
			overflow: hidden;
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
			margin-bottom: 30rpx;
			position: relative;
			box-sizing: border-box;
			padding: 30rpx 30rpx;
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
			.stay{
				background-color: rgba(246, 6, 82, 1);
				color:rgba(255, 255, 255, .9);
				text-align: center;
				width: 136rpx;
				height: 44rpx;
				line-height: 44rpx;
				border-radius: 0 16rpx 0 16rpx;
				font-size: 22rpx;
				position: absolute;
				right: 0;
				top: 0;
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
		/deep/.u-popup{
			.u-transition{
				height: 90%;
			}
		}
		/deep/.u-popup__content {
			width: 100%;
			height: 100%;
			background-color: #2A2A2A;
			.u-swiper{
				background-color: #2A2A2A!important;
				height: 600px!important;
			}
		}
		/deep/.u-icon__icon{
			font-size: 18px!important;
			line-height: 18px!important;
		}
		.imgCont {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 40rpx;
			background-color: rgba(0, 0, 0, .45);
			z-index:1;
			.tit {
				font-size: 28rpx;
				color: #fff;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.imgDetail {
				margin: 20rpx 0 40rpx;
				font-size: 24rpx; 
				color: #fff;

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
			top: 26rpx;
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
				font-size: 14px;
			}
		}
	}
</style>