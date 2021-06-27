import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stores: [],
    categories: []
  },
  mutations: {
    addCategory(state, {payload}) {
      state.categories.push(payload)
    }
  },
  actions: {
    addCategory({ commit }, payload) {
      commit("addCategory", { payload });
    },
  },
  getters: {
    stores: state => state.stores,
    categories: state => state.categories,
  },
  modules: {
  }
})
