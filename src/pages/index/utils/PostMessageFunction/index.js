// 一个设置iframe高度的函数，用于设置
function setIframeHeight({ iframe_name, iframe_height }, that_vue) {
  let a = iframe_height;
  if (typeof iframe_height === "number") {
    a = iframe_height + "px";
  }
  document.querySelector("#iframe_" + iframe_name).setAttribute("height", a);
  return 0;
}
// 关闭tab
function closeIframe({ name }, that_vue) {
  console.log("关闭tab", name);
  that_vue.$store.dispatch("close_page", name);
}

// 请求用户信息
function getUserInfo({ token }, that_vue) {
  console.log("收到请求信息函数", token);
  let this_token = that_vue.$store.getters.USER_TOKEN;
  if (token === this_token) {
    let info = that_vue.$store.getters.USER_INFO;
    return { msg: "suc", user_info: info };
  } else {
    return { msg: "token无法对应" };
  }
}

// 打开新页面
function openNewPage({ code }, that_vue) {
  console.log("收到打开新页面请求");
  var tmp_page_info = { code: code };
  that_vue.$store.dispatch("open_page", tmp_page_info);
}

// 获得目录信息
function getMenu({}, that_vue) {
  console.log("收到获得目录信息请求");
  var menu_info = that_vue.$store.getters.USER_MENU;
  return menu_info;
}

export default { setIframeHeight, closeIframe, getUserInfo, openNewPage, getMenu };
