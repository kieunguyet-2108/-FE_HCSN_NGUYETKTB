import msEnum from "@/js/enum.js";
// khai báo các cột cho bảng sẽ hiển thị trong combobox
const departmentColumns = [
  { key: "department_code", name: "Mã", width: "30%", isSearching: true },
  {
    key: "department_name",
    name: "Tên",
    width: "70%",
    isBinding: true,
    valueBinding: "department_code",
    isSearching: true,
  },
];

// khai báo các cột cho bảng sẽ hiển thị trong combobox
const fixedAssetCategoryColumns = [
  {
    key: "fixed_asset_category_code",
    name: "Mã",
    width: "30%",
    isSearching: true,
  },
  {
    key: "fixed_asset_category_name",
    name: "Tên",
    width: "70%",
    isBinding: true,
    valueBinding: "fixed_asset_category_code",
    isSearching: true,
  },
];

// khai báo các cột cho table trong màn hình danh sách tài sản
const tableColumns = [
  {
    key: "fixed_asset_id",
    name: "checkbox",
    columnWidth: "40px",
    maxColumnWidth: "40px",
    minColumnWidth: "40px",
    columnType: msEnum.ColumnType.Checkbox,
    type: "checkbox",
  },
  {
    key: "counter",
    name: "STT",
    columnWidth: "40px",
    maxColumnWidth: "40px",
    minColumnWidth: "40px",
    columnType: msEnum.ColumnType.Number,
    type: '',
    tooltip: "Số thứ tự",
    isShowIndex: true,
  },
  {
    key: "fixed_asset_code",
    name: "Mã tài sản",
    columnType: msEnum.ColumnType.Text,
    columnWidth: "120px",
    maxColumnWidth: "120px",
    minColumnWidth: "120px",
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: "fixed_asset_name",
    name: "Tên tài sản",
    columnType: msEnum.ColumnType.Text,
    columnWidth: "120px",
    maxColumnWidth: "120px",
    minColumnWidth: "120px",
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: "fixed_asset_category_name",
    name: "Loại tài sản",
    columnType: msEnum.ColumnType.Text,
    columnWidth: "120px",
    maxColumnWidth: "120px",
    minColumnWidth: "120px",
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: "department_name",
    name: "Bộ phận sử dụng",
    columnType: msEnum.ColumnType.Text,
    columnWidth: "120px",
    maxColumnWidth: "120px",
    minColumnWidth: "120px",
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: "quantity",
    name: "Số lượng",
    columnType: msEnum.ColumnType.Number,
    columnWidth: "80px",
    maxColumnWidth: "80px",
    minColumnWidth: "80px",
    type: msEnum.MS_FIELD_TYPE.Int,
  },
  {
    key: "cost",
    name: "Nguyên giá",
    columnType: msEnum.ColumnType.Number,
    columnWidth: "120px",
    maxColumnWidth : "120px",
    minColumnWidth : "120px",
    type: msEnum.MS_FIELD_TYPE.Decimal,
  },
  {
    key: "",
    name: "HM/KH lũy kế",
    columnType: msEnum.ColumnType.Number,
    columnWidth: "100px",
    maxColumnWidth : "100px",
    minColumnWidth : "100px",
    type: msEnum.MS_FIELD_TYPE.Decimal,
    tooltip: "Hao mòn/Khấu hao lũy kế",
  },
  {
    key: "",
    name: "Giá trị còn lại",
    columnType: msEnum.ColumnType.Number,
    columnWidth: "100px",
    maxColumnWidth : "100px",
    minColumnWidth : "100px",
    type: msEnum.MS_FIELD_TYPE.Decimal,
  },
  {
    key: "action",
    name: "Chức năng",
    columnWidth: "110px",
    maxColumnWidth: "110px",
    minColumnWidth: "110px",
    type: "action",
  },
];

const importColumns = [
  {
    key: "notification",
    name: "Thông báo",
    width: "250px"
  },
  {
    key: "fixed_asset_code",
    name: "Mã tài sản",
    width: "120px",
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: "fixed_asset_name",
    name: "Tên tài sản",
    width: "120px",
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: "department_code",
    name: "Mã phòng ban",
    width: "120px",
    type: msEnum.MS_FIELD_TYPE.String,
  }

]
export default {
  departmentColumns,
  fixedAssetCategoryColumns,
  tableColumns,
  importColumns
};
