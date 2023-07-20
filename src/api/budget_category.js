const URL_BUDGET_CATEGORY = "api/v1/BudgetCategories";

export default (axios) => ({
  /**
   * @description: Call api lấy ra thông tin loại chi phí
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 19/05/2023
   */
  async getBudgetCategories() {
    try {
      const result = await axios.get(`${URL_BUDGET_CATEGORY}`);
      return result;
    } catch (error) {
      return error.response;
    }
  },
});
