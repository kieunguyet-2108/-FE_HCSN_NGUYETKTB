const URL_BUDGET_DETAIL = "api/v1/BudgetDetails";

export default (axios) => ({
  /**
   * @description: Gọi api lấy ra danh sách nguồn chi phí chi tiết theo chứng từ và tài sản
   * @param: {assetId}: id tài sản, {voucherId}: id chứng từ
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
