# `@aigcui/Describe`

## installation
> 先查看 `@aigcui/entry` 的README.md文档

## Usage

```vue
<template>
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
</template>
```


### 了解详细的用法请参考API文档
[code](https://gitee.com/commercial-literature/aigcui)

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :------ | ------ | ------ | ------ | ------ |
| title | 标题 | string | - | 画面描述词 |
| isShowLanguageBtn | 中英文转换按钮 | boolean | - | false |
| value | 产出的值 | string | - | - |
| maxlength | 可输入的最大长度 | number | - | 1000 |
| placeholder | 暂位符 | string | - | 描述文字以短句、短语为佳，支持中、英文输入 |

### Events

| 事件名称 | 说明 | 默认值 |
| :------ | ------ | ------ |
| update:value | 回调 | - |


