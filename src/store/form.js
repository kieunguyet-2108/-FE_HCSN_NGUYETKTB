const formMode = {
  state: {
    formMode: null,
  },
  mutations: {
    setFormMode(state, mode) {
      state.formMode = mode;
    },
  },
  actions: {
    async setFormMode({ commit }, mode) {
      await commit("setFormMode", mode);
    },
  },
  getters: {
    getFormMode(state) {
      return state.formMode;
    },
  },
};
export default formMode;
