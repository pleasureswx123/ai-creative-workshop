import ProduceBtn from './ProduceBtn/ProduceBtn.vue'
import SelectPageNums from './ProduceBtn/SelectPageNums.vue'

const UseProduceBtn = {
  install (Vue, options = {}) {
    Vue.component('ProduceBtn', ProduceBtn)
    Vue.component('SelectPageNums', SelectPageNums)
  }
}

export {
  ProduceBtn,
  SelectPageNums,
  UseProduceBtn as default
}