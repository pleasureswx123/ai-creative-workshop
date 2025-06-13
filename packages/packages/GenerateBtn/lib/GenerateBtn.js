import GenerateBtn from './src'

const UseGenerateBtn = {
  install (Vue, options = {}) {
    Vue.component('GenerateBtn', GenerateBtn)
  }
}

export {
  GenerateBtn,
  UseGenerateBtn as default
}