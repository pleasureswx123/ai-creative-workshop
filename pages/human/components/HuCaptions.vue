<template>
	<view class="caption-container">
		<view class="title">选择字幕</view>
		<view class="box-caption">
			<selectSwitch @change="changeSwitch" />
			<view>
				<u-picker :show="capShow" :columns="capList" keyName="label" @cancel="capShow=false"></u-picker>
				<u--input v-model="capName" placeholder="请选择字幕类型" class="" :readonly="true"></u--input>
			</view>
		</view>
	</view>
</template>

<script>
import selectSwitch from "@/components/xuan-switch/xuan-switch.vue";
export default{
	components: {selectSwitch},
	data(){
		return{
			capShow:false,
			capList: [
				[{
					label: '雪月夜',
					// 其他属性值
					id: 2021
					// ...
				}, {
					label: '冷夜雨',
					id: 804
				}]
			],
			capName:''
		}
	},
	methods: {
		changeSwitch(isSwitch){
			isSwitch:false
		}
	}
}
</script>	
</script>

<style lang="scss" scoped>
.caption-container{
	font-size: 28rpx;
	.title{
		color: var(--txt-color1);
	}
}
.box-caption{
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 15px;
	margin: 20rpx 0;
	.u--input{
		padding: 7px 9px!important;
	}
}
</style>