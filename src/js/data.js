// lấy dữ liệu từ api cho asset list

// call api


const fixedAssets = [
  {
    fixed_asset_id: "1",
    fixed_asset_code: "TS00001",
    fixed_asset_name: "Dell G3 3500",
    fixed_asset_category_id: "2",
    fixed_asset_category_code: "MS2",
    fixed_asset_category_name: "Máy vi tính xách tay",
    department_id: "1",
    department_code: "PB001",
    department_name: "Phòng kế toán",
    quantity: "5", // số lượng
    cost: 1000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 550000,
    depreciation_year: 450000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "2",
    fixed_asset_code: "TS00002",
    fixed_asset_name: "Máy in HP",
    fixed_asset_category_id: "3",
    fixed_asset_category_code: "MS3",
    fixed_asset_category_name: "Máy in",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 880000,
    depreciation_year: 1200000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "6",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "3",
    fixed_asset_code: "TS00003",
    fixed_asset_name: "Máy chiếu LG",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy chiếu",
    department_id: "3",
    department_code: "PB003",
    department_name: "Phòng kinh doanh",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 780000,
    depreciation_year: 2200000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "3",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "4",
    fixed_asset_code: "TS00004",
    fixed_asset_name: "Apple iPad",
    fixed_asset_category_id: "5",
    fixed_asset_category_code: "MS5",
    fixed_asset_category_name: "Máy tính bảng",
    department_id: "4",
    department_code: "PB004",
    department_name: "Phòng hành chính",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "5",
    fixed_asset_code: "TS00005",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "1",
    fixed_asset_category_code: "MS1",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "5",
    department_code: "PB005",
    department_name: "Phòng kỹ thuật",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "6",
    fixed_asset_code: "TS00006",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "6",
    department_code: "PB006",
    department_name: "Phòng kế hoạch",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "7",
    fixed_asset_code: "TS00787",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "8",
    fixed_asset_code: "TS00787",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "9",
    fixed_asset_code: "TS00787",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "10",
    fixed_asset_code: "TS00787",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "11",
    fixed_asset_code: "TS00787",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "12",
    fixed_asset_code: "TS00787",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "13",
    fixed_asset_code: "TS00787",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "14",
    fixed_asset_code: "TS00787",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
  {
    fixed_asset_id: "15",
    fixed_asset_code: "TS00787",
    fixed_asset_name: "Máy tính xách tay",
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy tính xách tay",
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
    quantity: "1", // số lượng
    cost: 10000000, // nguyên giá
    depreciation_rate: 20,
    remaining_amount: 800000,
    depreciation_year: 2000000, // giá trị hao mòn năm = nguyên giá * tỷ lệ hao mòn/100
    life_time: "5",
    tracked_year: "2023", // năm bắt đầu theo dõi
    purchased_date: "18/04/2023", // ngày mua
    depreciation_start_date: "18/04/2023", // năm sử dụng
  },
];
// kể tên các tên tài sản random
// const fixedAssets = [];

const departments = [
  {
    department_id: "1",
    department_code: "PB001",
    department_name: "Phòng kế toán",
  },
  {
    department_id: "2",
    department_code: "PB002",
    department_name: "Phòng nhân sự",
  },
  {
    department_id: "3",
    department_code: "PB003",
    department_name: "Phòng kinh doanh",
  },
  {
    department_id: "4",
    department_code: "PB004",
    department_name: "Phòng hành chính",
  },
  {
    department_id: "5",
    department_code: "PB005",
    department_name: "Phòng kỹ thuật",
  },
  {
    department_id: "6",
    department_code: "PB006",
    department_name: "Phòng kế hoạch",
  },
  {
    department_id: "7",
    department_code: "PB007",
    department_name: "Phòng kế hoạch",
  },
  {
    department_id: "8",
    department_code: "PB008",
    department_name: "Phòng kế hoạch",
  },
  {
    department_id: "9",
    department_code: "PB009",
    department_name: "Phòng kế hoạch",
  },
  {
    department_id: "10",
    department_code: "PB010",
    department_name: "Phòng kế hoạch",
  },
  {
    department_id: "11",
    department_code: "PB0011",
    department_name: "Phòng kế hoạch",
  },
];

const fixedAssetCategories = [
  // bao gồm id , code , name , tỷ lệ hao mòn , số năm sủ dụng
  {
    fixed_asset_category_id: "1",
    fixed_asset_category_code: "MS1",
    fixed_asset_category_name: "Máy tính để bàn",
    depreciation_rate: 20,
    life_time: "5",
  },
  {
    fixed_asset_category_id: "2",
    fixed_asset_category_code: "MS2",
    fixed_asset_category_name: "Máy vi tính xách tay",
    depreciation_rate: 20,
    life_time: "7",
  },
  {
    fixed_asset_category_id: "3",
    fixed_asset_category_code: "MS3",
    fixed_asset_category_name: "Máy in",
    depreciation_rate: 20,
    life_time: "6",
  },
  {
    fixed_asset_category_id: "4",
    fixed_asset_category_code: "MS4",
    fixed_asset_category_name: "Máy chiếu",
    depreciation_rate: 20,
    life_time: "3",
  },
  {
    fixed_asset_category_id: "5",
    fixed_asset_category_code: "MS5",
    fixed_asset_category_name: "Máy tính bảng",
    depreciation_rate: 20,
    life_time: "5",
  },
];

export default{
    fixedAssets,
    departments,
    fixedAssetCategories
}