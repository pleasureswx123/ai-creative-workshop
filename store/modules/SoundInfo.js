import {soundApi} from '@/api'

const state = {
  dubList: [],
};

const getters = {
};

const actions = {
  getDubList({dispatch, commit}, params = {}) {
    return soundApi.getDubList(params).then(res => {
      debugger
      commit('setDubList', res || [])
      return Promise.resolve(res);
    })
  }
};

const mutations = {
  setDubList(state, info = []) {
    state.dubList = info
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
