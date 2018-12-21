# 快速上手

----

## 使用前准备

`lg-vue-ui` 基于 `ElementUI` 2.x+ 版本二次开发，封装了一些我们经常使用的控件，便于前端开发使用。<font color=red>在使用`lg-vue-ui`前需要先安装和引入`ElementUI`</font>，使用这两个UI框架包会有助于我们快速开发统一风格的前端页面。

`ElementUI`是我们推荐使用的UI框架包，所以有必要了解`ElementUI`使用：- [ElementUI 组件](http://element.eleme.io/#/zh-CN/component/installation)

## 使用 npm 安装
推荐使用 npm 的方式进行开发，享受 node 生态圈和 webpack 工具链带来的便利。通过 npm 安装的模块包，我们可以轻松的使用 import 或者 require 的方式引用

```bash
npm i lg-vue-ui -S
```

## 引入 lg-vue-ui

你可以引入整个 lg-vue-ui，或是根据需要仅引入部分组件。我们先介绍如何引入完整的 lg-vue-ui。

### 完整引入

在项目的入口文件（如 main.js）中写入以下内容：

```js
import LgUI from 'lg-vue-ui' // 引入组件库
import 'lg-vue-ui/lib/theme/index.css' // 引入样式库

Vue.use(LgUI)
```

以上代码便完成了 lg-vue-ui 的引入。需要注意的是，样式文件需要单独引入。

### 按需引入

借助 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，我们可以只引入需要的组件，以达到减小项目体积的目的。该插件是ant官方开发的。许多 UI 组件库的按需引入也是依赖于这个插件。

首先，安装 babel-plugin-import：

```bash
npm i babel-plugin-import -D
```

然后，将 .babelrc 修改为：

```json
  "plugins": [
    ["import", {
      "libraryName": "lg-vue-ui"
    }]
  ]
```

接下来，如果你只希望引入部分组件，比如 LgImportExcel 和 LgExportExcel，那么需要在入口文件（如 main.js）中写入以下内容：

```javascript
import { LgImportExcel, LgExportExcel } from 'lg-vue-ui' // 引入组件库
import 'lg-vue-ui/lib/theme/index.css' // 引入样式库

Vue.use(LgImportExcel)
Vue.use(LgExportExcel)
```

## 开始使用

至此，`lg-vue-ui`的安装搭建已完毕，现在就可以编写代码了。各个组件的使用方法请参阅组件介绍。