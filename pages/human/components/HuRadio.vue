<template>
	<view class="radio-container">
		<view class="title-box">
			<view class="title">选择音色</view>
			<view class="try-listen">
				<uni-icons custom-prefix="iconfont-qm" type="icon-qm-volume" color="var(--txt-color1)" size="20" />试听
			</view>
		</view>
		<view class="radio-box">
			<view class="item" v-for="(item, index) in dubList" :key="index">{{item.dub_name}}</view>
		</view>
		<HuSlider :value.sync="volume" type="volume"></HuSlider>
		<HuSlider :value.sync="speed" type="speed"></HuSlider>
	</view>
</template>

<script>
import HuSlider from './HuSlider.vue';
import {HumanApi} from '@/api'
export default{
	components: {
		HuSlider
	},
	data(){
		return{
			dubList:[],
			page:1,
			pagesize:10,
			volume: 2,
			speed: 2,
		}
	},
	mounted() {
		this.getDubList()
	},
	methods: {
		getDubList() {
			HumanApi.dubList({
				data:{
					page:this.page,
        			pagesize:this.pagesize,
				}
			}).then(res => {
				this.dubList = res.list
			})
		},
	}
}
</script>

<style lang="scss" scpoed>
.radio-container{
	color: var(--txt-color1);
	font-size: 28rpx;
	.title-box{
		display: flex;
		justify-content: space-between;
	}
	.try-listen{
		display: flex;
		align-items: center;
		gap: 2px;
		cursor: pointer;
	}
}
.radio-box{
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 5px;
	margin: 20rpx 0;
	.item{
		cursor: pointer;
		min-width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 36px;
		border-radius: 8px;
		background: var(--bg-color2);
		color: var(--txt-color1);
	}
}
</style>