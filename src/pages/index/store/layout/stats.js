// 这是存储主框架侧边栏展开、收拢状态的store
import Cookies from "js-cookie";

const layout_stats = {
  state: {
    sidebar: {
      opened: false
    },
    device: "desktop"
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {

      state.sidebar.opened = !state.sidebar.opened;
    
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {

      state.sidebar.opened = false;

    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit("TOGGLE_SIDEBAR");
    },
    CloseSideBar({ commit }) {
      commit("CLOSE_SIDEBAR");
    },
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    }
  }
};

export default layout_stats;
