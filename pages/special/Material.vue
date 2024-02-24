<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="tab">
			<u-tabs :list="tabList" @click="click" 
			:activeStyle="{background: '#2878ff',borderRadius:'5px',padding:'5px 10px'}"
			:inactiveStyle="{
			  background: '#3b3f57',
			   borderRadius:'5px',padding:'5px 10px',fontSize:'14px'
			}"
			itemStyle="margin:20px 10px 20px 0"
			></u-tabs>
		</view>
		<view class="noMore">
			<i class="iconfont icon-meiyoushuju"></i>
			<view class="text">没有数据哦~</view>
		</view>
		<view class="upLoad" @tap="upLoad()">
			<i class="iconfont icon-shangchuan"></i>
			上传素材
		</view>
	</view>
</template>

<script>
	export default {
			data() {
				return {
	                tabList: [{
	                    name: '可使用',
	                }, {
	                    name: '审核中',
	                }, {
	                    name: '审核失败'
	                }]
				}
			},
			methods: {
	            click(item) {
	                console.log('item', item);
	            },
				upLoad(){
					
				}
			}
		}
</script>

<style lang="scss" scoped>
	.page-container{
		background: var(--bg-color1);
		font-size: 24rpx;
		padding: 0 30rpx 0;
		position: relative;
		height: 100vh;
	}
	.tab{
		/deep/.u-tabs__wrapper__nav__item{
			margin-right: 30rpx;
			padding:0;
			.u-tabs__wrapper__nav__item__text{
				color: var(--txt-color1)!important;
				font-size:28rpx;
			}
		}
		/deep/.u-tabs__wrapper__nav__line{
			display:none;
		}
	}
	.noMore{
		color:#ccc;
		text-align : center;
		font-size: 28rpx;
		margin:25vh auto 0;
		.text{
			margin-top:20rpx;
		}
	}
	.upLoad{
		position: fixed;
		bottom: 80rpx;
		background: #6978fd;
		 width: calc(100% - 30px);
		padding:30rpx 0;
		border-radius:20rpx;
		text-align:center;
		color:var(--txt-color1);
		font-size:32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.iconfont{
			margin-right: 10rpx;
		}
	}
</style>