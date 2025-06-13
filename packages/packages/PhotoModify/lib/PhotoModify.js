import PhotoModify from './PhotoModify/PhotoModify.vue'
import PhotoGenerate from './PhotoModify/PhotoGenerate.vue'
import SelectUploadPhoto from './PhotoModify/SelectUploadPhoto.vue'
import PhotoCanvas from './PhotoModify/PhotoCanvas.vue'
import PhotoModifyTool from './PhotoModify/PhotoModifyTool.vue'

const UsePhotoModify = {
  install (Vue, options = {}) {
    Vue.component('PhotoModify', PhotoModify)
    Vue.component('PhotoGenerate', PhotoGenerate)
    Vue.component('SelectUploadPhoto', SelectUploadPhoto)
    Vue.component('PhotoCanvas', PhotoCanvas)
    Vue.component('PhotoModifyTool', PhotoModifyTool)
  }
}

export {
  PhotoModify,
  PhotoGenerate,
  SelectUploadPhoto,
  PhotoCanvas,
  PhotoModifyTool,
  UsePhotoModify as default
}