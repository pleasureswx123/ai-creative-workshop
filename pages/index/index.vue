<template>
	<view class="content">
    <QmNavTop></QmNavTop>
    <QmHomeBanner></QmHomeBanner>
    <QmAiTypeMenu></QmAiTypeMenu>
		<view class="aiList">
      <QmHomeTypeTabs :value.sync="model_subclass_id" />
			<view class="waterfall">
				<uv-waterfall
            ref="waterfall"
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
							<view
                  v-for="(item, index) in list1"
                  :key="item.id"
                  class="waterfall-item"
                  @click="wallInfo(item.task_id)">
								<view
                    class="waterfall-item__image"
                    :style="[imageStyle(item)]">
									<image :src="item.img_url" mode="widthFix" />
								</view>
							</view>
						</view>
					</template>
					<!-- 第二列数据 -->
					<template v-slot:list2>
						<!-- 为了磨平部分平台的BUG，必须套一层view -->
						<view>
							<view
                  v-for="(item, index) in list2"
                  :key="item.id"
                  class="waterfall-item"
                  @click="wallInfo(item.task_id)">
								<view
                    class="waterfall-item__image"
                    :style="[imageStyle(item)]">
									<image :src="item.img_url" mode="widthFix" />
								</view>
							</view>
						</view>
					</template>
				</uv-waterfall>
    
				<view class="load-more" v-if="countShow">
					<u-loadmore :status="status" :nomore-text="nomoreText" @loadmore="getList" />
				</view>
				<view class="load-more" v-else>没有更多了</view>
    
			</view>
		</view>
    
    <QmHomeFooter />
    <MyCreateDetails
        v-if="showDetails"
        :show.sync="showDetails"
        :info="wallCont" />
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
				showDetails: false,
				wallCont: {},
				task_id: '',
				countShow:false,
			}
		},
    watch: {
      model_subclass_id() {
        this.initData()
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
		},
    onShow() {
      this.model_subclass_id = '100';
      this.initData();
    },
		methods: {
      ...mapActions('HomeInfo', ['getHomeInfo']),
      initData() {
        this.list = [];
        this.$refs?.waterfall?.clear();
        this.page = 1;
        this.list1 = [];
        this.list2 = [];
        this.getData();
      },
			// 这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列
			changeList(e) {
				this[e.name].push(e.value);
			},
			getList() {
				this.page++;
				this.getData()
			},
			// 模拟的后端数据
			getData() {
				return new Promise((resolve) => {
					app.globalData.util.request({url: '/Home/FeedsList',
							data: {page: this.page, pagesize: this.pagesize, model_subclass_id: this.model_subclass_id}
						}).then((res) => {
            const resList = res?.data?.list || [];
            this.countShow = !(resList.length < 10)
            const info = resList.map(item => item.task_info);
            this.list = [...this.list, ...info];
          })
				})
			},
			getDrawInfo() {
				app.globalData.util.request({
					url: '/AiDraw/GetInfo',
					data: {
						task_id: this.task_id
					}
				}).then((res) => {
					this.wallCont = res.data
					this.task_id = res.data.task_id
				});
			},
			wallInfo(task_id) {
				this.task_id = task_id
				this.showDetails = true
				this.getDrawInfo()
			},
			goUser() {
        this.checkLoginStatus().then(() => {
          uni.navigateTo({
            url: '/pages/user/index'
          })
        })
			},
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
</style>