柳钢框架前端开发指南系列
===========
# （三）主框架概览、前端工程化介绍
    2018-12-17
    赵中廷
> 前言：
本部分从头开始介绍主框架的结构、各目录的作用及各部分涉及的技术栈。虽然有可能开发时不涉及主框架的更改，但是这些技术对于开发子页面及调试也是必须的。
>

## 一、框架的目录结构

从git上下载主框架文件后，

    ├── README.md ——一个项目自带的说明文件
    ├── build  ——使用webpack构造项目所用的各类配置文件
    │   ├── build.js ——使用npm run build时所运行的主要脚本
    │   ├── check-versions.js ——检查这个项目各个依赖包的版本是否符合规定
    │   ├── dev-client.js 
    │   ├── dev-server.js  ——使用npm run dev时所运行的脚本
    │   ├── utils.js ——使用各类webpack脚本调用的方法集合，包括多入口出口
    │   ├── vue-loader.conf.js ——单独的webpack vue文件解析配置
    │   ├── webpack.base.conf.js ——基础的webpack构造配置
    │   ├── webpack.dev.conf.js ——用于配置dev环境的webpack配置
    │   └── webpack.prod.conf.js ——用于配置生成项的webpack配置
    ├── config  
    │   ├── dev.env.js
    │   ├── index.js ——该工程的一些全局配置项
    │   └── prod.env.js
    ├── dist ——该工程的输出目录，这个目录下的文件即为最后编辑成果
    ├── src ——主要源代码包
    │   ├── assets ——将会被打包进chunk的一些资源，如果放在static内不打包
    │   ├── components——存储各个组件的目录
    │   ├── pages—— 扫描并建立多入口文件的目录
    │   ├── utils——某些各插件共用的函数库
    │   │    ├──axios_rebase.js —— 经过封装的axios，用于在请求的头部附带token信息
    │   │    └──tree_convert.js —— 封装的列————树转换程序，用于转换列表成为树状的结构
	│   ├── views—— 存放业务类的components，区别于上面的components文件夹，该文件夹存储的多为实际的业务逻辑
	│   └── global_config.js —— 存储工程中各类配置及api的文件。也有单独将各类api存放于/src/api文件夹中封装为实例的形式。
    ├── global_config ——该工程所有依赖包及一些属性的声明文件
    ├── static ——静态资源目录
    │   ├── doc —— 存放项目说明文件md的目录
	│   ├── lg-icon —— 存放该ui自有的图标库
	│   ├── moon-icon —— 存放一个完整的外来图标库
	├── .babelrc —— 存放该工程的babel编译信息	   
	├── .eslintrc.js —— 存放该工程的eslint代码检查规则（我在里面将规范改为与prettier的规则几乎一致，另外将error变为warning)
	├── .gitignore —— 存放git仓库忽略文件的规则 
	├── .prettierrc —— 存放用prettier进行 
	├── favicon.ico —— 该项目的应用图标
	├── README-zh.md ——存放项目的主介绍文件
	└── package.json —— 存储工程的各依赖包项目

## 二、前端工程化介绍

虽然前端技术飞快发展，但是前端整体的工程生态并没有同步跟进。目前绝大多数的前端团队仍然使用非常原始的“切图（FE）->套模板（RD）”的开发模式，这种模式下的前端开发虽说不是刀耕火种的原始状态，但是效率非常低下。
如果说计算机科学要解决的是系统的某个具体问题，或者更通俗点说是面向编码的，那么工程化要解决的是如何提高整个系统生产效率。
具体到前端工程化，面临的问题是如何提高编码->测试->维护阶段的生产效率。

为了完成以上目标，我们将从传统的前后端结合的开发模式，通过一系列规范与工具，进化到前后端分离、前端工程化的开发模式。

![](/static/doc/intro3/pic/3.png)

### 2.1 代码规范
  使用ESLINT进行代码规范，prettier进行代码格式化。
### 2.2 分支管理
  使用git进行分支管理，建议使用标准的git-flow流程进行分工合作。关于git-flow及git的详细信息，可以参看我们git中的：
  [GitLabGuide](http://172.16.4.191:3000/80822215/GitLabGuide.git)


### 2.3 模块化

前面我们提到在组织代码的时候会用到模块化和组件化,大家应该理解到,前端工程化是一个高层次的思想,而模块化和组件化是为工程化思想下相对较具体的开发方式,因此可以简单的认为模块化和组件化是工程化的表现形式。

那具体什么是模块化呢,还是举简单的例子,我们要写一个实现A功能的JS代码,这个功能在项目其他位置也需要用到,那么我们就可以把这个功能看成一个模块采用一定的方式进行模块化编写,既能实现复用还可以分而治之,同理在写样式的时候,如果我们需要某种特殊的样式,会在很多地方应用,那么我们也可以采用一定的方式进行CSS的模块化,具体说来,JS模块化方案很多,有AMD/CommonJS/UMD/ES6 Module 等,CSS模块化开发大多是在less、sass、stylus等预处理器的import/mixin特性支持下实现的。

#### 2.3.1 CommonJS 

CommonJS就是一个JavaScript模块化的规范，该规范最初是用在服务器端的node的，前端的webpack也是对CommonJS原生支持的。
根据这个规范，每一个文件就是一个模块，其内部定义的变量是属于这个模块的，不会对外暴露，也就是说不会污染全局变量。
**CommonJS的核心思想就是通过 require 方法来同步加载所要依赖的其他模块，然后通过 exports 或者 module.exports 来导出需要暴露的接口。**
如下所示：

```javascript
// a.js
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
```

这里的a.js就是一个CommonJS规范的模块了。 这里的module就代表了这个模块，module的exports属性就是对外暴露的接口，可以对外导出外部可以访问的变量，比如这里的x和addX。


exports 是对 module.exports 的引用。比如我们可以认为在一个模块的顶部有这句代码：

exports = module.exports

所以，我们不能直接给exports赋值，比如number、function等。

**然后我们就可以在其他模块中引入这个模块使用了：**

```javascript
var a = require('./a.js');
console.log(example.x); // 5
console.log(example.addX(1)); // 6
```


+ 所有代码都运行在模块作用域，不会污染全局作用域；模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果；模块的加载顺序，按照代码的出现顺序是同步加载的;
+ __dirname代表当前模块文件所在的文件夹路径，__filename代表当前模块文件所在的文件夹路径+文件名;
+ require（同步加载）基本功能：读取并执行一个JS文件，然后返回该模块的exports对象，如果没有发现指定模块会报错;
+ 模块内的exports：为了方便，node为每个模块提供一个exports变量，其指向module.exports，相当于在模块头部加了这句话：var exports = module.exports，在对外输出时，可以给exports对象添加方法，PS：不能直接赋值（因为这样就切断了exports和module.exports的联系）;

#### 2.3.2 ES6 Module

 在ES6中，我们可以使用 import 关键字引入模块，通过 export 关键字导出模块，功能较之于前几个方案更为强大，也是我们所推崇的，但是由于ES6目前无法在浏览器中执行，所以，我们只能通过babel将不被支持的import编译为当前受到广泛支持的 require。
虽然目前import和require的区别不大，但是还是推荐使用使用es6，因为未来es6必定是主流，对于代码的迁移成本还是非常容易的。
##### 与require的区别：
+ Module在编译时就确定各模块的依赖关系，而不是在运行时加载。
+ 使用"[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)"，减少编码错误及阅读障碍
+ 不需要定义命名空间，加载的模块就是命名空间


##### export&&import
在文件中，使用export规定该文件的对外输出接口，除了export的部分均不往外输出。

输出示例：
```javascript
//————————require示例————————————
//——————————a.js
var c={
  //c就是命名空间
  a,b
}
//函数
var a=function(){
  return "this is function"
}
//b是类
var b={
  param:"aa",
}
//输出c
module.export=c;
//————————b.js
var c_module=require("./a.js");
//c_module就是引用的命名空间
console.log(c_module.a());
console.log(c_module.b.param);
```
```javascript
//————————require示例————————————
//——————————a.js
//a文件本身就是命名空间
export var b={
  //直接输出b
 param:"aa",
}
export var a=function(){
  return "this is function"
}
//————————b.js
import {a,b} from "./a.js";
//c_module就是引用的命名空间
console.log(.a());
console.log(b.param);
```
具体语法可参照[ES6 Module](http://es6.ruanyifeng.com/#docs/module)

### 2.4 组件化

组件化并不是前端所特有的，一些其他的语言或者桌面程序等，都具有组件化的先例。确切的说，只要有UI层的展示，就必定有可以组件化的地方。简单来说，组件就是将一段UI样式和其对应的功能作为独立的整体去看待，无论这个整体放在哪里去使用，它都具有一样的功能和样式，从而实现复用，这种整体化的细想就是组件化。不难看出，组件化设计就是为了增加复用性，灵活性，提高系统设计，从而提高开发效率。

组件化是在设计层面上，对于UI的拆分。页面上所有的东西都可以看成组件，页面是个大型组件，可以拆成若干个中型组件，然后中型组件还可以再拆，拆成若干个小型组件，小型组件也可以再拆，直到拆成DOM元素为止。DOM元素可以看成是浏览器自身的组件，作为组件的基本单元。

![](/static/doc/intro3/pic/components.png)

在vue的开发中，可以用逐层分治的模式把一个完整的工程分治为一个个页面，来简化开发难度，增加复用性
![](/static/doc/intro3/pic/4.png)

### 2.5 构建
我们采用的构建工具是webpack。webpack可以将模块化分散的各个.vue文件，.js文件以chunks的方式整合生成一个整体的js文件，我们发布的时候只需要将整合好的js发布到产品环境即可。
![](/static/doc/intro3/pic/5.png)
详细的webpack打包性质我们将在下篇介绍，现在只需要知道使用Module及.vue工程化开发的文件不经过打包是无法真正显示为页面的。

### 2.6 在线测试
利用webpack的webpack-dev-server功能，我们可以实现所见即所得的测试效果，也就是我们所谓的
```
npm run dev
```
当你修改了文件并保存后，就可以直接在浏览器中看到修改的效果，甚至不需要刷新网页。比起每次修改均需要重新编译整个项目的旧有前后结合模式，极大提高了效率

### 2.7 部署
前面已经介绍了使用nginx部署前端构建后文件的形式。同时我们可以结合git-flow的功能， 使修改——部署上线周期极大缩短，达到热部署的效果。
