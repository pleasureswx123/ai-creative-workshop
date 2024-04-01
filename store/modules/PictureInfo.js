import {pictureApi} from '@/api'
import {routerKeyMap} from '@/config'

const state = {
  toolsList: [], // 图片工具列表
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
      const temp = routerKeyMap;
      return {
        ...item,
        url: item.img_url,
        name: item.title,
        ...({type: temp[item.id] || 'xxxxxx'})
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
