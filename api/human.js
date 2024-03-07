export default {
  dubList(params = {}) {
    return uni.$u.http.post(`/DigitPeople/DubList`, params, {
      custom: {
        auth: true,
      }
    })
  },
}