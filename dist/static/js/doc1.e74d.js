(window.webpackJsonp=window.webpackJsonp||[]).push([["doc1"],{7:function(n,o,e){e("201c"),n.exports=e("uAdY")},Dvns:function(n,o,e){},"G+Z7":function(n,o,e){"use strict";function t(n){console.log("========================================"),console.log("| lg_admin错误信息:"),console.log("| ",n),console.log("----------------------------------------")}function a(n,o){console.log("========================================"),console.log("| lg_admin统一错误处理:"),console.log("| ",n),console.log("| ",o),console.log("----------------------------------------")}function r(n,o){console.log("========================================"),console.log("| lg_admin_log:"),console.log("| ",n),console.log("| ",o),console.log("----------------------------------------")}e.d(o,"b",function(){return t}),e.d(o,"a",function(){return a}),e.d(o,"c",function(){return r})},H5yV:function(n,o,e){"use strict";var t=e("4d7F"),a=e.n(t),r=e("vDqi"),c=e.n(r),i=e("X4fA"),u=e("MfTl"),s=e.n(u),l=e("G+Z7"),f=c.a.create({timeout:5e3});f.interceptors.request.use(function(n){return Object(i.a)()&&(n.headers[s.a.Auth.UserTokenName]=Object(i.a)()),n},function(n){console.log(n),a.a.reject(n)}),f.interceptors.response.use(function(n){try{if(0==n.data.code)return n.data.data;Object(l.a)("lg_admin_axios:服务端返回错误结果",n.data)}catch(n){Object(l.a)("lg_admin_axios:解析response时发生错误,error:",n)}},function(n){Object(l.a)("lg_admin_axios:axios请求错误:",n)}),o.a=f},MfTl:function(n,o){n.exports={Auth:{LoginPostUrl:"/api/sys/login",UserTokenName:"accesstoken",MainPageUrl:"/#/",LoginUrl:"/login.html#/"}}},X4fA:function(n,o,e){"use strict";e.d(o,"a",function(){return i}),e.d(o,"b",function(){return u});var t=e("p46w"),a=e.n(t),r=e("MfTl"),c=e.n(r).a.Auth.UserTokenName;function i(){return a.a.get(c)}function u(n){return a.a.set(c,n)}},uAdY:function(n,o,e){"use strict";e.r(o);var t=e("oCYn"),a=e("stYL"),r=e.n(a),c=(e("Dvns"),e("jE9Z")),i=e("EPPS"),u=e("HLxT"),s=e("UbV9"),l=e("jW2X"),f=e("QeVb");t.default.use(c.a);var d=new c.a({routes:[{path:"/intro1",name:"intro1",component:i.a},{path:"/intro2",name:"intro2",component:u.a},{path:"/intro3",name:"intro3",component:s.a},{path:"/intro4",name:"intro4",component:l.a},{path:"/intro5",name:"intro5",component:f.a}]}),p=e("H5yV"),g=e("vDqi"),m=e.n(g),h=e("XJYT"),v=e.n(h),b=(e("D66Q"),e("aPD/")),_=e.n(b);e("Y0vw"),e("5MvH");t.default.prototype.$lg_ajax=p.a,t.default.prototype.$ajax=m.a,t.default.use(v.a,{locale:r.a}),t.default.use(_.a);new t.default({el:"#app",router:d,render:function(n){return n(App)}})}},[[7,"runtime","ele","vue","vendor"]]]);