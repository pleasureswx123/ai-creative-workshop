import Vue from 'vue'

const sites = ['default', 'xky'];

const getSite = () => {
  const host = window.location.host;
  const temp = {
    'aigc.chaojiyuyan.cn': sites[0],
    'xky.chaojiyuyan.cn': sites[1],
  }
  const siteName = temp[`${host}`];
  return siteName ? siteName : 'default'
}

const moduleStatus = {
  [`${sites[0]}`]: {
    pay: true
  },
  [`${sites[1]}`]: {
    pay: false
  },
}

const getSiteModuleStatus = () => {
  const site = getSite();
  const status = moduleStatus[`${site}`];
  return status ? status : {};
}

Vue.prototype.$getSite = getSite;
Vue.prototype.$getModuleStatus = getSiteModuleStatus;
