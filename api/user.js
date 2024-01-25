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
  getRolesList(params = {}) {
    return uni.$u.http.post(`/cosplay/getAllRoles`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getRoleInfo(params = {}) {
    return uni.$u.http.post(`/cosplay/getRole`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getPrompts(params = {}) {
    return uni.$u.http.post(`/write/getPrompts`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getHistoryMsg(params = {}) {
    return uni.$u.http.post(`/chat/getHistoryMsg`, params, {
      custom: {
        auth: true,
      }
    })
  },
  checkLogin(params = {}) {
    return uni.$u.http.post(`/user/checkLogin`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getUserInfo(params = {}) {
    return uni.$u.http.post(`/user/info`, params, {
      custom: {
        auth: true,
      }
    })
  },
  votePrompt(params = {}) {
    return uni.$u.http.post(`/write/votePrompt`, params, {
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