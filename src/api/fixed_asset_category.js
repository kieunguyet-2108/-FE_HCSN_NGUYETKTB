const URL_FIXED_ASSET_CATEGORY = 'api/v1/FixedAssetCategories';

export default (axios) => ({
    /**
     * @description: 
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 19/05/2023
     */
    getFixedAssetCategories(){
        return axios.get(`${URL_FIXED_ASSET_CATEGORY }`);
    }
});