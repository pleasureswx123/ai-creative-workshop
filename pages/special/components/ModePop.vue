<template>
	<u-popup :show="show" mode="bottom" @tap="$emit('close')">
		<view class="modePop">
			<i class="iconfont icon-fanhui" @tap="$emit('close')"></i>
			<view class="title">请选择视频生成模式</view>
			<view class="videoPop" v-for="(item,index) in modeList" :class="{active: activeIndex === index}" @tap="boxHand(index,item)">
				<view class="type">
					{{item.type}}
					<view class="btn">{{item.icon}}</view>
				</view>
				<view class="cont">{{item.title}}</view>
				<u-radio-group v-model="value">
					<u-radio shape="square" :label="item.type" :name="item.type"></u-radio>
				</u-radio-group>
			</view>
			<view class="nextBtn" @tap="nextStep">下一步</view>
		</view>
	</u-popup>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	data(){
		return {
			modeList:[
				{
					type:'自动生成模式',
					icon:'更快速',
					title:'使用自动完成模式，下一步直接等待10-15分钟后AI视频生成完成。',
					disabled: false,
					id:1
				},
				{
					type:'手动生成模式',
					icon:'更精细',
					title:'使用手动完成模式，后续可手动修改不满意的AI素材，并需手动提交视频生成。',
					disabled: false,
					id:2
				}
			],
			value:'自动生成模式',
			activeIndex:0
		}
	},
	methods: {
		boxHand(index,item){
			this.activeIndex = index
			this.value = item.type
		},
		nextStep(){
			this.$emit('nextStep',this.value)
		}
	},
}
</script>

<style lang="scss" scoped>
	.u-popup{
		/deep/.u-popup__content{
			background: var(--bg-color1);
		}
	}
	.modePop{
		background:#222337;
		border-radius: 30rpx 30rpx 0 0;
		padding:0 30rpx 30rpx;
		position: relative;
		.title{
			color:var(--txt-color1);
			text-align: center;
			padding:30rpx 0;
			font-size: 28rpx;
		}
		.icon-fanhui{
			position: absolute;
			top:30rpx;
			cursor: pointer;
			left: 10rpx;
		}
	}
	.videoPop{
		background-color:#3b3f57;
		border-radius:20rpx;
		padding:30rpx 100rpx 30rpx 30rpx;
		margin-bottom:30rpx;
		color:var(--txt-color1);
		border:2px solid #3b3f57;
		position: relative;
		&.active{
			border:2px solid #fff;
		}
		.type{
			display:flex;
			align-items: center;
			.btn{
				padding:4rpx 10rpx;
				background:#fea736;
				font-size:24rpx;
				border-radius:30rpx;
				margin-left: 20rpx;
			}
		}
		.cont{
			font-size: 24rpx;
			color:var(--txt-color2);
			margin-top: 20rpx;
		}
		/deep/.u-radio{
			position: absolute;
			right: 30rpx;
			top:50%;
			transform:translate(0,-50%);
			.u-radio__icon-wrap{
				width: 36rpx!important;
				height: 36rpx!important;
				.u-icon__icon{
					font-size:14px!important;
				}
			}
			.u-radio__text{
				display:none;
			}
		}
	}
	.videoPop:nth-child(3){
		.btn{
			background:#4b73f9;
		}
	}
	.nextBtn{
		background: #2877ff;
		text-align:center;
		width: 100%;
		padding:20rpx 0;
		color:var(--txt-color1);
		border-radius:20rpx;
		font-size:28rpx;
		font-weight:700;
	}
</style>