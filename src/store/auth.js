const action = {
  state: {
    isLogin: localStorage.getItem("isLogin") || false,
  },
  mutations: {
    setUserAction(state, action) {
      state.isLogin = action;
      localStorage.setItem("isLogin", action);
    },
  },
  actions: {
    async setUserAction({ commit }, action) {
      await commit("setUserAction", action);
    },
  },
  getters: {
    getUserAction(state) {
      return state.isLogin;
    },
  },
};
export default action;
