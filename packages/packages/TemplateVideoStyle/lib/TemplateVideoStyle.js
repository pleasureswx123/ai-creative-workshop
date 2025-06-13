import TemplateVideoStyle from './src'

const UseTemplateVideoStyle = {
  install (Vue, options = {}) {
    Vue.component('TemplateVideoStyle', TemplateVideoStyle)
  }
}

export {
  TemplateVideoStyle,
  UseTemplateVideoStyle as default
}