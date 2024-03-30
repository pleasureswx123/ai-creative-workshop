<template>
	<view class="prompt-loader">
		<view class="em" v-for="(item,index) in 15" :key="index"></view>
	</view>
</template>

<script>
</script>

<style>
@keyframes load {
	0% {
		height: 10%;
	}
	50% {
		height: 100%;
	}
	100% {
		height: 10%;
	}
}
/* 语音音阶------------- */
.prompt-loader {
	width: 150px;
	height: 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 6px;
	margin: 0 auto;
}

.prompt-loader .em {
	display: block;
	background: #3f4bf0;
	width: 1px;
	height: 10%;
	margin-right: 2.5px;
	float: left;
}

.prompt-loader .em:last-child {
	margin-right: 0px;
}

.prompt-loader .em:nth-child(1) {
	animation: load 2.5s 1.4s infinite linear;
}

.prompt-loader .em:nth-child(2) {
	animation: load 2.5s 1.2s infinite linear;
}

.prompt-loader .em:nth-child(3) {
	animation: load 2.5s 1s infinite linear;
}

.prompt-loader .em:nth-child(4) {
	animation: load 2.5s 0.8s infinite linear;
}

.prompt-loader .em:nth-child(5) {
	animation: load 2.5s 0.6s infinite linear;
}

.prompt-loader .em:nth-child(6) {
	animation: load 2.5s 0.4s infinite linear;
}

.prompt-loader .em:nth-child(7) {
	animation: load 2.5s 0.2s infinite linear;
}

.prompt-loader .em:nth-child(8) {
	animation: load 2.5s 0s infinite linear;
}

.prompt-loader .em:nth-child(9) {
	animation: load 2.5s 0.2s infinite linear;
}

.prompt-loader .em:nth-child(10) {
	animation: load 2.5s 0.4s infinite linear;
}

.prompt-loader .em:nth-child(11) {
	animation: load 2.5s 0.6s infinite linear;
}

.prompt-loader .em:nth-child(12) {
	animation: load 2.5s 0.8s infinite linear;
}

.prompt-loader .em:nth-child(13) {
	animation: load 2.5s 1s infinite linear;
}

.prompt-loader .em:nth-child(14) {
	animation: load 2.5s 1.2s infinite linear;
}

.prompt-loader .em:nth-child(15) {
	animation: load 2.5s 1.4s infinite linear;
}
</style>