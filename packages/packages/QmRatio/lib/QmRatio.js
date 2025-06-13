import QmRatio from './QmRatio/QmRatio.vue'

const UseQmRatio = {
  install (Vue, options = {}) {
    Vue.component('QmRatio', QmRatio)
  }
}

export {
  QmRatio,
  UseQmRatio as default
}