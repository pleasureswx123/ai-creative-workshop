import Vue from 'vue'
Vue.prototype.language = 'zh-cn'

const $lang = text => {
  return text
}

Vue.prototype.$lang = $lang
Vue.filter('lang', $lang)
