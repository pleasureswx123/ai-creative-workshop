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
    const temp = {
      1: {
        // iconName: 'icon-qm-MaterialSymbolsChatOutlineRounded',
        iconName: 'icon-qm-chat',
        url: 'pages/ai/index'
      },
      2: {
        iconName: 'icon-qm-MaterialSymbolsLinkedCameraRounded',
        url: 'pages/photos/index'
      },
      3: {
        iconName: 'icon-qm-MdiImageEdit',
        url: 'pages/tool/list',
        params: {
          classId: 1
        }
      },
      4: {
        iconName: 'icon-qm-MaterialSymbolsVideoCallRounded',
        url: 'pages/tool/list',
        params: {
          classId: 2
        }
      },
      5: {
        iconName: 'icon-qm-MaterialSymbolsAutoDetectVoice',
        url: 'pages/sound/index'
      },
      6: {
        iconName: 'icon-qm-MaterialSymbolsPhotoCameraFront',
        url: 'pages/tool/list',
        params: {
          classId: 3
        }
      },
      7: {
        iconName: 'icon-qm-MaterialSymbolsMenuBook',
        url: 'pages/special/novel',
        expectationUrl: 'pages/special/novel'
      },
      8: {
        iconName: 'icon-qm-MaterialSymbolsPhotoLibraryRounded',
        url: 'pages/electronic/index',
        expectationUrl: 'pages/special/make-diagram',
      },
      9: {
        iconName: 'icon-qm-IcRoundModelTraining',
        url: 'pages/special/train-model',
        expectationUrl: 'pages/special/train-model',
      },
      10: {
        iconName: 'icon-qm-GgDigitalocean',
        url: 'pages/special/digital-humans',
        expectationUrl: 'pages/special/digital-humans',
      },
      11: { // 三八妇女节活动
        iconName: 'icon-qm-woman',
        url: 'pages/tool/list',
        params: {
          classId: 4
        },
        expectationUrl: '',
      },
    };
    state.aiTypeList = (info || []).map(item => ({
      ...item,
      id: item.channel_id,
      ...(temp[`${item.channel_id}`] || {})
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
