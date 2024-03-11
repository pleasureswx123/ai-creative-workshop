import {userApi} from '@/api'

const state = {
  userLoginInfo: null,
  userInfoState: {
    user_id: 0,
    balance: 0,
    sum_balance: 0,
    is_vip: 0,
    vip_level: 1,
    vip_expire_time: '',
    bind_wechat: 0, // 1已经绑定微信  0未绑定
  },
  modelList: [],
  topicList: [],
  rolesList: [],
  userIntegral: {}, // 获取用户任务积分配置
};

const getters = {
};

const actions = {
  login({dispatch, commit}, params = {}) {
    return userApi.login(params).then(res => {
      commit('setUserLoginInfo', Object.assign(
        {phone: params?.phone || ''},
        res || {}));
      return Promise.resolve(res);
    })
  },
  phonelogin({dispatch, commit}, params = {}) {
    return userApi.phonelogin(params).then(res => {
      commit('setUserLoginInfo', Object.assign(
        {phone: params?.phone || ''},
        res || {}));
      return Promise.resolve(res);
    })
  },
  getModelList({dispatch, commit}, params = {}) {
    return userApi.getModelList(params).then(res => {
      commit('setModelList', res?.aiList || [])
    })
  },
  getTopicList({dispatch, commit}, params = {}) {
    return userApi.getTopicList(params).then(res => {
      commit('setTopicList', res || [])
    })
  },
  getRolesList({dispatch, commit}, params = {}) {
    return userApi.getRolesList(params).then(res => {
      commit('setRolesList', res || [])
    })
  },
  getUserIntegral({dispatch, commit}, params = {}) {
    return userApi.getUserIntegral(params).then(res => {
      commit('setUserIntegral', res.list || {})
    })
  },
  getUserInfo({dispatch, commit}, params = {}) {
    return userApi.getUserInfo(params).then(res => {
      dispatch('getUserIntegral');
      commit('setUserInfo', res || {})
    })
  },
  authAndBindWechat({dispatch, commit}, params = {}) {
    return userApi.authAndBindWechat(params).then(res => {
      return Promise.resolve(res);
    })
  }
};

const mutations = {
  setUserLoginInfo(state, info = {}) {
    uni.setStorageSync('phone', info.phone);
    uni.setStorageSync('token', info.token);
    uni.setStorageSync('userInfo', info.userinfo);
    state.userLoginInfo = info;
  },
  setUserIntegral(state, info = {}) {
    state.userIntegral = info
  },
  setUserInfo(state, info = {}) {
    state.userInfoState = info
  },
  setRolesList(state, info = []) {
    state.rolesList = info
  },
  setModelList(state, info = []) {
    state.modelList = info.map(item => {
      const {alias, name} = item;
      return {name: alias, type: name}
    })
  },
  setTopicList(state, info = []) {
    const temp = [
      {title: '收藏', id: 'collect'},
      {title: '全部', id: 'all'},
    ];
    state.topicList = [...temp, ...(info || [])].map(item => {
      const {title, id} = item;
      return {name: title, type: `${id}`}
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
