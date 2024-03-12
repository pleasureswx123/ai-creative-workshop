<template>
  <view class="photo-canvas-wrapper">
    <view class="del-btn" @tap.stop>
      <uni-icons @tap="imgSrc = ''" custom-prefix="iconfont-qm" type="icon-qm-del" color="#fff" size="20" />
    </view>
    <view class="photo-canvas-inner">
      <view v-if="imgCanvasInfo" ref="myCanvasBox" class="photo-content" :style="{width: imgCanvasInfo.width + 'px', height: imgCanvasInfo.height + 'px'}">
        <canvas
            :disable-scroll="disableScrollStatus"
            :style="{width: imgCanvasInfo.width + 'px', height: imgCanvasInfo.height + 'px'}"
            class="canvas"
            ref="myCanvas"
            canvas-id="myCanvas"
            @touchstart="onTouchStart"
            @touchmove="onMove"
            @touchend="stopDrawing"
            @mousedown="onTouchStart"
            @mousemove="onMove"
            @mouseup="stopDrawing"
            @click="onClick" />
      </view>
    </view>
<!--    <view @tap="getMaskImgSrc">获取</view>-->
  </view>
</template>

<script>
import { userApi } from '@/api';

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
    },
    lineIds() {
      return this.drawingData.map(item => item.id);
    },
    cursorSize() {
      return {
        brushSize: this.brushSize,
        imgCanvasInfo: this.imgCanvasInfo
      }
    }
  },
  mounted() {
    // const {width, height} = document.getElementById('photoCanvasBox').getBoundingClientRect();
    const {width: imgWidth, height: imgHeight} = this.imgInfo;
    // if(imgWidth > width) {
    //   const wd = width;
    //   this.imgCanvasInfo = {
    //     width: wd,
    //     height: imgHeight / imgWidth * wd
    //   }
    // } else {
    //   this.imgCanvasInfo = {
    //     width: imgWidth,
    //     height: imgHeight
    //   }
    // }
    this.imgCanvasInfo = {
      width: imgWidth / window.devicePixelRatio,
      height: imgHeight / window.devicePixelRatio
    }
    this.createCanvas();
    this.reset();
  },
  data() {
    return {
      imgCanvasInfo: null,
      disableScrollStatus: false,
      ctx: null,
      isDrawing: false,
      // globalAlpha: '.5',
      selectedColor: '#fff',
      history: [],
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
  watch: {
    cursorSize: {
      immediate: true,
      deep: true,
      handler(info) {
        const {brushSize, imgCanvasInfo} = info || {};
        if (imgCanvasInfo) {
          this.$nextTick(() => {
            this.updateCursorSize(brushSize * 1)
          })
        }
      }
    },
  },
  methods: {
    getMaskImgSrc() {
      return new Promise((resolve, reject) => {
        uni.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success: res => {
            // 在H5平台下，tempFilePath 为 base64
            userApi.uploadImg({filePath: res.tempFilePath}).then(res => {
              resolve(res.path)
            }).catch(err => {
              reject(err)
            })
          },
          fail: (err) => {
            reject(err)
          }
        }, this)
      })
    },
    downImg(data, filename) {
      // const imgData = res.tempFilePath.replace("image/png", "image/octet-stream");
      // this.downImg(imgData, 'mask.png');
      const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      save_link.href = data;
      save_link.download = filename;
      const event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(event);
    },
    updateCursorSize(cursorSize) {
      if (this.$refs.myCanvasBox) {
        this.$refs.myCanvasBox.$el.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="${cursorSize}" width="${cursorSize}" viewBox="0 0 ${cursorSize} ${cursorSize}"><circle cx="${cursorSize / 2}" cy="${cursorSize / 2}" r="${cursorSize / 2}" fill="white"/></svg>') ${cursorSize / 2} ${cursorSize / 2}, auto`;
      }
    },
    disableScroll(status) {
      this.disableScrollStatus = status;
    },
    createCanvas() {
      this.ctx = uni.createCanvasContext('myCanvas', this);
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      this.ctx.lineWidth = this.brushSize;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      // this.ctx.globalAlpha = this.globalAlpha;
    },
    initCanvas() {
      const {width, height} = this.imgCanvasInfo || {};
      this.ctx.clearRect(0, 0, width, height);
      this.ctx.fillStyle = 'transparent';
      this.ctx.fillRect(0, 0, width, height);
      console.log(this.imgSrc)
      uni.downloadFile({
        url: this.imgSrc,
        success: (res) => {
          if (res.statusCode === 200) {
            this.ctx.drawImage(res.tempFilePath, 0, 0, width, height);
            this.ctx.draw();
          }
        },
        fail: (err) => {
          console.log('draw fail', err)
        }
      });
    },
    stopDrawing() {
      if (this.points.length > 1) {
        this.saveState(data => {
          const lineId = Date.now().toString();
          this.drawingData.push({ id: lineId, size: this.brushSize, points: [...(this.points || [])].slice() });
          this.history.push({data, id: lineId });
        });
      }
      this.isDrawing = false;
      this.points = [];
      this.$nextTick(() => {
        this.disableScroll(false);
      })
    },
    onMove(e) {
      if (!this.isDrawing) return;
      this.points.push(this.getTouchCoordinates(e));
      this.drawPoints();
    },
    onTouchStart(e) {
      this.startDrawing(this.getTouchCoordinates(e));
    },
    getTouchCoordinates(e) {
      const params = e?.touches?.[0];
      let {x, y} = params || {};
      if (!params) {
        const {left, top} = this.$refs.myCanvas.$el.getBoundingClientRect();
        x = e.clientX - left;
        y = e.clientY - top;
      }
      return {x, y}
    },
    onClick(e) {
      const {x, y} = this.$refs.myCanvas.$el.getBoundingClientRect();
      const params = {
        x: e.detail.x - x,
        y: e.detail.y - y
      }
      if (this.actionType === 'eraser') {
        this.selectedLineId = this.getNearestLineId(params.x, params.y);
        this.eraseLine();
      }
    },
    startDrawing({x, y}) {
      this.disableScroll(true);
      this.isDrawing = true;
      this.points = [];
      this.points.push({ x, y });
    },
    saveState(cb) {
      this.ctx.draw(true, () => {
        uni.canvasGetImageData({
          canvasId: 'myCanvas',
          x: 0,
          y: 0,
          width: this.imgCanvasInfo.width,
          height: this.imgCanvasInfo.height,
          success: res => {
            cb && cb(res.data);
            console.log('set history', this.history.length)
          },
          fail: (err) => {
            console.error('1Failed to undo:', err);
          }
        });
      })
    },
    undo() {
      console.log('undo history', this.history.length)
      let lastState = '';
      if(this.history.length === 1) {
        const temp = this.history[0] || {};
        lastState = temp.data
      } else if(this.history.length > 1) {
        const temp = this.history.pop() || {};
        lastState = temp.data;
        const id = temp.id;
        if(id) {
          const index = this.drawingData.findIndex(line => line.id === id);
          (~index) && (this.drawingData.splice(index, 1));
        }
      }
      if(!lastState) {
        return
      }
      this.ctx.draw(false, () => {
        uni.canvasPutImageData({
          canvasId: 'myCanvas',
          data: lastState,
          x: 0,
          y: 0,
          width: this.imgCanvasInfo.width,
          height: this.imgCanvasInfo.height,
          success: () => {
            this.ctx.draw(true);
          },
          fail: (err) => {
            console.error('Failed to undo:', err);
          }
        });
      })
    },
    redo() {
    },
    reset() {
      this.initCanvas();
      this.initCanvasData();
    },
    initCanvasData() {
      this.isDrawing = false;
      this.history = []; // 重置历史记录
      this.points = [];
      this.drawingData = [];
      this.selectedLineId = null;
      this.saveState(data => {
        this.history = [{data, id: 'init'}];
      });
    },
    drawPoints() {
      // cancelAnimationFrame(this.animationFrameId);
      // this.animationFrameId = requestAnimationFrame(() => {
        if (this.points.length < 2) return; // 至少需要两个点来绘制
        this.ctx.beginPath();
        this.ctx.strokeStyle = (this.selectedColor);
        this.ctx.moveTo(this.points[0].x, this.points[0].y);
      
        for (let i = 1; i < this.points.length; i++) {
          const point = this.points[i];
          const prevPoint = this.points[i - 1];
          const centerX = (point.x + prevPoint.x) / 2;
          const centerY = (point.y + prevPoint.y) / 2;
          this.ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, centerX, centerY);
          // this.ctx.lineTo(point.x, point.y);
        }
        this.ctx.lineWidth = this.brushSize;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.draw(true);
        // this.ctx.globalCompositeOperation = 'source-over';
      // })
    },
    eraseLine() {
      if (this.selectedLineId) {
        const index = this.drawingData.findIndex(line => line.id === this.selectedLineId);
        if (index !== -1) {
          this.drawingData.splice(index, 1);
          // const sn = this.history.findIndex(item => item.id === this.selectedLineId);
          // ~sn && this.history.splice(sn, 1);
          this.initCanvas();
          this.drawingData.forEach(line => {
            this.drawPolyline(line.points, line.size);
          });
          this.saveState(data => {
            this.selectedLineId = null;
            this.history.push({data, id: 'erase' });
          })
        }
      }
    },
    drawPolyline(points, size) {
      if (points.length < 2) return;
      this.ctx.beginPath();
      this.ctx.strokeStyle = (this.selectedColor);
      this.ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length; i++) {
        const point = points[i];
        const prevPoint = points[i - 1];
        const centerX = (point.x + prevPoint.x) / 2;
        const centerY = (point.y + prevPoint.y) / 2;
        this.ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, centerX, centerY);
        // this.ctx.lineTo(point.x, point.y);
      }
      this.ctx.lineWidth = size;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.stroke();
      this.ctx.closePath();
    },
    getNearestLineId(x, y) {
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
    getNearestLineId123(x, y) {
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
  border: 2rpx solid #494C55;
  padding: 4rpx;
  border-radius: 20rpx;
  background: #1F2937;
  box-sizing: border-box;
  position: relative;
  .del-btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 60rpx;
    line-height: 60rpx;
    padding: 0 20rpx;
    z-index: 10;
    cursor: pointer;
  }
}
.photo-canvas-inner {
  width: 100%;
  max-height: 80vh;
  position: relative;
  overflow: auto;
  .photo-content {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    //transform: scale(0.9);
    img, .canvas {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
    .canvas {
      //opacity: .8;
    }
  }
}
</style>