const URL_FIXED_ASSET = 'api/v1/FixedAssets';

export default (axios) => ({
    /**
     * @description: 
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 19/05/2023
     */
    getFixedAssets(){
        return axios.get(`${URL_FIXED_ASSET }`);
    },
    /**
     * @description: 
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 20/05/2023
     */
    getFixedAssetById(id){
        return axios.get(`${URL_FIXED_ASSET }/${id}`);
    }
});

