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
        .then((res) => commit("fetchStore", { res }))
        .catch((err) => alert(err));
    },
    async addStore({ commit }, Value) {
      await Axios.post(storeApi, Value)
        .then(() => commit("addStore", { Value }))
        .catch((err) => alert(err));
    },
    async deleteStore({ commit }, Value) {
      await Axios.delete(storeApi + Value._id)
        .then(() => commit("deleteStore", { Value }))
        .catch((err) => alert(err));
    },
    async editStore({ commit }, Value) {
      await Axios.put(storeApi + Value._id, Value)
        .then(() => commit("editStore", { Value }))
        .catch((err) => alert(err));
    },
  },

  mutations: {
    fetchStore(state, { res }) {
      state.storeData = res.data;
    },
    addStore(state, { Value }) {
      state.storeData.push(Value);
    },
    deleteStore(state, { Value }) {
      state.storeData.filter((del) => Value.id !== del.id);
    },
    editStore(state, { Value }) {
      state.storeData[Value.id].name = Value.name;
      state.storeData[Value.id].description = Value.description;
      state.storeData[Value.id].rating = Value.rating;
    },
  },

  getters: {
    storeData: (state) => state.storeData,
  },
});
