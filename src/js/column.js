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
    columnWidth: "50px",
    columnType: msEnum.ColumnType.Checkbox,
    type: "checkbox",
  },
  {
    key: "counter",
    name: "STT",
    columnWidth: "50px",
    columnType: msEnum.ColumnType.Number,
    type: "number",
    tooltip: "Số thứ tự",
    isShowIndex: true,
  },
  {
    key: "fixed_asset_code",
    name: "Mã tài sản",
    columnType: msEnum.ColumnType.Text,
    columnWidth: "100px",
    type: "text",
  },
  {
    key: "fixed_asset_name",
    name: "Tên tài sản",
    columnType: msEnum.ColumnType.Text,
    columnWidth: "150px",
    type: "text",
  },
  {
    key: "fixed_asset_category_name",
    name: "Loại tài sản",
    columnType: msEnum.ColumnType.Text,
    columnWidth: "150px",
    type: "text",
  },
  {
    key: "department_name",
    name: "Bộ phận sử dụng",
    columnType: msEnum.ColumnType.Text,
    columnWidth: "150px",
    type: "text",
  },
  {
    key: "quantity",
    name: "Số lượng",
    columnType: msEnum.ColumnType.Number,
    columnWidth: "100px",
    type: "number",
  },
  {
    key: "cost",
    name: "Nguyên giá",
    columnType: msEnum.ColumnType.Number,
    columnWidth: "150px",
    type: "currency",
  },
  {
    key: "cost",
    name: "HM/KH lũy kế",
    columnType: msEnum.ColumnType.Number,
    columnWidth: "150px",
    type: "currency",
    tooltip: "Hao mòn/Khấu hao lũy kế",
  },
  {
    key: "cost",
    name: "Giá trị còn lại",
    columnType: msEnum.ColumnType.Number,
    columnWidth: "150px",
    type: "currency",
  },
  {
    key: "action",
    name: "Chức năng",
    columnWidth: "150px",
    type: "action",
  },
];

//
const tabindexForm = [
  {
    key: "fixed_asset_code",
    name: "Mã tài sản",
  },
  {
    key: "fixed_asset_name",
    name: "Tên tài sản",
  },
  {
    key: "fixed_asset_category_code",
    name: "Loại tài sản",
  },
  {
    key: "department_code",
    name: "Bộ phận sử dụng",
  },
  {
    key: "department_name",
    name: "Tên bộ phận sử dụng",
  },
  {
    key: "fixed_asset_category_code",
    name: "Mã loại tài sản",
  },
];

export default {
  departmentColumns,
  fixedAssetCategoryColumns,
  tableColumns,
  tabindexForm,
};
