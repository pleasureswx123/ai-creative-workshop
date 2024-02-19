import {orderApi} from '@/api'

const state = {
  goodsType: [],
  goodsList: [],
  commonProblem: [],
  orderInfo: null
};

const getters = {
};

const actions = {
  getGoodsType({dispatch, commit}, params = {}) {
    return orderApi.getGoodsType(params).then(res => {
      commit('setGoodsType', res || []);
      return Promise.resolve(res);
    })
  },
  getGoodsList({dispatch, commit}, params = {}) {
    return orderApi.getGoodsList(params).then(res => {
      commit('setGoodsList', res || []);
      return Promise.resolve(res);
    })
  },
  getCommonProblem({dispatch, commit}, params = {}) {
    return orderApi.getCommonProblem(params).then(res => {
      commit('setCommonProblem', res || []);
      return Promise.resolve(res);
    })
  },
  confirmOrder({dispatch, commit}, params = {}) {
    return orderApi.confirmOrder(params).then(res => {
      commit('setOrderInfo', res || {});
      return Promise.resolve(res);
    })
  },
};

const mutations = {
  setGoodsType(state, info = []) {
    state.goodsType = info || [];
  },
  setGoodsList(state, info = []) {
    state.goodsList = info || [];
  },
  setCommonProblem(state, info = []) {
    state.commonProblem = info || [];
  },
  setOrderInfo(state, info = {}) {
    state.orderInfo = info || {};
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
