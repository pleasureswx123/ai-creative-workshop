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
        url: 'pagesA/ai/index',
        "title": "智能对话",
      },
      2: {
        iconName: 'icon-qm-MaterialSymbolsLinkedCameraRounded',
        url: 'pages/photos/index',
        "title": "文生图片",
      },
      3: {
        iconName: 'icon-qm-MdiImageEdit',
        url: 'pages/tool/list',
        params: {
          classId: 1
        },
        "title": "图片处理",
      },
      4: {
        iconName: 'icon-qm-MaterialSymbolsVideoCallRounded',
        url: 'pages/tool/list',
        params: {
          classId: 2
        },
        "title": "生成视频",
      },
      5: {
        iconName: 'icon-qm-MaterialSymbolsAutoDetectVoice',
        url: 'pages/sound/index',
        "title": "生成配音",
      },
      6: {
        iconName: 'icon-qm-MaterialSymbolsPhotoCameraFront',
        url: 'pages/tool/list',
        params: {
          classId: 3
        },
        "title": "创作个人写真摄影",
      },
      7: {
        iconName: 'icon-qm-MaterialSymbolsMenuBook',
        url: 'pages/special/tweets',
        expectationUrl: 'pages/special/novel',
        "title": "小说推文",
      },
      8: {
        iconName: 'icon-qm-MaterialSymbolsPhotoLibraryRounded',
        url: 'pages/electronic/index',
        expectationUrl: 'pages/special/make-diagram',
        "title": "电商图制作",
      },
      9: {
        iconName: 'icon-qm-IcRoundModelTraining',
        url: 'pages/special/train-model',
        expectationUrl: 'pages/special/train-model',
        "title": "训练专属模型",
      },
      10: {
        iconName: 'icon-qm-GgDigitalocean',
        url: 'pages/human/index',
        expectationUrl: 'pages/special/digital-humans',
        "title": "数字人",
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
