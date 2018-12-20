柳钢框架前端开发指南系列
===========
#（一）基础vue框架搭建及HelloWorld

    2018-12-05
    赵中廷


> 前言：这是一个 极简的 vue admin 管理后台 它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。在一般情况下，你不需要明白如何开发及改造lg前端框架，因为它是挂载式的。你只需要上线自己的前端页面，并注册到前端框架即可。
更多的框架介绍在下一节讲解
>

## 一、开发环境搭建



下面将介绍从0开始在windows下直到打开vue-helloworld的过程。


### &emsp;1.1	NodeJs&Npm
nodejs是vue的Runtime SDK,是一个基于Chromev8 JavaScript 运行时建立的一个平台， 用来方便地搭建快速的， 易于扩展的网络应用· Node.js 借助事件驱动， 非阻塞 I/O 模型变得轻量和高效。
npm是一个方便的包管理器（等同于 \.NET Nuget，Maven），我们需要用他来安装各种依赖包。

### &emsp;1.2 Git
我们需要用git来管理版本，或下载、更新柳钢前端框架
安装地址：
[git官网下载](https://git-scm.com/download/win)

注释：可在git官网下载git的各种gui，或者按照官网教程使用命令行操作


### &emsp;1.3 IDE
建议使用：VisualStudio Code ,SublimeText,Atom,WebStorm。本人使用的是VS Code，但是各个编辑器其实只有代码渲染上的差别，实际执行程序并无差别。
## 二、工程环境搭建及工程建立
### &emsp;2.1 part1	安装vue-cli,webpack全局包
这两个包是用于在你想自己新建工程（而不是使用我们提供的一个基础包）时新建工程所用。
+ 检查npm 及 node版本（确认是否安装成功）

打开cmd， 使用命令：
```
node -v
```
```
npm –v
```

![查询结果图片](/static/doc/intro1/pic/1.png)

当版本号显示完全，说明安装成功，否则重新安装node。
（注意，在VSCode里面，可以在IDE里面打开控制台，如果使用VSCode推荐这个方式）

![vscode控制台](/static/doc/intro1/pic/2.png)

注意，在无法使用vpn链接国际网络时，有可能npm的安装会有一些包无法获取，可以使用cnpm命令代替npm进行下面所有install的命令。在此之前安装cnpm命令包
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
+ 确认管理程序和SDK安装完成后，使用npm install –g命令进行全局包的安装

```
npm install webpack -g或者（npm install -g webpack），
```
安装完成之后输入 webpack -v，如果出现相应的版本号，则说明安装成功。
注意：webpack 4.X 开始，需要安装 webpack-cli 依赖 ,所以使用这条命令
```
npm install webpack webpack-cli –g
```
+ 安装vue-cli

```
npm install --global vue-cli
```

![vscode控制台](/static/doc/intro1/pic/3.png)

安装完成后查看vue版本号确认全局安装完成(<font color=red size=3>注意大写</font>)
```
vue –V
```
+ 使用vue-cli来构造项目

```
vue init webpack [项目名称]
```
下面是使用命令后出现的一系列选项：
>+ Project name ()： -----项目名称，直接回车，按照括号中默认名字（注意这里的名字不能有大写字母，如果有会报错Sorry, name can no longer contain capital letters），阮一峰老师博客为什么文件名要小写 ，可以参考一下。
>+ Project description (A Vue.js project)： ----项目描述，也可直接点击回车，使用默认名字
>+ Author ()： ----作者，输入你的大名
接下来会让用户选择：
>+ Runtime + Compiler: recommended for most users 运行加编译，既然已经说了推荐，就选它了
Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specificHTML) are ONLY allowed in .vue files - render functions are required elsewhere 仅运行时，已经有推荐了就选择第一个了
>+ Install vue-router? (Y/n) 是否安装vue-router，这是官方的路由，大多数情况下都使用，这里就输入“y”后回车即可。
>+ Use ESLint to lint your code? (Y/n) 是否使用ESLint管理代码，这个选项会安装ESlint到项目包中，视乎你的IDE是否使用。VSCode推荐安装 
>+ Setup unit tests with Karma + Mocha? (Y/n) 是否安装单元测试，no
>+ Setup e2e tests with Nightwatch(Y/n)? 是否安装e2e测试 ，no 

+ 接下来进入项目目录（package.json所在目录），使用：

```
npm install
```
安装该项目应有的所有依赖

使用：
```
npm run dev
```
启动一个单页面应用(SPA)的helloworld

![](/static/doc/intro1/pic/4.png)
![](/static/doc/intro1/pic/5.png)

### &emsp;2.2 part2	使用配置好的工程文件搭建MPA架构应用
+ 下载工程文件夹

我们可以用git下载一个mpa已经搭建好的框架。目前我们的git上面有这个框架:
[在柳钢网络环境下打开此地址](http://172.16.4.191:3000/80822215/multiple-vue.git)
也可以到github下下载这个框架：
[在github上下载](https://github.com/zztdandan/multiple-vue-page.git)
使用clone命令下载
```
git clone http://172.16.4.191:3000/80822215/multiple-vue.git
```
下载后进入项目。下面是一个mpa目录的项目文件结构及说明

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
    ├── package.json ——该工程所有依赖包及一些属性的声明文件
    ├── src ——主要源代码包
    │   ├── assets ——将会被打包进chunk的一些资源，如果放在static内不打包
    │   │   └── logo.png
    │   ├── components——存储各个组件的目录
    │   │   ├── Hello.vue
    │   │   └── cell.vue
    │   └── pages——扫描并建立多入口文件的目录 [注1]
    │       ├── cell ——第二个页面的html模版、js、vue文件
    │       │   ├── cell.html
    │       │   ├── cell.js
    │       │   └── cell.vue
    │       └── index ——第一个页面的html模版、js、vue文件
    │           ├── index.html
    │           ├── index.js
    │           ├── index.vue
    │           └── router
    │               └── index.js
    └── static ——静态资源目录

>[注1]注意，这个目录下的第二级的所有js会被webpack扫描，如果你在里面放入了不能被识别为页面的js会导致webpack打包混乱。但是该扫描只作用于第二级（也就是index.html,cell.html那一级），放在别的位置的js不会被扫描。


同样地,安装依赖包后可以启动项目：
```
npm install
npm run dev
```
![](/static/doc/intro1/pic/6.png)
这是一个多页面（MPA）应用。我们除了访问http://localhost:9528/#/ 以访问index.html外，还可以访问http://localhost:9528/cell.html#/ 来访问在同一个工程下的另一个页面
![](/static/doc/intro1/pic/7.png)


### &emsp;2.3	安装lg-vue-ui及element-ui包
Lg-vue-ui是我们自己开发的一个ui框架包（依赖于elementui，会自动安装的）。封装了一些我们经常使用的控件避免重复开发。Element-ui是我们推荐的与vue共同使用的ui框架包
```
npm i element-ui –S
npm i lg-vue-ui -S
```
这两个UI框架包会有助于我们快速开发统一风格的前端页面。

