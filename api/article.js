export default {
  getArticleList(params = {}) {
    return uni.$u.http.post(`/article/getList`, params, {
      custom: {
        auth: true,
      }
    })
  },
}