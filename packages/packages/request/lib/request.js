function request(vm) {
  uni.$u.http.setConfig((config) => {
    return config
  })
  uni.$u.http.interceptors.request.use((config) => {
    // const token = vm.$store.state.GlobalInfo.token;
    config.data = config.data || {}
    // if(config?.custom?.auth) {
    //
    // }
    config.header['X-Token'] = uni.getStorageSync('token') || '';
    config.header['X-Site'] = ''; // 渠道
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
        return Promise.reject(data);
      };
      if(data?.errno === 201) { // 算力不足请充值
        return Promise.reject(data);
      };
      return Promise.reject(data);
    }
    return Promise.resolve(data?.data || {});
  }, (response) => {
    if (response.statusCode === 401 && response.data.code === 1002) {
      uni.navigateTo({
        url: '/pages/login/index'
      });
      return Promise.reject(response?.data)
    }
    if (!response.config?.custom?.toast) {
      const tips = `api interface error: ${response.statusCode} ${response.config.fullPath}`;
      uni.$u.toast(`${response?.data?.message || response?.data?.msg || tips}`);
    }
    return Promise.reject(response?.data)
  })
}

export {
  request as default
}
