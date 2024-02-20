<template>
  <view class="container" >
		<view class="avatar" @tap="uploadAvatar">
			我来了
		</view>
	 </view>	
</template>
 
<script>
	import util from '@/utils/util.js'
export default {
  data() {
    return {
		 
    };
  },
  created() {
    
  },
  onLoad() {
	
  },
  methods: {
	
	uploadAvatar() {
		// const _this = this;
		uni.chooseImage({
			count: 1,
			success: function(res) {
				// uni.showLoading({
				// 	title: '正在上传'
				// });
				app.globalData.util.upload({
					url: '/upload/image',
					filePath: res.tempFilePaths[0]
				}).then((res) => {
					var avatar = res.data.path;
					// uni.hideLoading();
					// _this.setData({
					// 	avatar: avatar
					// })
				})
			}
		})
	},

   
  }
};
</script>
 
<style lang="scss" scoped>
.container{
	
	}
</style>