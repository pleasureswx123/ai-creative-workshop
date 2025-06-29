import {userApi} from "@/api";
import {mapState, mapActions} from 'vuex';

export default {
  data() {
    return {
      isLoginStatus: false,
      statusBarHeight: 0,
      uniPlatform: uni.$u.platform,
      ua: '',
      windowWidth: 0,
      browserName: '',
    }
  },
  created() {
    const {statusBarHeight, ua, windowWidth, browserName} = uni.$u.sys();
    this.browserName = browserName;
    this.statusBarHeight = statusBarHeight;
    this.ua = ua;
    this.windowWidth = windowWidth;
  },
  computed: {
    ...mapState('UserInfo', ['userInfoState', 'userIntegral']),
    showStatusBar() {
      return this.uniPlatform === 'plus' || (this.uniPlatform === 'h5' && this.ua.toLowerCase().includes('html5plus'))
    },
    isWeixiBrowser() {
      return this.ua.toLowerCase().includes('weixin')
    },
    statusBarHeightStr() {
      return `${this.statusBarHeight || 49}px`
    },
    mobileH5() {
      return this.uniPlatform === 'h5' && !this.ua.toLowerCase().includes('mobile')
    },
    // showPcTopNavBar() {
    //   return this.uniPlatform === 'h5' && !this.ua.toLowerCase().includes('mobile') && this.windowWidth > 960;
    // },
    integralTips() {
      let result = '';
      const temp = this.userIntegral?.[`${this.taskType}`] || {};
      const {is_show, consume} = temp;
      if(+is_show) {
        const {A_num, A_show} = consume || {};
        result = A_show || '';
      }
      return result;
    },
    isBindWechat() {
      return !!(+this.userInfoState?.bind_wechat);
    },
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
    ...mapActions('UserInfo', ['getUserInfo', 'authAndBindWechat']),
    onTrack({eventName = 'form'} = {}) {
      if(window.fromSource === 'baidu') {
        const ctMap = new Map([ // 转化事件对应的CT值
          ['form', 3], // 表单提交成功
          ['line', 18], // 留线索
          ['advice', 92], // 有效咨询
        ]);
        const ct = ctMap.get(eventName);
        ct && window._agl && window._agl.push(['track', ['success', {t: ct}]]);
      }
    },
    payReady(params, url) {
      function onBridgeReady() {
        WeixinJSBridge.invoke('getBrandWCPayRequest', params, function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            console.log(url);
            uni.reLaunch({
              url: '/pages/index/index'
            });
            setTimeout(() => {
              uni.showToast({
                title: '支付成功',
                duration: 2000
              });
            })
          }
        });
      }
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    },
    bindWechatAuth() {
      this.getUserInfo().then(() => {
        if(!this.isBindWechat && this.qmIsWechat()) {
          const {code} = this.getUrlCode();
          if(code) {
            this.authAndBindWechat({code}).then(res => {
              uni.showToast({
                title: '绑定成功',
                duration: 2000
              });
              this.getUserInfo();
            }).catch(() => {
              uni.reLaunch({
                url: '/pages/index/index'
              })
            })
          }
        }
      });
    },
    getUrlCode() {
      const url = window.location.search;
      const result = {};
      if (~url.indexOf('?')) {
        const str = url.substr(1);
        const temp = str.split('&');
        for (let i = 0, l = temp.length; i < l; i++) {
          const [name, value] = temp[i].split('=');
          name && (result[name] = value || '');
        }
      }
      return result;
    },
    getWechatCode() {
      if (this.qmIsWechat()) {
        const local = window.location.href;
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx003ee6dc2b2b75c0&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
      }
    },
    qmIsWechat() {
      const ua = navigator.userAgent.toLowerCase();
      return !!(ua.match(/micromessenger/i) && !ua.match(/windows/i) && !ua.match(/macos/i) && !ua.match(/macwechat/i));
    },
    qmIsMobile() {
      const ua = navigator.userAgent.toLowerCase();
      return !!(ua.match(/mobile/i))
    },
    isVideoTaskType(item) {
      // item.task_type
      return (+item.url_type) === 2;
      // return [2, 10, 11, 24, 25, 26].includes(+taskType)
    },
    isImgTaskType(item) {
      return (+item.url_type) === 1;
      // return [2, 10, 11, 24, 25, 26].includes(+taskType)
    },

    toggleBodyPositionStatus(status) {
      if(uni.$u.platform === 'h5') {
        document.body.style.overflow = status ? 'hidden' : '';
      }
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
    getFileName(src) {
      let url = src;
      try {
        const temp = new URL(url);
        url = temp.pathname;
      } catch (e) {}
      return url?.split?.('/')?.slice(-1)?.[0] || url;
    },
    async downLoadFile(url, options = {}) {
      // Content-Type: application/octet-stream
      // Content-Disposition: attachment; filename="example.txt"
      // window.open(`${url}?type=download`);
      // return
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