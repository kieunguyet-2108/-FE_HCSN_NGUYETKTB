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
    In: 8,
    NotIn: 9,
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
  MS_ACTION_TYPE: {
    Add: "1",
    Edit: "2",
    Delete: "3",
    Duplicate: "4",
  },
  // ACTION THỰC HIỆN TRÊN FORM
  MS_ACTION: {
    Add: "add",
    Edit: "edit",
    Duplicate: "duplicate",
    Import: "import",
    Delete: "delete",
    DeleteMany: "deleteMany",
    Save: "save",
    Cancel: "cancel",
    Close: "close",
  },
  // ACTION THỰC HIỆN TRÊN FORM
  MS_TABLE_ACTION: {
    ChangePage: "changePage",
    ChangePageSize: "changePageSize",
    ChooseOption: "chooseOption",
  },
  // ACTION THỰC HIỆN TRÊN FORM VOUCHER
  MS_INCREASE_ASSET_ACTION: {
    VerticalLayout: "verticalLayout",
    HorizontalLayout: "horizontalLayout",
    ZoomIn: "zoomIn",
    ZoomOut: "zoomOut",
    AddVoucher: "addVoucher",
    EditVoucher: "editVoucher",
    AddAssetInVoucher: "addAssetInVoucher",
  },
};

export default Enum;
