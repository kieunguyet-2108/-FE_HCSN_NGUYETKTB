const URL_FIXED_ASSET_CATEGORY = 'api/v1/FixedAssetCategories';

export default (axios) => ({
    /**
     * @description: Call api lấy ra tất cả thông tin nhóm tài sản
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 19/05/2023
     */
    getFixedAssetCategories(){
        return axios.get(`${URL_FIXED_ASSET_CATEGORY }`);
    },
    /**
     * @description: Lấy ra thông tin nhóm tài sản theo id
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 31/05/2023
     */
    getFixedAssetCategoryById(id){
        return axios.get(`${URL_FIXED_ASSET_CATEGORY}/${id}`);
    }
});