<template>
	<view class="upload-box-container pointer" @tap="handleUpload">
	  <view class="upload-box">
	    <view class="icon-box">
	      <i class="iconfont icon-shangchuan_huaban"></i>
	    </view>
	    <view class="title">点击上传音频</view>
	  </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
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

<style>
</style>