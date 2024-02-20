export default {
  getGoodsType(params = {}) {
    return uni.$u.http.post(`/Order/getGoodsType`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getGoodsList(params = {}) {
    return uni.$u.http.post(`/Order/getGoodsList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getCommonProblem(params = {}) {
    return uni.$u.http.post(`/Order/CommonProblem`, params, {
      custom: {
        auth: true,
      }
    })
  },
  confirmOrder(params = {}) {
    return uni.$u.http.post(`/Order/confirmOrder`, params, {
      custom: {
        auth: true,
      }
    })
  },
}