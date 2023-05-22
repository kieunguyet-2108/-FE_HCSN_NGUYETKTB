
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
    },
    /**
     * @description: 
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 21/05/2023
     */
    getListByPagination(pageNumber, pageSize, filter){
        const params = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            //filter is object
            filter: filter
        }
        // khai báo from body   
        return axios.post(`${URL_FIXED_ASSET}/Paging`, params);
      },
      /**
       * @description: 
       * @param: {any} 
       * @return: {any} 
       * @author: NguyetKTB 22/05/2023
       */
      deleteFixedAsset(id){ 
        const params = {
            id: id
        }
        return axios.delete(`${URL_FIXED_ASSET}`, {params});
      }
});

