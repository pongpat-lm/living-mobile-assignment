import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

const storeApi = "http://localhost:3000/store/";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    storeData: [],
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
  },

  getters: {
    storeData: (state) => state.storeData,
  },
});
