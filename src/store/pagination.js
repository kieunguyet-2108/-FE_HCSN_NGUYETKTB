const pagination = {
  state: {
    tableData: [],        // Dữ liệu của bảng
    filteredData: [],     // Dữ liệu sau khi được lọc
    currentPage: 1,      // Trang hiện tại
    pageSize: 10,         // Kích thước trang
    totalRecords: 0,      // Tổng số bản ghi
    searchText: '',        // Từ khóa tìm kiếm
    summary: {},          // Tổng hợp dữ liệu
  },
  mutations: {
    setPagination(state, pagination) {
      state.totalRecord = pagination.totalRecord;
      state.totalPage = pagination.totalPage;
      state.currentPage = pagination.currentPage;
      state.summary = pagination.summary;
      state.listData = pagination.listData;
    },
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
  },
  actions: {},
  getters: {},
};
export default pagination;
