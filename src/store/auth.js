const action = {
  state: {
    token: localStorage.getItem("token") || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    removeToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  actions: {
    async setToken({ commit }, token) {
      await commit("setToken", token);
    },
    async removeToken({ commit }) {
      await commit("removeToken");
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
};
export default action;
