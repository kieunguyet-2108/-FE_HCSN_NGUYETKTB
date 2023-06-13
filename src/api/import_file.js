const URL_FIXED_ASSET = "api/v1/FixedAssetImport";

export default (axios) => ({
  /**
   * @description:
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 04/06/2023
   */
  async getExcelFields() {
    return await axios.get(`${URL_FIXED_ASSET}`);
  },
});
