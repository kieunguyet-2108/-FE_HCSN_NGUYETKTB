import fixed_asset from "./fixed_asset";
import department from "./department";
import fixed_asset_category from "./fixed_asset_category";
import import_file from "./import_file";
import account from "./account";
import voucher from "./voucher";
import voucher_detail from "./voucher_detail";
import axios from "axios";
import budget_category from "./budget_category";
import budget_detail from "./budget_detail";
function getToken() {
  return localStorage.getItem("token");
}
const axiosInstance = axios.create({
  baseURL: "https://localhost:7081",
  Headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": true,
  },
});
axiosInstance.interceptors.request.use(
  function(config) {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   async function(error) {
//     console.log(error.response.data.devMsg);
//     emitter.emit("showPopup", error.response.data.devMsg);
//     return Promise.reject(error);
//   }
// );
const api = {
  fixed_asset: fixed_asset(axiosInstance),
  department: department(axiosInstance),
  fixed_asset_category: fixed_asset_category(axiosInstance),
  import_file: import_file(axiosInstance),
  account: account(axiosInstance),
  voucher: voucher(axiosInstance),
  voucher_detail: voucher_detail(axiosInstance),
  budget_category: budget_category(axiosInstance),
  budget_detail: budget_detail(axiosInstance),
};

export default api;
