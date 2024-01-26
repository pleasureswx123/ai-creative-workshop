export default {
  getDubList(params = {}) {
    return uni.$u.http.post(`/dub/DubList`, params, {
      custom: {
        auth: true,
      }
    })
  },
}