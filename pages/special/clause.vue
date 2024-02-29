<template>
	<view class="page-container">
		<QmNavTop></QmNavTop>
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
	import {NovelApi} from '@/api'
	export default {
		components: {
			ModePop
		},
		data() {
			return {
				current: '',
				maxlength: 100,
				show: false,
				clauseList: []
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
			nextStep(data) {
				let row = JSON.parse(uni.getStorageSync('data'))
				let clauseLen = this.clauseList.length
				row.text_split = this.clauseList[clauseLen]
				console.log(row)
				console.log(this.clauseList)
				if (data == '自动生成模式') {
					NovelApi.createTask({
						data:row,
						no_sign: 1,
						sourceCode:"100001",
						sign:"52d89ffef49b65edaf5d232104d42fac",
						timestamp:"1545454552"
					}).then(res => {
						// uni.navigateTo({
						// 	url: './finish'
						// })
					})
				}
				if (data == '手动生成模式') {
					uni.navigateTo({
						url: './storyboard'
					})
				}
			}
		},
	}
</script>
<style lang="scss" scoped>
.page-container {
	padding: 0 30rpx 150rpx ;
	position: relative;
}
.videoPop {
	background-color: #3b3f57;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-top: 10rpx;
	color: var(--txt-color1);
	position: relative;
	font-size: 24rpx;
	.icon-ai70{
		position: absolute;
		right: 30rpx;
		bottom: -30rpx;
		z-index: 2;
	}
	.title {
		color: #ccc;
		font-size: 24rpx;
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
	background: #2877ff;
	text-align: center;
	width: 100%;
	padding: 30rpx 0;
	color: var(--txt-color1);
	border-radius: 20rpx 20rpx 0 0;
	font-size: 28rpx;
	font-weight: 700;
	z-index: 3;
}
</style>