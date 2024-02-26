<template>
  <view class="photo-canvas-wrapper">
    <view class="del-btn" @tap.stop>
      <uni-icons @tap="imgSrc = ''" custom-prefix="iconfont-qm" type="icon-qm-del" color="#fff" size="20" />
    </view>
    <view class="img-box">
      <canvas ref="myCanvas" canvas-id="myCanvas" id="myCanvas"></canvas>
<!--      <img :src="src" />-->
    </view>
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
  created() {
    // this.context = uni.createCanvasContext('myCanvas', this);
    this.poster();
    // this.loadImage(this.src).then(res => {
    //   const {naturalWidth, naturalHeight, width, height} = res || {};
    //   const a = this.$refs.myCanvas.$refs.canvas;
    //   a.setAttribute('width', `${naturalWidth}px`);
    //   a.setAttribute('height', `${naturalHeight}px`);
    //   this.$nextTick(async () => {
    //     const response = await fetch(`${this.src}?_t=${Date.now()}`, {timeout: 50000});
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     debugger
    //     const blob = await response.blob();
    //     debugger
    //     const urlBlob = URL.createObjectURL(blob);
    //     this.context.drawImage(urlBlob, 0, 0, naturalWidth, naturalHeight);
    //     console.log(naturalWidth, naturalHeight, width, height)
    //   })
    // })
  },
  data() {
    return {
      canvasW: 300,
      canvasH: 270,
    }
  },
  methods: {
    getImageInfo(image) {
      return new Promise((req, rej) => {
        uni.getImageInfo({
          src: image,
          success: function(res) {
            req(res)
          },
        });
      })
    },
    async poster() {
      var _this = this;
      var info = await _this.getImageInfo(_this.imgSrc)
      if (info.errMsg == 'getImageInfo:ok') {
        uni.showToast({
          icon: 'loading',
          mask: true,
          duration: 3000,
          title: '绘制中',
        });
        var qrcode = info.path;
        setTimeout(() => {
          // 创建画布对象
          const ctx = uni.createCanvasContext('myCanvas', this)
          // 清除背景
          ctx.clearRect(0, 0, _this.canvasW, _this.canvasW)
          // 绘制背景
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, _this.canvasW, _this.canvasW);
        
          var widthImg1 = (_this.canvasW - 162) / 2;
          // 图片
          // drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
          // dx和dy是image在canvas中定位的坐标值
          // dw和dh是image在canvas中即将绘制区域（相对dx和dy坐标的偏移量）的宽度和高度值
          // sx和sy是image所要绘制的起始位置
          // sw和sh是image所要绘制区域（相对image的sx和sy坐标的偏移量）的宽度和高度值
          ctx.drawImage(qrcode, 0, 0, info.width, info.height, widthImg1, 80, 162,
              162 * info.height / info.width)
          ctx.draw(true, (ret) => {
            uni.showToast({
              icon: 'success',
              mask: true,
              title: '绘制完成',
            });
            uni.canvasToTempFilePath({ // 保存canvas为图片
              width: _this.canvasW,
              height: _this.canvasH,
              destWidth: _this.canvasW * 2, //此处需放大2倍，不然保存的图失真
              destHeight: _this.canvasH * 2,
              canvasId: 'myCanvas',
              quality: 1,
              complete: function(res) {
                // 在H5平台下，tempFilePath 为 base64, // 图片提示跨域 H5保存base64失败，APP端正常输出临时路径
                _this.canvasImg = res.tempFilePath
              },
            })
          })
        }, 1000)
      }
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
  height: 500px;
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
    img, canvas {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }
  }
}
</style>