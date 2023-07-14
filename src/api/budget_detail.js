const URL_BUDGET_DETAIL = "api/v1/BudgetDetails";

export default (axios) => ({
  /**
   * @description: Call api lấy ra tất cả thông tin nhóm tài sản
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 19/05/2023
   */
  async getBudgetDetailsByAsset(assetId, voucherId) {
    try {
      const result = await axios.get(`${URL_BUDGET_DETAIL}/GetByAsset?assetId=${assetId}&voucherId=${voucherId}`);
      return result;
    } catch (error) {
      return error.response;
    }
  },
});
