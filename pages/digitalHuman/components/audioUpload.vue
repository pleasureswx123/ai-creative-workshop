<template>
	<view class="upload-box" v-if="uploadShow" @tap="handleUpload">
	  <view class="icon-box">
	    <i class="iconfont icon-shangchuan_huaban icon-upload"></i>
	  </view>
	  <view class="title">点击上传音频</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				uploadShow:true
			}
		},
		methods:{
			handleUpload(){
				var that = this
				uni.chooseFile({
					count: 1,   //选取的文件个数限制
					extension: [".mp3"],  //可定义允许哪些后缀的文件可被选择
					success: function (res) {
					  let tempFilePaths = res.tempFilePaths;
					  uni.showLoading({
						title: "上传中...",
					  });
					  uni.uploadFile({
						name: 'audio',    //文件上传的name值
						url: 'https://localhost:8099/web.php/upload/audio',    //接口地址
						header:{},    //头信息
						formData:{},   //上传额外携带的参数
						filePath: tempFilePaths[0],//临时路径
						fileType: "audio",   //文件类型
						success: (uploadFileRes) => {
						  uni.hideLoading();
						  const ret = JSON.parse(uploadFileRes.data);
						  console.log(ret)
						},
					  });
					},
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.upload-box{
	width:60%;
	border-radius: 3px;
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	border: 1px solid #494c55;
	background: #1f2937;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 176rpx;
	cursor: pointer;
}
.icon-upload::before{
	font-size: 30px;
	color: var(--txt-color2);
}
.title{
	font-size: 28rpx;
	color: var(--txt-color2);
}
</style>