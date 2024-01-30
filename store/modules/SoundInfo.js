import {soundApi} from '@/api'

const state = {
  dubList: [],
};

const getters = {
};

const actions = {
  getDubList({dispatch, commit}, params = {}) {
    return soundApi.getDubList(params).then(res => {
      commit('setDubList', res?.list || [])
      return Promise.resolve(res);
    })
  },
  createTask({dispatch, commit}, params = {}) {
    return soundApi.createTask(params).then(res => {
      return Promise.resolve(res);
    })
  },
  getTaskList({dispatch, commit}, params = {}) {
    return soundApi.getTaskList(params).then(res => {
      return Promise.resolve(res);
    })
  },
};

const mutations = {
  setDubList(state, info = []) {
    state.dubList = info.map(item => {
      const {dub_id: id, dub_name: name, url} = item || {};
      return {
        id, name, url
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
