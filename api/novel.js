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
}