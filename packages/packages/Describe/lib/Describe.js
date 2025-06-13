import Describe from './Describe/Describe.vue'

const UseDescribe = {
  install (Vue, options = {}) {
    Vue.component('Describe', Describe)
  }
}

export {
  Describe,
  UseDescribe as default
}