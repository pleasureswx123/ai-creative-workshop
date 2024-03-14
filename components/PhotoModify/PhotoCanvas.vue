<template>
  <view class="photo-canvas-wrapper">
    <view class="del-btn" @tap.stop>
      <view style="display:none;">{{history.length}}</view>
      <uni-icons @tap="imgSrc = ''" custom-prefix="iconfont-qm" type="icon-qm-del" color="#fff" size="20" />
    </view>
    <view class="photo-canvas-inner" id="photoCanvasBox">
      <view v-if="imgCanvasInfo" ref="myCanvasBox" class="photo-content" :style="{width: imgCanvasInfo.width + 'px', height: imgCanvasInfo.height + 'px'}">
        <img :src="imgSrc" />
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
      width: imgWidth,
      height: imgHeight
    }
    this.$nextTick(() => {
      const query = uni.createSelectorQuery().in(this);
      query.select('#photoCanvasBox')
          .boundingClientRect((data) => {
            const {width, height} = data;
            console.log("得到布局位置信息" + JSON.stringify({width, height}));
            console.log("img" + JSON.stringify({imgWidth, imgHeight}));
            console.log(width / imgWidth, height / imgHeight)
            if (imgWidth > width) {
              this.imgCanvasInfo = {
                width: width,
                height: imgHeight / imgWidth * width
              }
              this.scale = imgWidth / width;
              console.log(this.scale)
            }
            this.createCanvas();
            this.reset();
          }).exec();
    })
  },
  data() {
    return {
      scale: 1,
      imgCanvasInfo: null,
      disableScrollStatus: false,
      ctx: null,
      isDrawing: false,
      // globalAlpha: '.5',
      selectedColor: '#000000',
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
    dataURLToBlob(dataURL) {
      // const aaaa = 'data:image/png;base64,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8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBYRI8fieToAAAQIE0gJCJL2A+wQIECBAoFhAiBSP7+kECBAgQCAtIETSC7hPgAABAgSKBf4HqaaSHwKgQ7cAAAAASUVORK5CYII='
      const parts = dataURL.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const byteString = atob(parts[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: contentType });
    },
    getMaskImgSrc() {
      if(!this.history.length) {
        return new Promise((resolve, reject) => {
          uni.showModal({
            title: '提示',
            content: '请涂抹图片',
            confirmText: '确定',
            showCancel: false,
          })
          reject();
        })
      }
      return new Promise((resolve, reject) => {
        const {width, height} = this.imgCanvasInfo || {};
        uni.canvasGetImageData({
          canvasId: 'myCanvas', x: 0, y: 0, width, height,
          success: res => {
            try {
              const resData = res.data;
              for (let i = 0; i < resData.length; i += 4) {
                resData[i] = 0;
                resData[i+1] = 0;
                resData[i+2] = 0;
                resData[i+3] = (resData[i+3] === 255) ? 0 : 255;
              }
              const canvas = document.createElement('canvas');
              canvas.width = res.width;
              canvas.height = res.height;
              const ctx = canvas.getContext('2d');
              const imgData = new ImageData(resData, res.width, res.height);
              ctx.putImageData(imgData, 0, 0);
              
              // 创建一个新的 Canvas 用于放大图像
              const scaledCanvas = document.createElement('canvas');
              const scaledCtx = scaledCanvas.getContext('2d');
              const scaleFactor = this.scale; // 放大倍数
              // 设置新 Canvas 的大小为放大后的尺寸
              const scaledWidth = res.width * scaleFactor;
              const scaledHeight = res.height * scaleFactor;
              scaledCanvas.width = scaledWidth;
              scaledCanvas.height = scaledHeight;
              // 使用双线性插值绘制图像
              scaledCtx.drawImage(canvas, 0, 0, res.width, res.height, 0, 0, scaledWidth, scaledHeight);
              
              // base64上传方式，方式一：
              const dataURL = scaledCanvas.toDataURL('image/png');
              userApi.uploadImg({filePath: dataURL}).then(res => {
                resolve(res.path)
              }).catch(err => {
                reject(err)
              })
              // blob上传方式，方式二：
              // const blob = this.dataURLToBlob(dataURL);
              // console.log(blob)
              // return
              // canvas.toBlob(blob => {
              //   const formData = new FormData();
              //   const filename = `clipspace-mask-${performance.now()}.png`;
              //   const item = {filename: filename, subfolder: 'clipspace', type: 'input'};
              //   // new URLSearchParams(item).toString(); // 'filename=xxx.png&subfolder=clipspace&type=input'
              //   formData.append('image', blob, filename);
              //   formData.append('original_ref', this.imgSrc);
              //   formData.append('type', "input");
              //   formData.append('subfolder', "clipspace");
              //   console.log(blob, filename);
              //   console.log((new URLSearchParams(formData)).toString());
              //   resolve();
              //   // api.fetchApi('/upload/mask', {method: 'POST', body: formData}).then(response => {
              //   //   resolve();
              //   // }).catch(error => {
              //   //   console.error('Error:', error);
              //   //   reject();
              //   // });
              // });
            } catch (e) {
              reject(e)
            }
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
        this.$refs.myCanvasBox.$el.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="${cursorSize}" width="${cursorSize}" viewBox="0 0 ${cursorSize} ${cursorSize}"><circle cx="${cursorSize / 2}" cy="${cursorSize / 2}" r="${cursorSize / 2}" fill="black"/></svg>') ${cursorSize / 2} ${cursorSize / 2}, auto`;
      }
    },
    disableScroll(status) {
      this.disableScrollStatus = status;
    },
    createCanvas() {
      this.ctx = uni.createCanvasContext('myCanvas', this);
      // this.ctx.scale(window.devicePixelRatio * 8, window.devicePixelRatio * 8);
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
      this.ctx.draw();
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
      const temp = this.history.pop() || {};
      const id = temp.id;
      if(id) {
        const index = this.drawingData.findIndex(line => line.id === id);
        (~index) && (this.drawingData.splice(index, 1));
      }
      if(this.history.length) {
        const temp = this.history[this.history.length - 1];
        const lastState = temp.data;
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
      } else {
        this.reset();
      }
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
          const sn = this.history.findIndex(item => item.id === this.selectedLineId);
          ~sn && this.history.splice(sn, 1);
          this.initCanvas();
          this.drawingData.forEach(line => {
            this.drawPolyline(line.points, line.size);
          });
          this.ctx.draw(true);
          this.selectedLineId = null;
          // this.saveState(data => {
          //   this.history.push({data, id: 'erase' });
          // })
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
  width: 90%;
  margin: 0 auto;
  //max-height: 70vh;
  position: relative;
  overflow: hidden;
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
      opacity: .7;
    }
  }
}
</style>