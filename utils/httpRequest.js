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
    if(config?.custom?.auth) {
      config.header.x_token = ``
    }
    // if (config?.custom?.formUrl) {
    //   config.header['Content-Type'] = `application/x-www-form-urlencoded;charset=UTF-8`
    // }
    return config
  }, config => {
    return Promise.reject(config)
  })
  uni.$u.http.interceptors.response.use((response) => {
    const data = response.data
    const custom = response.config?.custom
    if (+data.errno !== 0) {
      if (custom.toast !== false) {
        uni.$u.toast(data.message || data.msg || 'error')
      }
      return Promise.reject(data)
      // if (custom?.catch) {
      //   return Promise.reject(data)
      // } else {
      //   return new Promise(() => { })
      // }
    }
    return Promise.resolve(data.data === undefined ? {} : data.data)
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
