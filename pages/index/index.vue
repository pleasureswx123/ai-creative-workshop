<template>
	<view class="content">
		<view class="banner-cont">
			<view class="navList">
				<view class="nav">
					<u-icon name="list" color="#fff" size="24" @click="navShow = true"></u-icon>
				</view>
				<view class="head" @click="goUser">
					<image :src="userinfo.avatar" v-if="userinfo.avatar"></image>
				</view>
			</view>
			<view class="banner">
				<view class="bannerBg">
					<video id="myVideo" :src="banner.url" :autoplay="true" :loop="true" :controls="false" :muted="true" object-fit="cover"></video>
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
			<view class="item" v-for="(item,index) in makeList" :key="index" @click="goDary(item.channel_id)">
				<text class="aiTitle">{{item.title}}</text>
				<text class="aiSubtitle">{{item.content}}</text>
				<image :src="item.img" mode="widthFix" v-if="item.img"></image>
			</view>
		</view>
		<view class="aiList">
			<u-tabs :list="aiList" :current="current" @change="change"
			 :activeStyle="{
				color: '#F60652',
				fontWeight: 'bold',
				transform: 'scale(1.05)',
				fontSize:'14px'
			}"
			:inactiveStyle="{
				color: '#606266',
				transform: 'scale(1)', 
				fontSize:'14px'
			}"></u-tabs>
			<view class="waterfall">
				<uv-waterfall ref="waterfall"
					v-model="list"
					:add-time="10"
					:left-gap="leftGap"
					:right-gap="rightGap"
					:column-gap="columnGap"
					@changeList="changeList">
					<!-- 第一列数据 -->
					<template v-slot:list1>
						<!-- 为了磨平部分平台的BUG，必须套一层view -->
						<view>
							<view v-for="(item, index) in list1"
								:key="item.id"
								class="waterfall-item">
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
							<view v-for="(item, index) in list2"
								:key="item.id"
								class="waterfall-item">
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
			</view>
		</view>
		<view class="footer">
			<view class="flex">
				<view class="logo">
					<image src="../../static/images/index/logo.png" mode=""></image>
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
				<image src="../../static/images/index/semi.png" mode="aspectFill" class="semi"></image>
				<text @click="goMps">京公网安备11011102002471号</text>
			</view>
		</view>
		<!-- 导航弹出 -->
		<view class="popup">
			<u-popup :show="navShow" mode="left"  @close="close" @open="open" closeIconPos="top-right">
				<view class="user" @click="goUser">
					<view class="userAvater">
						<image :src="userinfo.avatar" v-if="userinfo.avatar"></image>
					</view>
					<view class="Infor">
						<!-- <view class="userName">{{userinfo.nickname}}</view> -->
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
						<u-icon name="account" size="22" color="#f5f5f5"></u-icon>个人中心
					</view>
					<view class="item" @click="goMyCreate">
						<u-icon name="grid" size="22" color="#f5f5f5"></u-icon>我的创作
					</view>
					<view class="navSelmg"></view>
					<view class="item" @click="goAi">
						<u-icon name="chat" size="22" color="#f5f5f5"></u-icon>智能对话
					</view>
					<view class="item">
						<u-icon name="camera" size="22" color="#f5f5f5"></u-icon>生成图片
					</view>
					<view class="item" @click="goImgTool">
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
				<u--input
				    placeholder="输入或粘贴兑换码"
				    border="surround"
				    v-model="value"
				    @change="inChange"
					placeholderStyle="fontSize:14px"
				  ></u--input>
				  <view class="operateBtn">
					  <view class="btn cancel" @click="integralShow = false">取消</view>
					  <view class="btn sure" @click="exchange">确认兑换</view>
				  </view>
			</u-popup>
		</view>
		<!-- 瀑布流弹窗 -->
	</view>
</template>

<script>
	import { guid } from '@/uni_modules/uv-ui-tools/libs/function/index.js'
	const app = getApp();
	export default {
		data() {
			return {
				banner:{},
				navShow:false,
				makeList:[],
				aiList:[],
				current: 0,
				feedList:[],
				status: 'loadmore',
				nomoreText: '没有更多了',
				loading: true, 
				model_subclass_id:'',
				page:1,
				pagesize:10,
				isLogin: false,
				userinfo: {
					user_id: 0,
					balance: 0,
					balance_draw: 0
				},
				integralShow:false,
				value: '',
				code:'',
				slogan_cn:'',
				slogan_cnEng:'',
				list: [],// 瀑布流全部数据
				list1: [],// 瀑布流第一列数据
				list2: [],// 瀑布流第二列数据
				leftGap: 10,
				rightGap: 10,
				columnGap: 10
			}
		},
		computed: {
			imageStyle(item) {
				console.log(item)
				return item=>{
					const v = uni.upx2px(750) - this.leftGap - this.rightGap - this.columnGap;
					const w = v/2;
					const rate = w / item.img_width;
					const h = rate* item.img_height;
					console.log(w,h)
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
			this.getfeedList()
			this.getUserInfo()
			const { data } = await this.getData();
			this.list = data;
		},
		methods: {
			goMyCreate() {
				uni.navigateTo({
					url: '/pages/picture/index'
				})
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
			// 这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列
			changeList(e){
				this[e.name].push(e.value);
			},
			// 模拟的后端数据
			getData() {
				return new Promise((resolve)=>{
					app.globalData.util.request({
						url:'/Home/FeedsList',
						data: {
							page:this.page,
							pagesize:this.pagesize,
							model_subclass_id:1
						}
					})
					.then((res) => {
						this.imgs = res.data.list
						const imgs = this.imgs
						this.list = this.imgs.map(item =>{
							return {...item.task_info}
						})
					})
					let list = [];
				})
			},
			getUserInfo() {
			    app.globalData.util.request({
			            url: '/user/info'
			        })
			        .then((res) => {
			            this.setData({
			                userinfo: res.data,
							isLogin: true,
			            });
			        }).catch(res => {
						if(res.errno == 403) {
							app.globalData.util.toLogin('请登录')
						}
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
					this.makeList  = res.data.channel
					this.banner = res.data.banner
					this.slogan_cn = res.data.banner.slogan_cn.slice(0, -3)
					this.slogan_cnEng = res.data.banner.slogan_cn.slice(-1)
			   	});
			},
			getaiList() {
				app.globalData.util.request({
					url: '/Home/FeedsTab'
				})
				.then((res) => {
					const aiList = res.data
					this.aiList = aiList.map((item) => ({
						name: item.title,
						current:item.model_subclass_id 
					}));
				});
			},
			change(index) {
				this.current = index.index;
				this.model_subclass_id = index.current
				this.getfeedList()
				this.page = 1
				this.feedList = []
			},
			getfeedList(){
				this.status = 'loading'
				app.globalData.util.request({
					url: '/Home/FeedsList',
					data:{
						page:this.page,
						pagesize:this.pagesize,
						model_subclass_id:this.model_subclass_id
					}
				})
				.then((res) => {
					this.loading = false
					if (res.data.list && res.data.list.length) {
					  this.status = 'loadmore'
					  this.feedList = [...this.feedList, ...res.data.list]
					  if (res.data.list.length < this.pagesize) {
					    this.status = 'nomore'
					  }
					} else {
						
					}
				});
			},      
			feedClick(){
				if(this.page == 1 && this.status == 'loadmore'){
					this.page += 1
					this.getfeedList()
				}
			},
			inOpen() {
				// console.log('open');
			},
			inClose() {
				this.integralShow = false
			},
			blChange(){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				this.navShow = false
				this.integralShow = true
				this.value = '';
			},
			exchange(){
				app.globalData.util.request({
					url: '/user/bindCard',
					data:{
						code:this.code
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
			goMiit(){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				window.open('https://beian.miit.gov.cn/')
			},
			goMps(){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				window.open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011102002471')
			},
			goDary(id){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				switch (id) {
					case '1':
						this.goAi();
						break;
					case '2':
						break;
					case '3':
						this.goImgTool();
						break;
					case '4':
						break;
					case '5':
						this.goSound();
						break;
					default:
						console.log(id)
				}
			},
			goUser(){
				if (!this.isLogin) {
					app.globalData.util.toLogin('请登录')
					return
				}
				uni.switchTab({
					url: '/pages/user/index'
				})
			},
			goUse(e){
				console.log(e)
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
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #0D0D0D;
	}
	uni-video{
		width: 100%;
		height: 100%;
	}
	$show-lines: 1;
	@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
	.waterfall{
		/deep/.uv-waterfall__gap_left{
			width: 0!important;
		}
		/deep/.uv-waterfall__gap_right{
			width: 0!important;
		}
	}
	.waterfall-item {
		overflow: hidden;
		margin-top: 10px;
		border-radius: 6px;
		position: relative;
		.waterfall-item__image{
			image{
				width: 100%!important;
				height: 100%!important;
			}
		}
	}
	
	.waterfall-item__ft {
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translate(-50%,0);
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
	.banner-cont{
		width: 100%;
		padding:30rpx 40rpx 0;
		box-sizing: border-box;
		position: relative;
		.navList{
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			.head{
				width: 60rpx;
				height: 60rpx;
				overflow: hidden;
				border-radius: 50%;
				background-color: rgb(255, 173, 8);
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.banner{
			border-radius: 10rpx;
			height: 344rpx;
			width: 100%;
			overflow: hidden;
			margin: 30rpx 0;
			position: relative;
			.bannerBg{
				width: 100%;
				height: 100%!important;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
			}
			.bannerText{
				color: #fff;
				position: relative;
				z-index: 2;
				box-sizing: border-box;
				padding:60rpx 0 0 30rpx ;
				text{
					display:inline-block;
				}
				.eng{
					font-size: 28rpx;
				}
				.cn{
					font-size: 60rpx;
				}
				.cnmain{
					color: #F60652;
					font-weight: 700;
					font-size: 60rpx;
				}
			}
		}
	}
	.popup {
		width: 100%;
		::v-deep .u-popup__content{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			background-color: #0D0D0D;
		}
		.user{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			.userAvater{
				height: 68rpx;
				width: 68rpx;
				background-color: #ffad08;
				border-radius: 50%;
				overflow:hidden;
				margin-right: 20rpx;
				image{
					height: 100%;
					width: 100%;
				}
			}
			.Infor{
				.userName{
					font-size: 24rpx;
					color: #fff;
					font-weight: 700;
				}
				.userId{
					font-size: 24rpx;
					margin-top: 6rpx;
					color: #818181;
				}
			}
		}
		.integral{
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
			.inteNum{
				font-size: 24rpx;
				color: #B2B2B2;
				text{
					margin-left: 10rpx;
				}
			}
			.inteBtn{
				background-color: #F60652;
				border-radius: 8rpx;
				padding: 8rpx 16rpx;
				font-size: 24rpx;
				color: #fff;
			}
		}
		.navList{
			.item{
				width: 100%;
				padding: 0 20rpx;
				margin: 0 0 30rpx;
				font-size: 28rpx;
				display: flex;
				color: #f5f5f5;
				.u-icon{
					display: inline-block;
					margin-right: 12rpx;
				}
			}
			.navSelmg{
				width: 100%;
				height: 1px;
				background-color: #f0f0f0;
				margin: 40rpx 0;
			}
		}
	}
	.aiType{
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		padding: 0 40rpx ;
		margin: 30rpx 0;
		.item{
			width: 100%;
			overflow: hidden;
			background-color: #1D1E23;
			margin-bottom: 20rpx;
			position: relative;
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			border-radius: 10rpx;
			image{
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				width: 48rpx;
				height: 48rpx!important;
			}
			text{
				color: #fff;
				display: block;
			}
			.aiTitle{
				font-size: 28rpx;
				margin-bottom: 6rpx;
			}
			.aiSubtitle{
				color: #77787B;
				font-size: 26rpx;
			}
		}
	}
	.aiList{
		box-sizing: border-box;
		padding: 0 30rpx;
		/deep/.u-tabs__wrapper__nav__line{
			background: #F60652!important;
		}
	}
	.inpopup{
		width: 80%;
		.title{
			font-size: 32rpx;
			text-align: center;
			font-weight: 700;
		}
		.text{
			font-size: 28rpx;
			text-align: center;
			margin: 20rpx 0;
		}
		/deep/.u-popup__content{
			width: 80%;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 80rpx 40rpx;
		}
		/deep/.u-input{
			border: 1px solid #f5f5f5;
			background-color: #f5f5f5;
			margin: 30rpx 0;
		}
		.operateBtn{
			display: flex;
			display: -webkit-flex;
			justify-content: right;
			flex-wrap: wrap;
			align-items: center;
			.btn{
				width: 200rpx;
				height: 50rpx;
				line-height: 50rpx;
				border: 1px solid #F60652;
				border-radius: 8rpx;
				display: inline-block;
				text-align: center;
				font-size: 28rpx;
			}
			.sure{
				margin-left: 20rpx;
				background-color: #F60652;
				color: #fff;
			}
		}
	}
	.aiWaterfall{
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		margin: 20rpx 0;
		.fallItem{
			width: 330rpx;
			height: 490rpx;
			border-radius: 16rpx;
			overflow: hidden;
			position: relative;
			margin-bottom: 25rpx;
			image{
				width: 100%;
				height: 100%!important;
			}
			.fallTitle{
				position: absolute;
				bottom: 20rpx;
				left: 30rpx;
				color: #fff;
				font-size: 24rpx;
			}
		}
		.load-more{
			border: 1px solid #999;
			border-radius: 10rpx;
			color: #fff;
			margin:20rpx auto;
			.u-loadmore{
				margin: 0!important;
				width: 350rpx;
				height: 60rpx!important;
				/deep/.u-loadmore__content__text{
					font-size: 24rpx!important;
					font-weight: 700;
				}
			}
		}
	}
	.footer{
		border-top: 1px solid #4A4A4A;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		.flex{
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			.logo{
				image{
					width: 46rpx;
					height: 44rpx;
					vertical-align: middle;
					margin-right: 10rpx;
				}
				text{
					font-size: 24rpx;
				}
			}
			.contact{
				color: #C0C0C0;
				font-size: 24rpx;
			}
		}
		.primaryColor{
			color: #F60652;
		}
		text{
			color: #555555;
			font-size: 24rpx;
		}
		.semi{
			width: 18rpx;
			height: 20rpx;
			margin-right: 10rpx;
		}
	}
</style>
