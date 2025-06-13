import OrderGoodsList from './src'

const UseOrderGoodsList = {
  install (Vue, options = {}) {
    Vue.component('OrderGoodsList', OrderGoodsList)
  }
}

export {
  OrderGoodsList,
  UseOrderGoodsList as default
}
