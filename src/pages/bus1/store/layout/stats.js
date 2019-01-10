// 这是存储主框架侧边栏展开、收拢状态的store

const layout_stats = {
  state: {
    device: "desktop"
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }
  },
  actions: {
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    }
  }
};

export default layout_stats;
