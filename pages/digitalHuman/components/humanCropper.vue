<template>
	<view class="pictrue-box" :show="picShow" v-if="picShow">
		<image src="../../../static/images/avatar.jpg" class="createBg" mode="aspectFit"></image>
		<view class="scaleImg" @click="chooseImg">
			<movable-area :scale-area="true">
				<movable-view :x="x" :y="y" direction="all" @change="onChange" :scale="true" @scale="onScale" scale-min="0.5" scale-max="1.5" :scale-value="1">
					<image :src="imgDataUrl" mode="aspectFit" class="image"></image>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		picShow:{
			type:Boolean,
			default:true
		},
	},
	data(){
		return {
		  x: 0,
		  y: 0,
		  old: {
			  x: 0,
			  y: 0,
			  num:1
		  },
		  imgDataUrl: "",
		}
	},
	methods:{
		onScale(e) {
		  this.num = e.detail.scale;
		},
		onChange(e) {
			this.old.x = e.detail.x
			this.old.y = e.detail.y
		},
		chooseImg() {
		  const that = this;
		  uni.navigateTo({
			url: "../../uni_modules/buuug7-img-cropper/pages/cropper",
			events: {
			  imgCropped(event) {
				// 监听裁剪完成
				// 返回的 event 中包含了已经裁剪好图片的base64编码字符串
				// 你可以使用 <image :src="imgDataUrl" mode="aspectFit"></image> 组件来展示裁剪后的图片
				// 或者你可以将该字符串通过接口上传给服务器用来保存
				console.log(event);
				that.imgDataUrl = event.data;
				// do whatever you want
				// upload to server
			  },
			},
		  });
		},
	}
}
</script>

<style lang="scss" scoped>
.pictrue-box{
	width: 500rpx;
	height: 700rpx;
	background: var(--txt-color1);
	margin:50rpx auto;
	position: relative;
	overflow: hidden;
}
.createBg{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
}
.scaleImg{
	width: 100%;
	height: 100%;
	uni-movable-area{
		width: 100%;
		height: 100%;
	}
	uni-movable-view{
		width: 300rpx;
		height: 300rpx;
		.image {
		  width: 100%;
		  height: 100%;
		}
	}
}
</style>