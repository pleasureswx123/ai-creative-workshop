<template>
	<view class="content">
		<view class="banner-cont">
			<view class="banner">
				<image :src="bannerImg" mode="widthFix" class="bannerBg"></image>
				<view class="logo">
					<image src="../../static/images/index/logo2.png" mode="widthFix"></image>
				</view>
				<view class="nav">
					<u-icon name="list" color="#fff" size="24" @click="navShow = true"></u-icon>
				</view>
			</view>
			<text>让创作变的轻松独特</text>
		</view>
		<view class="aiType">
			<view class="item" v-for="(item,index) in makeList" :key="index">
				<image :src="item.img" mode="widthFix" v-if="item.img"></image>
				<view class="aiTitle">{{item.title}} ></view>
			</view>
		</view>
		<view class="aiList">
			<u-tabs :list="aiList" :current="current" @change="change"
			 :activeStyle="{
				color: '#303133',
				fontWeight: 'bold',
				transform: 'scale(1.05)',
				fontSize:'14px'
			}"
			:inactiveStyle="{
				color: '#606266',
				transform: 'scale(1)',
				fontSize:'14px'
			}"></u-tabs>
			<view class="aiWaterfall">
				<view class="fallItem" v-for="(item,index) in feedList" :key="index">
					<image :src="item.task_info.img_url" mode="widthFix" v-if="item.task_info.img_url"></image>
					<view class="fallTitle">{{item.task_info.model_info}}</view>
				</view>
				<view class="load-more" @click="feedClick()">
					<u-loadmore :status="status" :nomore-text="nomoreText" @loadmore="getfeedList" />
				</view>
			</view>
		</view>
		<!-- 导航弹出 -->
		<view class="popup">
			<u-popup :show="navShow" mode="right"  @close="close" @open="open" closeIconPos="top-right">
				<view class="user">
					<view class="userAvater">
						<image src="" mode="aspectFit"></image>
					</view>
					<view class="Infor">
						<view class="userName">用户昵称1</view>
						<view class="userId">yyyddoe</view>
					</view>
				</view>
				<view class="integral">
					<view class="inteNum">
						积分
						<text>555</text>
					</view>
					<view class="inteBtn">兑换</view>
				</view>
				<view class="navList">
					<view class="item">
						<u-icon name="account" size="22"></u-icon>个人中心
					</view>
					<view class="item">
						<u-icon name="grid" size="22"></u-icon>我的创作
					</view>
					<view class="navSelmg"></view>
					<view class="item">
						<u-icon name="chat" size="22"></u-icon>智能对话
					</view>
					<view class="item">
						<u-icon name="camera" size="22"></u-icon>生成图片
					</view>
					<view class="item">
						<u-icon name="photo" size="22"></u-icon>图片处理
					</view>
					<view class="item">
						<u-icon name="play-right" size="22"></u-icon>生成视频
					</view>
					<view class="navSelmg"></view>
					<view class="item">
						<u-icon name="file-text" size="22"></u-icon>使用教程
					</view>
					<view class="item">
						<u-icon name="kefu-ermai" size="22"></u-icon>联系我们
					</view>
					<view class="item">
						<u-icon name="info-circle" size="20"></u-icon>服务和隐私条款
					</view>
					<view class="navSelmg"></view>
					<view class="item">
						<u-icon name="minus-square-fill" size="22"></u-icon>退出登录
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				bannerImg:'',
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
				pagesize:10
			}
		},
		onLoad() {
			this.getmakeList()
			this.getaiList()
			this.getfeedList()
		},
		methods: {
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
					this.bannerImg = res.data.slogan_img
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
			}
		}
	}
</script>

<style lang="scss">
	.banner-cont{
		width: 100%;
		padding:30rpx 40rpx 0;
		box-sizing: border-box;
		text-align: center;
		position: relative;
		height: 390rpx; /* 高度可以根据需求进行调整 */
		.bannerBg{
			width: 100%;
			height: 100%!important;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
		}
		.banner{
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			.logo{
				width: 250rpx;
				image{
					width: 100%;
				}
			}
		}
		text{
			font-size: 50rpx;
			color: #fff;
			padding-top: 100rpx;
			display: inline-block;
			width: 100%;
		}
		
	}
	.popup {
		width: 100%;
		/deep/.u-popup__wrapper {
		    width: 70% !important;
		}
		::v-deep .u-popup__content{
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 20rpx;
			// height: ;
		}
		.user{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			.userAvater{
				height: 68rpx;
				width: 68rpx;
				background-color: #f0f0f0;
				border-radius: 50%;
				margin-right: 20rpx;
				image{
					height: 100%;
					width: 100%;
				}
			}
			.Infor{
				.userName{
					font-size: 24rpx;
					color: #000;
					font-weight: 700;
				}
				.userId{
					font-size: 24rpx;
					margin-top: 6rpx;
				}
			}
		}
		.integral{
			width: 100%;
			padding: 20rpx 20rpx 20rpx 28rpx;
			background-color: #d8dcdf;
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
				text{
					font-weight: 700;
					margin-left: 10rpx;
				}
			}
			.inteBtn{
				background-color: #4b5d77;
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
			width: 320rpx;
			height: 196rpx;
			overflow: hidden;
			height: 200rpx;
			margin-bottom: 20rpx;
			position: relative;
			text-align: center;
			line-height: 200rpx;
			image{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%!important;
				z-index: -1;
			}
			.aiTitle{
				color: #fff;
				font-size: 30rpx;
			}
		}
	}
	.aiList{
		box-sizing: border-box;
		padding: 0 30rpx;
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
</style>
