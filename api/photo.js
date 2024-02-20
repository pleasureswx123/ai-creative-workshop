export default {
  getModelStyleList(params = {}) {
    return uni.$u.http.post(`/AiDraw/ModelStyleList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getLoraList(params = {}) {
    return uni.$u.http.post(`/AiDraw/LoraList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getImgStyleList(params = {}) {
    return uni.$u.http.post(`/AiDraw/ImgStyleList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getHistoryList(params = {}) {
    return uni.$u.http.post(`/AiDraw/getHistory`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getQueue(params = {}) {
    return uni.$u.http.post(`/AiDraw/GetQueue`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getModelClass(params = {}) {
    return uni.$u.http.post(`/AiDraw/ModelClass`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getImgScale(params = {}) {
    return uni.$u.http.post(`/AiDraw/GetImgScale`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getSameModel(params = {}) {
    return uni.$u.http.post(`/AiDraw/GetSameModel`, params, {
      custom: {
        auth: true,
      }
    })
  },
  createTask(params = {}) {
    return uni.$u.http.post(`/AiDraw/CreateTask`, params, {
      custom: {
        auth: true,
      }
    })
  },
}