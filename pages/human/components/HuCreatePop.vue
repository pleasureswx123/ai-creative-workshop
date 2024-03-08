<template>
	<NovelPop :show="show" @close="$emit('update:show', false)" :title="title" @confirm="handConfirm" :height="100+'vh'">
		<view class="waterfall">
			<uv-waterfall ref="waterfall" v-model="list" :column-count="columnCount" :add-time="10" :left-gap="leftGap"
				:right-gap="rightGap" :column-gap="columnGap" @changeList="changeList">
				<!-- 第一列数据 -->
				<template v-for="num in columnCount" v-slot:[`list${num}`]>
					<view>
						<view v-for="(item, index) in waterfall[`list${num}`]" :key="item.id"
							:class="{active: activeIndex == item.id}" class="waterfall-item">
							<view class="waterfall-item__image" :style="[imageStyle(item)]"
								@tap="handleSelect(item,index)">
								<image :src="item.img_url" mode="widthFix" :style="{width:item.width+'px'}"></image>
							</view>
						</view>
					</view>
				</template>
			</uv-waterfall>
			<view class="no-more" v-if="showNoMore">没有更多了</view>
			<view class="load-more" v-else>
				<view class="more-btn" @tap="loadMore">加载更多</view>
			</view>
		</view>
	</NovelPop>
</template>

<script>
	import {guid} from '@/uni_modules/uv-ui-tools/libs/function/index.js'
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
			selectId: {
				type: [String, Number],
				default: ''
			},
			paramsInfo: {
				type: Object,
				default: () => ({})
			},
			proxyList: {
				type: Function,
			}
		},
		data() {
			return {
				columnCount: 2,
				page: 1,
				pagesize: 10,
				list: [], // 瀑布流全部数据
				waterfall: {},
				leftGap: 10,
				rightGap: 10,
				columnGap: 10,
				showNoMore: true,
				activeIndex: 0,
				item: {}
			}
		},
		created() {
			this.setColumnCount();
			this.clearData();
			// this.getData();
		},

		computed: {
			imageStyle(item) {
				return item => {
					const val = uni.upx2px(750);
					const num = val > 1200 ? 1200 : val;
					const v = num - this.leftGap - this.rightGap - this.columnGap;
					const w = v / this.columnCount;
					const rate = w / item.img_width;
					const h = rate * item.img_height;
					return {
						width: w + 'px',
						height: h + 'px'
					}
				}
			},
			params() {
				return {
					page: this.page,
					pagesize: this.pagesize,
					...this.paramsInfo,
				}
			}
		},
		watch: {
			// paramsInfo: {
			// 	deep: true,
			// 	handler() {
			// 		this.list = []
			// 		this.clearData();
			// 		this.getData();
			// 	}
			// },
		},
		mounted() {
			// #ifdef H5
			// window.addEventListener('resize', this.restData)
			// #endif
		},
		beforeDestroy() {
			// #ifdef H5
			// window.removeEventListener('resize', this.restData);
			// #endif
			this.$refs?.waterfall?.clear?.();
		},
		methods: {
			getShow() {
				this.list = []
				this.clearData();
				this.getData();
			},
			restData() {
				uni.$u.debounce(this.resetColumnCount, 800);
			},
			setColumnCount() {
				const {
					windowWidth
				} = uni.getSystemInfoSync();
				if (750 < windowWidth && windowWidth < 960) {
					this.columnCount = 3;

				}
				if (windowWidth > 960) {
					this.columnCount = 4;
				}
			},
			resetColumnCount() {
				this.setColumnCount();
				this.clearData();
				return this.getData();
			},
			initListData() {
				for (let i = 0; i < this.columnCount; i++) {
					this.$set(this.waterfall, `list${i + 1}`, [])
				}
			},
			handleSelect(item, index) {
				this.activeIndex = item.id
				this.item = item
			},
			clearData() {
				this.page = 1;
				this.list = [];
				this.$refs?.waterfall?.clear?.();
				this.initListData();
			},
			changeList(e) {
				this.waterfall[e.name].push(e.value);
			},
			loadMore() {
				if (this.showNoMore) {
					return;
				}
				this.page++;
				this.getData();
			},
			getData() {
				photoApi.getHistoryList({
					page: this.page,
					pagesize: this.pagesize,
				}).then(res => {
					if (res.list.length > 0) {
						if (this.list.length == 0) {
							this.list = res.list.map(item => {
								const id = item.id || guid();
								return {
									...item,
									id
								}
							})
						} else {
							this.list = [...this.list, ...res.list.map(item => {
								const id = item.id || guid();
								return {
									...item,
									id
								}
							})]
						}
					}
					this.showNoMore = res.list.length < this.pagesize;
				})
			},
			handConfirm() {
				this.$emit('select',this.item)
				this.$emit('update:show', false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
	.waterfall {
		padding-bottom: 140rpx;
		/deep/.uv-waterfall__gap_left {
			width: 0 !important;
		}
		/deep/.uv-waterfall__gap_right {
			width: 0 !important;
		}
		.no-more {
			text-align: center;
			margin: 50rpx auto;
		}
		.load-more {
			width: 400rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 16rpx;
			background-color: #1D1E23;
			text-align: center;
			margin: 50rpx auto;
			cursor: pointer;
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
		cursor:pointer;
		&.active {
			border: 1px solid var(--red-color1);
		}
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