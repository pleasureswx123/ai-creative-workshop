import {userApi} from '@/api'

const state = {
  userInfoState: {
    user_id: 0,
    balance: 0,
    is_commission: 0
  },
  modelList: [],
  topicList: [],
  rolesList: [],
};

const getters = {
};

const actions = {
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
  getUserInfo({dispatch, commit}, params = {}) {
    return userApi.getUserInfo(params).then(res => {
      commit('setUserInfo', res || {})
    })
  }
};

const mutations = {
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
