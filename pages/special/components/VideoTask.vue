<template>
	<view class="videoPop">
		<view class="item flex">
			<view class="videoBg">
				<u-icon name="play-right"></u-icon>
			</view>
			<view class="word">
				<view class="title">解说小帅</view>
				<view class="name">解说小帅</view>
			</view>

		</view>
	</view>

</template>

<script>
	// {
	// "data": {
	// 	"page": "1",
	// 	"pagesize": "10"
	// },
	// "sign": "52d89ffef49b65edaf5d232104d42fac",
	//     "timestamp":"1545454552",
	//     "sourceCode":"100001",
	//     "no_sign":"1"
	// }
	import {
		NovelApi
	} from '@/api'
	export default {

		data() {
			return {
				videoTask: []
			}
		},
		mounted() {
			// this.getVideoTask()
		},
		methods: {
			// getVideoTask() {
			// 	NovelApi.getDub() {
			// 		data: {
			// 			page: "1",
			// 			pagesize: "10"
			// 		},
			// 		on_sign: 1,
			// 	}

			// },
		},
	}
</script>

<style lang="scss" scoped>
	.videoPop {
		.item {
			display: flex;
			align-items: center;

			.videoBg {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background: #ccc;
				margin-right: 40rpx;

				/deep/.u-icon__icon {
					margin: auto;
					line-height: 100rpx !important;
					font-size: 30px !important;
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