<template>
	<view class="tab">
		<u-tabs :list="tabList" :activeStyle="{backgroundColor: '#F60652',}" @click="tab"></u-tabs>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabList:[
					{
						name:'图+文案',
						id:1
					},
					{
						name:'图+音频',
						id:2
					}
				]
			}
		},
		methods:{
			tab(index){
				this.$emit('tab',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
.tab{
	/deep/.u-tabs__wrapper__nav{
		display: grid;
		grid-template-columns: repeat(2,1fr);
		gap: 10px;
		.u-tabs__wrapper__nav__item{
			background: #34373c;
			border-radius: 10rpx;
		}
		.u-tabs__wrapper__nav__item{
			padding: 0;
			height: 72rpx!important;
			overflow: hidden;
			cursor: pointer;
		}
		.u-tabs__wrapper__nav__item__text{
			color:var(--txt-color1)!important;
		}
		.u-tabs__wrapper__nav__line{
			display: none;
		}
		.u-tabs__wrapper__nav__item__text{
			font-size: 28rpx;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>