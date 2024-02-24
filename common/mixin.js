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
  }
}