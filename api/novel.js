export default {
  getDub(params = {}) {
    return uni.$u.http.post(`/VideoTask/GetDub`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getScreen(params = {}) {
    return uni.$u.http.post(`/VideoTask/GetScreenStyle`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTypeface(params = {}) {
    return uni.$u.http.post(`/VideoTask/GetTypeface`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getVideoScale(params = {}) {
    return uni.$u.http.post(`/VideoTask/GetVideoScale`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getMusic(params = {}) {
    return uni.$u.http.post(`/VideoTask/getMusic`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTimeStyle(params = {}) {
    return uni.$u.http.post(`/VideoTask/GetTimeStyle`, params, {
      custom: {
        auth: true,
      }
    })
  },
  createTask(params = {}) {
    return uni.$u.http.post(`/VideoTask/CreateTask`, params, {
      custom: {
        auth: true,
      }
    })
  },
  articlesSplit(params = {}) {
    return uni.$u.http.post(`/VideoTask/ArticlesSplit`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTaskInfo(params = {}) {
    return uni.$u.http.post(`/VideoTask/getTaskInfo`, params, {
      custom: {
        auth: true,
      }
    })
  },
  myTaskList(params = {}) {
    return uni.$u.http.post(`/VideoTask/MyTaskList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  updateTaskState(params = {}) {
    return uni.$u.http.post(`/VideoTask/UpdateTaskState`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getGeneration(params = {}) {
    return uni.$u.http.post(`/VideoTask/GetGeneration`, params, {
      custom: {
        auth: true,
      }
    })
  },
  delTask(params = {}) {
    return uni.$u.http.post(`/VideoTask/delTask`, params, {
      custom: {
        auth: true,
      }
    })
  },
}