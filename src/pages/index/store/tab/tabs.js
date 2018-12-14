// 这是存储框架tab相关功能的store
import "linqjs";
import { stat } from "fs";
const tabs_module = {
  state: {
    //   已经打开的全部tab信息
    tab_list: [],
    // 登陆状态，由于不确定登陆状态如何，暂定占用一个存储位，暂不写函数
    active_tab: {}
  },
  mutations: {
    ADD_TAB: function(state, tab_info) {
      try {
        let same_tab_count = 0;
        let curr_tab = {};
        if (state.tab_list.length != 0) {
          curr_tab = state.tab_list.where(x => x.id == tab_info.id);
          same_tab_count = curr_tab.length;
        }
        if (same_tab_count > 0) {
          // 已有活动的tab了
        } else {
          // 列表中添加一个tab
          tab_info.order = state.tab_list.length;
          state.tab_list.push(tab_info);
        }
      } catch (e) {
        throw new Error("tab的格式错误");
      }
    },
    // 切换当前的活动页面为输入的页面
    TOGGLE_ACTIVE_TAB: function(state, tab_id) {
      // console.log(3);
      const a = 1;
      const same_tab = state.tab_list.where(x => x.id === tab_id);
      // console.log(same_tab);
      if (same_tab.length > 0) {
        // 已有活动的tab了
        state.active_tab = same_tab.first();
      } else {
        throw new Error("非法切换请求");
        // 没有活动的tab，是非法请求
      }
    },
    // 删除某个tab
    DEL_TAB: function(state, tab_info_id) {
      const same_tab = state.tab_list.where(x => x.id === tab_info_id);

      if (same_tab.length > 0) {
        // 找到了指定的tab
        const todo_del_tab = same_tab.first();
        // 大于该order的tab中order-1,保持order与排序一致的性质
        state.tab_list
          .where(x => x.order > todo_del_tab.order)
          .forEach(tab_i => {
            tab_i.order = tab_i.order - 1;
          });
        // 移除这个待移除的tab
        state.tab_list.remove(todo_del_tab);
      } else {
        throw new Error("非法删除请求");
        // 没有活动的tab，是非法请求
      }
    },
    // 特殊处理，如果关闭的页面是active的页面
    TOGGLE_FROM_DEL_TAB: function(state, order_tab) {
      // 处理 将与删除order最近的一个tab置为活动tab
      const a = state.tab_list.orderBy(x => {
        return Math.abs(x.order - order_tab);
      });
      state.active_tab = a.first();
    }
  },
  actions: {
    //  打开一个tab
    open_page: ({ commit, rootGetters }, tmp_menu_info) => {
      return new Promise((resolve, reject) => {
        try {
          // menu_info: {code:"aa",name:"用户信息",icon:"lg-icon-user",url:"/user_info"}
          // tab_info: { order: 0, id: "main_index", url: "/#/main", title: "main" }
          // console.log(context);
          let menu_info = rootGetters.USER_MENU.where(x => x.code == tmp_menu_info.code).first();
          const tmp_tab_info = {
            order: 0,
            id: menu_info.code,
            url: menu_info.url,
            title: menu_info.name
          };
          if (tmp_tab_info.url == null) {
            throw new Error("该code代表的不是实际页面");
          }
          // 增加页面
          // console.log(1);
          commit("ADD_TAB", tmp_tab_info);
          // console.log(2);
          // 切到该页面
          commit("TOGGLE_ACTIVE_TAB", tmp_tab_info.id);
          resolve(0);
        } catch (e) {
          reject(e);
        }
      });
    },
    // 关闭一个tab
    close_page: ({ commit, state }, page_id) => {
      return new Promise((resolve, reject) => {
        const todo_del_tab = state.tab_list.where(x => x.id === page_id).first();
        commit("DEL_TAB", page_id);

        // 特殊处理，如果删除页面后tab_list没有任何启动页面了，那么不做任何切换
        // 特殊处理，如果删除页面后没有任何页面，则active_tab清空
        if (state.tab_list.length == 0) {
          state.active_tab = {};
          // do nothing
        } else {
          // 特殊处理，关闭一个正在打开的标签时如何做。如果关闭的不是正在打开的标签，则不作处理
          if (state.active_tab.id === page_id) {
            commit("TOGGLE_FROM_DEL_TAB", todo_del_tab.order);
          }
        }
        resolve(state);
      });
    },
    // 切页面
    toggle_page: ({ commit }, page_id) => {
      commit("TOGGLE_ACTIVE_TAB", page_id);
    }
  }
};

export default tabs_module;
