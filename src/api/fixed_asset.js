const URL_FIXED_ASSET = "api/v1/FixedAssets";
import utility from "@/js/utility.js";

export default (axios) => ({
  /**
   * @description: Gọi api lấy ra danh sách tài sản
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
   * @description: Gọi api lấy ra danh sách tài sản theo id tài sản
   * @param: {id}: id tài sản
   * @return: {result}: kết quả trả về là 1 tài sản có id trùng với id truyền vào
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
   * @description: Gọi api lấy ra danh sách dữ liệu theo phân trang, filter
   * @param: {pageNumber}: số trang, {pageSize}: số bản ghi trên 1 trang, {filter}: object chứa các trường cần filter
   * @return: {result}: kết quả trả về là 1 danh sách dữ liệu theo phân trang, filter (pageNumber, pageSize, totalRecord, totalPage, data)
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
   * @description: Gọi api lấy ra danh sách tài sản thuộc chưng từ
   * @param: {pageNumber}: số trang, {pageSize}: số bản ghi trên 1 trang, {filter}: object chứa các trường cần filter
   * @return: {result}: kết quả trả về là 1 danh sách dữ liệu theo phân trang, filter (pageNumber, pageSize, totalRecord, totalPage, data)
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
   * @description: Gọi api xóa dữ liệu theo id
   * @param: {ids}: mảng id cần xóa
   * @return: {result}: kết quả trả về là số bản ghi được xóa và trạng thái request
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
   * @description: Gọi api xử lí dữ liệu trước khi xóa (kiểm tra chứng từ phát sinh)
   * @param: {ids}: mảng id cần xóa
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
   * @param: {voucherId}: mã chứng từ
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
   * @description: Gọi api thực hiện thêm mới dữ liệu
   * @param: {fixedAsset}: dữ liệu cần thêm mới
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
   * @description: Gọi api thực hiện cập nhật dữ liệu cho tài sản
   * @param: {fixedAsset}: dữ liệu cần cập nhật, {assetId}: id tài sản cần cập nhật
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
   * @description: Gọi api lấy ra mã tài sản mới nhất
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
   * @description: Gọi api thực hiện kiểm tra dữ liệu nhập khẩu
   * @param: {file}: file dữ liệu nhập khẩu
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
   * @description: Gọi api để thực hiện nhập khẩu dữ liệu
   * @param: {data}: dữ liệu nhập khẩu
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
   * @description: Gọi api để thực hiện kiểm tra mã code trùng
   * @param: {code}: mã code cần kiểm tra, {id}: id cần kiểm tra
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
