import {pictureApi} from '@/api'

const state = {
  toolsList: [], // 图片工具列表
  videoToolsList: [], // 视频工具列表
  personalToolsList: [], // 个人写真工具列表
  taskDetail: {},
};

const getters = {
};

const actions = {
  getTemplate({dispatch, commit}, params = {}) {
    return pictureApi.getTemplate(params).then(res => {
      return Promise.resolve(res);
    })
  },
  getToolsList({dispatch, commit}, params = {}) {
    return pictureApi.getToolsList(params).then(res => {
      commit('setToolsList', res?.list || [])
      return Promise.resolve(res);
    })
  },
  getVideoToolsList({dispatch, commit}, params = {}) {
    return pictureApi.getToolsList(params).then(res => {
      commit('setVideoToolsList', res?.list || [])
      return Promise.resolve(res);
    })
  },
  getPersonalToolsList({dispatch, commit}, params = {}) {
    return pictureApi.getToolsList(params).then(res => {
      commit('setPersonalToolsList', res?.list || [])
      return Promise.resolve(res);
    })
  },
  createTask({dispatch, commit}, params = {}) {
    return pictureApi.createTask(params).then(res => {
      return Promise.resolve(res);
    })
  },
  getMaterial({dispatch, commit}, params = {}) {
    return pictureApi.getMaterial(params).then(res => {
      commit('setTaskDetail', res || {})
      return Promise.resolve(res);
    })
  },
};

const mutations = {
  setTaskDetail(state, info = {}) {
    state.taskDetail = info || {};
  },
  setToolsList(state, info = []) {
    state.toolsList = info.map(item => {
      const temp = {
        3: 'ai-face',
        7: 'hd-redraw',
        4: 'remove-bg',
        5: 'replace-bg',
        6: 'ai-expand',
        8: 'part-redraw',
        9: 'replace-bg-txt',

        19: 'woman-style1',
        20: 'woman-style2',
        21: 'woman-style3',
        22: 'woman-style4',
        23: 'woman-style5',
      }
      return {
        ...item,
        url: item.img_url,
        name: item.title,
        ...({type: temp[item.id] || 'replace-bg-txt'})
      }
    });
  },
  setVideoToolsList(state, info = []) {
    state.videoToolsList = info.map(item => {
      const temp = {
        2: 'img-to-video',
        10: 'img-to-dance',
        11: 'img-to-draw',
        25: 'text-to-video',
        26: '',
      }
      return {
        ...item,
        url: item.img_url,
        name: item.title,
        ...({type: temp[item.id] || 'xxxxxx'})
      }
    });
  },
  setPersonalToolsList(state, info = []) {
    state.personalToolsList = info.map(item => {
      const temp = {
        12: 'photo-clothing',
        13: 'photo-pictorials',
        14: 'photo-classical',
        15: 'photo-han',
        16: 'photo-modern',
        17: 'photo-cartoon',
      }
      return {
        ...item,
        url: item.img_url,
        name: item.title,
        ...({type: temp[item.id] || 'clothing'})
      }
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
