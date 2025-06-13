import Statement from './Statement/Statement.vue'

const UseStatement = {
  install (Vue, options = {}) {
    Vue.component('Statement', Statement)
  }
}

export {
  Statement,
  UseStatement as default
}