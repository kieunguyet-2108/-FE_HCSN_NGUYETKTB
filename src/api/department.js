const URL_DEPARTMENT = 'api/v1/Departments';

export default (axios) => ({
    /**
     * @description: Thực hiện call api lấy ra tất cả thông tin phòng ban
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 19/05/2023
     */
    getDepartments(){
        return axios.get(`${URL_DEPARTMENT }`);
    },
    /**
     * @description: Lấy ra thông tin phòng ban theo id
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 31/05/2023
     */
    getDepartmentById(id){
        return axios.get(`${URL_DEPARTMENT}/${id}`);
    }
});