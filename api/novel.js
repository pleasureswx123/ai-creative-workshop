export default {
  getDub(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/GetDub`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getScreen(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/GetScreenStyle`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTypeface(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/GetTypeface`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getVideoScale(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/GetVideoScale`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getMusic(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/getMusic`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTimeStyle(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/GetTimeStyle`, params, {
      custom: {
        auth: true,
      }
    })
  },
  createTask(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/CreateTask`, params, {
      custom: {
        auth: true,
      }
    })
  },
  articlesSplit(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/ArticlesSplit`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTaskInfo(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/getTaskInfo`, params, {
      custom: {
        auth: true,
      }
    })
  },
  myTaskList(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/MyTaskList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  updateTaskState(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/UpdateTaskState`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getGeneration(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/GetGeneration`, params, {
      custom: {
        auth: true,
      }
    })
  },
  delTask(params = {}) {
    return uni.$u.http.post(`/pc.php/VideoTask/delTask`, params, {
      custom: {
        auth: true,
      }
    })
  },
}