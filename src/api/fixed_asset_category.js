const URL_FIXED_ASSET_CATEGORY = "api/v1/FixedAssetCategories";

export default (axios) => ({
  /**
   * @description: Call api lấy ra tất cả thông tin nhóm tài sản
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 19/05/2023
   */
  async getFixedAssetCategories() {
    try {
      const result = await axios.get(`${URL_FIXED_ASSET_CATEGORY}`);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: Lấy ra thông tin nhóm tài sản theo id
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 31/05/2023
   */
  getFixedAssetCategoryById(id) {
    try {
      const result = axios.get(`${URL_FIXED_ASSET_CATEGORY}/${id}`);
      return result;
    } catch (error) {
      return error.response;
    }
  },
});
