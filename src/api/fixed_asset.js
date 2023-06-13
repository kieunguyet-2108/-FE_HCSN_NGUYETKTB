const URL_FIXED_ASSET = "api/v1/FixedAssets";

export default (axios) => ({
  /**
   * @description: Call api lấy dữ liệu
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 19/05/2023
   */
  async getFixedAssets() {
    return await axios.get(`${URL_FIXED_ASSET}`);
  },
  /**
   * @description: Call api lấy dữ liệu theo id
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 20/05/2023
   */
  async getFixedAssetById(id) {
    return await axios.get(`${URL_FIXED_ASSET}/${id}`);
  },
  /**
   * @description: Call api lấy dữ liệu theo phân trang
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 21/05/2023
   */
  async getListByPagination(pageNumber, pageSize, filter) {
    const params = {
      PageNumber: pageNumber,
      PageSize: pageSize,
      //filter is object
      Filters: filter,
    };
    return await axios.post(`${URL_FIXED_ASSET}/GetByPaging`, params);
  },
  /**
   * @description: Call api xoa dữ liệu
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 22/05/2023
   */
  async deleteFixedAsset(ids) {
    // truyền body delete khác với post
    const params = {
      data: ids,
    };
    return await axios.delete(`${URL_FIXED_ASSET}`, params);
  },
  /**
   * @description: call api insert dữ liệu
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 24/05/2023
   */
  async insertFixedAsset(fixedAsset) {
    return await axios.post(`${URL_FIXED_ASSET}`, fixedAsset);
  },
  /**
   * @description: call api update dữ liệu
   * @param: {any} 
   * @return: {any} 
   * @author: NguyetKTB 25/05/2023
   */
  async updateFixedAsset(fixedAsset, assetId) {
    return await axios.put(`${URL_FIXED_ASSET}/${assetId}`, fixedAsset);
  },
  /**
   * @description: call api lấy mã tài sản mới
   * @param: {any} 
   * @return: {any} 
   * @author: NguyetKTB 29/05/2023
   */
  async getNewAssetCode() {
    return await axios.get(`${URL_FIXED_ASSET}/GetNewCode`);
  },
  /**
   * @description: Lấy ra thông tin tài sản theo mã tài sản và id tài sản
   * @param: {any} 
   * @return: {any} 
   * @author: NguyetKTB 31/05/2023
   */
  async getAssetByCode(assetCode, assetId) {
    return await axios.get(
      `${URL_FIXED_ASSET}/GetByCode?code=${assetCode}&entityId=${assetId}`
    );
  },
  /**
   * @description: Gọi api import file excel
   * @param: {any} 
   * @return: {any} 
   * @author: NguyetKTB 04/06/2023
   */
  async sendFile(file) {
    return await axios.post(`${URL_FIXED_ASSET}/Import`, file);
  },
  /**
   * @description: Gọi api thực hiện import multi dữ liệu
   * @param: {any} 
   * @return: {any} 
   * @author: NguyetKTB 05/06/2023
   */
  async importData(data) {
    return await axios.post(`${URL_FIXED_ASSET}/InsertMupltiple`, data);
  },
});
