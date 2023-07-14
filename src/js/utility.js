/**
 * @description: Thực hiện xử lí tiền dữ liệu trước khi thêm mới object
 * @param: {any}
 * @return: {any}
 * @author: NguyetKTB 09/07/2023
 */
function normalizeObjectEmptyToNull(obj) {
    for (const key in obj) {
        if (obj[key] === '' || obj[key] === undefined || obj[key] === null) {
            delete obj[key]
        }
    }
    return obj
}
export default {
    normalizeObjectEmptyToNull,
}
