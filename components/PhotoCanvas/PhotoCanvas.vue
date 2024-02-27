<template>
  <view>
    <view class="photo-canvas-wrapper">
      <view class="del-btn" @tap.stop>
        <uni-icons @tap="imgSrc = ''" custom-prefix="iconfont-qm" type="icon-qm-del" color="#fff" size="20" />
      </view>
      <view class="img-box">
        <canvas
            class="canvas"
            :style="{width: imgInfo.width + 'px', height: imgInfo.height + 'px'}"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            canvas-id="myCanvas" />
      </view>
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
  watch: {
    actionType(type) {
      if(type) {
      
      }
    }
  },
  mounted() {
    this.initCanvasInfo();
  },
  data() {
    return {
      ctx: null,
      isDrawing: false,
      selectedColor: '#000000',
      history: [],
      redoStack: [],
      points: [],
      eraserMode: false, // 标志是否橡皮擦模式
      lastDrawData: null, // 上一次绘制的图像数据
      drawingData: [] // 存储绘制的线条数据
    }
  },
  beforeDestroy() {
    // 在组件销毁前清理资源
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.ctx = null;
  },
  methods: {
    initCanvasInfo() {
      this.ctx = uni.createCanvasContext('myCanvas', this);
      this.ctx.lineWidth = this.brushSize;
      this.ctx.lineCap = 'round';
      this.initCanvas();
    },
    initCanvas() {
      const {width, height} = this.imgInfo || {};
      this.ctx.clearRect(0, 0, width, height);
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(0, 0, width, height);
      this.ctx.drawImage(this.imgSrc, 0, 0, width, height);
      this.ctx.draw(true, () => {
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
    },
    reset() {
      this.initCanvas();
      this.history = []; // 重置历史记录
      this.redoStack = []; // 重置重做栈
      this.points = [];
    },
    onTouchStart(e) {
      this.toggleBodyPositionStatus(true);
      this.isDrawing = true;
      const { x, y } = e.touches[0];
      this.points = [];
      this.points.push({ x, y });
      this.saveState();
    },
    onTouchMove(e) {
      if (!this.isDrawing) return;
      const { x, y } = e.touches[0];
      this.points.push({ x, y });
      this.draw(); // 直接绘制
    },
    draw() {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = requestAnimationFrame(() => {
        if (this.points.length < 2) return; // 至少需要两个点来绘制
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0].x, this.points[0].y);
        
        for (let i = 1; i < this.points.length; i++) {
          const point = this.points[i];
          const prevPoint = this.points[i - 1];
          const centerX = (point.x + prevPoint.x) / 2;
          const centerY = (point.y + prevPoint.y) / 2;
          this.ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, centerX, centerY);
          // this.ctx.lineTo(endX, endY);
        }
        this.ctx.lineWidth = this.brushSize;
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.draw(true);
        // this.ctx.globalCompositeOperation = 'source-over';
        // this.points = [this.points[this.points.length - 1]];
      })
    },
    onTouchEnd() {
      this.toggleBodyPositionStatus(false);
      if (this.points.length > 1) {
        this.drawingData.push(this.points.slice());
      }
      this.isDrawing = false;
      this.points = [];
    },
    eraseLastDrawing() {
      if (this.drawingData.length > 0) {
        // 如果是橡皮擦模式，并且存在绘制的线条数据，则删除最后一条线条
        this.drawingData.pop();
        this.ctx.clearRect(0, 0, this.$refs.myCanvas.width, this.$refs.myCanvas.height); // 清空画布
        this.history.push(this.lastDrawData); // 保存当前状态
        this.redoStack = []; // 清空重做栈
        // 重新绘制除最后一条线条以外的其他线条
        this.drawingData.forEach(points => {
          this.ctx.beginPath();
          this.ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            const point = points[i];
            const prevPoint = points[i - 1];
            const centerX = (point.x + prevPoint.x) / 2;
            const centerY = (point.y + prevPoint.y) / 2;
            this.ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, centerX, centerY);
          }
          this.ctx.lineWidth = this.lineWidth;
          this.ctx.stroke();
          this.ctx.closePath();
        });
        this.ctx.draw(true);
      }
    },
    saveState() {
      this.ctx.draw(true, () => {
        uni.canvasGetImageData({
          canvasId: 'myCanvas',
          x: 0,
          y: 0,
          width: this.imgInfo.width,
          height: this.imgInfo.height,
          success: res => {
            this.history.push(res.data);
            // 每次保存新的绘制状态时，清空重做栈
            this.redoStack = [];
          }
        });
      });
    },
    undo() {
      if (this.history.length > 0) {
        const lastState = this.history.pop();
        this.redoStack.push(lastState);
        uni.canvasPutImageData({
          canvasId: 'myCanvas',
          data: lastState,
          x: 0,
          y: 0,
          width: this.imgInfo.width,
          height: this.imgInfo.height,
          success: () => {
            this.ctx.draw(true);
          }
        }, this);
      }
    },
    redo() {
      if (this.redoStack.length > 0) {
        const lastState = this.redoStack.pop();
        this.history.push(lastState);
        this.ctx.putImageData(lastState, 0, 0);
        this.ctx.draw(true);
      }
    },
    saveImage() {
      uni.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: res => {
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              uni.showToast({
                title: 'Image saved',
                icon: 'success'
              });
            },
            fail: () => {
              uni.showToast({
                title: 'Failed to save image',
                icon: 'none'
              });
            }
          });
        },
        fail: () => {
          uni.showToast({
            title: 'Failed to save image',
            icon: 'none'
          });
        }
      });
    },
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