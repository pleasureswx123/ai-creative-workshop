<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="tab">
			<view v-for="(item,index) in tabList" :key="index" @tap="handChecked(index)" :class="{'active':isActive == index}" class="item">{{item.name}}</view>
		</view>
		<view class="nav_item" v-if="isActive==0">
			<humanBroadcast v-if="creatShow" @starCreate="starCreate"></humanBroadcast>
			<humanCreate :list="creList" :typeShow="typeShow" @change="change" @handTab="handTab" :title="title"  :current="current" :configShow="configShow" v-else></humanCreate>
		</view>
		<view class="nav_item" v-if="isActive==1">
			<view class="pic-box">
				<view class="picurl">
					<image src="https://st-cn.chaojiyuyan.cn/upload/user_task/draw/10/10/00600-2732645220.png?image_process=resize,p_40" mode="aspectFit"></image>
				</view>
			</view>
			<humanCreate :picShow="false" :list="list" :typeShow="typeShow" @handTab="handTab" :title="title" :current="current" :cropperShow="false" :configShow="configShow" @change="change"></humanCreate>
		</view>
	</view>
</template>

<script>
import humanBroadcast from './components/humanBroadcast.vue'
import humanCreate from './components/humanCreate.vue'
export default{
	components:{humanBroadcast,humanCreate},
	data(){
		return{
			tabList:[{
				name:'数字人播报'
			},{
				name:'照片播报'
			},{
				name:'数字分身'
			}],
			isActive:0,
			creatShow:true,
			list:[{
				name:'数字人'
			},{
				name:'音色'
			},{
				name:'配置'
			}],
			creList:[{
				name:'数字人'
			  },{
				name:'背景'
			  },{
				name:'音色'
			  },{
				name:'配置'
			}],
			typeShow:true,
			title:'数字人',
			current:0,
			configShow:true
		}
	},
	methods:{
		handChecked(index){
			this.isActive = index
			this.typeShow = true
			this.current = 0
			this.title = '数字人'
			this.configShow = true
			this.creList = [{name:'数字人'},{name:'背景'},{name:'音色'},{name:'配置'}]
		},
		starCreate(){
			this.creatShow = false
		},
		change(){
			this.typeShow = !this.typeShow
			this.current = 0
			this.title = '数字人'
			if(this.typeShow){
				this.creList = [{name:'数字人'},{name:'背景'},{name:'音色'},{name:'配置'}]
				this.configShow = true
			}else{
				this.creList = [{name:'数字人'},{name:'背景'},{name:'配置'}]
				this.configShow = false
			}
		},
		handTab(data){
			this.title = data.name
			this.current = data.index
		}
	}
}
</script>

<style lang="scss" scoped>
.page-container{
	// background: #1A1B1E;
	padding: 0 30rpx;
}
.tab{
	display: flex;
	align-items: center;
	margin: 20rpx 0;
	.item{
		background: #fff;
		margin-right: 30rpx;
		padding: 10rpx 20rpx;
		font-size: 28rpx;
		&.active{
			background:#F60652;
			color: var(--txt-color1);
		}
	}
}
.pic-box{
	background: #090909;
	margin: 30rpx auto;
	width: 95%;
}
.picurl{
	padding: 20rpx;
	width: 100%;
	height: 300rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
</style>