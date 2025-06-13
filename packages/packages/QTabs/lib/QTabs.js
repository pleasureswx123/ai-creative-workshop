import QTabs from './src'

const UseQTabs = {
  install (Vue, options = {}) {
    Vue.component('QTabs', QTabs)
    // Vue.use(mixin)
    //   .use(QmPayBuy)
    //   .use(UpgradePop)
    //   .use(WechatPop);
  }
}

export {
  QTabs,
  UseQTabs as default
}
