柳钢框架前端开发指南系列
===========
# （二）前端框架介绍
    2018-12-05
    赵中廷
> 前言：
本部分将介绍柳钢前端框架的整体架构体系及各个开发方法之间的区别。对于开发方法的详细信息将在下面几节进行说明
>
## 一、框架的部署
### 1.1	下载安装
新建一个文件夹，从我们的git下下载最新的框架文件。
[在柳钢内网打开](http://172.16.4.191:3000/80822215/LG_fui.git)
```
git clone http://172.16.4.191:3000/80822215/LG_fui.git
```
进入目录后，切换到目前的正式版本分支:release(或者切换到已有的标签)
```
cd LG_fui
git fetch
git checkout release
```
安装依赖并测试运行
```
npm install
npm run dev
```
如果需要发布，则使用打包命令将其打包
```
npm run build
```
打包后的结果在/dist文件夹下。

###1.2	Nginx部署
编辑Nginx的nginx.conf文件，添加下面的段落：
```
    server {

        listen 8080;
        # 此处为监听端口
        server_name lg_ui.com;
        # 此处为名称
         location / {
              
            root D:/repo/LG_fui/lg-admin-fui/dist;
            #此处为build后生成的文件的地址
            index index.html;
            #此处为访问首页的文件名称
        }

        location ~ /api {
            #调用api的接口需做单独映射[注1]
            rewrite ^/api/(.*)$ /app/mock/17/$1 break;
            #前段是在工程里api网址的通配符，后段是目标网址中URN部分的通配符
            proxy_pass  http://172.16.4.194:8080;
            #这是后端接口的详细地址
            #以下是nginx反向代理外部地址的固定内容
            proxy_redirect     off;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }

    }
```
[注1]在我们开发中，所有的api的访问地址都是/api/(.*)，在测试环境中，由于webpack的webpack-dev-server插件自带了一个小型的express进行映射，所以通过配置config.dev.ProxyTable:
```
 proxyTable: {
      '/api': { // api表示当前项目请求使用该项可进入远程端访问
        target: 'http://172.16.4.194:8080/app/mock/17', // 本地理服务器路径
        // target: 'http://140.143.26.135:3000', //远端 代理服务器路径
        pathRewrite: { '^/api': '/' }, // 重写路径
        changeOrigin: true
      }
```
可以实现映射api地址的目的。但是如果部署到正式环境中，则所有api访问的地址变成localhost:8080/api/(.*)，显然这个地址是没有任何东西的。所以我们除了要将dist输出目录映射到8080端口外，还需要特别地映射8080/api到我们api的地址（目前在该api挂的是个mock-server，地址是[http://172.16.4.194:8080/app/mock/17](http://172.16.4.194:8080/app/mock/17)，如果单机测试的话，你也可以将其挂载在某个iis服务或postman服务下）。

+ 注意，这个nginx的功能是是代替dev中的express存在的。所以我们也可以使用express或其他方式代理来进行部署。


## 二、框架结构
柳钢前端框架开发是一个支持多技术栈，多人协作开发的挂载式开发体系。每个开发人员可以拥有独立的页面工程，除了主工程外其他人可自选前端体系，只需注册到主页面即可。

柳钢前端框架结构图如下

![](/static/doc/intro2/pic/svg1.svg)

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
```javascript
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
```javascript
//setIframeHeight
//---------------------------------------------
  let hgt = window.document.body.scrollHeight + 17;
      // console.log("获得token信息", window.parent.document.body);
      let ifr_name=this.$route.name;
      let params = { iframe_name: ifr_name, iframe_height: hgt };
     
      window.parent.postMessage({ type: "simple", req_name: "setIframeHeight", req_param: params }, "*");
```

```javascript
//closeIframe
//---------------------------------------------
  let params = { name: "test" };
        window.parent.postMessage(
          { type: "simple", req_name: "closeIframe", req_param: params },
          "*"
        );
```

```javascript
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

```javascript
//openNewPage
//---------------------------------------------
 let params = { code: "intro1" };
        window.parent.postMessage(
          { type: "simple", req_name: "closeIframe", req_param: params },
          "*"
        );
```

```javascript
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