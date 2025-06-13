# `@aigcui/entry`

> uni h5 项目

## installation

```bash
npm i @aigcui/entry

npm i @aigcui/entry --registry=https://registry.npmjs.org/

```

## 一、Usage

> 在入口文件main.js引入
```js
import aigcui, { requestUtil } from '@aigcui/entry';

Vue.use(aigcui);

const app = new Vue({
  store,
  ...App
});

requestUtil(app)
```

## 二、配置vue.config.js编辑
```js
module.exports = {
  transpileDependencies: ['@aigcui/entry']
}
```

## 在需要的地方引入
```vue
<template>
  <QTabs :value.sync="id" />
  
  <GenerateBtn
      :errorTips="toastTipsErrorTxt"
      :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
  <GenerateBtn :disabled="disabled" @cb="handleGenerate" :loading="generating" :btnInfo="btnInfo" />
  
  
  <MemberVipDesc></MemberVipDesc>
  
  <OrderGoodsList :value.sync="goodsId" :list="goodsList"></OrderGoodsList>
  <OrderGoodsType :type.sync="typeNum" :list="goodsType"></OrderGoodsType>
  
  <PhotoModify :loading="loading" ref="photoTool" @setUrl="url => { reference_image = (url || '') }"></PhotoModify>
  
  <QmAiTypeMenu></QmAiTypeMenu>
  
  <QTabs :value.sync="model_subclass_id" />
  
  <TemplateImageStyle
      title="图片风格 Style（可不选）"
      :params="{}"
      componentName="ImgStyleItem"
      :getList="getImgStyleList"
      :proxyList="item => ({ ...item, id: item.img_style_id, value: 0.8 })"
      :currentInfo.sync="photoStyleInfo"></TemplateImageStyle>
  
  <TemplateImageStyle
      title="图片风格 Style（可不选）"
      :params="{}"
      componentName="ImgStyleItem"
      :getList="getImgStyleList"
      :proxyList="item => ({ ...item, id: item.img_style_id, value: 0.8 })"
      :currentInfo.sync="photoStyleInfo"></TemplateImageStyle>
  
  <TemplateImageStyle
      title="图片风格 Style（可不选）"
      :params="{}"
      componentName="ImgStyleItem"
      :getList="getImgStyleList"
      :proxyList="item => ({ ...item, id: item.img_style_id, value: 0.8 })"
      :currentInfo.sync="photoStyleInfo"></TemplateImageStyle>
  
  <TemplateImageStyle
      :params="{type: 1, task_type: taskType}"
      componentName="ImgStyleItem"
      :getList="getTemplate"
      :proxyList="item => ({ ...item })"
      :currentInfo.sync="templateInfo"></TemplateImageStyle>
  
  <TemplateVideoStyle
      title="选择舞蹈模板"
      :params="{type: 2, task_type: taskType}"
      componentName="TemplateItem"
      :getList="getTemplate"
      :proxyList="item => ({ ...item })"
      :currentInfo.sync="templateExtendInfo"></TemplateVideoStyle>
  
  <WechatPop :value.sync="show" :info="payPopInfo" :type="params.type"></WechatPop>
  
  <QmRatio
      :value.sync="img_scale"
      :list="ImgRatioInfo" />
  
  <Describe :value.sync="prompt"></Describe>
  <Describe
      title="负面描述词"
      :maxlength="1000"
      :isShowLanguageBtn="false"
      placeholder="输入不希望在画面中看见的内容，越靠前作用越明显"
      :value.sync="negative_prompt" />
  <Describe
      title="画面描述词"
      :maxlength="maxlength"
      placeholder="请输入描述文字以短句、短语为佳，支持中、英文输入"
      :value.sync="description" />
  <Describe
      title="描述您的视频场景"
      :isShowLanguageBtn="false"
      placeholder="一个女孩，粉色短发，黑色短袖，黑色短裤，霓虹背景"
      :value.sync="prompt"></Describe>
  <Describe
      title="输入不希望出现的内容描述（可不填）"
      :isShowLanguageBtn="false"
      placeholder="可以不填写"
      :value.sync="prompt_extend"></Describe>
  
  <ProduceBtn
      :pieces="pieces"
      :taskType="task_type"
      :value.sync="batch_size"
      :loading="loading"
      @cb="handle28Comfirm"></ProduceBtn>
  
  <ProduceBtn
      :pieces="pieces"
      :taskType="task_type"
      :value.sync="batch_size"
      :loading="loading29"
      @cb="handle29Comfirm"></ProduceBtn>
  
  <ProduceBtn
      :isShowPieces="[1,2].includes(modeId)"
      taskType="1"
      :value.sync="picNums"
      :loading="generateStatus"
      @cb="startGenerate"></ProduceBtn>
  
  <Statement />

  
  
</template>
```




