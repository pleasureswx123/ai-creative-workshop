<template>
	<view class="container">
		<view class="pictrue-box">
			<image src="../../../static/images/avatar.jpg" class="createBg" mode="aspectFit"></image>
			<view class="scaleImg">
				<movable-area :scale-area="true">
					<movable-view :x="x" :y="y" direction="all" @change="onChange" :scale="true" @scale="onScale" scale-min="0.5" scale-max="1.5" :scale-value="1">
						<image src="../../../static/images/code.png" mode="aspectFit" class="image"></image>
					</movable-view>
				</movable-area>
			</view>
		</view>
	</view>
</template>

<script>
export default {
  data() {
	return {
	  x: 0,
	  y: 0,
	  old: {
		  x: 0,
		  y: 0,
		  num:1
	  }
	};
  },
  methods: {
	// onChange(event) {
	// 	console.log(event)
	//   this.x = event.detail.x;
	//   this.y = event.detail.y;
	// },
	onScale(e) {
		console.log(e)
	  this.num = e.detail.scale;
	},
	onChange: function(e) {
		this.old.x = e.detail.x
		this.old.y = e.detail.y
	}
  },
};
</script>

<style lang="scss" scoped>
.container{
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
	.createPer{
		max-width: 100%;
	}
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