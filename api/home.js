export default {
  getHomeFeedsList(params = {}) {
    return uni.$u.http.post(`/Home/FeedsList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getRecommendList(params = {}) {
    return uni.$u.http.post(`/Home/RecommendList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getHomeFeedsList2(params = {}) {
    return uni.$u.http.post(`/Home/FeedsListV2`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getHomeInfo(params = {}) {
    return uni.$u.http.post(`/Home/Index`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getHomeV2(params) {
    return uni.$u.http.post(`/Home/IndexV2`, params, {
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