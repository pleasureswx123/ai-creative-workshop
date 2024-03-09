export default {
  dubList(params = {}) {
    return uni.$u.http.post(`/DigitPeople/DubList`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTypeface(params = {}) {
    return uni.$u.http.post(`/DigitPeople/GetTypeface`, params, {
      custom: {
        auth: true,
      }
    })
  },
  confirmTask(params = {}) {
    return uni.$u.http.post(`/DigitPeople/ConfirmTask`, params, {
      custom: {
        auth: true,
      }
    })
  },
}