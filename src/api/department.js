const URL_DEPARTMENT = 'api/v1/Departments';

export default (axios) => ({
    /**
     * @description: 
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 19/05/2023
     */
    getDepartments(){
        return axios.get(`${URL_DEPARTMENT }`);
    }
});