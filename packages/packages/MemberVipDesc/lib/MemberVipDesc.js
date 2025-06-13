import MemberVipDesc from './src'

const UseMemberVipDesc = {
  install (Vue, options = {}) {
    Vue.component('MemberVipDesc', MemberVipDesc)
  }
}

export {
  MemberVipDesc,
  UseMemberVipDesc as default
}