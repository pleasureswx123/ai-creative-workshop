import {photoApi} from '@/api'

const state = {
  modeClassInfo: [],
  currentModeInfo: {},
  ImgRatioInfo: [],
};

const getters = {
};

const actions = {
  getModelList({dispatch, commit}, params = {}) {
    return photoApi.getModelStyleList(params).then(res => {
      return Promise.resolve(res);
    })
  },
  getModelStyleList({dispatch, commit}, params = {}) {
    return photoApi.getModelStyleList(params).then(res => {
      commit('setCurrentModeInfo', res?.list?.[0] || {});
      return Promise.resolve(res);
    })
  },
  getModelClass({dispatch, commit}, params = {}) {
    return photoApi.getModelClass(params).then(list => {
      commit('setModeClassInfo', list || []);
      return Promise.resolve(list);
    })
  },
  getImgScale({dispatch, commit}, params = {}) {
    return photoApi.getImgScale(params).then(res => {
      commit('setImgRatioInfo', res?.list || []);
      return Promise.resolve(res);
    })
  },
  getSameModel({dispatch, commit}, params = {}) {
    return photoApi.getSameModel(params).then(res => {
      return Promise.resolve(res);
    })
  },
  createTask({dispatch, commit}, params = {}) {
    return photoApi.createTask(params).then(res => {
      return Promise.resolve(res);
    })
  },
};

const mutations = {
  setImgRatioInfo(state, info = []) {
    state.ImgRatioInfo = info || [];
  },
  setModeClassInfo(state, info = []) {
    state.modeClassInfo = info || [];
  },
  setCurrentModeInfo(state, info = {}) {
    state.currentModeInfo = {
      ...(info || {}),
      id: info.model_style_id
    };
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
