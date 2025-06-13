import WechatPop from './src'

const UseWechatPop = {
  install (Vue, options = {}) {
    Vue.component('WechatPop', WechatPop)
  }
}

export {
  WechatPop,
  UseWechatPop as default
}