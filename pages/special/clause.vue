<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
		<view class="replace" @tap="replace">批量替换</view>
		<ReplacePop :show="replacePop" title="" @handConfirm="handConfirm" :show.sync="replacePop"></ReplacePop>
		<view class="videoPop tips">如分句不合理，可将光标放到文字中央点击"回车键"换行，也可通过合并按钮取消分段。</view>
		<view class="videoPop" v-for="(item,index) in clauseList" :key="index">
			<view class="title">场景</view>
			<u--textarea class="qm-textarea" placeholder="" :confirmType="null" v-model="item.name" :maxlength="maxlength"
				autoHeight border="none" @input="addItem(item,index)"></u--textarea>
			<view class="textarea-tips-box">
				<view class="count-tips">{{item.name.length}}/{{maxlength}}</view>
			</view>
			<i class="iconfont icon-ai70" v-if="index !==clauseList.length-1" @tap="link(item,index)"></i>
		</view>
		<view class="nextBtn" @tap="nextTop">下一步</view>
		<ModePop :show="show" @close="close" @nextStep="nextStep"></ModePop>
	</view>
</template>
<script>
	import ModePop from "./components/ModePop.vue"
	import ReplacePop from "./components/ReplacePop.vue"
	import {NovelApi} from '@/api'
	export default {
		components: {
			ModePop,
			ReplacePop
		},
		data() {
			return {
				current: '',
				maxlength: 100,
				show: false,
				clauseList: [],
				replacePop:false
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList(){
				const eventChannel = this.getOpenerEventChannel();
				this.eventChannel = eventChannel
				eventChannel.on('setList', data => {
					this.clauseList = data.list.map(item=>{
						return {
							name:item
						}
					})
				})
			},
			addItem(item,index) {
	            const arr = item.name.split('\n')
	            if(arr[0] && arr[1]){
		            let beforeObj = {name: arr[0]}
		            let afterObj = {name: arr[1]}
		            this.clauseList.splice(index,1,beforeObj) //替换当前编辑的内容
		            this.clauseList.splice(index+1,0,afterObj) //向后插入回车后的内容
				}
			},
			link(item,index){
				let currentStr = item.name //当前的内容
				let beforeStr = this.clauseList[index+1].name //下一个的输入内容
				let currentObj = {name:currentStr + beforeStr} //拼接的内容
				this.clauseList.splice(index,1,currentObj) //替换当前编辑的内容
				this.clauseList.splice(index+1,1) //删除
			},
			nextTop() {
				this.show = true
			},
			close() {
				this.show = false
			},
			replace(){
				this.replacePop = true
			},
			handConfirm(data){
				let arr = this.clauseList.map(item=>{
					return item.name
				})
				const laceValue = data.laceValue
				const repValue = data.repValue
				arr.forEach((item, index) => {
				  if(item.includes(laceValue)){
					  let str = item.replace(laceValue,repValue);
					  arr[index] = str
				  }
				});
				this.clauseList = arr.map(item=>{
					return {
						name:item
					}
				})
				this.replacePop = false
			},
			nextStep(data) {
				let row = JSON.parse(uni.getStorageSync('data'))
				row.text_split = this.clauseList.map(item=>{
					return item.name
				})
				if (data == '自动生成模式'){
					row.is_automatic = 1
				}
				if (data == '手动生成模式'){
					row.is_automatic = 2
				}
				NovelApi.createTask({
					data:row
				}).then(res => {
					uni.setStorageSync('task',JSON.stringify(res.task_id))
					if (data == '自动生成模式'){
						uni.navigateTo({
							url: './finish'
						})
					}
					if (data == '手动生成模式'){
						uni.navigateTo({
							url: './storyboard'
						})
					}
				})
			}
		},
	}
</script>
<style lang="scss" scoped>
.page-container {
	padding: 0 30rpx 150rpx ;
	position: relative;
	font-size: 24rpx;
}
.replace{
	color: var(--txt-color1);
	padding: 10rpx 30rpx;
	display: inline-block;
	background: #4f6994;
	text-align: right;
	border-radius: 10rpx;
	margin: 20rpx 0 0;
	cursor: pointer;
}
.videoPop {
	background-color: #3b3f57;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-top: 10rpx;
	color: var(--txt-color1);
	position: relative;
	.icon-ai70{
		position: absolute;
		right: 30rpx;
		bottom: -30rpx;
		z-index: 2;
	}
	.title {
		color: #ccc;
	}
}
.tips{
	color: var(--txt-color2);
	padding: 20rpx;
	margin: 20rpx 0;
}
.qm-textarea {
	background: transparent;
	padding: 16rpx 0 !important;
	border-color: var(--txt-color3) !important;
	/deep/ {
		.u-textarea__field,
		.uni-textarea-textarea {
			font-size: 24rpx !important;
		}
		.uni-textarea-placeholder {
			color: var(--txt-color2) !important;
		}
		.uni-textarea-wrapper {
			color: var(--txt-color1) !important;
		}
		.u-textarea__count {
			color: var(--txt-color2) !important;
			background: var(--bg-color1) !important;
		}
	}
}
.count-tips {
	color: var(--txt-color2) !important;
}
.nextBtn {
	position: fixed;
	bottom: 0;
	left: 0;
	background: #F60652;
	text-align: center;
	width: 100%;
	padding: 30rpx 0;
	color: var(--txt-color1);
	border-radius: 20rpx 20rpx 0 0;
	font-size: 28rpx;
	font-weight: 700;
	cursor: pointer;
	z-index: 3;
}
@media screen and (min-width: 960px){
	.nextBtn{
		width: 1200px;
		left: 50%;
		margin-left: -600px;
	}
	.replace{
		padding: 20rpx 40rpx;
		font-size:32rpx;
	}
	.page-container{
		font-size: 28rpx;
	}
}
</style>