import {userApi} from '@/api'

const state = {
  role: {}
};

const getters = {
};

const actions = {
  getRoleInfo({ dispatch, commit }, id) {
    return userApi.getRoleInfo({role_id: id}).then(res => {
      debugger
      commit('setRole', res || {})
      // #ifdef H5
      document.title = res.title
      // #endif
      // #ifndef H5
      // to do ...
      // #endif
    }).catch(err => {
      debugger
      console.log(err)
    })
  }
};

const mutations = {
  setRole(state, info = {}) {
    state.role = info || {};
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
