import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

const storeApi = "http://localhost:3000/store/";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    storeData: [
      // {
      //   id: "d6fdb4f2-a416-47c0-bac4-6c81c93ab46b",
      //   name: "coffee club",
      //   description: "cafe",
      //   rating: 5,
      // },
      // {
      //   id: "5d180cce-fa21-4268-a2a8-b433b463f179",
      //   name: "pizza 1112",
      //   description: "pizza",
      //   rating: 4,
      // },
    ],
  },

  actions: {
    async fetchStore({ commit }) {
      await Axios.get(storeApi)
        .then((res) => commit("fetchStore", res.data))
        .catch((err) => alert(err));
    },
    async addStore({ commit }, value) {
      await Axios.post(storeApi, value)
        .then(() => commit("addStore", { value }))
        .catch((err) => alert(err));
    },
    async deleteStore({ commit }, value) {
      await Axios.delete(storeApi + value._id)
        .then(() => commit("deleteStore", { value }))
        .catch((err) => alert(err));
    },
    async editStore({ commit }, value) {
      await Axios.put(storeApi + value._id, value)
        .then(() => commit("editStore", { value }))
        .catch((err) => alert(err));
    },
  },

  mutations: {
    fetchStore(state, { res }) {
      state.storeData = res.data;
    },
    addStore(state, { value }) {
      state.storeData.push(value);
    },
    deleteStore(state, { value }) {
      state.storeData.filter((del) => value.id !== del.id);
    },
    editStore(state, { value }) {
      state.storeData[value.id].name = value.name;
      state.storeData[value.id].description = value.description;
      state.storeData[value.id].rating = value.rating;
    },
  },

  getters: {
    storeData: (state) => state.storeData,
  },
});
