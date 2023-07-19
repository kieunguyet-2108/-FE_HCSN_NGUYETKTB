import msEnum from '@/js/enum.js'
// khai báo các cột cho bảng sẽ hiển thị trong combobox phòng ban
const departmentColumns = [
  { key: 'department_code', name: 'Mã', width: '30%', isSearching: true },
  {
    key: 'department_name',
    name: 'Tên',
    width: '70%',
    isBinding: true,
    valueBinding: 'department_code',
    isSearching: true,
  },
]

// khai báo các cột cho bảng sẽ hiển thị trong combobox của loại tài sản
const fixedAssetCategoryColumns = [
  {
    key: 'fixed_asset_category_code',
    name: 'Mã',
    width: '30%',
    isSearching: true,
  },
  {
    key: 'fixed_asset_category_name',
    name: 'Tên',
    width: '70%',
    isBinding: true,
    valueBinding: 'fixed_asset_category_code',
    isSearching: true,
  },
]
// khai báo các cột cho bảng hiển thị trong combobox của nguồn chi phí
const budgetCategoryColumns = [
  {
    key: 'budget_category_name',
    name: '',
    width: '100%',
    isBinding: true,
    valueBinding: 'budget_category_name',
    isSearching: true,
  },
]

// khai báo các cột cho table trong màn hình danh sách tài sản
const tableColumns = [
  {
    key: 'fixed_asset_id',
    name: 'checkbox',
    class: 'asset-checkbox',
    columnWidth: '30px',
    maxColumnWidth: '30px',
    minColumnWidth: '30px',
    columnType: msEnum.COLUMN_TYPE.Checkbox,
    type: 'checkbox',
  },
  {
    key: 'counter',
    name: 'STT',
    columnWidth: '40px',
    maxColumnWidth: '40px',
    minColumnWidth: '40px',
    columnType: msEnum.COLUMN_TYPE.Number,
    type: '',
    tooltip: 'Số thứ tự',
    isShowIndex: true,
  },
  {
    key: 'fixed_asset_code',
    name: 'Mã tài sản',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'fixed_asset_name',
    name: 'Tên tài sản',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'fixed_asset_category_name',
    name: 'Loại tài sản',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'department_name',
    name: 'Bộ phận sử dụng',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'quantity',
    name: 'Số lượng',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '80px',
    maxColumnWidth: '80px',
    minColumnWidth: '80px',
    type: msEnum.MS_FIELD_TYPE.Int,
  },
  {
    key: 'cost',
    name: 'Nguyên giá',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
  },
  {
    key: '',
    name: 'HM/KH lũy kế',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '100px',
    maxColumnWidth: '100px',
    minColumnWidth: '100px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
    tooltip: 'Hao mòn/Khấu hao lũy kế',
  },
  {
    key: '',
    name: 'Giá trị còn lại',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '100px',
    maxColumnWidth: '100px',
    minColumnWidth: '100px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
  },
  {
    key: 'action',
    name: 'Chức năng',
    columnWidth: '110px',
    maxColumnWidth: '110px',
    minColumnWidth: '110px',
    type: 'action',
    actionIcons: [
      {
        icon: 'ms-icon ms-16 ms-icon-pencil',
        tooltip: 'Sửa',
        action: msEnum.MS_ACTION.Edit,
      },
      {
        icon: 'ms-icon ms-16 ms-icon-duplicate',
        tooltip: 'Nhân bản',
        action: msEnum.MS_ACTION.Duplicate,
      },
    ],
  },
]

// khai báo các cột do bảng chứa danh sách chứng từ
const vourcherColumns = [
  {
    key: 'voucher_id',
    name: 'checkbox',
    class: 'vourcher-checkbox',
    columnWidth: '50px',
    maxColumnWidth: '50px',
    minColumnWidth: '50px',
    columnType: msEnum.COLUMN_TYPE.Checkbox,
    type: 'checkbox',
  },
  {
    key: 'counter',
    name: 'STT',
    columnWidth: '50px',
    maxColumnWidth: '50px',
    minColumnWidth: '50px',
    columnType: msEnum.COLUMN_TYPE.Number,
    type: '',
    tooltip: 'Số thứ tự',
    isShowIndex: true,
  },
  {
    key: 'voucher_code',
    name: 'Số chứng từ',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '150px',
    maxColumnWidth: '150px',
    minColumnWidth: '150px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'voucher_date',
    name: 'Ngày chứng từ',
    columnWidth: '150px',
    maxColumnWidth: '150px',
    minColumnWidth: '150px',
    columnType: msEnum.COLUMN_TYPE.Date,
    type: '',
  },
  {
    key: 'increment_date',
    name: 'Ngày ghi tăng',
    columnWidth: '150px',
    maxColumnWidth: '150px',
    minColumnWidth: '150px',
    columnType: msEnum.COLUMN_TYPE.Date,
    type: '',
  },
  {
    key: 'total_orgprice',
    name: 'Tổng nguyên giá',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '200px',
    maxColumnWidth: '200px',
    minColumnWidth: '200px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
  },
  {
    key: 'description',
    name: 'Nội dung',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '350px',
    maxColumnWidth: '350px',
    minColumnWidth: '350px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'action',
    name: '',
    columnWidth: '110px',
    maxColumnWidth: '110px',
    minColumnWidth: '110px',
    type: 'action',
    actionIcons: [
      {
        icon: 'ms-icon ms-16 ms-icon-pencil',
        tooltip: 'Sửa',
        action: msEnum.MS_ACTION.Edit,
      },
      {
        icon: 'ms-icon ms-icon-trash-red ms-24',
        tooltip: 'Xóa',
        action: msEnum.MS_ACTION.Delete,
      },
    ],
  },
]

// khai báo các cột cho table thông tin chi tiết trong màn hình ghi tăng
const assetColumns = [
  {
    key: 'counter',
    name: 'STT',
    columnWidth: '32px',
    maxColumnWidth: '32px',
    minColumnWidth: '32px',
    columnType: msEnum.COLUMN_TYPE.Number,
    type: '',
    tooltip: 'Số thứ tự',
    isShowIndex: true,
  },
  {
    key: 'fixed_asset_code',
    name: 'Mã tài sản',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'fixed_asset_name',
    name: 'Tên tài sản',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'department_name',
    name: 'Bộ phận sử dụng',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'cost',
    name: 'Nguyên giá',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
  },
  {
    key: 'HMN',
    name: 'Hao mòn năm',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '100px',
    maxColumnWidth: '100px',
    minColumnWidth: '100px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
    tooltip: 'Hao mòn/Khấu hao lũy kế',
  },
  {
    key: 'remaining_value',
    name: 'Giá trị còn lại',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '100px',
    maxColumnWidth: '100px',
    minColumnWidth: '100px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
  },
]

// khai báo các cột cho table thông tin tài sản trong màn hình ghi tăng
const formAssetColumns = [
  {
    key: 'counter',
    name: 'STT',
    columnWidth: '40px',
    maxColumnWidth: '40px',
    minColumnWidth: '40px',
    columnType: msEnum.COLUMN_TYPE.Number,
    type: '',
    tooltip: 'Số thứ tự',
    isShowIndex: true,
  },
  {
    key: 'fixed_asset_code',
    name: 'Mã tài sản',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'fixed_asset_name',
    name: 'Tên tài sản',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'department_name',
    name: 'Bộ phận sử dụng',
    columnType: msEnum.COLUMN_TYPE.Text,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.String,
  },
  {
    key: 'cost',
    name: 'Nguyên giá',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '120px',
    maxColumnWidth: '120px',
    minColumnWidth: '120px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
  },
  {
    key: 'HMN',
    name: 'Hao mòn năm',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '100px',
    maxColumnWidth: '100px',
    minColumnWidth: '100px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
    tooltip: 'Hao mòn/Khấu hao lũy kế',
  },
  {
    key: 'remaining_value',
    name: 'Giá trị còn lại',
    columnType: msEnum.COLUMN_TYPE.Number,
    columnWidth: '100px',
    maxColumnWidth: '100px',
    minColumnWidth: '100px',
    type: msEnum.MS_FIELD_TYPE.Decimal,
  },
  {
    key: 'action',
    isDynamic: true,
    name: '',
    columnWidth: '110px',
    maxColumnWidth: '110px',
    minColumnWidth: '110px',
    type: 'action',
    actionIcons: [
      {
        icon: 'ms-icon ms-16 ms-icon-pencil',
        tooltip: 'Sửa',
        action: msEnum.MS_ACTION.Edit,
      },
      {
        icon: 'ms-icon ms-icon-trash-red ms-24',
        tooltip: 'Xóa',
        action: msEnum.MS_ACTION.Delete,
      },
    ],
  },
]
// khai báo option cho phân trang
const pagingOptions = [
  { key: 10, value: 10 },
  { key: 20, value: 20 },
  { key: 50, value: 50 },
  { key: 100, value: 100 },
]
export default {
  departmentColumns,
  fixedAssetCategoryColumns,
  tableColumns,
  vourcherColumns,
  assetColumns,
  formAssetColumns,
  budgetCategoryColumns,
  pagingOptions,
}
