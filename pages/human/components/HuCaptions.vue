<template>
	<view class="caption-container">
		<view class="title" :show="homShow" v-if="homShow">选择字幕</view>
		<view class="box-caption" :style="{display:display}">
			<selectSwitch :show="homShow" v-if="homShow" @change="changeSwitch" />
			<view class="capChoose" @tap="capShow = true">
				<u-picker :show="capShow" keyName="label" :columns="capColumns" @confirm="capConfirm" @cancel="capShow=false"></u-picker>
				<u--input v-model="capName"></u--input>
			</view>
		</view>
	</view>
</template>

<script>
import selectSwitch from "@/components/xuan-switch/xuan-switch.vue";
import {HumanApi} from '@/api'
export default{
	components: {selectSwitch},
	props: {
	  homShow: {
	    type: Boolean,
	    default: true
	  },
	  display:{
	  	type: String,
	  	default: 'grid'
	  }
	},
	data(){
		return{
			capShow:false,
			capColumns: [[]],
			capColumnsList:[],
			capName:'',
			capId:2,
			show_captions:1
		}
	},
	mounted() {
		this.getTypeface()
	},
	methods: {
		changeSwitch(isSwitch){
			isSwitch:false
			this.$emit('changeSwitch',isSwitch)
		},
		getTypeface() {
			HumanApi.getTypeface({}).then(res => {
				this.capColumnsList = res.list
				this.capColumns = [[]]
				res.list.map(item=>{
					this.capColumns[0].push(item.title)
				})
				this.capName = this.capColumnsList[0].title
			})
		},
		capConfirm(e){
			this.capShow = false
			this.capName = e.value[0]
			this.capId = this.capColumnsList.find(item=> item.title == this.capName).id
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
	.capChoose{
		cursor: pointer;
	}
	/deep/.u-picker{
		background-color:var(--bg-color2);
		height: 35vh;
		.u-picker__view{
			height: 100%!important;
		}
		.u-picker__view__column__item{
			height: 70rpx!important;
			line-height: 70rpx!important;
			color: var(--txt-color1);
		}
		.uni-picker-view-content{
			// padding: 20rpx 0!important;
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