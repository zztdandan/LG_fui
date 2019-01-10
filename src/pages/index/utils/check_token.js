import { getToken } from "@/utils/auth";
import { check_route_function } from "./check_route";
import { errlog, err_entity_log, log_entity } from "@/utils/platform_errlog";

async function do_check_token(that_vue, axios) {
  // 一系列登录后权限、用户信息获取。都是用token去找后台

  // let axios = that_vue.$ajax;

  // console.log(res_menu);

  // console.log(res_auth);

  // console.log(res_role);
  const res1 = user_token_login(that_vue, axios);
  // console.log(res_user_info);
  const res2 = set_auth(that_vue, axios);
  const res3 = set_menu(that_vue, axios);
  const res4 = set_role(that_vue, axios);
  // console.log("3");
}
// 读取coockie中的token信息并用于vuex中的登陆
async function user_token_login(that_vue, axios) {
  const res_user = await axios.get("/api/sys/user/info");
  if (typeof res_user == "undefined") {
    throw new Error("登陆错误");
  }
  // log_entity("登陆信息打印", res);
  const res_tmp_info = {
    user_name: res_user.username,
    user_avatar: res_user.imgpath
  };
  let res = await that_vue.$store.dispatch("User_Login", res_tmp_info);
  return res;
}

async function set_auth(that_vue, axios) {
  const res_auth = await axios.get("/api/get_user_auth");
   log_entity("权限信息打印", res_auth);
  let res = await that_vue.$store.dispatch("SetAuth", res_auth);
  return res;
}
async function set_menu(that_vue, axios) {
  const res_menu = await axios.get("/api/get_menu");
  log_entity("目录打印", res_menu);
  let res = await that_vue.$store.dispatch("SetMenu", res_menu);
  return res;
}

async function set_role(that_vue, axios) {
  const res_role = await axios.get("/api/get_user_role");

  // log_entity("角色信息打印", res_role);
  let res = await that_vue.$store.dispatch("SetRole", res_role);

  return res;
}

function check_token(that_vue) {
  do_check_token(that_vue, that_vue.$lg_ajax)
    .then(res => {
      log_entity("token检查", res);
      check_route_function(that_vue.$route, that_vue, that_vue.$store)
        .then(res => {
          log_entity("token检查通过：", res);
        })
        .catch(err => {
          err_entity_log("check_route_function出错,error:", err);
        });
    })
    .catch(err => {
      err_entity_log("do_check_token出错,error:", err);
      // location.href = "/login.html#/";
    });
}

export { check_token };
