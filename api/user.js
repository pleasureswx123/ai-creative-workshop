export default {
  getMyCreation(params = {}) {
    return uni.$u.http.get(`/User/MyCreation`, { params,
      custom: {
        auth: true,
      }
    })
  },
  getTopicList(params = {}) {
    return uni.$u.http.post(`/write/getTopicList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getModelList(params = {}) {
    return uni.$u.http.post(`/h5/getSetting`, params, {
      custom: {
        auth: true,
      }
    })
  },
  uploadImg({filePath, name = 'image'}) {
    return uni.$u.http.upload(`/upload/image`, {
      fileType: 'image', filePath, name,
    })
  },
}