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
  //录制
  GetRecognitionStr(params = {}) {
    return uni.$u.http.post(`/Dub/GetRecognitionStr`, params, {
      custom: {
        auth: true,
      }
    })
  },
  SubmitRecognitionText(params = {}) {
    return uni.$u.http.post(`/Dub/SubmitRecognitionText`, params, {
      custom: {
        auth: true,
      }
    })
  },
  GetRecognitionText(params = {}) {
    return uni.$u.http.post(`/Dub/GetRecognitionText`, params, {
      custom: {
        auth: true,
      }
    })
  },
  CreateReproduction(params = {}) {
    return uni.$u.http.post(`/Dub/CreateReproduction`, params, {
      custom: {
        auth: true,
      }
    })
  },
  MyReproductionList(params = {}) {
    return uni.$u.http.post(`/Dub/MyReproductionList`, params, {
      custom: {
        auth: true,
      }
    })
  },
}