<template>
  <view>
    <view class="photo-canvas-wrapper">
      <view class="del-btn" @tap.stop>
        <uni-icons @tap="imgSrc = ''" custom-prefix="iconfont-qm" type="icon-qm-del" color="#fff" size="20" />
      </view>
      <view class="img-box">
        <canvas class="canvas" :style="{width: imgInfo.width + 'px', height: imgInfo.height + 'px'}" canvas-id="myCanvas" id="myCanvas" ref="myCanvas" />
      </view>
    </view>
<!--    <view class="photo-canvas-wrapper">
      <view class="del-btn" @tap.stop>
        <uni-icons @tap="imgSrc = ''" custom-prefix="iconfont-qm" type="icon-qm-del" color="#fff" size="20" />
      </view>
      <view class="img-box">
        <img :src="src" />
      </view>
    </view>-->
  </view>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
      required: true
    },
    imgInfo: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0
      }),
      required: true
    },
    actionType: {
      type: String,
      default: ''
    },
    brushSize: {
      type: Number,
      default: 3
    },
  },
  computed: {
    imgSrc: {
      get() {
        return this.src
      },
      set(src) {
        this.$emit('update:src', src || '')
      }
    }
  },
  mounted() {
    this.draw();
  },
  methods: {
    async draw() {
      const canvasCtx = uni.createCanvasContext('myCanvas', this);
      const {width, height} = this.imgInfo || {};
      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.fillStyle = '#fff';
      canvasCtx.fillRect(0, 0, width, height);
      canvasCtx.drawImage(this.imgSrc, 0, 0, width, height);
      canvasCtx.draw(true, () => {
        debugger
        // uni.canvasToTempFilePath({
        //   width: this.canvasW,
        //   height: this.canvasH,
        //   destWidth: this.canvasW * 2, //此处需放大2倍，不然保存的图失真
        //   destHeight: this.canvasH * 2,
        //   canvasId: 'myCanvas',
        //   quality: 1,
        //   complete: function (res) {
        //     // 在H5平台下，tempFilePath 为 base64, // 图片提示跨域 H5保存base64失败，APP端正常输出临时路径
        //     this.canvasImg = res.tempFilePath;
        //   },
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-canvas-wrapper {
  border-radius: 20rpx;
  background: #1F2937;
  box-sizing: border-box;
  border: 2rpx solid #494C55;
  padding: 4rpx;
  min-height: 500px;
  position: relative;
  .del-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 60rpx;
    line-height: 60rpx;
    padding: 0 20rpx;
    z-index: 10;
  }
  .img-box {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
    .canvas {
      margin: 0 auto;
    }
  }
}
</style>