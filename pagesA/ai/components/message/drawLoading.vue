<template>
	<view class="loading">
		<view class="fox-spinner">
		  <view class="spinner-inner" :style="'color:' + color">
		    <view class="spinner-line"></view>
		    <view class="spinner-line"></view>
		    <view class="spinner-line"></view>
		    <view class="spinner-circle">
		      &#9679;
		    </view>
		  </view>
		</view>
		<view class="title" v-if="title">{{ title }}</view>
	</view>
</template>

<script>
	export default {
		name:"loading",
		data() {
			return {
				
			};
		},
		props: {
		    title: {
		        type: String,
		        default: ''
		    },
		    color: {
		        type: String,
		        default: '#ff1d5e'
		    }
		}
	}
</script>

<style>
.loading {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}
.title {
	width: 100%;
	font-size: 28rpx;
	color: #999;
	line-height: 28rpx;
	margin-top: 30rpx;
}
.fox-spinner, .fox-spinner * {
  box-sizing: border-box;
}

.fox-spinner {
  height: 60px;
  width: 60px;
  overflow: hidden;
}

.fox-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.fox-spinner .spinner-circle {
  display: block;
  position: absolute;
  font-size: calc(60px * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fox-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation-duration: 1s;
  border-left-width: calc(60px / 25);
  border-top-width: calc(60px / 25);
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}

.fox-spinner .spinner-line:nth-child(1) {
  animation: fox-spinner-animation-1 1s linear infinite;
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.fox-spinner .spinner-line:nth-child(2) {
  animation: fox-spinner-animation-2 1s linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.fox-spinner .spinner-line:nth-child(3) {
  animation: fox-spinner-animation-3 1s linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes fox-spinner-animation-1 {
  100% {
	transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes fox-spinner-animation-2 {
  100% {
	transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes fox-spinner-animation-3 {
  100% {
	transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}
</style>