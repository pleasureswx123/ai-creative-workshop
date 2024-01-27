<template>
    <view class="page">
		<view class="title">积分明细</view>
		<view class="list">
			<view class="item" v-for="(item,index) in recordList" :key="index">
				<view class="ceCont">
					<view class="ceType">任务类型 - {{item.jifen_title}}</view>
					<view class="ceCont">
						<text>任务id：{{item.task_id}}</text>
						<text>生成时间：{{item.create_time}}</text>
					</view>
				</view>
				<view :class="[item.jifen_type == 1 ? 'num' : 'numAdd']">{{item.jifen_val}}</view>
			</view>
			<view v-show="isLoadMore" class="isLoadMore">
				<u-loadmore :status="status" />
			</view>
		</view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            recordList:[],
			page:1,
			pagesize:10,
			status: 'loadmore',
			isLoadMore: false //是否加载中
        };
    },
    onLoad() {
		this.getRecord()
	},
	onReachBottom() { //上拉触底函数
		this.getRecord()
	},
    methods: {
        getRecord(){
        	app.globalData.util.request({
        		url: '/User/MyJiFenRecord',
        		data:{
        			page:this.page,
					pagesize:this.pagesize
        		}
        	})
        	.then((res) => {
				if(res.data.list.length>0){
					this.recordList = res.data.list
					if(res.data.list.length < this.pagesize){
						this.isLoadMore = true
						this.status = 'nomore'
					}else{
						this.page +=1
						this.isLoadMore = true
						this.status = 'nomore'
					}
				}else{
					this.isLoadMore = true
					this.status = 'nomore'
				}
        	});
        },
    }
};
</script>
<style lang="scss" scoped>
page {
    background: #0D0D0D;
}
.page{
	.title{
		color: #fff;
		font-size: 28rpx;
		text-align: center;
		height: 120rpx;
		line-height: 120rpx;
	}
	.list{
		background-color: #1D1E23;
		.item{
			border-bottom: 1px solid #3C3C3C;
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			box-sizing: border-box;
			width: 100%;
			padding: 30rpx;
			// height: 500px;
			.ceType{
				color: #fff;
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}
			.ceCont{
				color: #909399;
				font-size: 24rpx;
				text{
					margin-right: 20rpx;
				}
			}
			.num,.numAdd{
				font-size: 28rpx;
				font-weight: 700;
				color: #F47421;
			}
			.numAdd{
				color: #00DACD;
			}
		}
		.isLoadMore{
			padding: 20rpx 0;
		}
	}
}
</style>
