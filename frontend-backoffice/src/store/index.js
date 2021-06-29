import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

const storeApi = "http://localhost:3000/store/";
const categoryApi = "http://localhost:3000/category/";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storeData: [],
    categories: [],
  },
  mutations: {
    fetchStore(state, { res }) {
      state.storeData = res.data;
    },
    addStore(state, { Value }) {
      state.storeData.push(Value);
    },
    deleteStore(state, Index) {
      state.storeData.splice(Index, 1);
    },
    editStore(state, { Value }) {
      state.storeData[Value.index].name = Value.name;
      state.storeData[Value.index].description = Value.description;
      state.storeData[Value.index].rating = Value.rating;
    },
    addCategory(state, { payload }) {
      state.categories.push(payload);
    },
    fetchCategories(state, { res }) {
      state.categories = res.data;
    },
    deleteCategory(state, { payload }) {
      let idx = state.categories.findIndex((ele) => ele.id === payload.id);
      state.categories.splice(idx, 1);
    },
    editCategory(state, { payload }) {
      let idx = state.categories.findIndex((ele) => ele.id === payload.id);
      state.categories[idx].name = payload.name;
      state.categories[idx].storeId = payload.storeId;
    },
  },
  actions: {
    async fetchStore({ commit }) {
      await Axios.get(storeApi)
        .then((res) => commit("fetchStore", { res }))
        .catch((err) => console.log(err));
    },
    async addStore({ commit }, Value) {
      await Axios.post(storeApi, Value)
        .then(() => commit("addStore", { Value }))
        .catch((err) => console.log(err));
    },
    async deleteStore({ commit }, Value) {
      await Axios.delete(storeApi + Value.id)
        .then(() => commit("deleteStore", Value.index))
        .catch((err) => console.log(err));
    },
    async editStore({ commit }, Value) {
      let { id, index, ...data } = Value;
      console.log(index);
      await Axios.put(storeApi + id, data)
        .then(() => commit("editStore", { Value }))
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
      let { id, ...data } = payload;
      await Axios.put(categoryApi + id, data)
        .then(() => commit("editCategory", { payload }))
        .catch((err) => console.log(err));
    },
  },
  getters: {
    storeData: (state) => state.storeData,
    categories: (state) => state.categories,
  },
  modules: {},
});
