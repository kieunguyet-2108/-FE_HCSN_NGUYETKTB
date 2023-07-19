const table = {
  state: {
    selectedItems: [],
  },
  mutations: {
    setSelectedItems(state, items) {
      state.selectedItems = items
    },
  },
  actions: {
    async setSelectedItems({ commit }, items) {
      await commit('setSelectedItems', items)
    },
  },
  getters: {
    getSelectedItems(state) {
      return state.selectedItems
    },
  },
}
export default table
