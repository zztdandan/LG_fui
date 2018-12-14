import "linqjs";

export default async function(route, that_vue, store) {
  if (route.name === "home_menu") {
    console.log("do_router_check", route);
    const page_id = route.params.page_id;
    const menu_list = store.getters.USER_MENU;
    const match_menu_list = menu_list.where(x => x.code === page_id);
    const active_page = store.getters.ACTIVED_PAGE;
    if (match_menu_list.length > 0) {
      // 有权限访问这个页面
      let a = match_menu_list.first();
      if (a !== active_page) {
        that_vue.$store.dispatch("open_page", a);
      }
      return 0;
    } else {
      // 无权访问该页面
      throw new Error("无权访问页面");
    }
  } else {
    const menu_list = store.getters.USER_MENU;
    const target_menu_list = menu_list.where(x => x.code === route.name);
    if (target_menu_list.length > 0) {
      let target_menu = target_menu_list.first();
      const active_page = store.getters.ACTIVED_PAGE;
      if (target_menu.code !== active_page.id) {
        that_vue.$store.dispatch("open_page", target_menu);
      }
    }
  }
}
