import {userApi} from "@/api";

export default {
  data() {
    return {
      isLoginStatus: false
    }
  },
  computed: {
    qmSystem() {
      const system = uni.getSystemInfoSync().system.toLowerCase();
      let result = 'other';
      if (system.indexOf('android') > -1) {
        result = 'android';
      } else if (system.indexOf('ios') > -1) {
        result = 'ios';
      } else if (system.indexOf('macos') > -1) {
        result = 'macos';
      } else if (system.indexOf('windows') > -1) {
        result = 'windows';
      }
      return result;
    }
  },
  methods: {
    qmIsWechat() {
      const ua = navigator.userAgent.toLowerCase();
      return !!(ua.match(/micromessenger/i) && !ua.match(/windows/i) && !ua.match(/macos/i) && !ua.match(/macwechat/i));
    },
    qmIsMobile() {
      const ua = navigator.userAgent.toLowerCase();
      return !!(ua.match(/mobile/i))
    },
    isVideoTaskType(taskType) {
      return [2, 10, 11].includes(+taskType)
    },
    toggleBodyPositionStatus(status) {
      document.body.style.overflow = status ? 'hidden' : '';
    },
    async loadImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Failed to load image'));
        image.src = url;
      });
    },
    async addWatermark(text, imageUrl, canvasId, outputImageFileName) {
      // addWatermark('Watermark', 'input_image.jpg', 'canvas', 'output_image.jpg');
      const canvas = document.getElementById(canvasId);
      const ctx = canvas.getContext('2d');
      const image = await this.loadImage(imageUrl);
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      ctx.font = '30px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // 水印颜色和透明度
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2); // 将水印放在画布中央
      // 生成新的带水印的图片并保存
      const outputImage = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = outputImage;
      link.download = outputImageFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    checkLoginStatus() {
      return new Promise((resolve, reject) => {
        userApi.checkLogin().then(res => {
          this.isLoginStatus = true;
          resolve(res);
        }).catch(err => {
          if(err.errno === 403) {
            uni.showModal({
              title: '提示',
              content: '请登录',
              confirmText: '去登录',
              cancelText: '取消',
              success: function (res) {
                if (res.confirm) {
                  uni.$u.route({
                    url: `pages/login/index`,
                    params: {
                      // backurl  encodeURIComponent
                    }
                  })
                }
              }
            })
          }
        })
      })
    },
    loadImageAndReadFile(url) {
      return new Promise((resolve, reject) => {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = function() {
            if (xhr.status === 200) {
              try {
                const blob = xhr.response;
                const fileName = `${Date.now()}_image.jpg`;
                const file = new File([blob], fileName, { type: blob.type });
                const fileReader = new FileReader();
                fileReader.onload = function (e) {
                  const fileContent = e.target.result;
                  resolve(fileContent);
                };
                fileReader.onerror = () => {
                  reject()
                };
                fileReader.readAsText(file);
              } catch (e) {
                reject()
              }
            } else {
              reject()
            }
          };
          xhr.onerror = function(err) {
            console.log(err)
            reject()
          };
          xhr.send();
        } catch (e) {
          reject()
        }
      })
      // getFileInfo getImageInfo
    },
    saveToLocal(blob) {
      // #ifdef H5
      const urlBlob = window.URL.createObjectURL(blob);
      const ele = document.createElement('a');
      ele.href = urlBlob;
      ele.setAttribute('download', '下载');
      ele.style.display = 'none';
      document.body.appendChild(ele);
      ele.click();
      setTimeout(function () {
        URL.revokeObjectURL(urlBlob);
        document.body.removeChild(ele);
      }, 100);
      // #endif
      // #ifndef H5
      const {filePath, type} = blob;
      const temp = {
        video: 'saveVideoToPhotosAlbum',
        image: 'saveImageToPhotosAlbum',
        audio: 'saveAudioToAlbum'
      };
      const keyName = temp[type] || '';
      keyName && uni[keyName]({
        filePath: filePath,
        success: () => {
          uni.$u.toast('保存成功')
        },
        fail: (error) => {
          uni.$u.toast('保存失败')
        }
      });
      // #endif
    },
    downLoadVideoOrImgOrAudioFile({src, fileType}) { // fileType: image || video || audio
      return new Promise((resolve, reject) => {
        // #ifdef H5
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${src}?_t=${Date.now()}`, true);
        xhr.responseType = 'blob';
        xhr.onload = (e) => {
          if (xhr.status === 200) {
            const blob = xhr.response;
            return resolve(blob);
          }
        };
        xhr.onerror = (err) => {
          console.error(err)
        }
        xhr.send();
        // #endif

        // #ifndef H5
        let size = 0;
        const downloadTask = uni.downloadFile({
          url: `${src}?_t=${Date.now()}`,
          success: (res) => {
            if (res.statusCode === 200) {
              return resolve({size, filePath: res.tempFilePath, type: fileType});
            } else {
              uni.$u.toast('下载失败')
            }
          },
          fail: (error) => {
            uni.$u.toast('下载失败')
          }
        })
        downloadTask.onProgressUpdate((res) => {
          size = res.totalBytesExpectedToWrite;
        });
        // #endif
      })
    },
    getFileSize(url) {
      return new Promise((resolve, reject) => {
        uni.downloadFile({url,
          success: (res) => {
            if (res.statusCode === 200) {
              console.log('download tempFilePath: ', res.tempFilePath);
              uni.getFileInfo({
                filePath: res.tempFilePath,
                success: function (res) {
                  return resolve(res.size)
                }
              });
            }
          }
        });
      })
    },
    getFileName(url) {
      return url?.split?.('/')?.slice(-1)?.[0] || url;
    },
    drawCanvas() {
      // 获取元素
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = 'your_image.jpg'; // 请替换为你的图片路径

      // 定义涂抹参数
      const radius = 10; // 涂抹半径
      const color = 'rgba(0, 0, 0, 1)'; // 涂抹颜色，不透明表示覆盖

      // 加载图片并绘制到Canvas
      image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
      };

      // 添加涂抹事件监听器
      let isDrawing = false;
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mousemove', draw);

      // 开始涂抹
      function startDrawing(event) {
        isDrawing = true;
        draw(event); // 开始涂抹时也需要绘制一次
      }

      // 结束涂抹
      function stopDrawing() {
        isDrawing = false;
      }

      // 涂抹
      function draw(event) {
        if (!isDrawing) return;

        // 计算涂抹位置
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // 在canvas上绘制圆形
        requestAnimationFrame(() => {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.fill();
        });
      }
    },
    imgEdit() {
      // <script src="https://hammerjs.github.io/dist/hammer.min.js"></script>
// 获取画布元素和绘制上下文
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
// 初始化变量
      let image = null; // 存储加载的图像对象
      let scaleFactor = 1; // 缩放比例
      let lastScaleFactor = 1; // 上一次缩放比例
      let offsetX = 0; // X轴偏移量
      let offsetY = 0; // Y轴偏移量
      let lastX = 0; // 上一个触摸点的X坐标
      let lastY = 0; // 上一个触摸点的Y坐标
      let isDrawing = false; // 标志是否正在涂抹
// 加载图片函数
      function loadImage(event) {
        const input = event.target;
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function () {
          const img = new Image();
          img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            image = img;
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      }
// 初始化 Hammer.js
      const mc = new Hammer(canvas);
// 启用缩放和拖动手势识别
      mc.get('pinch').set({enable: true});
      mc.get('pan').set({enable: true});
// 监听缩放事件
      mc.on('pinchstart pinchmove', function (event) {
        scaleFactor = Math.max(1, lastScaleFactor * event.scale); // 计算缩放比例
        drawImage();
      });
// 监听拖动事件
      mc.on('panstart', function (event) {
        lastX = event.center.x;
        lastY = event.center.y;
      });
      mc.on('panmove', function (event) {
        offsetX += event.deltaX;
        offsetY += event.deltaY;
        drawImage();
      });
// 涂抹开始事件处理函数
      function startDrawing(event) {
        isDrawing = true; // 标志涂抹开始
        lastX = event.center.x;
        lastY = event.center.y;
      }
// 涂抹移动事件处理函数
      function draw(event) {
        if (isDrawing) {
          const currentX = event.center.x;
          const currentY = event.center.y;
          // 绘制涂抹路径
          ctx.strokeStyle = "black";
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(currentX, currentY);
          ctx.stroke();
          // 更新上一个触摸点的坐标
          lastX = currentX;
          lastY = currentY;
        }
      }
// 涂抹结束事件处理函数
      function stopDrawing() {
        isDrawing = false; // 标志涂抹结束
      }
// 绘制图像函数
      function drawImage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (image) {
          ctx.drawImage(image, offsetX, offsetY, image.width * scaleFactor, image.height * scaleFactor);
        }
      }
// 添加事件监听器
      canvas.addEventListener('touchstart', startDrawing);
      canvas.addEventListener('touchmove', draw);
      canvas.addEventListener('touchend', stopDrawing);
      document.getElementById('uploadInput').addEventListener('change', loadImage);
    },
    imageEdit() {
      // 获取画布元素和绘制上下文
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');
// 初始化变量
      let image; // 存储加载的图像对象
      let scaleFactor = 1; // 缩放比例
      let offsetX = 0; // X轴偏移量
      let offsetY = 0; // Y轴偏移量
      let lastX = 0; // 上一个触摸点的X坐标
      let lastY = 0; // 上一个触摸点的Y坐标
      let isPinching = false; // 标志是否正在进行双指缩放
      let isDrawing = false; // 标志是否正在涂抹
// 加载图片函数
      function loadImage(event) {
        let input = event.target;
        let reader = new FileReader();
        reader.onload = function () {
          let img = new Image();
          img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            image = img;
          }
          img.src = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
// 双指缩放开始事件处理函数
      function pinchStart(event) {
        // 判断触摸点是否至少有两个
        if (event.touches.length >= 2) {
          isPinching = true; // 标记双指缩放开始
          // 获取两个触摸点的中点坐标
          let touch1 = event.touches[0];
          let touch2 = event.touches[1];
          lastX = (touch1.clientX + touch2.clientX) / 2;
          lastY = (touch1.clientY + touch2.clientY) / 2;
        }
      }
// 双指缩放移动事件处理函数
      function pinchMove(event) {
        // 判断是否处于双指缩放状态，以及触摸点数量是否至少为两个
        if (isPinching && event.touches.length >= 2) {
          let touch1 = event.touches[0];
          let touch2 = event.touches[1];
          let currentX = (touch1.clientX + touch2.clientX) / 2;
          let currentY = (touch1.clientY + touch2.clientY) / 2;
          // 计算当前两个触摸点之间的距离变化
          let distance = Math.sqrt((currentX - lastX) ** 2 + (currentY - lastY) ** 2);
          let delta = distance - Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
          // 根据距离变化调整缩放比例
          scaleFactor += delta / 100;
          // 重新绘制图像
          drawImage();
          // 更新上一个触摸点的坐标
          lastX = currentX;
          lastY = currentY;
        }
      }
// 双指缩放结束事件处理函数
      function pinchEnd(event) {
        if (isPinching) {
          isPinching = false; // 标志双指缩放结束
        }
      }
// 涂抹开始事件处理函数
      function startDrawing(event) {
        if (event.touches.length === 1) {
          isDrawing = true; // 标志涂抹开始
          // 获取触摸点的坐标作为涂抹起点
          let touch = event.touches[0];
          lastX = touch.clientX;
          lastY = touch.clientY;
        }
      }
// 涂抹移动事件处理函数
      function draw(event) {
        if (isDrawing && event.touches.length === 1) {
          // 获取当前触摸点的坐标
          let touch = event.touches[0];
          let currentX = touch.clientX;
          let currentY = touch.clientY;
          // 绘制涂抹路径
          ctx.strokeStyle = "black";
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(lastX - canvas.offsetLeft, lastY - canvas.offsetTop);
          ctx.lineTo(currentX - canvas.offsetLeft, currentY - canvas.offsetTop);
          ctx.stroke();
          // 更新上一个触摸点的坐标
          lastX = currentX;
          lastY = currentY;
        }
      }
// 涂抹结束事件处理函数
      function stopDrawing() {
        isDrawing = false; // 标志涂抹结束
      }
// 绘制图像函数
      function drawImage() {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 绘制缩放后的图像
        ctx.drawImage(image, offsetX, offsetY, image.width * scaleFactor, image.height * scaleFactor);
      }
// 添加事件监听器
      canvas.addEventListener('touchstart', startDrawing);
      canvas.addEventListener('touchmove', draw);
      canvas.addEventListener('touchend', stopDrawing);
      canvas.addEventListener('touchstart', pinchStart);
      canvas.addEventListener('touchmove', pinchMove);
      canvas.addEventListener('touchend', pinchEnd);
      document.getElementById('uploadInput').addEventListener('change', loadImage);

    },
    createAudioAnalyser() {
      // 创建音频上下文对象
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // 获取音频元素
      const audioElement = document.getElementById('audio');
      // 创建音频源
      const audioSrc = audioContext.createMediaElementSource(audioElement);
      // 创建分析器
      const analyser = audioContext.createAnalyser();
      // 连接音频源和分析器
      audioSrc.connect(analyser);
      // 连接音频源和目的地（扬声器）
      audioSrc.connect(audioContext.destination);
      // 设置FFT大小
      analyser.fftSize = 256;
      // 获取频域数据长度
      const bufferLength = analyser.frequencyBinCount;
      // 创建存储频域数据的数组
      const dataArray = new Uint8Array(bufferLength);
      // 获取画布元素
      const canvas = document.getElementById('visualizer');
      // 获取2D绘图上下文
      const canvasCtx = canvas.getContext('2d');
      // 定义绘制函数
      function draw() {
        // 获取画布宽度和高度
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;
        // 获取频域数据
        analyser.getByteFrequencyData(dataArray);
        // 清空画布
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        // 计算每个频段的宽度
        const barWidth = (WIDTH / bufferLength) * 2.5;
        // 使用新的绘制方法，直接绘制整个波形图
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        // 设置柱形颜色
        canvasCtx.fillStyle = 'rgb(255, 0, 0)';
        // 绘制每个频段的柱形
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 2;
          // 绘制柱形
          canvasCtx.fillRect(i * (barWidth + 1), HEIGHT - barHeight, barWidth, barHeight);
        }
        // 循环调用draw函数，实现动画效果
        requestAnimationFrame(draw);
      }
      // // 给播放/暂停按钮添加点击事件监听器
      // document.getElementById('playPauseButton').addEventListener('click', () => {
      //   // 如果音频暂停
      //   if (audioElement.paused) {
      //     // 播放音频
      //     audioElement.play();
      //     // 调用绘制函数开始绘制波形图
      //     draw();
      //     // 更新按钮文本为暂停
      //     document.getElementById('playPauseButton').textContent = 'Pause';
      //   } else { // 如果音频正在播放
      //     // 暂停音频
      //     audioElement.pause();
      //     // 更新按钮文本为播放
      //     document.getElementById('playPauseButton').textContent = 'Play';
      //   }
      // });
    },
    async downLoadFile(url, options = {}) {
      const fileName = this.getFileName(url);
      const {timeout = 50000, retries = 3, onDownloadComplete} = options;
      let attempts = 0;
      const downloadWithRetry = async () => {
        try {
          const response = await fetch(`${url}?_t=${Date.now()}`, {timeout});
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // try {
          //   const contentLength = Number(response.headers.get('Content-Length'));
          //   const reader = response.body.getReader();
          // } catch (e) {
          //   console.log('reader', e)
          // }
          const blob = await response.blob();
          const urlBlob = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = urlBlob;
          link.setAttribute('download', fileName || 'download');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            URL.revokeObjectURL(urlBlob);
            document.body.removeChild(link);
          }, 100);
          if (typeof onDownloadComplete === 'function') {
            onDownloadComplete();
          }
        } catch (error) {
          attempts++;
          if (attempts < retries) {
            console.warn(`Download attempt ${attempts} failed. Retrying...`);
            await downloadWithRetry();
          } else {
            console.error('File download failed after multiple attempts:', error);
            throw error;
          }
        }
      };
      try {
        await downloadWithRetry();
      } catch (error) {
        console.error('There was a problem with the download:', error);
        throw error;
      }
    },
    async downLoadFile123(url, options = {}) {
      debugger
      // const aa = downloadFile('https://example.com/file.pdf', {
      //   onDownloadComplete: () => {
      //     console.log('File download complete!');
      //     // 在这里执行其他操作
      //   },
      //   onDownloadProgress: progress => {
      //     console.log(`Download progress: ${progress}%`);
      //   },
      //   onCancel: () => {
      //     console.log('Download cancelled');
      //   }
      // }).then(() => {
      //   console.log('File download initiated');
      // }).catch(error => {
      //   console.error('File download failed:', error);
      // });
      // aa.cancel();
      const fileName = this.getFileName(url);
      const {timeout = 50000, retries = 3, onDownloadComplete, onDownloadProgress, onCancel} = options;
      let cancelled = false;
      let attempts = 0;
      const downloadWithRetry = async () => {
        try {
          if (cancelled) {
            if (typeof onCancel === 'function') {
              onCancel();
            }
            return;
          }
          const response = await fetch(`${url}?_t=${Date.now()}`, {timeout});
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          try {
            const contentLength = Number(response.headers.get('Content-Length'));
            let receivedLength = 0;
            const reader = response.body.getReader();
            debugger
            const handleData = ({done, value}) => {
              if (cancelled) {
                reader.cancel();
                if (typeof onCancel === 'function') {
                  onCancel();
                }
                return;
              }
              if (done) {
                if (typeof onDownloadProgress === 'function') {
                  onDownloadProgress(100);
                }
                return;
              }
              receivedLength += value.length;
              if (typeof onDownloadProgress === 'function' && contentLength) {
                const progress = Math.round((receivedLength / contentLength) * 100);
                onDownloadProgress(progress);
              }
              return reader.read().then(handleData);
            };
            reader.read().then(handleData);
            if (!cancelled) {
              debugger
              const blob = await response.blob();
              const urlBlob = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = urlBlob;
              link.setAttribute('download', fileName || 'download');
              link.style.display = 'none';
              document.body.appendChild(link);
              link.click();
              setTimeout(() => {
                URL.revokeObjectURL(urlBlob);
                document.body.removeChild(link);
              }, 100);
              if (typeof onDownloadComplete === 'function') {
                onDownloadComplete();
              }
            }
          } catch (e) {
            console.log('reader', e)
          }
        } catch (error) {
          debugger
          attempts++;
          if (attempts < retries) {
            console.warn(`Download attempt ${attempts} failed. Retrying...`);
            await downloadWithRetry();
          } else {
            console.error('File download failed after multiple attempts:', error);
            throw error;
          }
        }
      };
      try {
        await downloadWithRetry();
      } catch (error) {
        console.error('There was a problem with the download:', error);
        throw error;
      }
      return {
        cancel: () => {
          cancelled = true;
        }
      };
    },
    async downLoadFile999(url, options = {}) {
      const fileName = this.getFileName(url);
      const {timeout = 50000, retries = 3, onDownloadComplete} = options;
      let attempts = 0;
      const downloadWithRetry = async () => {
        try {
          const response = await fetch(`${url}?_t=${Date.now()}`, {timeout});
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const blob = await response.blob();
          const urlBlob = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = urlBlob;
          link.setAttribute('download', fileName || 'download');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            URL.revokeObjectURL(urlBlob);
            document.body.removeChild(link);
          }, 100);
          if (typeof onDownloadComplete === 'function') {
            onDownloadComplete();
          }
        } catch (error) {
          attempts++;
          if (attempts < retries) {
            console.warn(`Download attempt ${attempts} failed. Retrying...`);
            await downloadWithRetry();
          } else {
            console.error('File download failed after multiple attempts:', error);
            throw error;
          }
        }
      };
      try {
        await downloadWithRetry();
      } catch (error) {
        console.error('There was a problem with the download:', error);
        throw error;
      }
    },
    downLoadFile1(url) {
      // #ifdef H5
      return new Promise((resolve, reject) => {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', `${url}?_t=${Date.now()}`, true);
          xhr.responseType = 'blob';
          xhr.onerror = () => {
            reject()
          }
          xhr.onload = (e) => {
            if (xhr.status === 200) {
              try {
                const blob = xhr.response;
                const urlBlob = window.URL.createObjectURL(blob);
                const ele = document.createElement('a');
                ele.href = urlBlob;
                ele.setAttribute('download', this.getFileName(url));
                ele.style.display = 'none';
                document.body.appendChild(ele);
                ele.click();
                setTimeout(() => {
                  URL.revokeObjectURL(urlBlob);
                  document.body.removeChild(ele);
                  resolve();
                }, 100);
              } catch (e) {
                reject()
              }
            }
          };
          xhr.send();
        } catch (e) {
          reject()
        }
      })
      // #endif
      uni.downloadFile({url,
        success: (res) => {
          if (res.statusCode === 200) {
            // #ifdef H5
            const ele = document.createElement('a');
            ele.href = res.tempFilePath;
            ele.setAttribute('download', this.getFileName(url));
            ele.style.display = 'none';
            document.body.appendChild(ele);
            ele.click();
            document.body.removeChild(ele);
            // #endif
            // #ifndef H5
            uni.saveFile({
              tempFilePath: res.tempFilePath,
              success: function (res) {
                console.log(res.savedFilePath);
              }
            });
            // #endif
          }
        },
        fail: (err) => {
          console.log('download fail: ', err)
        }
      });
    }
  }
}