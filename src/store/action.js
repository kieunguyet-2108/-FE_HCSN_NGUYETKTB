const action = {
  state: {
    action: null,
  },
  mutations: {
    setActionStatus(state, action) {
      state.action = action;
    },
  },
  actions: {
    async setActionStatus({ commit }, action) {
      await commit("setActionStatus", action);
    },
  },
  getters: {
    getActionStatus(state) {
      return state.action;
    },
  },
};
export default action;
