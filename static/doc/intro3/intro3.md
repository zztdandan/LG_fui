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

相比较已经非常成熟的其他领域，前端虽是后起之秀，但其野蛮生长是其他领域不能比的。虽然前端技术飞快发展，但是前端整体的工程生态并没有同步跟进。目前绝大多数的前端团队仍然使用非常原始的“切图（FE）->套模板（RD）”的开发模式，这种模式下的前端开发虽说不是刀耕火种的原始状态，但是效率非常低下。

如果说计算机科学要解决的是系统的某个具体问题，或者更通俗点说是面向编码的，那么工程化要解决的是如何提高整个系统生产效率。
具体到前端工程化，面临的问题是如何提高编码->测试->维护阶段的生产效率。

为了完成以上目标，我们将从传统的SSR（服务端渲染）、前后端结合的开发模式，通过一系列规范与工作，进化到前后端分离、前端工程化的开发模式。

### 2.1 模块化

前面我们提到在组织代码的时候会用到模块化和组件化,大家应该理解到,前端工程化是一个高层次的思想,而模块化和组件化是为工程化思想下相对较具体的开发方式,因此可以简单的认为模块化和组件化是工程化的表现形式。

那具体什么是模块化呢,还是举简单的例子,我们要写一个实现A功能的JS代码,这个功能在项目其他位置也需要用到,那么我们就可以把这个功能看成一个模块采用一定的方式进行模块化编写,既能实现复用还可以分而治之,同理在写样式的时候,如果我们需要某种特殊的样式,会在很多地方应用,那么我们也可以采用一定的方式进行CSS的模块化,具体说来,JS模块化方案很多,有AMD/CommonJS/UMD/ES6 Module 等,CSS模块化开发大多是在less、sass、stylus等预处理器的import/mixin特性支持下实现的。

#### 2.1.1 CommonJS 



### 2.2 组件化

组件化并不是前端所特有的，一些其他的语言或者桌面程序等，都具有组件化的先例。确切的说，只要有UI层的展示，就必定有可以组件化的地方。简单来说，组件就是将一段UI样式和其对应的功能作为独立的整体去看待，无论这个整体放在哪里去使用，它都具有一样的功能和样式，从而实现复用，这种整体化的细想就是组件化。不难看出，组件化设计就是为了增加复用性，灵活性，提高系统设计，从而提高开发效率。

组件化是在设计层面上，对于UI的拆分。页面上所有的东西都可以看成组件，页面是个大型组件，可以拆成若干个中型组件，然后中型组件还可以再拆，拆成若干个小型组件，小型组件也可以再拆，直到拆成DOM元素为止。DOM元素可以看成是浏览器自身的组件，作为组件的基本单元。

![](/static/doc/intro3/pic/components.png)


柳钢前端框架结构图如下

<img style="width:1000px!important;    max-width:100% !important;" src='/static/doc/intro2/pic/svg1.svg'/>

## 三、各开发模式区别：

|各项特征|	在主框架主页面开发|	在主框架多页面开发|	在其他外链页面开发|
| --- | --- | --- |---|
|开发特征|	具有传统SPA开发的特征，使用完整的一套开发组件与包	|MPA开发特征，使用与主页面共享的一套开发组件与包。	|自选技术栈，较自由的开发模式|
|开发组件共享|	与主框架完全使用同样组件|	与主框架基本使用同样组件，在pages里面的组件不共享|	与主框架使用不同技术栈|
|资源共享	|可调用主框架的vuex|	用postmessage方式交互	|用postmessage方式交互|
|git	|如果主框架升级，需要合并大量代码并解决冲突|	如果主框架升级，需要合并极少的代码（个别配置文件），基本无冲突	|与主框架无关，不需要合并代码，主框架可以随时升级|
|资源加载|	所有资源打包在主项目的index.js中，较大	|主项目与分支项目打包不同的js但是共享第三方资源比如element-ui	|与主页面的资源分开加载，不共同使用|
|推荐	|单人维护前端项目时使用	|<=2人开发前端项目时使用	|多人同时负责前端项目，或没有专门前端开发人员时使用|

## 四、登陆、目录及postmessage
### 4.1	登陆
框架采用post方式登陆，在登陆后将返回的token存入主框架的vuex与cookie的相应字段中（而不是localstorage中）。关于字段的设置在src/global_config.js里面，还有登陆时api请求地址的设置也在其中（Auth. LoginPostUrl）。

如果主框架已经成功登陆，在打开每一个子页面时，会在uri后面增加[token]这个参数(这个参数的名称存储于global_config.Auth.UserTokenName字段中，这个参数的值是登陆时获得的token值)，所以主页面登陆时，所有打开的子页面都会获得主页面的登陆信息。

各页面可向主框架请求登陆后的信息（使用postmessage的方式）。

### 4.2	目录

框架的目录从api中读取，配置在src/global_config.js中，读取的目录结构是Array形式，具体可参考rap2中的配置。
当完成一个单独页面并挂上服务器后，在框架的api的位置上挂载这个页面的网址并设置CORS[注1]

### 4.3	PostMessage
#### 4.3.1 介绍

PostMessage是目前较好的解决窗口间交互的数据交流方式，属于HTML5自带的window函数。每个window都会自带该函数。
发送postmessage到母窗口可以触发在主框架预先写好的函数，使主框架返回相应的数据或做出操作，如改变窗口高度，关闭该tab，获得user信息等。
下面是一个简单的函数实例：
```
  let params = { iframe_name: "iframe_test", iframe_height: hgt };
            window.parent.postMessage(
                { type: "simple", req_name: "setIframeHeight", req_param: params },
                "*"
            );
```

#### 4.3.2 接口API

目前框架已经开放的postMessage接口有如下的几个，后续将会逐步添加:

|函数名|函数意义|参数及解释|
|---|---|---|
|setIframeHeight|设置该子页面的高度（避免出现两个滚动条）|iframe_name:该子页面的名称 <br>iframe_height:需要设置的高度|
|closeIframe|关闭指定名称的这个子页面|name:这个子页面的名称<br>**说明**：一般情况下用于关闭发出命令的这个子页面|
|getUserInfo|用token向框架请求user信息|token:框架登陆时的token(详见4.1 的说明)<br>**说明**:由于postMessage不支持交互命令，所以这个命令的执行需要特殊手段达成<br>**回调信息**:{<br>code:表示是否成功，<br>salt:表示该请求的salt,<br>data:{<br>msg:请求结果的详细说明,<br>user_info:如果请求是成功的，则这里会有用户信息，如果不成功没有该项<br>}<br>}|
|openNewPage|命令框架打开新的页面|code:新页面的code<br>**说明**：关于code的值可以使用下面的getMenu命令从框架处获得。该code的值就是设置主框架目录的code值(如果该code值代表的不是实际页面而是根目录，那么该postmessage命令无效))|
|getMenu|获得框架的目录列表|参数:无<br>**说明**:该命令获得的目录就是框架通过api向服务请求的目录Array。由于postMessage不支持交互命令，所以这个命令的执行需要特殊手段达成<br>**回调信息**:{<br>code:表示是否成功，<br>salt:表示该请求的salt,<br>data:如果请求成功，这里会有目录列表，如果不成功不会有该项<br>}|

#### 4.3.4 postMessage交互
由于postMessage不是一个promise回调函数，所以理论上无法在发送后指定地获得任何回传信息。但是我们可以手动地制作一个回调机制。
我们在框架内规定了一个salt参数，当postMessage发送请求时，框架接收到salt参数后会将这个参数原样返回，这样当子页面接收到同样的salt参数，就知道这个信息是其发送的某个请求的回调了。下面的实例中会有类似的样例可供参考

#### 4.3.5 各接口实例：
```
//setIframeHeight
//---------------------------------------------
  let hgt = window.document.body.scrollHeight + 17;
      // console.log("获得token信息", window.parent.document.body);
      let ifr_name=this.$route.name;
      let params = { iframe_name: ifr_name, iframe_height: hgt };
     
      window.parent.postMessage({ type: "simple", req_name: "setIframeHeight", req_param: params }, "*");
```

```
//closeIframe
//---------------------------------------------
  let params = { name: "test" };
        window.parent.postMessage(
          { type: "simple", req_name: "closeIframe", req_param: params },
          "*"
        );
```

```
//getUserInfo
//--------------------------------------------

//----------------下面是接收的函数-------------
  window.addEventListener("message", function(rs) {
        // console.log(rs);
        try {
          console.log("test回调", rs);
          if(rs.data.salt=="user_infoaxxx"){
              //通过同样的salt来确定是否为回调的信息
            if(rs.data.code==0){
                //通过回调信息的code判断框架应答程序的运行结果
              consol.log("获取成功");
              
              this.user_info=rs.data.data.user_info;
              //储存应答程序回传的user_info信息
          }
          }
          
        } catch (e) {}
        // 单独引入一个函数，进行rs.data的处理
      });
///----------------接收函数END-----------------
//----------------下面是发送的函数--------------

        let params = {token:"aassffssxx"};
      window.parent.postMessage(
        { type: "simple", req_name: "getUserInfo", req_param: params, salt: "user_infoaxxx" },
        "*"
      );
```

```
//openNewPage
//---------------------------------------------
 let params = { code: "intro1" };
        window.parent.postMessage(
          { type: "simple", req_name: "closeIframe", req_param: params },
          "*"
        );
```

```
//getMenu
//---------------------------------------------

//----------------下面是接收的函数-------------
  window.addEventListener("message", function(rs) {
        // console.log(rs);
        try {
          console.log("test回调", rs);
          if(rs.data.salt=="aassfff"){
              //通过同样的salt来确定是否为回调的信息
            if(rs.data.code==0){
                //通过回调信息的code判断框架应答程序的运行结果
              consol.log("获取成功");
              
              this.menu=rs.data.data;
              //储存应答程序回传的menu信息
          }
          }
          
        } catch (e) {}
        // 单独引入一个函数，进行rs.data的处理
      });
///----------------接收函数END-----------------
//----------------下面是发送的函数--------------

        let params = { };
      window.parent.postMessage(
        { type: "simple", req_name: "getMenu", req_param: params, salt: "aassfff" },
        "*"
      );
```