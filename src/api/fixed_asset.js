const URL_FIXED_ASSET = "api/v1/FixedAssets";
import utility from "@/js/utility.js";

export default (axios) => ({
  /**
   * @description: Call api lấy dữ liệu
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 19/05/2023
   */
  async getFixedAssets() {
    try {
      const result = await axios.get(`${URL_FIXED_ASSET}`);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: Call api lấy dữ liệu theo id
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 20/05/2023
   */
  async getFixedAssetById(id) {
    try {
      const result = await axios.get(`${URL_FIXED_ASSET}/${id}`);
      return result;
    } catch (error) {
      return error.response;
    }
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
    try {
      const result = await axios.post(`${URL_FIXED_ASSET}/GetByPaging`, params);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: Call api lấy dữ liệu theo phân trang
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 21/05/2023
   */
  async getListByVoucher(pageNumber, pageSize, filter) {
    const params = {
      PageNumber: pageNumber,
      PageSize: pageSize,
      //filter is object
      Filters: filter,
    };
    try {
      const result = await axios.post(
        `${URL_FIXED_ASSET}/GetByVoucher`,
        params
      );
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: Call api xoa dữ liệu
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 22/05/2023
   */
  async deleteFixedAsset(ids) {
    const params = {
      data: ids,
    };
    try {
      const result = await axios.delete(`${URL_FIXED_ASSET}`, params);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: Call api xoa dữ liệu
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 22/05/2023
   */
  async handleBeforeDelete(ids) {
    try {
      const result = await axios.post(`${URL_FIXED_ASSET}/FindInVoucher`, ids);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: Thực hiện lấy dữ liệu theo mã chứng từ
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 10/07/2023
   */
  async getAllByVoucher(voucherId) {
    try {
      const result = await axios.get(
        `${URL_FIXED_ASSET}/GetListInVoucher/${voucherId}`
      );
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: call api insert dữ liệu
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 24/05/2023
   */
  async insertFixedAsset(fixedAsset) {
    try {
      fixedAsset = utility.normalizeObjectEmptyToNull(fixedAsset);
      const result = await axios.post(`${URL_FIXED_ASSET}`, fixedAsset);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: call api update dữ liệu
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 25/05/2023
   */
  async updateFixedAsset(fixedAsset, assetId) {
    try {
      const result = await axios.put(
        `${URL_FIXED_ASSET}/${assetId}`,
        fixedAsset
      );
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: call api lấy mã tài sản mới
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 29/05/2023
   */
  async getNewAssetCode() {
    try {
      const result = await axios.get(`${URL_FIXED_ASSET}/GetNewCode`);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: Gọi api import file excel
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 04/06/2023
   */
  async sendFile(file) {
    try {
      const result = await axios.post(`${URL_FIXED_ASSET}/Import`, file);
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: Gọi api thực hiện import multi dữ liệu
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 05/06/2023
   */
  async importData(data) {
    try {
      const result = await axios.post(
        `${URL_FIXED_ASSET}/InsertMupltiple`,
        data
      );
      return result;
    } catch (error) {
      return error.response;
    }
  },
  /**
   * @description: gọi api kiểm tra mã code trùng
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 29/06/2023
   */
  async checkDuplicateCode(code, id) {
    try {
      const result = await axios.get(
        `${URL_FIXED_ASSET}/DuplicateCode?code=${code}&entityId=${id}`
      );
      return result;
    } catch (error) {
      return error.response;
    }
  },
});
