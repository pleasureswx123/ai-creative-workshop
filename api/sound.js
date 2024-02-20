export default {
  getDubList(params = {}) {
    return uni.$u.http.post(`/dub/DubList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  createTask(params = {}) {
    return uni.$u.http.post(`/Dub/CreateTask`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTaskstate(params = {}) {
    return uni.$u.http.post(`/Dub/getTaskstate`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTaskList(params = {}) {
    return uni.$u.http.post(`/Dub/getTaskList`, params, {
      custom: {
        auth: true,
      }
    })
  },
}