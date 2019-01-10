import Vue from "vue";
import Vuex from "vuex";

import stats from "./layout/stats";

import getter from "./getters";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stats
  },
  getters: getter
});
