module.exports = (vm) => {
  uni.$u.http.setConfig((config) => {
    config.baseURL = '/web.php';
    config.withCredentials = true;
    config.sslVerify = false;
    return config
  })
  uni.$u.http.interceptors.request.use((config) => {
    // const token = vm.$store.state.GlobalInfo.token;
    config.data = config.data || {}
    // if(config?.custom?.auth) {
    //
    // }
    config.header['X-Token'] = uni.getStorageSync('token') || '';
    config.header['X-Site'] = uni.getStorageSync('sitecode'); // 渠道
    // if (config?.custom?.formUrl) {
    //   config.header['Content-Type'] = `application/x-www-form-urlencoded;charset=UTF-8`
    // }
    return config
  }, config => {
    return Promise.reject(config)
  })
  uni.$u.http.interceptors.response.use((response) => {
    const {config, data, header, errMsg, statusCode} = response || {};
    const {url, custom: {auth, hideToast} } = config || {};
    if (statusCode !== 200) {
      return Promise.reject(response);
    }
    if (data?.errno !== 0) {
      if(data?.errno === 403) {
        if(url !== '/user/checkLogin') {
          uni.showModal({
            title: '提示',
            content: data?.message || '请登录',
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
        return Promise.reject(data);
      };
      if (data.message && !hideToast) {
        uni.showModal({
          title: '提示',
          showCancel: false,
          content: data.message || 'error',
          success: function (res) {}
        });
      }
      return Promise.reject(data);
    }
    return Promise.resolve(data?.data || {});
  }, (response) => {
    if (response.statusCode === 401 && response.data.code === 1002) {
      vm.$store.commit('GlobalInfo/clearToken');
      uni.navigateTo({
        url: '/pages/login/index'
      });
      return Promise.reject(response?.data)
    }
    if (!response.config?.custom?.toast) {
      uni.$u.toast(`${response?.data?.message || response?.data?.msg || 'api interface error'}`)
    }
    return Promise.reject(response?.data)
  })
}
