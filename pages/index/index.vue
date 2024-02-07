<template>
	<view class="content">
    <QmNavTop></QmNavTop>
    <QmHomeBanner></QmHomeBanner>
    <QmAiTypeMenu></QmAiTypeMenu>
		<view class="aiList">
      <QmHomeTypeTabs :value.sync="model_subclass_id" />
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
    <QmHomeFooter></QmHomeFooter>
		<!-- 瀑布流弹窗 -->
		<view class="wallPopup">
			<u-popup :show="wallShow" mode="bottom" @close="wallShow = false" closeable closeIconPos="top-right">
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
import {mapActions} from 'vuex';
	const app = getApp();
	export default {
		data() {
			return {
        model_subclass_id: '100',
				feedList: [],
				status: 'loadmore',
				nomoreText: '实在没有了',
				page: 1,
				pagesize: 10,
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
			}
		},
    watch: {
      model_subclass_id() {
        this.list = []
        this.$refs.waterfall.clear()
        this.page = 1
        this.list1 = []
        this.list2 = []
        this.getData()
      },
      wallShow: {
        immediate: true,
        handler(status) {
          this.toggleBodyPositionStatus(status)
        }
      },
    },
    beforeDestroy() {
      this.toggleBodyPositionStatus(false)
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
			this.getHomeInfo();
			this.getData();
		},
		methods: {
      ...mapActions('HomeInfo', ['getHomeInfo']),
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
			goUser() {
        this.checkLoginStatus().then(() => {
          uni.navigateTo({
            url: '/pages/user/index'
          })
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
        this.checkLoginStatus().then(() => {
          uni.navigateTo({
            url: '/pages/photos/index?task_id=' + task_id
          })
        })
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #0D0D0D;
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
	.aiList {
		box-sizing: border-box;
		padding: 0 30rpx;
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