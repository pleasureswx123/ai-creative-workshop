export default {
  getToolsList(params = {}) {
    return uni.$u.http.post(`/DrawTools/ToolsList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  createTask(params = {}) {
    return uni.$u.http.post(`/DrawTools/CreateTask`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTaskstate(params = {}) {
    return uni.$u.http.post(`/DrawTools/getTaskstate`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getMaterial(params = {}) {
    return uni.$u.http.post(`/DrawTools/GetMaterial`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTemplate(params = {}) {
    return uni.$u.http.post(`/DrawTools/GetTemplate`, params, {
      custom: {
        auth: true,
      }
    })
  },
}