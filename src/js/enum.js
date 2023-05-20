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
  MS_CODE :{
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    ERROR: 500,
  },
  MS_VALIDATE_MSG :{
    REQUIRED: "Trường này không được để trống",
    MAX_LENGTH: "Trường này không được vượt quá {0} ký tự",
    DUPLICATE: "Trường này đã tồn tại",
    INVALID: "Trường này không hợp lệ",
  }
};

export default Enum;
