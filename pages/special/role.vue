<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="tips">系统已经默认针对分句配置了角色，若角色配置不合理，您可以手动添加或者删除某个分句的角色。</view>
		<view class="videoPop">
			<text class="title">分句1</text>
			<view class="">李二狗今晚不能陪你看电影了，李二狗公司有急事需要我一直盯着</view>
			<text class="title">角色设置</text>
			<view class="tag">
				<u-tag v-for="(item,index) in tagList" :text="item.text" size="mini" closable bgColor="#1a3865" borderColor="#0963cb"></u-tag>
				<u-tag text="+角色" size="mini" bgColor="#47495d" borderColor="#717379"></u-tag>
			</view>
		</view>
		<view class="nextBtn" @tap="nextTop">下一步</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tagList:[
					{
						text:'标签'
					},
					{
						text:'李二狗'
					}
				]
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.page-container {
		padding: 0 30rpx;
		position: relative;
	}
	.tips{
		background-color: #1a1c2a;
		color:var(--txt-color1);
		font-size: 24rpx;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-top: 20rpx;
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx;
		margin-top:20rpx;
		color:var(--txt-color1);
		font-size:24rpx;
		.title{
			color:var(--txt-color2);
			display: inline-block;
			margin-bottom: 10rpx;
		}
		.tag{
			view{
				display: inline-block;
			}
			/deep/.u-tag__close{
				background-color: var(--bg-color3)!important;
			}
		}
	}
	.nextBtn{
		position: fixed;
		bottom: 0;
		left: 0;
		background: #2877ff;
		text-align:center;
		width: 100%;
		padding:30rpx 0;
		color:var(--txt-color1);
		border-radius:20rpx 20rpx 0 0;
		font-size:28rpx;
		font-weight:700;
	}
</style>