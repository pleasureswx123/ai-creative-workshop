<template>
	<view class="welcome">
		<view style="height: 130rpx" v-if="hasModel4"></view>
		<view class="row row-ai">
			<view class="message">
				<view class="avatar">
					<image src="/static/images/ic_ai.png" />
				</view>
				<view class="text markdown-body">
					<view class="title" v-if="welcomeTitle">{{ welcomeTitle }}</view>
					<view class="desc" v-if="welcomeDesc" v-html="welcomeDesc"></view>
					<view class="tips" v-if="welcomeTips.length > 0">
						<ul>
							<li v-for="item in welcomeTips" @click="quickMessage(item)" v-if="item">{{ item }}
							</li>
						</ul>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			module: {
				type: String,
				default: 'chat'
			},
			hasModel4: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: ''
			},
			tips: {
				type: String,
				default: ''
			}
		},
		computed: {
			welcomeTitle() {
				if (!this.title) {
					return ''
				}
				if (this.module === 'chat') {
					return this.$lang('你好！我是') + this.title
				} else if (this.module === 'cosplay') {
					return this.$lang('我是') + this.title
				}
				return this.title;
			},
			welcomeDesc() {
				if (this.desc) {
					return this.desc.replaceAll("\n", "<br>")
				} else {
					if (this.module === 'cosplay') {
						return this.$lang('请输入你的问题')
					}
				}
				return ''
			},
			welcomeTips() {
				if (this.tips) {
					return this.tips.split("\n")
				} else {
					return []
				}
			}
		},
		methods: {
			quickMessage(text) {
				this.$emit('use', text)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.welcome {
		.message {
			display: flex;
			justify-content: flex-start;
			padding: 40rpx 40rpx;
		}

		.message:last-child {
			border-bottom: 0;
		}

		.message .text {
			width: 560rpx;
			color: #343541;
			line-height: 52rpx;
			font-size: 32rpx;
			word-break: break-all;
			overflow: hidden;
			background-color: #fff;
			padding: 30rpx;
			border-radius: 20rpx;
		}

		.message .text span {
			display: inline;
		}

		.message .avatar {
			width: 48rpx;
			height: 48rpx;
			background: #10a37f;
			margin-right: 30rpx;
			color: #fff;
			font-size: 28rpx;
			border-radius: 4rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 6rpx;
			overflow: hidden;
		}

		.message .avatar image,
		.message .avatar img {
			width: 48rpx;
			height: 48rpx;
		}

		.markdown-body view {
			display: block;
		}

		.title {
			color: #222;
			font-size: 36rpx;
			font-weight: 600;
			letter-spacing: 2rpx;
			line-height: 64rpx;
			transition: color 0.1s ease-in-out;
		}

		.desc {
			margin: 20rpx 0 !important;
		}

		.tips {
			padding: 20rpx;

			ul,
			li {
				list-style: none;
				margin: 0;
				padding: 0;
			}

			li {
				background: #f7f7f8;
				border-radius: 8rpx;
				margin-bottom: 26rpx;
				padding: 24rpx 30rpx;
				font-size: 28rpx;
				color: #444;
				line-height: 32rpx;
				transition: background 0.1s ease-in-out;
				cursor: pointer;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&:hover,
				&:active {
					background: #eff0f0;
					color: #222;
				}
			}
		}
	}
</style>