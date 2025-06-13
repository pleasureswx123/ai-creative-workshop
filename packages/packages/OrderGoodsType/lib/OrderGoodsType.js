import OrderGoodsType from './src'

const UseOrderGoodsType = {
  install (Vue, options = {}) {
    Vue.component('OrderGoodsType', OrderGoodsType)
  }
}

export {
  OrderGoodsType,
  UseOrderGoodsType as default
}