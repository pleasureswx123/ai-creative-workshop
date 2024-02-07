export default {
  getHomeInfo(params = {}) {
    return uni.$u.http.post(`/Home/Index`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getFeedsTab(params = {}) {
    return uni.$u.http.post(`/Home/FeedsTab`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getStayTuned(params = {}) {
    return uni.$u.http.post(`/Home/StayTuned`, params, {
      custom: {
        auth: true,
      }
    })
  },
}