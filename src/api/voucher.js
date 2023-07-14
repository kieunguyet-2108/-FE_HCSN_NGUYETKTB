const URL_VOUCHER = 'api/v1/Vouchers'
import utility from '@/js/utility.js'

export default (axios) => ({
    /**
     * @description: Thực hiện gọi api lấy ra tất cả thông tin chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 23/06/2023
     */
    getAllVouchers() {
        return axios.get(`${URL_VOUCHER}`)
    },

    /**
     * @description: Call api lấy ra thông tin chứng từ theo phân trang và filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 23/06/2023
     */
    async getVouchersByPaging(pageNumber, pageSize, filter) {
        const params = {
            PageNumber: pageNumber,
            PageSize: pageSize,
            //filter is object
            Filters: filter,
        }
        try {
            const result = await axios.post(
                `${URL_VOUCHER}/GetByPaging`,
                params
            )
            return result
        } catch (error) {
            return error.response
        }
    },
    /**
     * @description: Call api lấy ra mã code mới nhất
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 26/06/2023
     */
    async getNewCode() {
        try {
            const result = await axios.get(`${URL_VOUCHER}/GetNewCode`)
            return result
        } catch (error) {
            return error.response
        }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 27/06/2023
     */
    async getVoucherById(voucherId) {
        try {
            const result = await axios.get(`${URL_VOUCHER}/${voucherId}`)
            return result
        } catch (error) {
            return error.response
        }
    },
    /**
     * @description: gọi api kiểm tra mã code trùng
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 29/06/2023
     */
    async checkDuplicateVoucherCode(code, id) {
        try {
            const result = await axios.get(
                `${URL_VOUCHER}/DuplicateCode?code=${code}&entityId=${id}`
            )
            return result
        } catch (error) {
            return error.response
        }
    },
    /**
     * @description: call api insert dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 24/05/2023
     */
    async insertVoucher(voucher, fixedAssets, budgetDetails) {
        try {
            voucher = utility.normalizeObjectEmptyToNull(voucher)
            fixedAssets = fixedAssets.map((item) => {
                return utility.normalizeObjectEmptyToNull(item)
            })
            budgetDetails = budgetDetails.map((item) => {
                return utility.normalizeObjectEmptyToNull(item)
            })
            const param = {
                voucher,
                fixedAssets,
                budgetDetails,
            }
            const result = await axios.post(
                `${URL_VOUCHER}/InsertVoucher`,
                param
            )
            return result
        } catch (error) {
            return error.response
        }
    },
    /**
     * @description: Call api xoa dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 22/05/2023
     */
    async deleteVoucher(ids) {
        const params = {
            data: ids,
        }
        try {
            const result = await axios.delete(`${URL_VOUCHER}`, params)
            return result
        } catch (error) {
            return error.response
        }
    },
    /**
     * @description: call api update dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 24/05/2023
     */
    async updateVoucher(voucher, fixedAssets, budgetDetails) {
        voucher = utility.normalizeObjectEmptyToNull(voucher)
        fixedAssets = fixedAssets.map((item) => {
            return utility.normalizeObjectEmptyToNull(item)
        })
        budgetDetails = budgetDetails.map((item) => {
            return utility.normalizeObjectEmptyToNull(item)
        })
        try {
            const param = {
                voucher,
                fixedAssets,
                budgetDetails,
            }
            const result = await axios.put(
                `${URL_VOUCHER}/UpdateVoucher`,
                param
            )
            return result
        } catch (error) {
            return error.response
        }
    },
})
