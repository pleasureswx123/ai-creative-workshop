import {userApi} from '@/api'

const state = {
  modelList: [],
  topicList: [],
  rolesList: [],
};

const getters = {
};

const actions = {
  getModelList({dispatch, commit}, params = {}) {
    return userApi.getModelList(params).then(res => {
      commit('setModelList', res || [])
    }).catch(err => {
      const res = [{"name": "wenxin", "alias": "文心一言"},
        {"name": "xunfei", "alias": "讯飞星火"},
        {"name": "tongyi", "alias": "通义千问"},
        {"name": "hunyuan", "alias": "腾讯混元"},
        {"name": "zhipu", "alias": "智普AI"},
        {"name": "minimax", "alias": "MiniMax"},
        {"name": "openai3", "alias": "G35"},
        {"name": "gemini", "alias": "Gemini"},
        {"name": "wenxin4", "alias": "文心4.0"},
        {"name": "openai4", "alias": "高级G4"},
        {"name": "hunyuan4", "alias": "混元4"},
        {"name": "zhipu4", "alias": "智普4"}];
      commit('setModelList', res || [])
    })
  },
  getTopicList({dispatch, commit}, params = {}) {
    return userApi.getTopicList(params).then(res => {
      commit('setTopicList', res || [])
    }).catch(err => {
      const res = [
        {"id": 1, "title": "\u6587\u7ae0\u5199\u4f5c"}, {
          "id": 2,
          "title": "\u6587\u521b\u5de5\u5177"
        }, {"id": 3, "title": "\u6587\u6848\u7b56\u5212"}, {"id": 4, "title": "\u5546\u4e1a\u6587\u4e66"}, {
          "id": 5,
          "title": "\u4f01\u4e1a\u670d\u52a1"
        }, {"id": 6, "title": "\u5de5\u4f5c\u52a9\u624b"}, {"id": 7, "title": "\u751f\u6d3b\u52a9\u624b"}, {
          "id": 8,
          "title": "\u7535\u5546\u8fd0\u8425"
        }, {"id": 9, "title": "\u77ed\u89c6\u9891\u7c7b"}, {"id": 10, "title": "\u6cd5\u5f8b\u670d\u52a1"}, {
          "id": 11,
          "title": "\u7f16\u7a0b\u5f00\u53d1"
        }, {"id": 12, "title": "\u65c5\u6e38\u653b\u7565"}, {
          "id": 13,
          "title": "\u8bba\u6587\u5de5\u5177"
        }, {"id": 14, "title": "\u6559\u5b66\u8f85\u52a9"}, {
          "id": 15,
          "title": "\u6559\u80b2\u57f9\u8bad"
        }, {"id": 16, "title": "\u7ecf\u53f2\u5178\u7c4d"}, {
          "id": 17,
          "title": "\u79d1\u6559\u767e\u79d1"
        }, {"id": 18, "title": "\u8f6f\u4ef6\u4f7f\u7528"}, {
          "id": 19,
          "title": "\u4f11\u95f2\u5a31\u4e50"
        }, {"id": 20, "title": "\u5b66\u4e60\u8f85\u5bfc"}, {
          "id": 21,
          "title": "\u533b\u7597\u5065\u5eb7"
        }, {"id": 22, "title": "\u5360\u661f\u95ee\u535c"}, {
          "id": 23,
          "title": "\u5b9e\u7528\u5de5\u5177"
        }, {"id": 24, "title": "\u5176\u4ed6\u5e94\u7528"}, {"id": 30, "title": "\u670b\u53cb\u5708\u6587\u6848"}
      ]
      commit('setTopicList', res || [])
    })
  },
  getRolesList({dispatch, commit}, params = {}) {
    return userApi.getRolesList(params).then(res => {
      commit('setRolesList', res || [])
    }).catch(err => {
      const res = [
        {
          "id": 1,
          "title": "\u804c\u573a\u7cbe\u82f1",
          "roles": [{"id": 1, "title": "\u9762\u8bd5\u5b98", "thumb": "", "usages": "1.2k", "views": "3.2k"}, {
            "id": 2,
            "title": "\u91d1\u724c\u9500\u552e",
            "thumb": null,
            "usages": "1.8k",
            "views": "1.6w"
          }]
        }, {
          "id": 2,
          "title": "\u884c\u4e1a\u4e13\u5bb6",
          "roles": [{"id": 3, "title": "\u5fc3\u7406\u533b\u751f", "thumb": null, "usages": 462, "views": "1.4k"}, {
            "id": 4,
            "title": "\u8425\u517b\u5e08",
            "thumb": null,
            "usages": 179,
            "views": 713
          }, {"id": 26, "title": "\u5f8b\u5e08", "thumb": "", "usages": 21, "views": 55}]
        }, {
          "id": 4,
          "title": "Ai\u751f\u6d3b\u52a9\u7406",
          "roles": [{
            "id": 8,
            "title": "\u7c73\u5176\u6797\u53a8\u5e08",
            "thumb": null,
            "usages": "5.2k",
            "views": "3.5w"
          }, {"id": 9, "title": "\u5065\u8eab\u6559\u7ec3", "thumb": null, "usages": 96, "views": 352}, {
            "id": 7,
            "title": "\u751f\u6d3b\u7ba1\u5bb6",
            "thumb": null,
            "usages": 48,
            "views": 234
          }, {"id": 10, "title": "\u6e38\u6cf3\u6559\u7ec3", "thumb": null, "usages": 36, "views": 154}]
        }, {
          "id": 5,
          "title": "\u5386\u53f2\u540d\u4eba",
          "roles": [{"id": 6, "title": "\u674e\u767d", "thumb": "", "usages": 424, "views": 739}, {
            "id": 12,
            "title": "\u79e6\u59cb\u7687",
            "thumb": null,
            "usages": 286,
            "views": 336
          }, {"id": 11, "title": "\u5b54\u5b50", "thumb": "", "usages": 128, "views": 240}, {
            "id": 5,
            "title": "\u725b\u987f",
            "thumb": "",
            "usages": 130,
            "views": 460
          }, {"id": 13, "title": "\u8346\u8f72", "thumb": null, "usages": 53, "views": 115}]
        }, {
          "id": 6,
          "title": "\u8da3\u5473\u6a21\u578b",
          "roles": [{"id": 16, "title": "AI\u5973\u53cb", "thumb": null, "usages": "1.1k", "views": "1k"}, {
            "id": 17,
            "title": "\u810f\u8bdd\u5927\u5e08",
            "thumb": null,
            "usages": 489,
            "views": 573
          }, {"id": 15, "title": "AI\u4f5b\u7956", "thumb": null, "usages": 190, "views": 343}, {
            "id": 18,
            "title": "\u952e\u76d8\u4fa0",
            "thumb": null,
            "usages": 176,
            "views": 268
          }, {"id": 20, "title": "\u75af\u5b50", "thumb": null, "usages": 105, "views": 192}, {
            "id": 19,
            "title": "\u5570\u55e6\u5510\u50e7",
            "thumb": null,
            "usages": 103,
            "views": 228
          }, {"id": 27, "title": "\u5267\u672c\u6e38\u620f", "thumb": "", "usages": 29, "views": 58}]
        }, {
          "id": 7,
          "title": "\u4f20\u8bf4\u4eba\u7269",
          "roles": [{"id": 23, "title": "\u5b59\u609f\u7a7a", "thumb": null, "usages": 265, "views": 423}, {
            "id": 22,
            "title": "\u5b99\u65af",
            "thumb": "",
            "usages": "1w",
            "views": "1.2w"
          }, {"id": 21, "title": "\u76d8\u53e4", "thumb": null, "usages": 86, "views": 205}]
        }
      ];
      commit('setRolesList', res || [])
    })
  }
};

const mutations = {
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
