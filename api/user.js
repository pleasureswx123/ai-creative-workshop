export default {
  login(params) {
    return uni.$u.http.post(`/Login/login`, params, {
      custom: {
        auth: true,
      }
    })
  },
  phonelogin(params) {
    return uni.$u.http.post(`Login/phonelogin`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getJiFenRule(params) {
    return uni.$u.http.post(`/User/JiFenRule`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getMyJiFenDetail(params) {
    return uni.$u.http.post(`/User/MyJiFenDetail`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getMyJiFenRecord(params) {
    return uni.$u.http.post(`/User/MyJiFenRecord`, params, {
      custom: {
        auth: true,
      }
    })
  },
  logout(params) {
    return uni.$u.http.post(`/user/logout`, params, {
      custom: {
        auth: true,
      }
    })
  },
  bindCard(params) {
    return uni.$u.http.post(`/user/bindCard`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getAiDetailsInfo(params) {
    return uni.$u.http.post(`/AiDraw/GetInfo`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getDrawDetailsInfo(params) {
    return uni.$u.http.post(`/DrawTools/GetInfo`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getDigitDetailsInfo(params = {}) {
    return uni.$u.http.post(`/DigitPeople/GetInfo`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getNovelDetailsInfo(params = {}) {
    return uni.$u.http.post(`/VideoTask/GetInfo`, params, {
      custom: {
        auth: true,
      }
    })
  },
  uploadImg({filePath, name = 'image'}) {
    return uni.$u.http.upload(`/upload/image`, {
      fileType: 'image', filePath, name, timeout: 600000,
      custom: {auth: true},
    })
  },
  uploadVideo({filePath, name = 'video'}) {
    return uni.$u.http.upload(`/upload/video`, {
      fileType: 'video', filePath, name, timeout: 600000,
      custom: {auth: true},
    })
  },
  getMyCreation(params = {}) {
    return uni.$u.http.post(`/User/MyCreation`, params, {
      custom: {
        auth: true,
      }
    })
  },
  delCreation(params = {}) {
    return uni.$u.http.post(`/User/DelCreation`, params, {
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
  getUserIntegral(params = {}) {
    return uni.$u.http.post(`/Integral/GetiIntegralNum`, params, {
      custom: {
        auth: true,
      }
    })
  },
  authAndBindWechat(params = {}) {
    return uni.$u.http.post(`/User/authAndBindWechat`, params, {
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
  uploadAudio(params = {}) {
    return uni.$u.http.post(`/upload/audio`, params, {
      custom: {
        auth: true,
      }
    })
  },
}