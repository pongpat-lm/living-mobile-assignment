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
      let idx = state.categories.findIndex(ele => ele.id === payload.id);
      state.categories.splice(idx, 1);
    },
    editCategory(state, { payload }) {
      let idx = state.categories.findIndex(ele => ele.id === payload.id);
      state.categories[idx].name = payload.name;
      state.categories[idx].storeId = payload.storeId;
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
      let { id, ...data } = payload
      await Axios.put(categoryApi + id, data)
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
