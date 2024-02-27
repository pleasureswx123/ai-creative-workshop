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
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @click="onClick"
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
      selectedColor: '#000',
      history: [],
      redoStack: [],
      points: [],
      drawingData: [],
      selectedLineId: null,
    }
  },
  beforeDestroy() {
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
      this.ctx.draw(true);
    },
    onMouseDown(e) {
      debugger
      const params = {
        x: e.clientX,
        y: e.clientY,
      }
      // this.startDrawing(params);
    },
    onMouseMove() {},
    onMouseUp() {},
    onTouchStart(e) {
      debugger
      this.startDrawing(e.touches[0]);
    },
    getTouchCoordinates(e) {
      const clientX = e.touches ? e.touches[0].x : e.clientX;
      const clientY = e.touches ? e.touches[0].y : e.clientY;
      const rect = e.target.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;
      return { x: offsetX, y: offsetY };
    },
    startDrawing({x, y}) {
      this.toggleBodyPositionStatus(true);
      this.isDrawing = true;
      this.points = [];
      this.points.push({ x, y });
      this.saveState();
    },
    saveState() {
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
    reset() {
      this.initCanvas();
      this.history = []; // 重置历史记录
      this.redoStack = []; // 重置重做栈
      this.points = [];
      this.drawingData = [];
    },
    onTouchMove(e) {
      if (!this.isDrawing) return;
      const { x, y } = e.touches[0];
      this.points.push({ x, y });
      this.drawPoints();
    },
    onTouchEnd() {
      this.toggleBodyPositionStatus(false);
      this.isDrawing = false;
      if (this.points.length > 1) {
        const lineId = Date.now().toString();
        this.drawingData.push({ id: lineId, points: this.points.slice() });
      }
    },
    drawPoints() {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = requestAnimationFrame(() => {
        if (this.points.length < 2) return; // 至少需要两个点来绘制
        this.ctx.beginPath();
        this.ctx.setStrokeStyle(this.selectedColor);
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
      })
    },
    onClick(e) {
      alert(2222)
      const x = e.detail.x;
      const y = e.detail.y;
      if (this.actionType === 'eraser') {
        this.selectedLineId = this.getNearestLineId(x, y);
        this.eraseLine();
      }
    },
    eraseLine() {
      if (this.selectedLineId) {
        const index = this.drawingData.findIndex(line => line.id === this.selectedLineId);
        if (index !== -1) {
          this.saveState();
          this.drawingData.splice(index, 1);
          this.initCanvas();
          this.drawingData.forEach(line => {
            this.drawPolyline(line.points);
          });
          this.ctx.draw(true);
          this.selectedLineId = null;
        }
      }
    },
    drawPolyline(points) {
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
    },
    getNearestLineId(x, y) {
      let minDist = Infinity;
      let nearestLineId = null;
      this.drawingData.forEach(line => {
        line.points.forEach((point, index, points) => {
          const start = points[index];
          const end = points[index + 1];
          if(start && end) {
            const dist = this.pointToLineDistance({ x, y }, start, end );
            if (dist < minDist) {
              minDist = dist;
              nearestLineId = line.id;
            }
          }
        });
      });
      return nearestLineId;
    },
    pointToLineDistance(pt, lineStart, lineEnd) {
      const {x, y} = pt;
      const {x: x1, y: y1} = lineStart;
      const {x: x2, y: y2} = lineEnd;
      const A = x - x1;
      const B = y - y1;
      const C = x2 - x1;
      const D = y2 - y1;
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) {
        param = dot / lenSq;
      }
      let xx, yy;
      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }
      const dx = x - xx;
      const dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy);
    },
    getNearestLineId1(x, y) {
      let minDist = Infinity;
      let nearestLineId = null;
      this.drawingData.forEach(line => {
        line.points.forEach(point => {
          const dist = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
          if (dist < minDist) {
            minDist = dist;
            nearestLineId = line.id;
          }
        });
      });
      return nearestLineId;
    },
    saveImage() {
      uni.canvasToTempFilePath({
        canvasId: 'myCanvas',
        // x: 0,
        // y: 0,
        // width: this.canvasW,
        // height: this.canvasH,
        // destWidth: this.canvasW * 2, //此处需放大2倍，不然保存的图失真
        // destHeight: this.canvasH * 2,
        // quality: 1,
        success: res => {
          // this.canvasImg = res.tempFilePath;
          // 在H5平台下，res.tempFilePath 为 base64
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