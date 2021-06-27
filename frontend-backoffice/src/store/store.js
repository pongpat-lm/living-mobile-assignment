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
      state.tableData = res.data;
    },
    addStore(state, { payload }) {
      state.tableData.push(payload);
    },
    deleteStore(state, { payload }) {
      state.tableData.splice(payload.id, 1);
    },
    editStore(state, { payload }) {
      state.tableData[payload.id].name = payload.name;
      state.tableData[payload.id].description = payload.description;
      state.tableData[payload.id].rating = payload.rating;
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
    tableData: (state) => state.tableData,
  },
});
