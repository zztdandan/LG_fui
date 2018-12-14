// 针对postMessage数据的处理方式

import PMFunction from "./PostMessageFunction/index.js";
export default async function(rsdata, that_vue) {
  try {
    // let PMFunction=require("./PostMessageFunction/setIframeHeight.js");
    let req = rsdata;
    let PM = PMFunction;
    if (req.type === "simple") {
      console.log("获得命令",rsdata);
      const req_name = req.req_name;
      const req_param = JSON.stringify(req.req_param);
      const do_funtion_str = "PM." + req_name + "(" + req_param + ",that_vue)";
      const res = eval(do_funtion_str);
      let salt = typeof req.salt != undefined ? req.salt : "";

      var ret = { code: 0, salt: salt, data: res };
      return ret;
    }
  } catch (e) {
    let salt = typeof req.salt != undefined ? req.salt : "";

    var ret = { code: -1, salt };
  }
}

// // 设置高度函数
// function setIframeHeight({ iframe_name, iframe_height }, that_vue) {
//   console.log(iframe_name);
//   console.log(iframe_height);
//   let a = iframe_height;
//   if (typeof iframe_height === "number") {
//     a = iframe_height + "px";
//   }
//   console.log("doset");
//   $("#" + iframe_name).attr("height", a);
// }

// // 关闭tab
// function closeIframe({ name }, that_vue) {
//   console.log("关闭tab", name);
//   that_vue.$store.dispatch("close_page", name);
// }

// // 请求用户信息
// function getUserInfo({ token }, that_vue) {
//   console.log("收到请求信息函数", token);
//   let this_token = that_vue.$store.getters.USER_TOKEN;
//   if (token === this_token) {
//     let info = that_vue.$store.getters.USER_INFO;
//     return { code: 0, msg: "suc", data: info };
//   } else {
//     return { code: -1, msg: "token无法对应" };
//   }
// }
