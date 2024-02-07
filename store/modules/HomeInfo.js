import {homeApi} from '@/api'

const state = {
  aiTypeList: [],
  bannerInfo: {},
  feedsTabs: [],
};

const getters = {
};

const actions = {
  getHomeInfo({dispatch, commit}, params = {}) {
    return homeApi.getHomeInfo(params).then(res => {
      const {channel, banner} = res || {};
      commit('setAiTypeList', channel || []);
      commit('setBannerInfo', banner || {});
      return Promise.resolve(res);
    })
  },
  getFeedsTab({dispatch, commit}, params = {}) {
    return homeApi.getFeedsTab(params).then(res => {
      commit('setFeedsTabs', res || []);
      return Promise.resolve(res);
    })
  },
};

const mutations = {
  setAiTypeList(state, info = []) {
    state.aiTypeList = (info || []).map(item => ({
      ...item,
      id: item.channel_id
    }));
  },
  setBannerInfo(state, info = {}) {
    state.bannerInfo = info || {};
  },
  setFeedsTabs(state, info = []) {
    state.feedsTabs = (info || []).map(item => {
      const {title: name, model_subclass_id: id} = item || {};
      return { name, id }
    });
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
