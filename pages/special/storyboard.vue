<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="iconfont icon-shipinshengchengzhong"></view>
		<view class="finish">
			<view class="time">（预估10-15分钟完成）</view>
			<view class="videoPop">
				<view class="finishTit">AI分镜中</view>
				<u-steps current="1" activeColor="#3c9cff">
					<u-steps-item v-for="(item,index) in stepList" :title="item.title" :desc="item.desc" :account="item.account">
						<text :class="item.activeIcon" slot="icon"></text>
					</u-steps-item>
				</u-steps>
				<view class="tips">
					使用提醒：<view class="content">当前状态可返回，数据不会丢失，可在"草稿箱"中查看任务进度，分成成功后可进行下一步操作。</view>
				</view>
				<view class="btn-bar">
					<view class="btn back" @tap="back">返回</view>
					<view class="btn next" @tap="next">草稿箱</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stepList:[
					{
						title:'AI分镜中',
						desc:'(预估5-10分钟)',
						account:'iconfont icon-fengge',
						activeIcon:'iconfont icon-countDown'
					},
					{
						title:'AI配置/更换素材',
						desc:'(预估2-5分钟)',
						account:'iconfont icon-fengge',
						activeIcon:'iconfont icon-chanpeipeizhi'
					},
					{
						title:'AI视频合成',
						desc:'(预估3-5分钟)',
						account:'iconfont icon-fengge',
						activeIcon:'iconfont icon-a-hecheng2'
					},
				]
			}
		},
		methods: {
			back(){
				uni.navigateTo({
				   url: './clause'
				})
			},
			next(){
				uni.navigateTo({
				   url: './config'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page-container{
		background: var(--bg-color1);
		padding: 0 30rpx;
		position: relative;
		font-size: 28rpx;
		.icon-shipinshengchengzhong{
			text-align: center;
			margin: 10vh auto 8vh;
		}
	}
	.finish{
		.time{
			color:var(--txt-color2);
			font-size: 24rpx;
			text-align: center;
		}
		.videoPop{
			background-color:#3b3f57;
			border-radius:20rpx;
			padding:50rpx 40rpx 30rpx;
			margin:30rpx 0 30rpx;
			color:var(--txt-color1);
			position: relative;
			text-align: center;
			.tips{
				text-align: left;
				.content{
					color:var(--txt-color2);
					font-size: 24rpx;
				}
			}
			/deep/.u-steps{
				margin: 40rpx 0;
				.u-steps-item__wrapper{
					width: 50rpx;
					height: 50rpx;
					border-radius:50%;
					background-color: #76798a;
					border:10rpx solid #4d5166;
				}
				.u-steps-item__line--row{
					height: 8rpx;
				}
				.u-steps-item__content{
					margin-left: 0!important;
				}
				.u-text__value{
					font-size: 24rpx !important;
					color:#fff;
				}
				.u-text__value--tips{
					font-size: 20rpx !important;
					color:var(--txt-color2);
				}
				.u-steps-item__line--row{
					top:30rpx;
				}
				.u-text{
					flex-direction: column;
				}
			}
		}
		.btn-bar{
			display: flex;
			gap:20px;
			margin-top: 40rpx;
			.btn{
				flex:1;
				padding:20rpx 0;
				border-radius: 20rpx;
			}
			.back{
				background-color: #2c2f44;
				color:var(--txt-color2);
				border: 1px solid #2c2f44;
			}
			.next{
				border: 1px solid var(--txt-color1);
			}
		}
	}
</style>