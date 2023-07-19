/**
 * @description: Action store của form
 * @param: {any} 
 * @return: {any} 
 * @author: NguyetKTB 19/07/2023
 */
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
