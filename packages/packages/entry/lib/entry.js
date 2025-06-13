import requestUtil from '@aigcui/request'
import UseQTabs, { QTabs } from '@aigcui/qtabs'
import UseQmAiTypeMenu, { QmAiTypeMenu } from '@aigcui/qmaitypemenu'
import UseOrderGoodsList, { OrderGoodsList } from '@aigcui/ordergoodslist'
import UseTemplateImageStyle, { TemplateImageStyle } from '@aigcui/templateimagestyle'
import UseTemplateVideoStyle, { TemplateVideoStyle } from '@aigcui/templatevideostyle'
import UseWechatPop, { WechatPop } from '@aigcui/wechatpop'
import UseMemberVipDesc, { MemberVipDesc } from '@aigcui/membervipdesc'
import UseOrderGoodsType, { OrderGoodsType } from '@aigcui/ordergoodstype'
import UseGenerateBtn, { GenerateBtn } from '@aigcui/generatebtn'
import UsePhotoModify, {PhotoModify, PhotoGenerate, SelectUploadPhoto, PhotoCanvas, PhotoModifyTool,} from '@aigcui/photomodify'
import UseQmRatio, { QmRatio } from '@aigcui/qmratio'
import UseDescribe, { Describe } from '@aigcui/describe'
import UseProduceBtn, { ProduceBtn, SelectPageNums } from '@aigcui/producebtn'
import UseStatement, { Statement } from '@aigcui/statement'

const install = {
  install (Vue, options = {}) {
    Vue.use(UseQTabs)
      .use(UseQmAiTypeMenu)
      .use(UseOrderGoodsList)
      .use(UseTemplateImageStyle)
      .use(UseTemplateVideoStyle)
      .use(UseWechatPop)
      .use(UseMemberVipDesc)
      .use(UseOrderGoodsType)
      .use(UseGenerateBtn)
      .use(UsePhotoModify)
      .use(UseQmRatio)
      .use(UseDescribe)
      .use(UseProduceBtn)
      .use(UseStatement)
  }
}

export {
  requestUtil,
  QTabs,
  QmAiTypeMenu,
  OrderGoodsList,
  TemplateImageStyle,
  TemplateVideoStyle,
  WechatPop,
  MemberVipDesc,
  OrderGoodsType,
  GenerateBtn,
  PhotoModify,
  PhotoGenerate,
  SelectUploadPhoto,
  PhotoCanvas,
  PhotoModifyTool,
  QmRatio,
  Describe,
  ProduceBtn,
  SelectPageNums,
  Statement,
  install as default
}
