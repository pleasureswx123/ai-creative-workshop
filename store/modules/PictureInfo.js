import {pictureApi} from '@/api'

const state = {
  toolsList: [], // 图片工具列表
  videoToolsList: [], // 视频工具列表
  taskDetail: {},
};

const getters = {
};

const actions = {
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
      }
      return {
        ...item,
        url: item.img_url,
        name: item.title,
        ...({type: temp[item.id] || 'img-to-video'})
      }
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
