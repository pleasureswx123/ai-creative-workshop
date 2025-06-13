import TemplateImageStyle from './src'

const UseTemplateImageStyle = {
  install (Vue, options = {}) {
    Vue.component('TemplateImageStyle', TemplateImageStyle)
  }
}

export {
  TemplateImageStyle,
  UseTemplateImageStyle as default
}