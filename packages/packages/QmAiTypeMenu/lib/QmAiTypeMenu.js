import QmAiTypeMenu from './src'

const UseQmAiTypeMenu = {
  install (Vue, options = {}) {
    Vue.component('QmAiTypeMenu', QmAiTypeMenu)
  }
}

export {
  QmAiTypeMenu,
  UseQmAiTypeMenu as default
}
