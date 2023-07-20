const URL_DEPARTMENT = 'api/v1/Departments';

export default (axios) => ({
    /**
     * @description: Gọi api lấy ra thông tin phòng ban
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 19/05/2023
     */
    async getDepartments(){
        try {
            const result = await axios.get(`${URL_DEPARTMENT }`);
            return result;
        } catch (error) {
            return error.response;
        }
    },
    /**
     * @description: Gọi api lấy ra thông tin phòng ban theo id
     * @param: {id}: id phòng ban
     * @return: {any} 
     * @author: NguyetKTB 31/05/2023
     */
    async getDepartmentById(id){
        try {
            const result = await axios.get(`${URL_DEPARTMENT}/${id}`);
            return result;
        } catch (error) {
            return error.response;
        }
    }
});