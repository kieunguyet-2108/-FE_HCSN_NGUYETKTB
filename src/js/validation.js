/**
 * @description: Thực hiện validate các field có độ dài được chỉ định sẵn
 * @param: {inputValue} giá trị của input
 * @param: {min} độ dài tối thiểu
 * @param: {max} độ dài tối đa
 * @return: {any}
 * @author: NguyetKTB 02/05/2023
 */
function isValidLength(inputValue, min, max) {
  if (inputValue.length < min || inputValue.length > max) {
    return false;
  }
  return true;
}

/**
 * @description: Hàm này dùng để convert string dạng số thành số
 * @param: {any}
 * @return: {any}
 * @author: NguyetKTB 01/05/2023
 */
function convertStringToNumber(value) {
  // nếu value là null hoặc rỗng thì trả về 0
  if (!value) {
    return 0;
  }
  // nếu value là số thì trả về luôn
  if (!isNaN(value)) {
    return value;
  }
  // nếu value không phải là số thì xóa hết dấu , và chuyển thành số
  return value
    .replaceAll(".", "")
    .replaceAll(",", ".")
    .replaceAll(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
}

/**
 * @description: format lại số theo định dạng tiền tệ
 * @param: {any}
 * @return: {any}
 * @author: NguyetKTB 01/05/2023
 */
function formatCurrency(money, callback = () => {}) {
  try {
    if (money) {
      // nếu money không phải là số thì sẽ trả về true
      // VD: money = 1234,13 => isNaN(money) = true
      if (isNaN(money)) {
        // thay thế tất cả dấu . thành rỗng ( nếu có)
        money = money.replaceAll(".", ""); // theo VD: money = 1234,13
        // thay thế tất cả dấu phẩy thành . ( nếu có ) - vì JS chỉ nhận dấu . làm phần thập phân
        money = money.replaceAll(",", "."); // theo VD: money = 1234.13
        // loại bỏ các ký tự không phải số và dấu . thừa
        // nếu value 1234.. => money = 1234.
        money = money.replaceAll(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"); // theo VD: money = 1234.13
      }
      // trường hợp money là số
      // VD: money = 123.413 => isNaN(money) = false
      else {
        // replace dấu . thành rỗng để format lại
        money = money.replaceAll(".", ""); // theo VD: money = 123413
      }
      callback(money); // callback số tiền trước khi format
      //format theo đúng định dạng
      // nếu value là 1234. => moneyFormatted = 1.234.
      return new Intl.NumberFormat("vi-VN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(money); // theo VD: moneyFormatted = 1.234,13
    } else {
      return this.min;
    }
  } catch (error) {
    console.log(error);
  }
}

export default {
  isValidLength,
  convertStringToNumber,
  formatCurrency,
};
