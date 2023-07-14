const table = {
  state: {
    tableAction: null,
    selectedItems: [],
  },
  mutations: {
    setTableAction(state, action) {
      state.tableAction = action;
    },
    setSelectedItems(state, items) {
      state.selectedItems = items;
    },
  },
  actions: {
    async setTableAction({ commit }, action) {
      await commit("setTableAction", action);
    },
    async setSelectedItems({ commit }, items) {
      await commit("setSelectedItems", items);
    },
  },
  getters: {
    getTableAction(state) {
      return state.tableAction;
    },
    getSelectedItems(state) {
      return state.selectedItems;
    },
  },
};
export default table;
