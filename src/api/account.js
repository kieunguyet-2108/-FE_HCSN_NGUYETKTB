const URL_ACCOUNT = "api/v1/Account";

export default (axios) => ({
  /**
   * @description: Thực hiện call api đăng nhập
   * @param: 
   * user_name: tên đăng nhập
   * password: mật khẩu
   * @return: {any}
   * @author: NguyetKTB 19/05/2023
   */
  async login(user_name, password) {
    // form body
    const params = {
      user_name: user_name,
      password: password,
    };
    try {
      const result = await axios.post(`${URL_ACCOUNT}/Login`, params);
      return result;
    } catch (error) {
      return error.response;
    }
  },
});
