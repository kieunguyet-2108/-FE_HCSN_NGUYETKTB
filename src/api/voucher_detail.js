const URL_VOUCHER_DETAIL = "api/v1/VoucherDetail";

export default (axios) => ({
  /**
   * @description: Thực hiện gọi api lấy ra tất cả thông tin chứng từ
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 23/06/2023
   */
  getAllVoucherDetails() {
    try {
      const result = axios.get(`${URL_VOUCHER_DETAIL}`);
      return result;
    } catch (error) {
      return error.response;
    }
  },
});
