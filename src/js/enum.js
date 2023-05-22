const Enum = {
  // Trạng thái của form
  FormMode: {
    Add: 1,
    Edit: 2,
  },
  // format ngày tháng năm
  DatePicker: {
    Format: "dd/mm/yyyy",
  },
  // Các nút nhấn trên bàn phím
  KeyCode: {
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
  },
  ColumnType: {
    Text: "text",
    Number: "number",
    Currency: "currency",
    Date: "date",
    Enum: "enum",
    Checkbox: "checkbox",
    Button: "button",
    Link: "link",
  },
  MS_CODE: {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    ERROR: 500,
  },
  MS_VALIDATE_MSG: {
    REQUIRED: "{0} không được để trống",
    MAX_LENGTH: "{0} không được vượt quá {1} ký tự",
    DUPLICATE: "{0} đã tồn tại",
    INVALID: "{0} không hợp lệ",
  },
  MS_MESSAGE_DELETE:{
    ONE_RECORD: "Bạn có muốn xóa {0} - {1}?",
    MULTI_RECORD: "{0} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?",
    WARNING: "Không thể xóa tài sản này vì đã có chứng từ phát sinh",
    SUCCESS: "Xóa tài sản thành công",
    ERROR: "Xóa tài sản thất bại",
  },
  MS_FILTER_OPERATOR: {
    Equal: 0,
    NotEqual: 1,
    IsNull: 2,
    NotIsNull: 3,
    Like: 4,
    NotLike: 5,
    StartsWith: 6,
    EndsWith: 7,
  },
};

export default Enum;
