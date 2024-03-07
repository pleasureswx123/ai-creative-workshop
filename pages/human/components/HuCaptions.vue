<template>
	<view class="caption-container">
		<view class="title">选择字幕</view>
		<view class="box-caption">
			<selectSwitch @change="changeSwitch" />
			<view @tap="capShow = true">
				<u-picker :show="capShow" :columns="capColumns" keyName="label" @confirm="capConfirm" @cancel="capShow=false"></u-picker>
				<u--input v-model="capName" placeholder="请选择字幕类型" class=""></u--input>
			</view>
		</view>
	</view>
</template>

<script>
import selectSwitch from "@/components/xuan-switch/xuan-switch.vue";
import {HumanApi} from '@/api'
export default{
	components: {selectSwitch},
	data(){
		return{
			capShow:false,
			capColumns: [[]],
			capName:''
		}
	},
	mounted() {
		this.getTypeface()
	},
	methods: {
		changeSwitch(isSwitch){
			isSwitch:false
		},
		getTypeface() {
			HumanApi.getTypeface({
				data:{
					page:this.page,
        			pagesize:this.pagesize,
				}
			}).then(res => {
				res.list.map(item=>{
					this.capColumns[0].push(item.title)
				})
			})
		},
		capConfirm(e){
			console.log(e)
			this.capShow = false
			this.capName = e.value[0]
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
	margin: 20rpx 0 0;
	/deep/.u-input{
		padding: 7px 9px!important;
		border-color: #9B9DA0 !important;
		.uni-input-placeholder{
			font-size: 28rpx!important;
		}
		.u-input__content__field-wrapper__field{
			color: var(--txt-color1)!important;
			text-align: center!important;
		}
	}
	/deep/.u-picker{
		background-color:var(--bg-color2);
		.u-picker__view__column__item{
			height: 70rpx!important;
			line-height: 70rpx!important;
			color: var(--txt-color1);
		}
		.uni-picker-view-indicator{
			height: 70rpx!important;
		}
		.uni-picker-view-mask{
			background: transparent;
		}
	}
}
</style>