export default {
  methods: {
    downLoadVideoOrImgFile({src, fileType}) { // fileType: image || video
      // #ifdef H5
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${src}?_t=${Date.now()}`, true);
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        if (xhr.status === 200) {
          const blob = xhr.response;
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
        }
      };
      xhr.send();
      // #endif

      // #ifndef H5
      uni.downloadFile({
        url: src,
        success: (res) => {
          if (res.statusCode === 200) {
            const keyName = fileType === 'video' ? 'saveVideoToPhotosAlbum' : 'saveImageToPhotosAlbum';
            uni[keyName]({
              filePath: res.tempFilePath,
              success: () => {
                uni.$u.toast('保存成功')
              },
              fail: (error) => {
                uni.$u.toast('保存失败')
              }
            });
          } else {
            uni.$u.toast('下载失败')
          }
        },
        fail: (error) => {
          uni.$u.toast('下载失败')
        }
      })
      // #endif
    }
  }
}