import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

const storeApi = "http://localhost:3000/store/";
const categoryApi = "http://localhost:3000/category/";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stores: [],
    categories: [],
  },
  mutations: {
    fetchStores(state, { res }) {
      state.stores = res.data;
    },
    addCategory(state, { payload }) {
      state.categories.push(payload);
    },
    fetchCategories(state, { res }) {
      state.categories = res.data;
    },
    deleteCategory(state, { payload }) {
      state.categories.splice(payload.index, 1);
    },
    editCategory(state, { payload }) {
      state.categories[payload.index].name = payload.name;
      state.categories[payload.index].storeId = payload.storeId;
    },
  },
  actions: {
    async fetchStores({ commit }) {
      await Axios.get(storeApi)
        .then((res) => commit("fetchStores", { res }))
        .catch((err) => console.log(err));
    },
    async fetchCategories({ commit }) {
      await Axios.get(categoryApi)
        .then((res) => commit("fetchCategories", { res }))
        .catch((err) => console.log(err));
    },
    async addCategory({ commit }, payload) {
      await Axios.post(categoryApi, payload)
        .then(() => commit("addCategory", { payload }))
        .catch((err) => console.log(err));
    },
    async deleteCategory({ commit }, payload) {
      await Axios.delete(categoryApi + payload.id)
        .then(() => commit("deleteCategory", { payload }))
        .catch((err) => console.log(err));
    },
    async editCategory({ commit }, payload) {
      await Axios.put(categoryApi + payload.id, payload)
        .then(() => commit("editCategory", { payload }))
        .catch((err) => console.log(err));
    },
  },
  getters: {
    stores: (state) => state.stores,
    categories: (state) => state.categories,
  },
  modules: {},
});
