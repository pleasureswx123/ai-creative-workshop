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