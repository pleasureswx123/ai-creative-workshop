<template>
	<view class="people-box">
		<HumanTab :list="list" @handTab="handTab"></HumanTab>
		<view class="people-type" v-if="index == 0">
			<view class="upload-box" @tap="handleUpload">
				<i class="iconfont icon-a-chuangjian_huaban1"></i>上传自己照片
			</view>
			<view class="people-list">
				<view class="item" v-for="(item,index) in imageList" @tap="handImage(index)">
					<view class="imageList" :class="{'active':isActive == index}">
						<image :src="item" mode="aspectFit"></image>
						<i class="iconfont icon-bianji1" v-if="isActive === index" @tap="handRead(index)"></i>
					</view>
					<view class="name" v-show="isActive === index">
						<u--input class="qm-textarea" placeholder="请输入名称" border="none" v-model="value"></u--input>
					</view>
				</view>
			</view>
		</view>
		<view class="people-type" v-if="index == 1">
			<view class="people-list">
				3
			</view>
		</view>
		<view class="people-type" v-if="index == 2">
			<view class="people-list">
				12
			</view>
		</view>
	</view>
</template>

<script>
import HumanTab from './HumanTab.vue';
import {userApi} from '@/api'
export default {
	components: {
		HumanTab
	},
  data() {
	return {
	  list:[{
	  	name:'照片'
	  },{
	  	name:'2D数字人'
	  },{
	  	name:'3D数字人'
	  }],
	  index:0,
	  isActive:0,
	  imageList:[],
	  humanValue:'',
	  value:'',
	  loShow:false
	};
  },
  methods: {
	handTab(data){
		this.index = data.index
	},
	handleUpload(){
		uni.chooseImage({
		  sourceType: ['album', 'camera'],
		  sizeType: ['original', 'compressed'],
		  success: res => {
		    const {path: filePath} = res.tempFiles?.[0] || {};
			userApi.uploadImg({filePath}).then(res => {
				const imageUrl  = res.path;
				this.imageList.push(imageUrl);
			}).finally(() => {
				this.loading = false;
			});
		  },
		  fail(...args) {
		    console.log(args)
		  }
		});
	},
	handImage(index){
		this.isActive = index
	},
	handRead(index){
		this.loShow = true
	}
  },
};
</script>

<style lang="scss" scoped>
.people-box{
	color: var(--txt-color2);
	font-size: 28rpx;
	background: #1A1B1E;
}
.people-type{
	padding:0 40rpx 60rpx;
}
.upload-box{
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	.icon-a-chuangjian_huaban1:before{
		font-size: 20px;
		margin-right: 20rpx;
	}
}
.people-list{
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 20rpx;
	.item{
		padding:10rpx ;
		background: rgb(30,30,30);
	}
}
.imageList{
	width: 100rpx;
	height: 110rpx;
	position: relative;
	border: 4rpx solid rgb(30,30,30);
	image{
		width: 100%;
		height: 100%;
	}
	.icon-bianji1{
		position: absolute;
		right: 0;
		bottom: 0;
	}
	&.active{
		border: 4rpx solid #F60652;
	}
}
.qm-textarea {
	  background: var(--bg-color2);
	  padding:0!important;
	  border-color: var(--txt-color3)!important;
	  /deep/ {
	    .uni-input-placeholder {
	      color: var(--txt-color2)!important;
		  font-size: 24rpx;
	    }
	    .uni-input-input {
	      color: var(--txt-color1)!important;
		  font-size: 24rpx;
	    }
	  }
	}
</style>