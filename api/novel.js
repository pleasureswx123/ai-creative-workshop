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
}