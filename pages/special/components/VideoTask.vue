<template>
	<scroll-view scroll-y="true" style="height: 300px">
		<view class="videoList">
			<view class="videoPop" v-for="(item,index) in videoList">
				<view class="videoBg">
					<i class="iconfont icon-jiqiren"></i>
					<i class="iconfont icon-bofang"></i>
				</view>
				<view class="word">
					<view class="title">{{item.title}}</view>
					<view class="name">{{item.title}}</view>
				</view>
			</view>
		</view>
		<u-gap height="120rpx" />
	</scroll-view>
</template>

<script>
import {NovelApi} from '@/api'
export default {
	data() {
		return {
			videoList: []
		}
	},
	mounted() {
		this.getVideoTask()
	},
	methods: {
		getVideoTask() {
			NovelApi.getDub({
				data:{page:1,
        			pagesize:10,},
				no_sign: 1,
				sourceCode:"100001",
				sign:"52d89ffef49b65edaf5d232104d42fac",
				timestamp:"1545454552",
			}).then(res => {
				this.videoList = res.list
			})
		},
	},
}
</script>

<style lang="scss" scoped>
	.videoList {
		.videoPop {
			display: flex;
			align-items: center;
			background-color: var(--bg-color2);
			border-radius: 10px;
			padding: 10px 15px;
			margin-bottom: 10px;
			.videoBg {
				width: 90rpx;
				height: 90rpx;
				list-height: 80rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, .6);
				margin-right: 40rpx;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				.icon-jiqiren {
					position: absolute;
				}
			}
			.word {
				.title {
					color: var(--txt-color1);
				}

				.name {
					color: var(--txt-color2);
				}
			}
		}
	}
</style>