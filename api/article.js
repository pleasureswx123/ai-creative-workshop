export default {
  getArticleList(params = {}) {
    return uni.$u.http.post(`/article/getList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getArticle(params = {}) {
    return uni.$u.http.post(`/article/getArticle`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getAboutUs(params = {}) {
    return uni.$u.http.post(`/Article/AboutUs`, params, {
      custom: {
        auth: true,
      }
    })
  },
}