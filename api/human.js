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
  createTask(params = {}) {
    return uni.$u.http.post(`/DigitPeople/CreateTask`, params, {
      custom: {
        auth: true,
      }
    })
  },
  getTaskstate(params = {}) {
    return uni.$u.http.post(`/DigitPeople/getTaskstate`, params, {
      custom: {
        auth: true,
      }
    })
  },
  GetMaterial(params = {}) {
    return uni.$u.http.post(`/DrawTools/GetMaterial`, params, {
      custom: {
        auth: true,
      }
    })
  },
}