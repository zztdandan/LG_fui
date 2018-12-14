const getters = {
  USER_TOKEN: state => state.login_info.token,
  USER_MENU: state => {
    return state.authorize.user_menu_list;
  },
  ACTIVED_PAGE: state => {
    return state.tabs.active_tab;
  },
  TABS: state => {
    return state.tabs.tab_list;
  },
  SIDEBAR_COLLAPSE: state => {
    return state.stats.sidebar.opened;
  },
  USER_INFO: state => {
    return state.login_info.user_info;
  }
};
export default getters;
