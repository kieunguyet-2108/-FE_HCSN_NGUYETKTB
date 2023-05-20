import dataExample from "./data.js";

/**
 * @description:  Hàm này dùng để lấy thông tin tài sản theo id
 * @param: {any}
 * @return: {any}
 * @author: NguyetKTB 04/05/2023
 */
function getFixedAssetById(inputValue) {
  const fixedAssets = dataExample.fixedAssets;
  // duyệt mảng
  for (let i = 0; i < fixedAssets.length; i++) {
    // nếu có mã trùng thì return false
    if (fixedAssets[i].fixed_asset_id == inputValue) {
      return fixedAssets[i];
    }
  }
  return null;
}

/**
 * @description: Hàm này dùng để lấy thông tin tài sản theo mã tài sản
 * @param: {any}
 * @return: {any}
 * @author: NguyetKTB 02/05/2023
 */
function getFixedAsset(inputValue) {
  const fixedAssets = dataExample.fixedAssets;
  // duyệt mảng
  for (let i = 0; i < fixedAssets.length; i++) {
    // nếu có mã trùng thì return false
    if (fixedAssets[i].fixed_asset_code == inputValue) {
      return fixedAssets[i];
    }
  }
  return null;
}
/**
 * @description: Hàm này dùng để lấy thông tin phòng ban theo mã phòng ban
 * @param: {any}
 * @return: {any}
 * @author: NguyetKTB 03/05/2023
 */
function getDepartment(inputValue) {
  const departments = dataExample.departments;
  // duyệt mảng
  for (let i = 0; i < departments.length; i++) {
    // nếu có mã trùng thì return false
    if (departments[i].department_code == inputValue) {
      return departments[i];
    }
  }
  return null;
}

/**
 * @description: Hàm này dùng để lấy thông tin loại tài sản theo mã loại tài sản
 * @param: {any}
 * @return: {any}
 * @author: NguyetKTB 03/05/2023
 */
function getFixedAssetCategory(inputValue) {
  const fixedAssetCategory = dataExample.fixedAssetCategories;
  // duyệt mảng
  for (let i = 0; i < fixedAssetCategory.length; i++) {
    // nếu có mã trùng thì return false
    if (fixedAssetCategory[i].fixed_asset_category_code == inputValue) {
      return fixedAssetCategory[i];
    }
  }
  return null;
}


export default {
  getFixedAsset,
  getDepartment,
  getFixedAssetCategory,
  getFixedAssetById,
};
