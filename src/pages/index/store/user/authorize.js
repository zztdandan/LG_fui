// 这是存储用户使用权限的store

const user_auth_module = {
  state: {
    // 用户登陆后可供显示的menu的列表
    // 列表中项暂定的格式为：{code:"aa",name:"用户信息",icon:"lg-icon-user",url:"/user_info,parent:"null"}
    user_menu_list: [],
    // 用户登陆后权限列表，暂定格式为:{auth_id:"",auth_name:"",auth_allow:true}
    user_auth_list: [],
    // 用户角色配置项
    user_role: { role: "", role_list: [] }
  },
  mutations: {
    SET_AUTH_LIST: function(state, _user_auth) {
      state.user_auth_list = _user_auth;
    },
    SET_MENU_LIST: function(state, _user_menu) {
      state.user_menu_list = _user_menu;
    },
    SET_ROLE_LIST: function(state, _user_role) {
      state.user_role = _user_role;
    },
    LOGOUT_AUTH: function(state) {
      state.user_menu_list = [];
      state.user_auth_list = [];
      state.user_role = { role: "", role_list: [] };
    }
  },
  actions: {
    SetAuth: (
      { commit },
      _user_auth_list
    ) => {
      return new Promise((resolve, reject) => {
        try {
          commit("SET_AUTH_LIST", _user_auth_list);

          resolve(0);
        } catch (e) {
          reject(e);
        }
      });
    },
    SetMenu: ({ commit }, _user_menu_list) => {
      return new Promise((resolve, reject) => {
        try {
          commit("SET_MENU_LIST", _user_menu_list);

          resolve(0);
        } catch (e) {
          reject(e);
        }
      });
    },
    SetRole: ({ commit }, _user_role_list) => {
      return new Promise((resolve, reject) => {
        try {
          commit("SET_ROLE_LIST", _user_role_list);

          resolve(0);
        } catch (e) {
          reject(e);
        }
      });
    }
  }
};

export default user_auth_module;
