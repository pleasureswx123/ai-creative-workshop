export default {
  getDub(params = {}) {
    return uni.$u.http.post(`https://api.chaojiyuyan.com/pc.php/VideoTask/GetDub`, params, {
      custom: {
        auth: true,
      }
    })
  },
}