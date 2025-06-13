## ui

### step1
```bash
lerna create @aigcui/test
```

### step2
在lib目录下创建src目录，并创建`index.vue`文件
```bash
components/test/test.vue
```

### step3
修改lib下的入口js文件，examples:

```js
import Describe from './Describe/Describe.vue'

const UseDescribe = {
  install (Vue, options = {}) {
    Vue.component('Describe', Describe)
  }
}

export {
  Describe,
  UseDescribe as default
}
```

### step4
在@aigcui/entry入口`lib/entry.js`处引入，examples:
```js
import requestUtil from '@aigcui/request'
import UseQTabs, { QTabs } from '@aigcui/qtabs'
import UseQmAiTypeMenu, { QmAiTypeMenu } from '@aigcui/qmaitypemenu'
import UseOrderGoodsList, { OrderGoodsList } from '@aigcui/ordergoodslist'

const install = {
  install (Vue, options = {}) {
    Vue.use(UseQTabs)
      .use(UseQmAiTypeMenu)
      .use(UseOrderGoodsList);
  }
}

export {
  requestUtil,
  QTabs,
  QmAiTypeMenu,
  OrderGoodsList,
  install as default
}
```

### step5
> 为@aigcui/entry增加依赖
```bash
pnpm install @aigcui/ordergoodslist -w @aigcui/entry
```
> entry下的package.json文件中增加`dependencies`，examples:
```json
{
  "dependencies": {
    "@aigcui/qmaitypemenu": "workspace:^",
    "@aigcui/qtabs": "workspace:^",
    "@aigcui/request": "workspace:^",
    "@aigcui/ordergoodslist": "workspace:^",
    ......
  }
}
```

### step6
> 修改 entry 的README.md，增加引入示例

### step7
> 提交代码
> [code](https://gitee.com/commercial-literature/aigcui.git)
```gitexclude
git add -A
git cz
git push origin master:master
```

### step8
> 确保本地修改的代码都已提交到master后，再发布
```bash
lerna publish
// 出现这种情况视为发布成功
Successfully published:
 - @aigcui/entry@0.0.6
 - @aigcui/ordergoodslist@0.0.6
 - @aigcui/qmaitypemenu@0.0.6
 - @aigcui/qtabs@0.0.6
 - @aigcui/request@0.0.6
lerna success published 5 packages
```

### step9
> 更新项目的@aigcui/entry包的版本
> 1、可以先删除 package.json `dependencies中的` "@aigcui/entry": "^0.0.5"这一行
> 2、执行  `pnpm add @aigcui/entry` ，这样就保证是最新的版本了
> 3、安装成功之后，再执行一下 `yarn install` `npm i` `cnpm i`  `pnpm i` ；再重新hBuilderX再重新编译一下，不报错就OK了
> 4、一定要仔细查看 node_modules 下的 @aigcui/entry 及其依赖的版本都发生了变化，否则可能会还是旧的














