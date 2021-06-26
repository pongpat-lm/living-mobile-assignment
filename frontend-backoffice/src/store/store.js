import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

let api = "http://localhost:3000/store/";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tableData: [],
  },

  mutations: {
    fetchStore(state, { res }) {
      state.stores = res.data;
    },
    addStore(state, { payload }) {
      state.stores.push(payload);
    },
    deleteStore(state, { payload }) {
      state.stores.splice(payload.index, 1);
    },
    editStore(state, { payload }) {
      state.stores[payload.index].name = payload.name;
      state.stores[payload.index].price = payload.price;
    },
  },

  actions: {
    async fetchStore({ commit }) {
      await Axios.get(api)
        .then((res) => commit("fetchStore", { res }))
        .catch((err) => alert(err));
    },
    async addStore({ commit }, payload) {
      await Axios.post(api, payload)
        .then(() => commit("addStore", { payload }))
        .catch((err) => alert(err));
    },
    async deleteStore({ commit }, payload) {
      alert(payload._id);
      await Axios.delete(api + payload._id)
        .then(() => commit("deleteStore", { payload }))
        .catch((err) => alert(err));
    },
    async editStore({ commit }, payload) {
      await Axios.put(api + payload._id, payload)
        .then(() => commit("editStore", { payload }))
        .catch((err) => alert(err));
    },
  },

  getters: {
    stores: (state) => state.stores,
  },
});
