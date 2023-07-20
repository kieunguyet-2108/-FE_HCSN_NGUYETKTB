const URL_FIXED_ASSET = "api/v1/FixedAssetImport";

export default (axios) => ({
  /**
   * @description: Gọi api để lấy ra danh sách các cột trong file excel
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 04/06/2023
   */
  async getExcelFields() {
    try {
      const result = await axios.get(`${URL_FIXED_ASSET}`);
      return result;
    } catch (error) {
      return error.response;
    }
  },
});
