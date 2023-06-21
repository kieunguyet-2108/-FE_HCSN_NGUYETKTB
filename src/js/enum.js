const Enum = {
  // Trạng thái của form
  FORM_MODE: {
    Add: 1,
    Edit: 2,
    Duplicate: 3,
  },
  // Các nút nhấn trên bàn phím
  KEY_CODE: {
    Enter: 13,
    Escape: 27,
    ArrowUp: 38,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    Backspace: 8,
    Delete: 46,
    Tab: 9,
    Ctrl: 17,
    Shift: 16,
    Alt: 18,
    Space: 32,
    Save: 83,
    F1: 112,
    A: 65,
    R: 82,
    D: 68,
    F: 70,
    E: 69,
    C: 67,
    M: 77,
  },
  // Các kiểu dữ liệu của cột
  COLUMN_TYPE: {
    Text: "text",
    Number: "number",
    Currency: "currency",
    Date: "date",
    Enum: "enum",
    Checkbox: "checkbox",
    Button: "button",
    Link: "link",
  },
  // CÁC MÃ LỖI TRẢ VỀ TỪ SERVER
  MS_CODE: {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    ERROR: 500,
  },
  // CÁC MESSAGE VALIDATE
  MS_VALIDATE_MSG: {
    REQUIRED: "{0} không được để trống.",
    MAX_LENGTH: "{0} không được vượt quá {1} ký tự.",
    DUPLICATE: "{0} đã tồn tại.",
    INVALID: "{0} không hợp lệ.",
  },
  // CÁC MESSAGE THÔNG BÁO KHI THỰC HIỆN DELETE
  MS_MESSAGE_DELETE: {
    ONE_RECORD: "Bạn có muốn xóa {0} - {1}?",
    MULTI_RECORD:
      "{0} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?",
    WARNING: "Không thể xóa tài sản này vì đã có chứng từ phát sinh.",
  },
  // CÁC MESSAGE TÙY THUỘC VÀO TRẠNG THÁI CỦA FORM
  MS_MESSAGE: {
    MS_MSG_CANCEL_ADD: "Bạn có muốn hủy bỏ khai báo tài sản này?",
    MS_MSG_CANCEL_EDIT:
      "Thông tin thay đổi sẽ không được cập nhật nếu bạn <br> không lưu. Bạn có muốn lưu các thay đổi này?",
    MS_MSG_ADD_SUCCESS: "Thêm mới tài sản thành công.",
    MS_MSG_ADD_FAILED: "Thêm mới tài sản thất bại.",
    MS_MSG_EDIT_SUCCESS: "Cập nhật tài sản thành công.",
    MS_MSG_EDIT_FAILED: "Cập nhật tài sản thất bại.",
    MS_MSG_DELETE_SUCCESS: "Xóa tài sản thành công.",
    MS_MSG_DELETE_FAILED: "Xóa tài sản thất bại.",
    MS_MSG_GET_DATA_FAILED: "Không lấy được dữ liệu.",
    MS_MSG_ERROR_DATA: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
    MS_MSG_IMPORT_SUCCESS: "Nhập dữ liệu thành công. Bấm hoàn tất để kết thúc.",
    MS_MSG_IMPORT_FAILED: "Nhập dữ liệu thất bại. Vui lòng thử lại.",
  },
  // KHAI BÁO CÁC OPERATOR CỦA FILTER
  MS_FILTER_CONDITION: {
    Equal: 0,
    NotEqual: 1,
    IsNull: 2,
    NotIsNull: 3,
    Like: 4,
    NotLike: 5,
    StartsWith: 6,
    EndsWith: 7,
  },
  // KHAI BÁO CÁC TOÁN TỬ CỦA FILTER
  MS_FILTER_OPERATOR: {
    And: 0,
    Or: 1,
  },
  // TRẠNG THÁI DIALOG THÔNG BÁO KHI THỰC HIỆN CÁC THAO TÁC
  MS_DIALOG_MODE: {
    Success: "success",
    Error: "error",
    Warning: "warning",
  },
  // TRẠNG THÁI POPUP THÔNG BÁO KHI THỰC HIỆN CÁC THAO TÁC
  MS_POPUP_MODE: {
    Success: "success",
    Error: "error",
    Warning: "warning",
  },
  // TRẠNG THÁI CỦA CÁC THAO TÁC TRONG CONTEXT MENU
  MENU_OPTION: {
    Add: 0,
    Edit: 1,
    Delete: 2,
    Duplicate: 3,
  },
  // LOẠI DỮ LIỆU CỦA CÁC CỘT TRONG BẢNG
  MS_FIELD_TYPE: {
    Int: 1,
    String: 2,
    Decimal: 3,
    Guid: 4,
    DateTime: 5,
  },
  // TRẠNG THÁI IMPORT
  MS_STATUS_IMPORT: {
    Import: 1,
    Handle: 2,
    Done: 3,
  },
  // TRẠNG THÁI LAYOUT TRONG MÀN HÌNH GHI TĂNG
  MS_LAYOUT: {
    Vertical: 1,
    Horizontal: 2,
  },
  // ACTION THỰC HIỆN TRÊN FORM
  MS_ACTION: {
    Add: "add",
    Edit: "edit",
    Duplicate: "duplicate",
    Delete: "delete",
    DeleteMany: "deleteMany",
    Save: "save",
    Cancel: "cancel",
    Close: "close",
    ZoomIn: "zoomIn",
    ZoomOut: "zoomOut",
  },
};

export default Enum;
