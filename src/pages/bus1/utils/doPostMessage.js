// postmessage程序示例

export function setHeight() {
  // setIframeHeight
  // ---------------------------------------------
  let hgt = window.document.body.scrollHeight + 17;
  // console.log("获得token信息", window.parent.document.body);
  let ifr_name = this.$route.name;
  let params = { iframe_name: ifr_name, iframe_height: hgt };

  window.parent.postMessage(
    { type: "simple", req_name: "setIframeHeight", req_param: params },
    "*"
  );
}

export function closeFrame() {
  // closeIframe
  // ---------------------------------------------
  let params = { name: "test" };
  window.parent.postMessage({ type: "simple", req_name: "closeIframe", req_param: params }, "*");
}

export function getUserInfo() {
  // getUserInfo

  // ----------------下面是接收的函数-------------
  window.addEventListener("message", function(rs) {
    // console.log(rs);
    try {
      console.log("test回调", rs);
      if (rs.data.salt == "user_infoaxxx") {
        // 通过同样的salt来确定是否为回调的信息
        if (rs.data.code == 0) {
          // 通过回调信息的code判断框架应答程序的运行结果
          consol.log("获取成功");

          this.user_info = rs.data.data.user_info;
          // 储存应答程序回传的user_info信息
        }
      }
    } catch (e) {
      throw new Error(e);
    }
    // 单独引入一个函数，进行rs.data的处理
  });
  // ----------------接收函数END-----------------
  // ----------------下面是发送的函数--------------

  let params = { token: "example" };
  window.parent.postMessage(
    { type: "simple", req_name: "getUserInfo", req_param: params, salt: "user_infoaxxx" },
    "*"
  );
}

export function getMenu() {
  // getMenu
  // ---------------------------------------------

  // ----------------下面是接收的函数-------------
  window.addEventListener("message", function(rs) {
    // console.log(rs);
    try {
      console.log("test回调", rs);
      if (rs.data.salt == "getmenu_test") {
        // 通过同样的salt来确定是否为回调的信息
        if (rs.data.code == 0) {
          // 通过回调信息的code判断框架应答程序的运行结果
          consol.log("获取成功");

          this.menu = rs.data.data;
          // 储存应答程序回传的menu信息
        }
      }
    } catch (e) {
      throw new Error(e);
    }
    // 单独引入一个函数，进行rs.data的处理
  });
  // ----------------接收函数END-----------------
  // ----------------下面是发送的函数--------------

  let params = {};
  window.parent.postMessage(
    { type: "simple", req_name: "getMenu", req_param: params, salt: "getmenu_test" },
    "*"
  );
}
