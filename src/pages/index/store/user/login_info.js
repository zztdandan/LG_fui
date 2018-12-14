// 这是存储用户登陆信息的store
import { getToken, setToken, removeToken } from "@/utils/auth";
// import { Resolver } from "dns";
// import { rejects } from "assert";
import { resolve } from "path";
const login_info_module = {
  state: {
    //   用户信息
    // 该项内部包括user_name,user_avatar
    user_info: { user_name: "test", user_avatar: "" },
    // 登陆状态，由于不确定登陆状态如何，暂定占用一个存储位，暂不写函数
    login_stats: {},
    token: getToken()
  },
  mutations: {
    SET_USER_INFO: function(state, _user_info) {
      state.user_info = _user_info;
    },
    CLEAR_USER_INFO: function(state) {
      state.user_info = {};
    },
    SET_LOGIN_STATS: function(state, _login_stats) {
      state.login_stats = _login_stats;
    },
    CLEAR_LOGIN_STATS: function(state) {
      state.login_stats = {};
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    User_Login: ({ commit }, _user_info) => {
      return new Promise((resolve, reject) => {
        try {
          // console.log("SET_USER_INFO");
          commit("SET_USER_INFO", _user_info);
          // 暂时写一个set_stats的东西
          commit("SET_LOGIN_STATS", { stats: "login" });
          //  console.log("suc");
          resolve("11");
        } catch (e) {
          // console.log("fail");
          reject(e);
        }
      });
    },
    User_Logout: ({ commit }) => {
      commit("CLEAR_USER_INFO");
      // 暂时写一个set_stats的东西
      commit("CLEAR_LOGIN_STATS");
      // 权限登出
      commit("LOGOUT_AUTH");
    },
    User_ChangeStats: ({ commit }, stats) => {
      commit("SET_LOGIN_STATS", stats);
    },
    User_ShowInfo: ({ commit, state }) => {
      return new Promise((res, rej) => {
        try {
          const a = {
            user_info: state.user_info,
            login_stats: state.login_stats
          };
          res(a);
        } catch (e) {
          rej(e);
        }
      });
    }
  }
};

export default login_info_module;
