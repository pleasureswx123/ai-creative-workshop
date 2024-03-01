import {homeApi} from '@/api'

const state = {
  aiTypeList: [],
  bannerInfo: {},
  feedsTabs: [],
  stayTunedInfo: []
};

const getters = {
};

const actions = {
  getHomeInfo({dispatch, commit}, params = {}) {
    return homeApi.getHomeInfo(params).then(res => {
      const {channel, banner, huodong} = res || {};
      commit('setAiTypeList', [
        ...(huodong ? [Object.assign({}, huodong, {highlight: true})] : []),
        ...(channel || [])
      ]);
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
  getStayTuned({dispatch, commit}, params = {}) {
    return homeApi.getStayTuned(params).then(res => {
      commit('setStayTunedInfo', res.urls || []);
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
      const {title: name, model_subclass_id: id, is_highlight} = item || {};
      return { name, id, highlight: !!(+is_highlight) }
    });
  },
  setStayTunedInfo(state, info = []) {
    state.stayTunedInfo = (info || []).map((item, index) => {
      return { ...item, id: index }
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
