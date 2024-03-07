<template>
	<NovelPop :show="show"
	  @close="$emit('update:show', false)"
	  :title="title" @confirm="handConfirm">
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
</NovelPop>
</template>

<script>
import {photoApi} from '@/api'
	export default {
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			title: {
				type: String,
				default: false,
			},
		},
		data() {
			return {
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
				nomoreText: '没有更多了',
				countShow:false,
				status: 'loadmore',
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
			this.getData();
		},
		methods: {
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
						url: '/AiDraw/getHistory',
						data: {
							page: this.page,
							pagesize: this.pagesize
						}
					})
					.then((res) => {
						this.imgs = res.list
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

		}
	}
</script>

<style lang="scss" scoped>
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
</style>