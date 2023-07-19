const Resource = {
  // MESSAGE VALIDATE
  VALIDATE: {
    Required: "{0} không được để trống.",
    MaxLength: "{0} không được vượt quá {1} ký tự.",
    Duplicate: "{0} đã tồn tại.",
    Invalid: "{0} không hợp lệ.",
  },
  // MESSAGE VALIDATE ASSET
  VALIDATE_SERVICE: {
    Invalid_DepreciationRate: "Tỉ lệ hao mòn phải bằng 1 chia số năm sử dụng.",
    Invalid_DepreciationValue:
      "Giá trị hao mòn năm phải bằng nguyên giá nhân tỉ lệ hao mòn.",
  },
  // THÔNG BÁO HIỂN THỊ TRÊN POPUP
  POPUP_MESSAGE: {
    Msg_Add_Success: "Thêm mới dữ liệu thành công.",
    Msg_Add_Failed: "Thêm mới dữ liệu thất bại.",
    Msg_Edit_Success: "Cập nhật dữ liệu thành công.",
    Msg_Edit_Failed: "Cập nhật dữ liệu thất bại.",
    Msg_Delete_Success: "Xóa dữ liệu thành công.",
    Msg_Delete_Failed: "Xóa dữ liệu thất bại.",
  },
  // THÔNG BÁO HIỂN THỊ TRÊN DIALOG
  DIALOG_MESSAGE: {
    Voucher_Delete_OneRecord: "Bạn có muốn xóa chứng từ có mã {0}?",
    Voucher_Delete_MultiRecord:
      "{0} chứng từ đã được chọn. Bạn có muốn xóa các chứng từ này khỏi danh sách?",
    Delete_OneRecord: "Bạn có muốn xóa {0} - {1}?",
    Delete_MultiRecord:
      "{0} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?",
    Delete_Warning_OneRecord:
      "Không thể xóa tài sản này vì đã có chứng từ phát sinh.",
    Delete_Warning_MultiRecord:
      "{0} tài sản được chọn không thể xóa. Vui lòng<br> kiểm tra lại tài sản trước khi thực hiện xóa. ",
    Cancel_Add: "Bạn có muốn hủy bỏ khai báo {0} này?",
    Cancel_Edit:
      "Thông tin thay đổi sẽ không được cập nhật nếu bạn <br> không lưu. Bạn có muốn lưu các thay đổi này?",
  },
  // THÔNG BÁO LỖI HIỂN THỊ
  ERROR_MESSAGE: {
    Server_Error: "Có lỗi xảy ra, vui lòng liên hệ MISA để được trợ giúp!",
    Empty_Data: "Chọn ít nhất một tài sản.",
  },
  // THÔNG BÁO KHI NGƯỜI DÙNG THỰC HIỆN CHỨC NĂNG NHẬP KHẨU
  IMPORT_MESSAGE: {
    Error_File: "File không đúng định dạng. Vui lòng chọn lại file excel.",
    Error_Data: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
    Import_Success: "Nhập dữ liệu thành công. Bấm hoàn tất để kết thúc.",
    Import_Failed: "Nhập dữ liệu thất bại. Vui lòng thử lại.",
  },
};
export default Resource;
