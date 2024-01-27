export default {
  methods: {
    loadImageAndReadFile(url) {
      return new Promise((resolve, reject) => {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = function() {
            debugger
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
            debugger
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
        debugger
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
    }
  }
}